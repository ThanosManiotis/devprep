import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1m'),
    });
  }
  return ratelimit;
}

const JUDGE0_URL = process.env.JUDGE0_API_URL;
const MAX_CODE_LENGTH = 5000;

const LANGUAGE_IDS: Record<string, number> = {
  javascript: 93, // Node.js
  csharp: 51,     // C# (Mono)
};

export async function POST(req: NextRequest) {
  // Rate limiting (skip if Upstash not configured)
  const rl = getRatelimit();
  if (rl) {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  // Parse and validate input
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('code' in body) ||
    !('language' in body)
  ) {
    return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
  }

  const { code, language } = body as { code: unknown; language: unknown };

  if (typeof code !== 'string' || typeof language !== 'string') {
    return NextResponse.json({ error: 'Invalid input types' }, { status: 400 });
  }

  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: 'Code exceeds maximum length' }, { status: 400 });
  }

  if (!['javascript', 'csharp'].includes(language)) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }

  if (!JUDGE0_URL) {
    console.error('[Execute] JUDGE0_API_URL environment variable not set');
    return NextResponse.json({ error: 'Execution service not configured' }, { status: 500 });
  }

  // Execute via Judge0
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${JUDGE0_URL}/submissions?wait=true&base64_encoded=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language_id: LANGUAGE_IDS[language],
        source_code: Buffer.from(code).toString('base64'),
        stdin: '',
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('[Execute] Judge0 returned', response.status);
      return NextResponse.json({ error: 'Execution service error' }, { status: 502 });
    }

    const result = await response.json() as {
      stdout?: string;
      stderr?: string;
      compile_output?: string;
      status?: { description: string };
    };

    const output = result.stdout
      ? Buffer.from(result.stdout, 'base64').toString()
      : result.stderr
      ? Buffer.from(result.stderr, 'base64').toString()
      : result.compile_output
      ? Buffer.from(result.compile_output, 'base64').toString()
      : 'No output';

    return NextResponse.json({ output, error: null });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: 'Execution timed out' }, { status: 504 });
    }
    console.error('[Execute] Unexpected error:', err);
    return NextResponse.json({ error: 'Execution failed' }, { status: 500 });
  } finally {
    clearTimeout(timeoutId);
  }
}
