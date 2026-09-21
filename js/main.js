// Ponto de entrada: monta o terminal, registra os comandos e roda a abertura.

import { Terminal, sleep } from "./terminal.js";
import { commands } from "./commands.js";
import { BANNER } from "./banner.js";
import { config } from "./config.js";
import { startAmbient } from "./ambient.js";
import { mountPhoto } from "./photo.js";

const term = new Terminal({
  output: document.getElementById("output"),
  form: document.getElementById("prompt-form"),
  input: document.getElementById("cmd"),
  quickButtons: document.querySelectorAll(".quick button"),
});

Object.entries(commands).forEach(([name, command]) =>
  term.register(name, command),
);

restoreTheme();
startAmbient(document.querySelectorAll(".side"));
boot();

function restoreTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;
}

async function boot() {
  term.input.disabled = true;
  const photo = mountPhoto(document.getElementById("screen"), config.photo);
  term.print(BANNER, "banner");
  await sleep(300);
  await term.type(`Welcome! My name is ${config.name}.`, {
    className: "line-hello",
    delay: 40,
  });
  await sleep(250);
  await term.type(`${config.role} at the ${config.university}.`, {
    className: "line-dim",
  });
  await term.type(`Based in ${config.location}.`, { className: "line-dim" });
  await sleep(400);
  term.print("");
  await term.type('Type "help" or click a command below to explore.');
  await sleep(1500);
  photo.hide();
  term.input.disabled = false;
  term.input.focus();
}
