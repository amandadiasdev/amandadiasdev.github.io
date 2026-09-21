# amandadiasdev.github.io

Portfólio pessoal no formato de terminal interativo, publicado com GitHub Pages.

## Estrutura

| Arquivo          | Responsabilidade                                           |
| ---------------- | ---------------------------------------------------------- |
| `index.html`     | Estrutura da página                                        |
| `css/style.css`  | Aparência e temas (`green`, `amber`, `light`)              |
| `js/config.js`   | Conteúdo pessoal: textos, habilidades, links               |
| `js/terminal.js` | Tela do terminal: entrada, saída, histórico, autocompletar |
| `js/commands.js` | Comandos disponíveis                                       |
| `js/github.js`   | Consulta à API pública do GitHub, com cache de sessão      |
| `js/main.js`     | Ponto de entrada e animação de abertura                    |
| `js/banner.js`   | Cabeçalho em ASCII gerado com pyfiglet                     |
| `.nojekyll`      | Diz ao GitHub Pages para publicar os arquivos como estão   |

## Rodar localmente

Os arquivos usam módulos ES (`type="module"`), que o navegador só carrega via HTTP.
Abrir o `index.html` direto do disco não funciona. Use um servidor simples:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar

1. Crie um repositório público chamado `amandadiasdev.github.io`.
2. Envie estes arquivos para a branch `main`.
3. Em _Settings > Pages_, confirme que a fonte é a branch `main`, pasta `/ (root)`.
4. O site fica em `https://amandadiasdev.github.io` em poucos minutos.

## Personalizar

Edite apenas `js/config.js` para trocar textos, habilidades e links.
Para um comando novo, adicione uma entrada em `js/commands.js`.
