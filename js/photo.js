// Photo card pinned to the top-right corner of the terminal during boot.
// `mountPhoto` starts loading right away and returns a handle; call
// `hide()` when the intro text is done. A missing file is silently ignored.

const FADE_MS = 1200;

export function mountPhoto(container, { src, alt, caption }) {
  let card = null;
  let hidden = false;

  const img = new Image();
  img.alt = alt;
  img.onload = () => {
    if (hidden) return;
    card = buildCard(img, caption);
    container.append(card);
  };
  img.src = src;

  function hide() {
    hidden = true;
    if (!card) return;
    card.classList.add("leaving");
    setTimeout(() => card.remove(), FADE_MS);
  }

  return { hide };
}

function buildCard(img, caption) {
  const card = document.createElement("figure");
  card.className = "photo-card";

  const frame = document.createElement("div");
  frame.className = "photo-frame";
  frame.append(img);

  const label = document.createElement("figcaption");
  label.textContent = caption;

  card.append(frame, label);
  return card;
}
