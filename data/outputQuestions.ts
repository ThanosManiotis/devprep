import type { OutputQuestion } from '@/types';

export const outputQuestions: OutputQuestion[] = [
  // ── JavaScript ──────────────────────────────────────────────────────────────
  {
    id: 'js-closure-var-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'closures',
    title: 'var in a loop',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined, undefined, undefined'],
    correctAnswer: '3, 3, 3',
    explanation:
      'var is function-scoped, so all three callbacks share the same `i`. By the time the callbacks run, the loop has finished and i === 3.',
    hint: 'Think about what scope `var` creates vs `let`.',
  },
  {
    id: 'js-closure-let-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'closures',
    title: 'let in a loop',
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['3, 3, 3', '0, 0, 0', '0, 1, 2', 'Error'],
    correctAnswer: '0, 1, 2',
    explanation:
      '`let` is block-scoped, so each loop iteration gets its own `i`. Each callback captures its own copy.',
    hint: '`let` creates a new binding per iteration.',
  },
  {
    id: 'js-hoisting-var-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'hoisting',
    title: 'var hoisting',
    code: `console.log(x);
var x = 5;
console.log(x);`,
    options: ['5, 5', 'ReferenceError', 'undefined, 5', 'null, 5'],
    correctAnswer: 'undefined, 5',
    explanation:
      '`var` declarations are hoisted to the top of their scope but not their initialisation. So `x` exists but is `undefined` before the assignment.',
    hint: 'var is hoisted — declaration yes, assignment no.',
  },
  {
    id: 'js-hoisting-let-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'hoisting',
    title: 'let temporal dead zone',
    code: `console.log(x);
let x = 5;`,
    options: ['undefined', '5', 'null', 'ReferenceError'],
    correctAnswer: 'ReferenceError',
    explanation:
      '`let` is also hoisted but lives in the Temporal Dead Zone (TDZ) until the declaration is reached. Accessing it before that throws a ReferenceError.',
    hint: 'Look up the Temporal Dead Zone.',
  },
  {
    id: 'js-this-regular-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'this',
    title: 'this in regular vs arrow function',
    code: `const obj = {
  name: 'Thanos',
  regular() { return this.name; },
  arrow: () => this.name,
};
console.log(obj.regular());
console.log(obj.arrow());`,
    options: [
      '"Thanos", "Thanos"',
      '"Thanos", undefined',
      'undefined, "Thanos"',
      'Error',
    ],
    correctAnswer: '"Thanos", undefined',
    explanation:
      'Regular methods get `this` from the call site (the object). Arrow functions capture `this` from the enclosing lexical scope — here the module/global scope — so `this.name` is undefined.',
    hint: 'Arrow functions do not have their own `this`.',
  },
  {
    id: 'js-this-bind-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'this',
    title: 'bind fixes this',
    code: `function greet() { return this.name; }
const a = { name: 'Zeus' };
const b = { name: 'Hera', greet };

console.log(greet());
console.log(b.greet.bind(a)());`,
    options: [
      '"Zeus", "Hera"',
      'undefined, "Zeus"',
      '"Zeus", "Zeus"',
      'undefined, undefined',
    ],
    correctAnswer: 'undefined, "Zeus"',
    explanation:
      'When called without an object `greet()` runs in non-strict global context where `this.name` is undefined. `.bind(a)` hard-wires `this` to object `a`, giving "Zeus".',
    hint: '`bind` returns a new function with `this` locked to the first argument.',
  },
  {
    id: 'js-equality-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'equality',
    title: '== vs === basics',
    code: `console.log(1 == '1');
console.log(1 === '1');
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);`,
    options: [
      'true,false,true,false,false',
      'true,true,true,true,false',
      'false,false,true,false,false',
      'true,false,false,false,false',
    ],
    correctAnswer: 'true,false,true,false,false',
    explanation:
      '`==` coerces types. 1 == "1" → true. `===` checks type too → false. `null == undefined` is a special JS rule (true). `null === undefined` is false (different types). NaN is never equal to itself.',
    hint: '== coerces; === does not. null==undefined is a special case.',
  },
  {
    id: 'js-equality-null-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'equality',
    title: 'null coalescing vs OR',
    code: `console.log(null ?? 'fallback');
console.log(0 ?? 'fallback');
console.log(null || 'fallback');
console.log(undefined ?? 'fallback');
console.log('' || 'fallback');`,
    options: [
      '"fallback",0,"fallback","fallback",""',
      '"fallback","fallback","fallback","fallback","fallback"',
      '"fallback",0,"fallback","fallback","fallback"',
      'null,0,null,undefined,""',
    ],
    correctAnswer: '"fallback",0,"fallback","fallback","fallback"',
    explanation:
      '`??` only triggers on null/undefined; 0 is not null/undefined so it passes through. `||` triggers on any falsy value — including 0 and "".',
    hint: '`??` checks null/undefined only. `||` checks all falsy values.',
  },
  {
    id: 'js-typeof-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'types',
    title: 'typeof surprises',
    code: `console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
console.log(typeof function(){});
console.log(typeof undeclaredVar);`,
    options: [
      '"null","array","object","function","undefined"',
      '"object","object","object","function","undefined"',
      '"object","array","object","function","ReferenceError"',
      '"null","array","object","function","ReferenceError"',
    ],
    correctAnswer: '"object","object","object","function","undefined"',
    explanation:
      '`typeof null` is "object" — a famous JS bug. Arrays are objects too. Functions get their own "function" type. Accessing an undeclared variable with typeof safely returns "undefined".',
    hint: '`typeof null` is a well-known JavaScript quirk.',
  },
  {
    id: 'js-eventloop-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'event-loop',
    title: 'sync, promise, setTimeout order',
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ['1,2,3,4', '1,4,3,2', '1,4,2,3', '1,3,4,2'],
    correctAnswer: '1,4,3,2',
    explanation:
      'Sync code runs first (1, 4). Microtasks (Promise) run before macrotasks (setTimeout), so 3 comes before 2.',
    hint: 'Microtasks (Promise) drain before macrotasks (setTimeout).',
  },
  {
    id: 'js-eventloop-2',
    language: 'javascript',
    difficulty: 'hard',
    category: 'event-loop',
    title: 'complex async order',
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve()
  .then(() => { console.log('C'); return Promise.resolve(); })
  .then(() => console.log('D'));
queueMicrotask(() => console.log('E'));
console.log('F');`,
    options: ['A,F,C,E,D,B', 'A,F,E,C,D,B', 'A,B,C,D,E,F', 'A,F,C,D,E,B'],
    correctAnswer: 'A,F,C,E,D,B',
    explanation:
      'Sync: A, F. Then microtask queue: first .then() → C, queueMicrotask → E, second .then() → D (queued after C resolves). Then macrotask: B.',
    hint: 'Each .then() schedules a new microtask; queueMicrotask runs in the same microtask batch.',
  },
  {
    id: 'js-promises-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'promises',
    title: 'async/await error handling',
    code: `async function fetchData() {
  throw new Error('Failed!');
}
async function main() {
  try {
    await fetchData();
  } catch (e) {
    console.log('Caught: ' + e.message);
  }
  console.log('Done');
}
main();`,
    options: [
      'Caught: Failed!, Done',
      'Error: Failed!',
      'Done',
      'Uncaught Error: Failed!',
    ],
    correctAnswer: 'Caught: Failed!, Done',
    explanation:
      'An `async` function that throws is equivalent to returning a rejected promise. `await` re-throws the rejection inside the try/catch, which is caught, and execution continues after the catch block.',
    hint: 'async functions convert thrown errors into rejected promises; await unwraps them.',
  },
  {
    id: 'js-arrays-sort-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'arrays',
    title: 'sort mutation',
    code: `const a = [3, 1, 2];
const b = a.sort();
console.log(a);
console.log(b);
console.log(a === b);`,
    options: [
      '[3,1,2],[1,2,3],false',
      '[1,2,3],[1,2,3],true',
      '[1,2,3],[1,2,3],false',
      '[3,1,2],[3,1,2],true',
    ],
    correctAnswer: '[1,2,3],[1,2,3],true',
    explanation:
      '`Array.prototype.sort` sorts the array **in place** and returns the same array reference. Both `a` and `b` point to the same object, so `a === b` is true.',
    hint: '.sort() mutates the original array and returns a reference to it.',
  },
  {
    id: 'js-arrays-map-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'arrays',
    title: 'map vs forEach return',
    code: `const nums = [1, 2, 3];
const mapped = nums.map(n => n * 2);
const forEached = nums.forEach(n => n * 2);
console.log(mapped);
console.log(forEached);`,
    options: [
      '[2,4,6],[2,4,6]',
      '[2,4,6],undefined',
      'undefined,[2,4,6]',
      '[2,4,6],null',
    ],
    correctAnswer: '[2,4,6],undefined',
    explanation:
      '`map` returns a new array. `forEach` always returns `undefined` — it is designed only for side effects.',
    hint: 'forEach always returns undefined.',
  },
  {
    id: 'js-new-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'this',
    title: 'new keyword',
    code: `function Person(name) {
  this.name = name;
}
const p1 = new Person('Thanos');
const p2 = Person('Zeus');
console.log(p1.name);
console.log(p2);`,
    options: [
      '"Thanos","Zeus"',
      '"Thanos",undefined',
      'undefined,undefined',
      '"Thanos","Thanos"',
    ],
    correctAnswer: '"Thanos",undefined',
    explanation:
      'When called with `new`, the constructor creates a new object and returns it implicitly. Without `new`, `Person` runs as a regular function — `this` is global/undefined in strict mode, and the function returns `undefined` because it has no return statement.',
    hint: 'Without `new`, constructor functions return undefined by default.',
  },
  {
    id: 'js-react-state-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'async',
    title: 'useState is async',
    code: `// React component
function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // What logs here?
  };
  return <button onClick={handleClick}>Count: {count}</button>;
}
// After one click:`,
    options: ['count=1, logs 1', 'count=1, logs 0', 'count=0, logs 0', 'count=0, logs 1'],
    correctAnswer: 'count=1, logs 0',
    explanation:
      'State updates in React are asynchronous. `setCount` schedules a re-render but does not immediately mutate `count`. The `console.log(count)` still sees the old value (0) from the current closure.',
    hint: 'State updates are batched and applied on the next render, not immediately.',
  },
  {
    id: 'js-prototype-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'closures',
    title: 'hasOwnProperty vs prototype',
    code: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name + ' speaks'; };
const dog = new Animal('Rex');

console.log(dog.speak());
console.log(dog.hasOwnProperty('speak'));
console.log(dog.hasOwnProperty('name'));`,
    options: [
      '"Rex speaks",true,true',
      '"Rex speaks",false,false',
      '"Rex speaks",false,true',
      'Error,false,true',
    ],
    correctAnswer: '"Rex speaks",false,true',
    explanation:
      '`speak` lives on the prototype, not on the instance, so `hasOwnProperty("speak")` is false. `name` was set directly on `dog` via `this.name = name`, so it is an own property.',
    hint: '`hasOwnProperty` only checks the object itself, not its prototype chain.',
  },
  {
    id: 'js-events-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'events',
    title: 'preventDefault',
    code: `document.querySelector('a').addEventListener('click', e => {
  e.preventDefault();
  console.log('clicked');
});`,
    options: [
      'Navigates to the link',
      'Stops browser default behaviour (navigation)',
      'Stops event bubbling',
      'Throws an error',
    ],
    correctAnswer: 'Stops browser default behaviour (navigation)',
    explanation:
      '`preventDefault()` cancels the default browser action for the event (in this case, following the link). It does NOT stop the event from bubbling — that requires `stopPropagation()`.',
    hint: 'preventDefault cancels the browser default, not bubbling.',
  },
  {
    id: 'js-events-2',
    language: 'javascript',
    difficulty: 'easy',
    category: 'events',
    title: 'event bubbling order',
    code: `// HTML: <div id="outer"><div id="inner"></div></div>
document.getElementById('outer').addEventListener('click', () => console.log('outer'));
document.getElementById('inner').addEventListener('click', () => console.log('inner'));
// User clicks on inner div`,
    options: ['"outer","inner"', '"inner","outer"', '"outer" only', '"inner" only'],
    correctAnswer: '"inner","outer"',
    explanation:
      'Click events bubble up from the target element outward. The inner element fires first, then the event bubbles to outer.',
    hint: 'Events bubble from the target element outwards by default.',
  },
  {
    id: 'js-events-3',
    language: 'javascript',
    difficulty: 'medium',
    category: 'events',
    title: 'stopPropagation',
    code: `document.getElementById('outer').addEventListener('click', () => console.log('outer'));
document.getElementById('inner').addEventListener('click', e => {
  e.stopPropagation();
  console.log('inner');
});
// User clicks inner div`,
    options: ['"inner","outer"', '"outer" only', '"inner" only', 'No output'],
    correctAnswer: '"inner" only',
    explanation:
      '`stopPropagation()` prevents the event from bubbling further up the DOM tree. Only the inner handler fires.',
    hint: 'stopPropagation prevents the event from bubbling to parent elements.',
  },

  // ── C# ────────────────────────────────────────────────────────────────────
  {
    id: 'cs-value-int-1',
    language: 'csharp',
    difficulty: 'easy',
    category: 'value-types',
    title: 'int is value type',
    code: `int a = 5;
int b = a;
b = 10;
Console.WriteLine(a);`,
    options: ['10', '5', '0', 'Error'],
    correctAnswer: '5',
    explanation:
      '`int` is a value type. Assigning `b = a` copies the value. Changing `b` has no effect on `a`.',
    hint: 'Value types are copied on assignment.',
  },
  {
    id: 'cs-reference-list-1',
    language: 'csharp',
    difficulty: 'easy',
    category: 'reference-types',
    title: 'List is reference type',
    code: `var a = new List<int> { 1, 2, 3 };
var b = a;
b.Add(4);
Console.WriteLine(a.Count);`,
    options: ['3', '4', '0', 'Error'],
    correctAnswer: '4',
    explanation:
      '`List<T>` is a reference type. Both `a` and `b` point to the same list object. Adding to `b` modifies the same object that `a` references.',
    hint: 'Reference types share the same object when assigned.',
  },
  {
    id: 'cs-string-immutable-1',
    language: 'csharp',
    difficulty: 'easy',
    category: 'strings',
    title: 'string immutability',
    code: `string a = "hello";
string b = a;
b = b.ToUpper();
Console.WriteLine(a);`,
    options: ['"HELLO"', '"hello"', 'null', 'Error'],
    correctAnswer: '"hello"',
    explanation:
      'Strings in C# are immutable reference types. `ToUpper()` returns a new string — it does not modify the original. `a` still holds "hello".',
    hint: 'C# strings are immutable — methods return new strings.',
  },
  {
    id: 'cs-finally-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'exceptions',
    title: 'try/catch/finally flow',
    code: `try {
    Console.WriteLine(1);
    throw new Exception();
    Console.WriteLine(2);
} catch {
    Console.WriteLine(3);
} finally {
    Console.WriteLine(4);
}
Console.WriteLine(5);`,
    options: ['1,2,3,4,5', '1,3,4,5', '1,3,5', '1,4,5'],
    correctAnswer: '1,3,4,5',
    explanation:
      '1 prints, then the exception skips line 2, catch prints 3, finally always prints 4, and execution continues with 5.',
    hint: 'finally always executes, and the line after throw is skipped.',
  },
  {
    id: 'cs-finally-return-1',
    language: 'csharp',
    difficulty: 'hard',
    category: 'exceptions',
    title: 'finally with return',
    code: `static string Test() {
    try { return "try"; }
    finally { Console.WriteLine("finally"); }
}
Console.WriteLine(Test());`,
    options: ['"try" then "finally"', '"finally" then "try"', '"try" only', '"finally" only'],
    correctAnswer: '"finally" then "try"',
    explanation:
      'The finally block always runs even when there is a return in the try block. "finally" prints first, then the method returns "try" which is printed by the outer Console.WriteLine.',
    hint: 'finally runs before the return value is actually handed back to the caller.',
  },
  {
    id: 'cs-async-order-1',
    language: 'csharp',
    difficulty: 'hard',
    category: 'async',
    title: 'async/await order',
    code: `async Task Main() {
    Console.Write("A");
    await Task.Run(() => Console.Write("X"));
    Console.Write("B");
    await Task.Run(() => Console.Write("Y"));
    Console.Write("C");
}`,
    options: ['A,X,B,Y,C', 'A,B,C,X,Y', 'X,Y,A,B,C', 'A,X,Y,B,C'],
    correctAnswer: 'A,X,B,Y,C',
    explanation:
      'Each `await` suspends until the task completes, then resumes. So the output is sequential: A → X (task 1) → B → Y (task 2) → C.',
    hint: 'await suspends and resumes linearly — the continuation runs after the awaited task finishes.',
  },
  {
    id: 'cs-deadlock-1',
    language: 'csharp',
    difficulty: 'hard',
    category: 'deadlocks',
    title: '.Result deadlock',
    code: `async Task<string> GetDataAsync() {
    await Task.Delay(100);
    return "data";
}
// In ASP.NET classic / WinForms / WPF:
var result = GetDataAsync().Result; // blocks sync`,
    options: [
      '"data" after 100ms',
      'Deadlock — hangs forever',
      'Throws InvalidOperationException',
      'Returns null',
    ],
    correctAnswer: 'Deadlock — hangs forever',
    explanation:
      'In synchronisation-context environments (ASP.NET classic, UI threads), `.Result` blocks the thread while the continuation needs that same thread to resume — causing a deadlock. Use `await` instead.',
    hint: 'Blocking on async code with .Result can deadlock when a SynchronizationContext is present.',
  },
  {
    id: 'cs-threading-lock-1',
    language: 'csharp',
    difficulty: 'hard',
    category: 'threading',
    title: 'two lock deadlock',
    code: `object lockA = new(), lockB = new();
Thread t1 = new(() => { lock(lockA) { lock(lockB) { Console.WriteLine("T1"); } } });
Thread t2 = new(() => { lock(lockB) { lock(lockA) { Console.WriteLine("T2"); } } });
t1.Start(); t2.Start();`,
    options: [
      '"T1" then "T2"',
      '"T2" then "T1"',
      'Neither prints — deadlock',
      'Error',
    ],
    correctAnswer: 'Neither prints — deadlock',
    explanation:
      't1 acquires lockA and waits for lockB. t2 acquires lockB and waits for lockA. Neither can proceed — classic deadlock.',
    hint: 'Two threads acquiring locks in opposite orders causes a classic deadlock.',
  },
  {
    id: 'cs-race-condition-1',
    language: 'csharp',
    difficulty: 'hard',
    category: 'threading',
    title: 'race condition',
    code: `int counter = 0;
var tasks = Enumerable.Range(0, 1000)
    .Select(_ => Task.Run(() => counter++));
await Task.WhenAll(tasks);
Console.WriteLine(counter);`,
    options: ['1000', 'Less than 1000', 'More than 1000', 'Error'],
    correctAnswer: 'Less than 1000',
    explanation:
      '`counter++` is not atomic — it is read-modify-write. Multiple threads can read the same value, increment, and write back, losing some updates. Use `Interlocked.Increment` to fix this.',
    hint: '++ is not thread-safe; concurrent reads and writes lose updates.',
  },
  {
    id: 'cs-linq-deferred-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'linq',
    title: 'LINQ deferred execution',
    code: `var numbers = new List<int> { 1, 2, 3 };
var query = numbers.Where(n => n > 1);
numbers.Add(4);
Console.WriteLine(query.Count());`,
    options: ['2', '3', '1', 'Error'],
    correctAnswer: '3',
    explanation:
      'LINQ queries use deferred execution — they run when enumerated (here, by `.Count()`), not when defined. By enumeration time, 4 has been added, so 2, 3, 4 all match `n > 1`, giving count = 3.',
    hint: 'LINQ is lazy — queries execute when you enumerate them, not when you define them.',
  },
  {
    id: 'cs-tasks-whenall-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'tasks',
    title: 'Task.WhenAll vs sequential',
    code: `// Task A takes 2s, Task B takes 1s
// Task.WhenAll(A, B) completes in:`,
    options: ['3 seconds (sequential)', '2 seconds (parallel)', '1 second', '0 seconds'],
    correctAnswer: '2 seconds (parallel)',
    explanation:
      '`Task.WhenAll` runs tasks concurrently. The total wait time is determined by the longest task — 2 seconds, not 3.',
    hint: 'WhenAll runs tasks in parallel; total time = max(individual times).',
  },
  {
    id: 'cs-task-thread-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'tasks',
    title: 'Task vs Thread',
    code: `// Which is preferred for async I/O-bound work?
// Thread: OS-level thread, expensive (~1MB stack)
// Task: lightweight, uses thread pool, supports await`,
    options: [
      'Thread — more control',
      'Task — lighter weight, supports await',
      'Both are identical',
      'Neither — use Parallel.For',
    ],
    correctAnswer: 'Task — lighter weight, supports await',
    explanation:
      'Tasks use the thread pool and integrate with async/await. Threads have a fixed ~1MB stack overhead and no built-in async composition. For I/O-bound work, Tasks are almost always the right choice.',
    hint: 'Tasks are abstractions over thread-pool threads and support async/await natively.',
  },

  // ── CSS ───────────────────────────────────────────────────────────────────
  {
    id: 'css-display-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'css-display',
    title: 'display:none vs visibility:hidden',
    code: `/* Element A */ .a { display: none; }
/* Element B */ .b { visibility: hidden; }`,
    options: [
      'Both hide the element and remove it from flow',
      'display:none removes from flow; visibility:hidden keeps space',
      'visibility:hidden removes from flow; display:none keeps space',
      'Both are identical in behaviour',
    ],
    correctAnswer: 'display:none removes from flow; visibility:hidden keeps space',
    explanation:
      '`display:none` removes the element entirely from the document flow — it takes up no space. `visibility:hidden` hides the element visually but it still occupies its original space in the layout.',
    hint: 'One removes the element from the flow, the other just makes it invisible.',
  },
  {
    id: 'css-position-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'css-positioning',
    title: 'absolute vs relative positioning',
    code: `.parent { position: relative; }
.child  { position: absolute; top: 10px; left: 10px; }`,
    options: [
      'Child is 10px from the viewport top-left',
      'Child is 10px from the nearest positioned ancestor (parent)',
      'Child is 10px from its normal position',
      'Child is removed from the document',
    ],
    correctAnswer: 'Child is 10px from the nearest positioned ancestor (parent)',
    explanation:
      '`position: absolute` positions the element relative to its nearest positioned (non-static) ancestor. Since `.parent` has `position: relative`, the child is 10px from the parent\'s top-left corner.',
    hint: 'absolute is relative to the nearest positioned ancestor.',
  },
  {
    id: 'css-flexbox-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'css-flexbox',
    title: 'flexbox vs grid when to use',
    code: `/* When should you use Flexbox vs CSS Grid? */`,
    options: [
      'Flexbox for 2D layouts; Grid for 1D (single axis)',
      'Grid for 2D layouts; Flexbox for 1D (single axis)',
      'They are identical — use either',
      'Flexbox for images; Grid for text',
    ],
    correctAnswer: 'Grid for 2D layouts; Flexbox for 1D (single axis)',
    explanation:
      'Flexbox is a one-dimensional layout system (row OR column). CSS Grid is two-dimensional (rows AND columns simultaneously). Use Flexbox for navbars, button groups, etc., and Grid for page-level or card-grid layouts.',
    hint: 'Flex = 1 axis, Grid = 2 axes.',
  },
  {
    id: 'css-specificity-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'css-positioning',
    title: 'CSS specificity — which rule wins?',
    code: `/* Which colour wins? */
p { color: blue; }           /* 0,0,1 */
.text { color: green; }      /* 0,1,0 */
#title { color: red; }       /* 1,0,0 */`,
    options: ['blue', 'green', 'red', 'Whichever comes last'],
    correctAnswer: 'red',
    explanation:
      'CSS specificity is calculated as (IDs, classes, elements). IDs (1,0,0) beat classes (0,1,0) which beat element selectors (0,0,1). So the `#title` rule wins and the colour is red.',
    hint: 'ID selectors have the highest specificity of regular selectors.',
  },
];
