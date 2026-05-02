import type { CodingQuestion } from '@/types';

export const codingQuestions: CodingQuestion[] = [
  // ── JavaScript — Easy ─────────────────────────────────────────────────────
  {
    id: 'js-reverse-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'strings',
    title: 'Reverse a String',
    description: 'Write a function `reverseString(str)` that returns the string reversed.',
    examples: [
      { input: 'reverseString("hello")', output: '"olleh"' },
      { input: 'reverseString("abcd")', output: '"dcba"' },
    ],
    starterCode: `function reverseString(str) {
  // your code here
}

console.log(reverseString("hello"));
console.log(reverseString("abcd"));`,
    hints: [
      'Arrays have a .reverse() method.',
      'Convert string → array → reverse → join.',
    ],
    solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    explanation:
      'Split the string into an array of characters, reverse the array in place, then join back to a string.',
  },
  {
    id: 'js-palindrome-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'strings',
    title: 'Check Palindrome',
    description:
      'Write a function `isPalindrome(str)` that returns `true` if the string reads the same forwards and backwards (case-insensitive), `false` otherwise.',
    examples: [
      { input: 'isPalindrome("racecar")', output: 'true' },
      { input: 'isPalindrome("hello")', output: 'false' },
    ],
    starterCode: `function isPalindrome(str) {
  // your code here
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));  // false`,
    hints: [
      'Compare the string with its reverse.',
      'Normalise case first with .toLowerCase().',
    ],
    solution: `function isPalindrome(str) {
  const s = str.toLowerCase();
  return s === s.split('').reverse().join('');
}`,
    explanation: 'Normalise case, reverse, and compare with the original.',
  },
  {
    id: 'js-duplicates-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'arrays',
    title: 'Remove Duplicates',
    description:
      'Write a function `removeDuplicates(arr)` that returns a new array with all duplicate values removed.',
    examples: [
      { input: 'removeDuplicates([1,2,2,3,3,3])', output: '[1,2,3]' },
      { input: 'removeDuplicates(["a","b","a"])', output: '["a","b"]' },
    ],
    starterCode: `function removeDuplicates(arr) {
  // your code here
}

console.log(removeDuplicates([1,2,2,3,3,3]));
console.log(removeDuplicates(["a","b","a"]));`,
    hints: [
      'A Set only stores unique values.',
      'Spread a Set back into an array: [...new Set(arr)]',
    ],
    solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`,
    explanation: 'A Set automatically deduplicates; spreading it back produces a plain array.',
  },
  {
    id: 'js-sum-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'arrays',
    title: 'Sum Array',
    description:
      'Write a function `sumArray(arr)` that returns the sum of all numbers in the array.',
    examples: [
      { input: 'sumArray([1,2,3,4])', output: '10' },
      { input: 'sumArray([])', output: '0' },
    ],
    starterCode: `function sumArray(arr) {
  // your code here
}

console.log(sumArray([1,2,3,4])); // 10
console.log(sumArray([]));        // 0`,
    hints: ['Array.prototype.reduce is perfect here.', 'Start the accumulator at 0.'],
    solution: `function sumArray(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}`,
    explanation: 'reduce accumulates each element into a running total starting from 0.',
  },
  {
    id: 'js-fizzbuzz-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'arrays',
    title: 'FizzBuzz',
    description:
      'Write a function `fizzBuzz(n)` that prints numbers 1 to n. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz".',
    examples: [
      { input: 'fizzBuzz(5)', output: '1, 2, Fizz, 4, Buzz' },
      { input: 'fizzBuzz(15) last item', output: 'FizzBuzz' },
    ],
    starterCode: `function fizzBuzz(n) {
  // your code here
}

fizzBuzz(15);`,
    hints: ['Check divisibility by 15 first (both conditions).', 'Use the modulo operator %.'],
    solution: `function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) console.log('FizzBuzz');
    else if (i % 3 === 0) console.log('Fizz');
    else if (i % 5 === 0) console.log('Buzz');
    else console.log(i);
  }
}`,
    explanation: 'Check 15 first to avoid partial matches, then 3, then 5, then the number.',
  },

  // ── JavaScript — Medium ───────────────────────────────────────────────────
  {
    id: 'js-frequency-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'arrays',
    title: 'Most Frequent Element',
    description:
      'Write a function `mostFrequent(arr)` that returns the element that appears most often in the array. If there is a tie, return any of them.',
    examples: [
      { input: 'mostFrequent([1,2,2,3,3,3])', output: '3' },
      { input: 'mostFrequent(["a","b","a"])', output: '"a"' },
    ],
    starterCode: `function mostFrequent(arr) {
  // your code here
}

console.log(mostFrequent([1,2,2,3,3,3])); // 3
console.log(mostFrequent(["a","b","a"]));  // "a"`,
    hints: [
      'Build a frequency map (object or Map).',
      'Then find the key with the highest count.',
    ],
    solution: `function mostFrequent(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item] = (freq[item] ?? 0) + 1;
  }
  return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
}`,
    explanation:
      'Count occurrences in a map, then reduce over the keys to find the one with the highest count.',
  },
  {
    id: 'js-wordcount-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'strings',
    title: 'Word Count',
    description:
      'Write a function `wordCount(sentence)` that returns an object where each key is a word (lowercase) and the value is how many times it appears.',
    examples: [
      { input: 'wordCount("the cat sat on the mat")', output: '{ the:2, cat:1, sat:1, on:1, mat:1 }' },
    ],
    starterCode: `function wordCount(sentence) {
  // your code here
}

console.log(wordCount("the cat sat on the mat"));`,
    hints: ['Split on spaces.', 'Normalise to lowercase before counting.'],
    solution: `function wordCount(sentence) {
  return sentence.toLowerCase().split(' ').reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});
}`,
    explanation:
      'Lowercase, split by space, then reduce into a count object with nullish coalescing for the initial value.',
  },
  {
    id: 'js-intersection-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'arrays',
    title: 'Array Intersection',
    description:
      'Write a function `intersection(a, b)` that returns a new array containing only elements present in both arrays (no duplicates).',
    examples: [
      { input: 'intersection([1,2,3],[2,3,4])', output: '[2,3]' },
      { input: 'intersection([1,1,2],[2,2,3])', output: '[2]' },
    ],
    starterCode: `function intersection(a, b) {
  // your code here
}

console.log(intersection([1,2,3],[2,3,4])); // [2,3]
console.log(intersection([1,1,2],[2,2,3])); // [2]`,
    hints: ['Use a Set for O(1) lookup.', 'Filter array `a` by whether each element is in Set(b).'],
    solution: `function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a.filter(x => setB.has(x)))];
}`,
    explanation:
      'Convert b to a Set for fast lookup, filter a to elements in b, then deduplicate with another Set.',
  },
  {
    id: 'js-twosum-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'arrays',
    title: 'Two Sum',
    description:
      'Write a function `twoSum(nums, target)` that returns the indices of the two numbers that add up to `target`. Assume exactly one solution exists.',
    examples: [
      { input: 'twoSum([2,7,11,15], 9)', output: '[0,1]' },
      { input: 'twoSum([3,2,4], 6)', output: '[1,2]' },
    ],
    starterCode: `function twoSum(nums, target) {
  // your code here
}

console.log(twoSum([2,7,11,15], 9)); // [0,1]
console.log(twoSum([3,2,4], 6));     // [1,2]`,
    hints: [
      'A HashMap (Map) lets you look up the complement in O(1).',
      'For each num, check if (target - num) is already in the map.',
    ],
    solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    explanation:
      'Store each number and its index in a Map. For each number, check if its complement already exists — if so, return both indices.',
  },
  {
    id: 'js-groupby-1',
    language: 'javascript',
    difficulty: 'medium',
    category: 'arrays',
    title: 'Group By Property',
    description:
      'Write a function `groupBy(arr, key)` that groups an array of objects by the given key.',
    examples: [
      {
        input: 'groupBy([{lang:"js",v:1},{lang:"cs",v:2},{lang:"js",v:3}], "lang")',
        output: '{ js: [{lang:"js",v:1},{lang:"js",v:3}], cs: [{lang:"cs",v:2}] }',
      },
    ],
    starterCode: `function groupBy(arr, key) {
  // your code here
}

const data = [
  { lang: 'js', v: 1 },
  { lang: 'cs', v: 2 },
  { lang: 'js', v: 3 },
];
console.log(JSON.stringify(groupBy(data, 'lang'), null, 2));`,
    hints: [
      'Use reduce to build up an object.',
      'For each item, initialise the group array if it does not exist yet.',
    ],
    solution: `function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}`,
    explanation:
      'reduce accumulates items into a plain object keyed by the group value, initialising each group as an empty array on first encounter.',
  },

  // ── JavaScript — Hard ─────────────────────────────────────────────────────
  {
    id: 'js-balanced-1',
    language: 'javascript',
    difficulty: 'hard',
    category: 'arrays',
    title: 'Balanced Brackets',
    description:
      'Write a function `isBalanced(str)` that returns `true` if every opening bracket has a matching closing bracket in the correct order.',
    examples: [
      { input: 'isBalanced("({[]})")', output: 'true' },
      { input: 'isBalanced("([)]")', output: 'false' },
      { input: 'isBalanced("{[")', output: 'false' },
    ],
    starterCode: `function isBalanced(str) {
  // your code here
}

console.log(isBalanced("({[]})"));  // true
console.log(isBalanced("([)]"));    // false
console.log(isBalanced("{["));      // false`,
    hints: [
      'Use a stack (array).',
      'Push opening brackets; when you see a closing bracket, check the top of the stack.',
    ],
    solution: `function isBalanced(str) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of str) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (')]}'.includes(ch)) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
    explanation:
      'Push openers onto a stack. For each closer, pop and verify the popped opener matches. Return true only if the stack is empty at the end.',
  },
  {
    id: 'js-debounce-1',
    language: 'javascript',
    difficulty: 'hard',
    category: 'async',
    title: 'Implement Debounce',
    description:
      'Implement a `debounce(fn, delay)` function that returns a debounced version of `fn` — it only executes after `delay` milliseconds have passed since the last invocation.',
    examples: [
      {
        input: 'const d = debounce(console.log, 300); d("a"); d("b"); // wait 300ms',
        output: '"b" (only last call fires)',
      },
    ],
    starterCode: `function debounce(fn, delay) {
  // your code here
}

const log = debounce(msg => console.log(msg), 300);
log("a");
log("b");
log("c");
// After 300ms: "c" should print`,
    hints: [
      'Store a timer ID in a closure.',
      'Cancel the previous timer with clearTimeout before setting a new one.',
    ],
    solution: `function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    explanation:
      'Each call resets the timer. Only the last call in a burst waits out the full delay and executes the function.',
  },

  // ── C# — Easy ─────────────────────────────────────────────────────────────
  {
    id: 'cs-fizzbuzz-1',
    language: 'csharp',
    difficulty: 'easy',
    category: 'arrays',
    title: 'FizzBuzz in C#',
    description:
      'Print numbers 1 to 20. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz".',
    examples: [{ input: 'n = 15', output: '...FizzBuzz' }],
    starterCode: `using System;

class Program {
    static void Main() {
        for (int i = 1; i <= 20; i++) {
            // your code here
        }
    }
}`,
    hints: ['Check i % 15 == 0 first.', 'Use Console.WriteLine to print.'],
    solution: `using System;

class Program {
    static void Main() {
        for (int i = 1; i <= 20; i++) {
            if (i % 15 == 0) Console.WriteLine("FizzBuzz");
            else if (i % 3 == 0) Console.WriteLine("Fizz");
            else if (i % 5 == 0) Console.WriteLine("Buzz");
            else Console.WriteLine(i);
        }
    }
}`,
    explanation: 'Same logic as JS FizzBuzz but in C# syntax with Console.WriteLine.',
  },
  {
    id: 'cs-evens-1',
    language: 'csharp',
    difficulty: 'easy',
    category: 'linq',
    title: 'Filter Even Numbers',
    description:
      'Given a list of integers, use LINQ to return only the even numbers.',
    examples: [
      { input: '[1,2,3,4,5,6]', output: '[2,4,6]' },
    ],
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
        // your code here — filter to evens and print
    }
}`,
    hints: ['Use .Where(n => n % 2 == 0)', 'String.Join(",", ...) to print the result.'],
    solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
        var evens = numbers.Where(n => n % 2 == 0).ToList();
        Console.WriteLine(string.Join(", ", evens));
    }
}`,
    explanation:
      'LINQ .Where filters elements that satisfy the predicate. .ToList() materialises the query.',
  },

  // ── C# — Medium ───────────────────────────────────────────────────────────
  {
    id: 'cs-reverse-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'strings',
    title: 'Reverse a String in C#',
    description: 'Write a method that reverses a string without using built-in Reverse().',
    examples: [
      { input: '"hello"', output: '"olleh"' },
    ],
    starterCode: `using System;

class Program {
    static string ReverseString(string s) {
        // your code here
        return "";
    }

    static void Main() {
        Console.WriteLine(ReverseString("hello"));
        Console.WriteLine(ReverseString("abcd"));
    }
}`,
    hints: [
      'Convert to a char array.',
      'Use two pointers (start and end) to swap characters.',
    ],
    solution: `using System;

class Program {
    static string ReverseString(string s) {
        char[] chars = s.ToCharArray();
        int left = 0, right = chars.Length - 1;
        while (left < right) {
            (chars[left], chars[right]) = (chars[right], chars[left]);
            left++; right--;
        }
        return new string(chars);
    }

    static void Main() {
        Console.WriteLine(ReverseString("hello")); // olleh
        Console.WriteLine(ReverseString("abcd"));  // dcba
    }
}`,
    explanation:
      'Convert to a char array and use the two-pointer technique to swap characters from both ends inward.',
  },
  {
    id: 'cs-frequency-1',
    language: 'csharp',
    difficulty: 'medium',
    category: 'linq',
    title: 'Word Frequency in C#',
    description:
      'Given a sentence, return a Dictionary<string,int> of each word and its frequency, then print the top 3 words by count.',
    examples: [
      {
        input: '"the cat sat on the mat the cat"',
        output: 'the:3, cat:2, sat:1',
      },
    ],
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        string sentence = "the cat sat on the mat the cat";
        // your code here
    }
}`,
    hints: [
      'Split by " " to get words.',
      'Use GroupBy with LINQ or a Dictionary to count.',
      'OrderByDescending then Take(3).',
    ],
    solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        string sentence = "the cat sat on the mat the cat";
        var words = sentence.Split(' ');
        var freq = words
            .GroupBy(w => w)
            .OrderByDescending(g => g.Count())
            .Take(3)
            .Select(g => $"{g.Key}:{g.Count()}");
        Console.WriteLine(string.Join(", ", freq));
    }
}`,
    explanation:
      'GroupBy groups identical words, Count gives frequency, OrderByDescending sorts, Take(3) limits results.',
  },

  // ── CSS — Easy ────────────────────────────────────────────────────────────
  {
    id: 'css-center-1',
    language: 'javascript',
    difficulty: 'easy',
    category: 'css-flexbox',
    title: 'Centre a div with flexbox',
    description:
      'Write the CSS to perfectly centre a child div (both horizontally and vertically) inside a parent div using flexbox.',
    examples: [
      {
        input: '<div class="parent"><div class="child">Centred!</div></div>',
        output: 'Child is centred in parent',
      },
    ],
    starterCode: `/* Write CSS to centre .child inside .parent */

/* JavaScript trick to verify: */
const css = \`
.parent {
  /* your flexbox CSS here */
  width: 300px;
  height: 300px;
  background: lightblue;
}
.child {
  width: 100px;
  height: 100px;
  background: coral;
}
\`;
console.log("Target CSS for .parent:");
console.log("display: flex;");
console.log("/* your centering properties here */");`,
    hints: [
      'display: flex on the parent.',
      'justify-content and align-items both set to center.',
    ],
    solution: `.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    explanation:
      '`display: flex` enables flexbox. `justify-content: center` centres along the main axis (horizontal by default). `align-items: center` centres along the cross axis (vertical).',
  },
];
