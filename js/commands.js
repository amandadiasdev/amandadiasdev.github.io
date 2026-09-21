// Each command is a small object: description, aliases and a `run` function.
// Adding a new command means adding one entry here.

import { config } from "./config.js";
import { getProfile, getRepos } from "./github.js";
import { BANNER } from "./banner.js";

const THEMES = ["green", "amber", "light"];
const PROMPT_USER = "amanda";

function link(url, label = url) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function tags(items) {
  return items
    .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
    .join("");
}

function repoUrl(name) {
  return `https://github.com/${config.githubUser}/${name}`;
}

export const commands = {
  help: {
    description: "list available commands",
    aliases: ["?"],
    run(_, term) {
      term.print("Available commands:", "line-accent");
      Object.entries(commands)
        .filter(([, cmd]) => !cmd.hidden)
        .forEach(([name, cmd]) =>
          term.print(`  ${name.padEnd(12)} ${cmd.description}`),
        );
      term.print("");
      term.print("Keyboard shortcuts:", "line-accent");
      term.print(`  ${"Ctrl+L".padEnd(12)} clear the screen`);
      term.print(`  ${"Tab".padEnd(12)} autocomplete a command`);
      term.print(`  ${"Up / Down".padEnd(12)} browse command history`);
      term.print(`  ${"Enter".padEnd(12)} run the command`);
    },
  },

  about: {
    description: "who I am",
    aliases: ["whoami"],
    run(_, term) {
      term.printLines(config.about);
    },
  },

  projects: {
    description: "hand-picked projects with details",
    aliases: ["featured", "work"],
    run(_, term) {
      config.featured.forEach((project) => {
        term.printHtml(
          `${link(repoUrl(project.repo), project.title)}`,
          "line-accent",
        );
        term.print(`  ${project.summary}`);
        term.printHtml(`  ${tags(project.stack)}`, "line-tags");
      });
    },
  },

  repos: {
    description: "all public repositories, live from GitHub",
    aliases: ["ls", "github-repos"],
    async run(_, term) {
      const loading = term.print("fetching from GitHub...", "line-dim");
      const repos = await getRepos(config.githubUser, config.hiddenRepos);
      loading.remove();

      if (repos.length === 0) {
        term.print("no public repositories found.", "line-dim");
        return;
      }
      repos.forEach((repo) => {
        const lang = repo.language ? ` [${repo.language}]` : "";
        term.printHtml(`${link(repo.url, repo.name)}${lang}`);
        term.print(`    ${repo.description ?? "no description"}`, "line-dim");
      });
      term.print("");
      term.print(
        'use "repo <name>" for details, or "projects" for the highlights.',
        "line-dim",
      );
    },
  },

  repo: {
    description: "details of one repository: repo <name>",
    async run(args, term) {
      const [name] = args;
      if (!name) {
        term.print("usage: repo <name>", "line-error");
        return;
      }
      const repos = await getRepos(config.githubUser, config.hiddenRepos);
      const repo = repos.find(
        (r) => r.name.toLowerCase() === name.toLowerCase(),
      );
      if (!repo) {
        term.print(
          `repository "${name}" not found. Try "repos".`,
          "line-error",
        );
        return;
      }
      term.print(repo.name, "line-accent");
      term.print(`  description: ${repo.description ?? "no description"}`);
      term.print(`  language:    ${repo.language ?? "not set"}`);
      term.print(`  stars:       ${repo.stars}`);
      term.print(`  last push:   ${formatDate(repo.updatedAt)}`);
      term.printHtml(`  link:        ${link(repo.url)}`);
    },
  },

  research: {
    description: "what I'm researching",
    run(_, term) {
      term.printLines(config.research);
    },
  },

  education: {
    description: "where I study",
    aliases: ["edu", "university"],
    run(_, term) {
      term.printLines(config.education);
    },
  },

  skills: {
    description: "languages, concepts and tools",
    run(_, term) {
      Object.entries(config.skills).forEach(([group, items]) => {
        term.print(`${group}:`, "line-accent");
        term.print(`  ${items.join(" · ")}`);
      });
    },
  },

  contact: {
    description: "where to find me",
    run(_, term) {
      Object.entries(config.links).forEach(([label, url]) => {
        term.printHtml(`  ${label.padEnd(10)} ${link(url)}`);
      });
    },
  },

  github: {
    description: "my GitHub profile summary",
    async run(_, term) {
      const profile = await getProfile(config.githubUser);
      term.print(`${profile.name} (@${profile.login})`, "line-accent");
      term.print(`  ${profile.bio ?? ""}`);
      term.print(`  location:     ${profile.location ?? "not set"}`);
      term.print(`  public repos: ${profile.public_repos}`);
      term.print(`  followers:    ${profile.followers}`);
      term.print(`  since:        ${formatDate(profile.created_at)}`);
    },
  },

  theme: {
    description: `change colors: theme <${THEMES.join("|")}>`,
    run(args, term) {
      const [choice] = args;
      if (!THEMES.includes(choice)) {
        term.print(`usage: theme <${THEMES.join("|")}>`, "line-error");
        return;
      }
      document.documentElement.dataset.theme = choice;
      localStorage.setItem("theme", choice);
      term.print(`theme set to ${choice}.`, "line-dim");
    },
  },

  banner: {
    description: "show the header again",
    run(_, term) {
      term.print(BANNER, "banner");
    },
  },

  clear: {
    description: "clear the screen",
    aliases: ["cls"],
    run(_, term) {
      term.clear();
    },
  },

  echo: {
    description: "print what you typed",
    run(args, term) {
      term.print(args.join(" "));
    },
  },

  date: {
    description: "current date and time",
    run(_, term) {
      term.print(new Date().toLocaleString("en-US"));
    },
  },

  sudo: {
    hidden: true,
    run(_, term) {
      term.print(
        `${PROMPT_USER} is not in the sudoers file. This incident will be reported.`,
        "line-error",
      );
    },
  },

  cd: {
    hidden: true,
    run(_, term) {
      term.print("you are already home. ~", "line-dim");
    },
  },

  exit: {
    hidden: true,
    aliases: ["quit"],
    run(_, term) {
      term.print(
        "you can't exit a website like that. Thanks for visiting!",
        "line-dim",
      );
    },
  },
};
