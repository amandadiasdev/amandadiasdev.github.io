// Everything "about you" lives here, separated from the terminal logic.
// To update the portfolio, edit this file and nothing else.
// Lines marked TODO are placeholders waiting for your real text.

export const config = {
  githubUser: "amandadiasdev",
  name: "Amanda Dias",
  role: "Software Engineering student",
  university: "Federal University of Pampa (Unipampa)",
  location: "Alegrete, Rio Grande do Sul, Brazil",

  // Shown for a few seconds at startup. Put the file in assets/.
  photo: {
    src: "assets/photo.jpg",
    alt: "Amanda Dias smiling at her desk",
    caption: "photo.jpg",
  },

  about: [
    "Hi! I'm Amanda, a Software Engineering student at the Federal University",
    "of Pampa (Unipampa), in Alegrete, southern Brazil.",
    "",
    "I like understanding how things work under the hood: data structures,",
    "concurrency, object-oriented design and clean, testable code.",
    "",
    'This site is a (nearly) real terminal. Type "help" to see what it can do.',
  ],

  education: [
    "B.Sc. in Software Engineering",
    "  Federal University of Pampa (Unipampa), Alegrete campus",
    "  TODO: add start year and expected graduation",
  ],

  research: [
    "Undergraduate research fellow (FAPERGS PROBIC scholarship, 2026)",
    "  Project: XAIID - Intelligent and Explainable Strategies for",
    "  Intrusion Detection in Cyber-Physical Systems",
    "  Advisor: Prof. Silvio Ereno Quincozes, Unipampa",
    "",
    "What it is about:",
    "  Cyber-physical systems (power grids, industrial plants, vehicles)",
    "  mix software with the physical world, so an intrusion can cause",
    "  real damage. The project uses machine learning to detect attacks",
    "  and Explainable AI (XAI) so humans can understand *why* a sample",
    "  was flagged, not just that it was.",
    "",
    "What I work on:",
    "  - literature review on intrusion detection, feature selection",
    "    and hyperparameter optimization for cyber-physical systems",
    "  - collecting, exploring and preprocessing intrusion datasets",
    "  - training and evaluating detection models (accuracy, precision,",
    "    recall, F1-score, confusion matrix)",
    "  - applying XAI techniques to find which features drive detection",
    "  - keeping experiments reproducible: code, data and results",
    "",
    "Keywords: cybersecurity · intrusion detection · machine learning · XAI",
  ],

  // Hand-picked projects, in the order you want them shown.
  // `repo` must match the GitHub repository name exactly.
  featured: [
    {
      repo: "py-pip-man",
      title: "PyPipMan",
      summary:
        "Python dependency analysis tool. Parses pyproject.toml, requirements.txt " +
        "and lock files, walks the source code with the AST, and reports ghost, " +
        "zombie, missing, unused and outdated dependencies (checked against PyPI). " +
        "Ships a Tkinter dashboard, a Click CLI and an arrow-key TUI.",
      stack: ["Python", "AST", "Click", "Tkinter", "rich"],
    },
    {
      repo: "balanced-search-trees",
      title: "Augmented AVL Tree",
      summary:
        "AVL tree with parent links and per-node metadata (height, size, subtree " +
        "max) supporting range-maximum queries. Validated on three levels: property " +
        "tests against a sorted list, a structural assert_valid() check, and trace " +
        "comparison against an oracle. Includes a benchmark and a workload runner.",
      stack: ["Python", "Data structures", "Testing", "Benchmarking"],
    },
    {
      repo: "simulador-bancario-threads",
      title: "Bank Account Race Condition Lab",
      summary:
        "Several ATM threads operate on one shared balance. Without mutual exclusion " +
        "writes overwrite each other; with a Semaphore(1) the result is correct. " +
        "Includes a thread-safe colored log, an auditor that detects lost updates " +
        "from the trace, and measured results comparing correctness and speed.",
      stack: ["Python", "Threads", "Semaphores", "Concurrency"],
    },
    {
      repo: "TrabalhoPOO",
      title: "The Bureaucrat (OOP assignment)",
      summary:
        "Java simulation of a university clerk sorting documents into processes " +
        "under seven business rules. Focus on class hierarchies, equals/hashCode " +
        "and decision logic under constraints.",
      stack: ["Java", "OOP", "Class design"],
    },
  ],

  // List only what you actually use. Easy to extend later.
  skills: {
    Languages: ["Python", "Java", "JavaScript"],
    Concepts: [
      "Data structures",
      "Concurrency",
      "OOP",
      "Testing",
      "Machine learning",
      "Cybersecurity",
    ],
    Tools: ["Git", "GitHub", "Linux"],
  },

  links: {
    GitHub: "https://github.com/amandadiasdev",
    // LinkedIn: "https://www.linkedin.com/in/your-handle",
    // Email: "mailto:you@example.com",
  },

  // Repositories that should not appear in `projects`.
  hiddenRepos: ["amandadiasdev.github.io", "eusouamandadias"],
};
