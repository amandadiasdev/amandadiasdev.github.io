// Fala com a API pública do GitHub. Sem chave: o limite é 60 pedidos por hora
// por endereço IP, então guardamos o resultado no navegador por 10 minutos.

const API = "https://api.github.com";
const CACHE_TTL_MS = 10 * 60 * 1000;

async function fetchJson(url) {
  const cached = readCache(url);
  if (cached) return cached;

  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status} for ${url}`);
  }
  const data = await response.json();
  writeCache(url, data);
  return data;
}

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    return Date.now() - savedAt < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Sem espaço ou modo privado: seguimos sem cache.
  }
}

export function getProfile(user) {
  return fetchJson(`${API}/users/${user}`);
}

export async function getRepos(user, hidden = []) {
  const repos = await fetchJson(
    `${API}/users/${user}/repos?sort=updated&per_page=100`,
  );
  return repos
    .filter((repo) => !repo.fork && !hidden.includes(repo.name))
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url,
      updatedAt: repo.pushed_at,
    }));
}
