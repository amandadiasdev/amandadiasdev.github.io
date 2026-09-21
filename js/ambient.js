// Decorative side panels. Purely visual: short snippets about Linux, agents,
// software engineering and architecture that fade in and out over time.
// Hidden from screen readers and from narrow screens (see CSS).

const SNIPPETS = [
  {
    title: "linux",
    body: [
      "$ ls -la ~/projects",
      '$ grep -rn "TODO" src/',
      "$ git log --oneline -5",
      "$ chmod +x deploy.sh",
      "$ ps aux | grep python",
      "$ tail -f app.log",
    ],
  },
  {
    title: "agent loop",
    body: [
      "while not done:",
      "    thought = model.think(context)",
      "    action  = choose_tool(thought)",
      "    result  = run(action)",
      "    context.append(result)",
    ],
  },
  {
    title: "SOLID",
    body: [
      "S  single responsibility",
      "O  open / closed",
      "L  liskov substitution",
      "I  interface segregation",
      "D  dependency inversion",
    ],
  },
  {
    title: "layers",
    body: [
      "┌─────────────┐",
      "│     UI      │",
      "├─────────────┤",
      "│  use cases  │",
      "├─────────────┤",
      "│  entities   │",
      "└─────────────┘",
    ],
  },
  {
    title: "client / server",
    body: [
      "browser ──HTTP──▶ api",
      "            ◀── JSON",
      "api ──SQL──▶ database",
    ],
  },
  {
    title: "AVL rotation",
    body: [
      "    z              y",
      "   / \\            / \\",
      "  y   T4   ─▶    x   z",
      " / \\            / \\ / \\",
      "x   T3        T1 T2 T3 T4",
    ],
  },
  {
    title: "critical section",
    body: [
      "semaphore.acquire()",
      "try:",
      "    balance = read()",
      "    write(balance + amount)",
      "finally:",
      "    semaphore.release()",
    ],
  },
  {
    title: "test pyramid",
    body: [
      "      /  e2e  \\",
      "     / integr. \\",
      "    /   unit    \\",
      "   ───────────────",
    ],
  },
  {
    title: "git",
    body: [
      "main ──●──●──●──────●",
      "         \\        /",
      "feature   ●──●──●",
    ],
  },
  {
    title: "complexity",
    body: [
      "O(1)      hash lookup",
      "O(log n)  balanced tree",
      "O(n)      linear scan",
      "O(n log n) merge sort",
    ],
  },
  {
    title: "kent beck",
    body: ["make it work,", "make it right,", "make it fast."],
  },
  {
    title: "cat",
    body: [" /\\_/\\", "( o.o )", " > ^ <"],
  },
  {
    title: "sleeping cat",
    body: [
      "  |\\      _,,,---,,_",
      "  /,`.-'`'    -.  ;-;;,_",
      " |,4-  ) )-,_. ,\\ (  `'-'",
      "'---''(_/--'  `-'\\_)",
    ],
  },
  {
    title: "books",
    body: [
      " ______ ______ ______",
      "|      |      |      |",
      "| SICP | GoF  | DDIA |",
      "|______|______|______|",
    ],
  },
  {
    title: "reading list",
    body: [
      "[x] Clean Code",
      "[x] The Pragmatic Programmer",
      "[ ] Designing Data-Intensive Apps",
      "[ ] Structure and Interpretation",
    ],
  },
  {
    title: "computer",
    body: [
      " ┌──────────────┐",
      " │ > hello_     │",
      " │              │",
      " └──────┬───────┘",
      "   ┌────┴────┐",
      "   └─────────┘",
    ],
  },
  {
    title: "binary",
    body: [
      "01001000 01101001  H i",
      "01000001 01101101  A m",
      "01000001 01101110  A n",
      "01100100 01100001  d a",
    ],
  },
  {
    title: "von neumann",
    body: [
      "┌───────┐   ┌────────┐",
      "│  CPU  │◀─▶│ memory │",
      "└───┬───┘   └────────┘",
      "    ▼",
      "┌───────┐",
      "│  I/O  │",
      "└───────┘",
    ],
  },
  {
    title: "sequence",
    body: [
      "user      api      db",
      " │ ──req──▶│        │",
      " │         │──sql──▶│",
      " │         │◀──rows─│",
      " │◀──json──│        │",
    ],
  },
  {
    title: "state machine",
    body: [
      "  ┌──────┐  start  ┌─────────┐",
      "  │ idle │ ──────▶ │ running │",
      "  └──────┘         └────┬────┘",
      "      ▲      done       │",
      "      └─────────────────┘",
    ],
  },
  {
    title: "robot",
    body: ["   ___", "  [o_o]", " /[___]\\", "  |   |", "  d   b"],
  },
  {
    title: "agent",
    body: [
      "  ╭─────╮",
      "  │ ◉ ◉ │  beep.",
      "  │  ▽  │",
      "  ╰──┬──╯",
      "  ┌──┴──┐",
      "  │ ▪ ▪ │",
      "  └─────┘",
    ],
  },
  {
    title: "open book",
    body: [
      "  ______   ______",
      " /      \\ /      \\",
      "|  ~~~   |   ~~~  |",
      "|  ~~~   |   ~~~  |",
      "|________|________|",
    ],
  },
  {
    title: "bookshelf",
    body: [
      "▐█▌▐█▌▐██▌▐█▌▐███▌▐█▌",
      "▐█▌▐█▌▐██▌▐█▌▐███▌▐█▌",
      "▐█▌▐█▌▐██▌▐█▌▐███▌▐█▌",
      "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
    ],
  },
  {
    title: "coffee",
    body: ["    ) )", "   ( (", "  .-----.", "  |     |]", "  '-----'"],
  },
  {
    title: "laptop",
    body: [
      " ┌──────────┐",
      " │ $ _      │",
      " │          │",
      " └──────────┘",
      "/____________\\",
    ],
  },
  {
    title: "neural net",
    body: [
      "  ○     ○",
      "    ╲ ╱   ╲",
      "  ○ ─ ○ ─ ○ ─▶ y",
      "    ╱ ╲   ╱",
      "  ○     ○",
    ],
  },
  {
    title: "intrusion detection",
    body: [
      "sensor ─▶ features ─▶ model",
      "                       │",
      "            normal ◀───┴───▶ attack",
      "                             │",
      "                    explain(why?)",
    ],
  },
  {
    title: "confusion matrix",
    body: [
      "           pred+  pred-",
      "actual+  [  TP  |  FN  ]",
      "actual-  [  FP  |  TN  ]",
    ],
  },
  {
    title: "cat on keyboard",
    body: [
      "   /\\_/\\",
      "  ( -.- )  zzz",
      " ┌┴─────┴──────┐",
      " │ ▪▪▪▪▪▪▪▪▪▪▪ │",
      " └─────────────┘",
    ],
  },
  {
    title: "stack",
    body: [
      "push ─▶ ┌───┐",
      "        │ 3 │ ◀─ top",
      "        ├───┤",
      "        │ 2 │",
      "        ├───┤",
      "        │ 1 │",
      "        └───┘",
    ],
  },
  {
    title: "linked list",
    body: ["[1|●]─▶[2|●]─▶[3|●]─▶ null"],
  },
  {
    title: "regex",
    body: ["^[a-z0-9._%+-]+@", "  [a-z0-9.-]+\\.[a-z]{2,}$"],
  },
  {
    title: "vim",
    body: [":wq", ":q!", "  (how do I exit?)"],
  },
  {
    title: "clean code",
    body: [
      "- names that reveal intent",
      "- small functions, one job",
      "- no comments explaining bad code",
      "- leave it cleaner than you found it",
    ],
  },
  {
    title: "design patterns",
    body: [
      "creational  Factory · Builder",
      "structural  Adapter · Decorator",
      "behavioral  Strategy · Observer",
    ],
  },
  {
    title: "observer",
    body: [
      "subject ──notify──▶ observer A",
      "   │                observer B",
      "   └──────notify──▶ observer C",
    ],
  },
  {
    title: "strategy",
    body: [
      "Context ──uses──▶ «Strategy»",
      "                    ▲    ▲",
      "              QuickSort MergeSort",
    ],
  },
  {
    title: "refactor",
    body: [
      "red   ─▶ write a failing test",
      "green ─▶ make it pass",
      "blue  ─▶ refactor, keep it green",
    ],
  },
  {
    title: "DRY · KISS · YAGNI",
    body: [
      "don't repeat yourself",
      "keep it simple",
      "you aren't gonna need it",
    ],
  },
  {
    title: "clean architecture",
    body: [
      "   ┌──────────────────┐",
      "   │ frameworks / UI  │",
      "   │ ┌──────────────┐ │",
      "   │ │  use cases   │ │",
      "   │ │ ┌──────────┐ │ │",
      "   │ │ │ entities │ │ │",
      "   │ │ └──────────┘ │ │",
      "   │ └──────────────┘ │",
      "   └──────────────────┘",
    ],
  },
  {
    title: "code smell",
    body: [
      "long method      ─▶ extract",
      "magic number     ─▶ name it",
      "duplicated code  ─▶ reuse",
    ],
  },
  {
    title: "http",
    body: [
      "GET  /users/42   200 OK",
      "POST /users      201 Created",
      "GET  /nope       404 Not Found",
    ],
  },
];

const SLOTS_PER_SIDE = 4;
const ROTATE_EVERY_MS = 9000;
const FADE_MS = 1600;

function pickUnused(used) {
  const free = SNIPPETS.filter((s) => !used.has(s));
  return free[Math.floor(Math.random() * free.length)];
}

function render(snippet) {
  const block = document.createElement("pre");
  block.className = "ambient-block";
  block.textContent = `# ${snippet.title}\n${snippet.body.join("\n")}`;
  return block;
}

export function startAmbient(sides) {
  const used = new Set();
  const slots = [];

  sides.forEach((side) => {
    for (let i = 0; i < SLOTS_PER_SIDE; i++) {
      const snippet = pickUnused(used);
      used.add(snippet);
      const block = render(snippet);
      side.append(block);
      slots.push({ side, block, snippet });
    }
  });

  setInterval(() => rotateOne(slots, used), ROTATE_EVERY_MS);
}

function rotateOne(slots, used) {
  const slot = slots[Math.floor(Math.random() * slots.length)];
  const next = pickUnused(used);
  if (!next) return;

  slot.block.classList.add("fading");
  setTimeout(() => {
    used.delete(slot.snippet);
    used.add(next);
    const fresh = render(next);
    slot.block.replaceWith(fresh);
    slot.block = fresh;
    slot.snippet = next;
  }, FADE_MS);
}
