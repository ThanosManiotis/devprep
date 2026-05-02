# Design System

A reusable design system for Next.js / React projects. Drop the `design-system/` folder into any project and import what you need.

---

## Structure

```
design-system/
├── tokens/
│   └── tokens.css          ← CSS custom properties (all tokens)
├── components/
│   ├── Button/             ← Button.tsx + Button.module.css
│   ├── Badge/              ← Badge.tsx  + Badge.module.css
│   ├── Card/               ← Card.tsx   + Card.module.css
│   └── Input/              ← Input.tsx  + Input.module.css
├── demo/
│   └── index.html          ← Open in browser to preview everything
└── index.ts                ← Barrel export
```

---

## Setup

### 1. Import tokens globally

In your `app/layout.tsx` (Next.js App Router) or `pages/_app.tsx`:

```ts
import '@/design-system/tokens/tokens.css';
```

### 2. Set up dark mode

Add `data-theme="dark"` to `<html>` to activate dark mode. Toggle it with JS:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

For Next.js, use `next-themes`:

```ts
// layout.tsx
<ThemeProvider attribute="data-theme" defaultTheme="system">
  {children}
</ThemeProvider>
```

### 3. Import components

```ts
import { Button, Badge, Card, CardHeader, CardMetric, Input, Textarea } from '@/design-system';
```

---

## Components

### Button

```tsx
<Button variant="primary" size="md">Save changes</Button>
<Button variant="secondary" size="sm" loading={isSaving}>Saving…</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
<Button variant="ghost" iconLeft={<SearchIcon />}>Search</Button>
```

**Props:** `variant` (primary | secondary | ghost | danger), `size` (sm | md | lg), `loading`, `iconLeft`, `iconRight`, `fullWidth`, all native button attrs.

---

### Badge

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending review</Badge>
<Badge variant="accent">New</Badge>
```

**Props:** `variant` (default | accent | info | success | warning | danger), `size` (sm | md), `dot`.

---

### Card

```tsx
<Card variant="raised" padding="md">
  <CardHeader title="Project Alpha" subtitle="Last updated 2h ago" action={<Button size="sm">Edit</Button>} />
  <CardDivider />
  <p>Card content here</p>
</Card>

<Card variant="metric">
  <CardMetric label="Monthly revenue" value="€12.4k" trend={{ value: '8.2%', positive: true }} />
</Card>

<Card variant="featured">Featured / recommended item</Card>
<Card variant="flat">Subtle background, no border</Card>
<Card onClick={() => navigate('/detail')}>Clickable card</Card>
```

**Props:** `variant` (raised | flat | metric | featured), `padding` (sm | md | lg), `onClick`.

---

### Input & Textarea

```tsx
<Input
  label="Email address"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email."
/>

<Input
  label="Username"
  error="Username already taken."
  iconLeft={<UserIcon />}
/>

<Textarea
  label="Notes"
  hint="Markdown is supported."
  rows={4}
/>
```

**Props:** `label`, `hint`, `error`, `size` (sm | md | lg), `iconLeft`, `iconRight`, `fullWidth`, all native input/textarea attrs.

---

## Tokens reference

All tokens are CSS custom properties prefixed `--ds-`. They live in `tokens/tokens.css`.

| Category   | Examples                                        |
|------------|-------------------------------------------------|
| Colors     | `--ds-accent`, `--ds-brand-600`, `--ds-danger-600` |
| Surfaces   | `--ds-bg-page`, `--ds-bg-surface`, `--ds-bg-subtle` |
| Text       | `--ds-text-primary`, `--ds-text-secondary`      |
| Borders    | `--ds-border`, `--ds-border-strong`             |
| Spacing    | `--ds-space-1` → `--ds-space-16`               |
| Radius     | `--ds-radius-sm` → `--ds-radius-full`          |
| Typography | `--ds-font-sans`, `--ds-text-base`, `--ds-weight-medium` |
| Shadows    | `--ds-shadow-xs` → `--ds-shadow-lg`            |
| Transitions| `--ds-transition-fast`, `--ds-transition-base`  |

Use them directly in your own CSS Modules:

```css
.myCard {
  background: var(--ds-bg-surface);
  border: 1px solid var(--ds-border);
  border-radius: var(--ds-radius-lg);
  padding: var(--ds-space-5);
  box-shadow: var(--ds-shadow-sm);
}
```

---

## Adding new components

1. Create `design-system/components/MyComponent/`
2. Add `MyComponent.tsx` and `MyComponent.module.css`
3. Use only `--ds-*` tokens — no hardcoded colours
4. Export from `index.ts`
5. Test dark mode: toggle `data-theme="dark"` on `<html>`

---

## Preview

Open `demo/index.html` in your browser — no build step needed. Toggle dark mode with the button in the top-right.
