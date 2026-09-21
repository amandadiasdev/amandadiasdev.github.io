// A classe Terminal cuida só da "tela": mostrar linhas, ler o que a pessoa
// digita, lembrar o histórico e completar com Tab. Ela não sabe o que os
// comandos fazem; isso fica em commands.js.

export class Terminal {
  constructor({ output, form, input, quickButtons }) {
    this.output = output;
    this.form = form;
    this.input = input;
    this.history = [];
    this.historyIndex = 0;
    this.commands = new Map();
    this.busy = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit(input.value);
    });
    input.addEventListener("keydown", (event) => this.onKeyDown(event));
    document.addEventListener("click", () => this.focusUnlessSelecting());
    quickButtons.forEach((button) =>
      button.addEventListener("click", () => this.submit(button.dataset.cmd)),
    );
  }

  register(name, command) {
    this.commands.set(name, command);
    (command.aliases ?? []).forEach((alias) =>
      this.commands.set(alias, command),
    );
  }

  focusUnlessSelecting() {
    if (window.getSelection()?.toString()) return;
    this.input.focus();
  }

  // ----- saída -------------------------------------------------------------

  print(text = "", className = "") {
    const line = document.createElement("p");
    line.className = `line ${className}`.trim();
    line.textContent = text;
    this.output.append(line);
    this.scrollToEnd();
    return line;
  }

  printHtml(html, className = "") {
    const line = document.createElement("p");
    line.className = `line ${className}`.trim();
    line.innerHTML = html;
    this.output.append(line);
    this.scrollToEnd();
    return line;
  }

  printLines(lines, className = "") {
    lines.forEach((text) => this.print(text, className));
  }

  // Digita um texto letra por letra. Devolve uma Promise que termina quando
  // a última letra aparece, para quem chamou poder esperar.
  async type(text, { delay = 18, className = "" } = {}) {
    const line = this.print("", `${className} typing`);
    for (const char of text) {
      line.textContent += char;
      await sleep(delay);
    }
    line.classList.remove("typing");
    return line;
  }

  clear() {
    this.output.replaceChildren();
  }

  scrollToEnd() {
    window.scrollTo({ top: document.body.scrollHeight });
  }

  // ----- entrada -----------------------------------------------------------

  async submit(raw) {
    const text = raw.trim();
    this.input.value = "";
    if (!text || this.busy) return;

    this.print(text, "line-cmd");
    this.history.push(text);
    this.historyIndex = this.history.length;

    const [name, ...args] = text.split(/\s+/);
    const command = this.commands.get(name.toLowerCase());

    if (!command) {
      this.print(`command not found: ${name}. Try "help".`, "line-error");
      return;
    }

    this.busy = true;
    try {
      await command.run(args, this);
    } catch (error) {
      this.print(`error: ${error.message}`, "line-error");
    } finally {
      this.busy = false;
      this.input.focus();
    }
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.submit(this.input.value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.recall(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.recall(1);
    } else if (event.key === "Tab") {
      event.preventDefault();
      this.autocomplete();
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      this.clear();
    }
  }

  recall(step) {
    const next = this.historyIndex + step;
    if (next < 0 || next > this.history.length) return;
    this.historyIndex = next;
    this.input.value = this.history[next] ?? "";
  }

  autocomplete() {
    const partial = this.input.value.trim().toLowerCase();
    if (!partial) return;
    const matches = [...new Set(this.commands.keys())].filter((name) =>
      name.startsWith(partial),
    );
    if (matches.length === 1) {
      this.input.value = matches[0] + " ";
    } else if (matches.length > 1) {
      this.print(matches.join("   "), "line-dim");
    }
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
