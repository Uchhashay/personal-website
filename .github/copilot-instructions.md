# Copilot instructions for this repo

Purpose
- Provide concise, repo-specific guidance so an AI coding agent can be productive immediately.

Big picture
- This is a small static personal website: primary files at the repo root include `index.html`, `blog-post.html`, `blog-post-china-silver.html`, and `style.css`. Images are in the `images/` folder. There is no backend or build toolchain.
- Data flow: content is static HTML; pages reference `style.css` and images by relative paths. Changes are served directly by the web server or file system.

Key files and patterns (examples)
- `index.html`: site entry; contains links to blog post HTML files. When adding a post, update this file to add navigation links.
- `blog-post.html`: canonical blog-post template; copy it to create new posts and update title/body.
- `blog-post-china-silver.html`: an example post — inspect its head/body structure when making new posts.
- `style.css`: single stylesheet for the site. Prefer adding styles here rather than inline styles.
- `images/`: store referenced images; use relative paths like `images/photo.jpg`.

Conventions and repo-specific patterns
- Static-only: No JS frameworks, no package.json, no build step. Treat HTML files as source rather than generated artifacts.
- Post creation: duplicate `blog-post.html`, rename to `blog-post-<slug>.html`, update `<title>` and content, then add a link in `index.html`.
- Paths: use relative paths from the file's location (all files are at repo root), e.g., `<link rel="stylesheet" href="style.css">`.
- Keep markup simple: the project uses basic HTML semantics and a single CSS file — follow existing class names and structure when editing.

Developer workflows (how to run/test)
- Local quick check (served from repo root):

```bash
python -m http.server 8000
# then open http://localhost:8000 in a browser
```

- Alternatively, open `index.html` directly in a browser for a quick preview.
- No automated tests or CI present; changes are verified by manual browser checks.

Integration points & external dependencies
- There are no internal services. External dependencies are only those referenced in HTML (e.g., external fonts or images) — verify external URLs if a page appears broken.

What to watch for when editing
- Broken relative paths (images and CSS) are the most common issue. When moving files, update links accordingly.
- When adding new blog pages, verify `index.html` navigation and canonical metadata in the `<head>`.

Example tasks (explicit examples)
- Add a new post:
  1. Copy `blog-post.html` → `blog-post-my-topic.html`.
  2. Update `<title>` and body content.
  3. Add a link to the new file in `index.html`.
  4. Run `python -m http.server 8000` and verify in-browser.

If something is unclear
- Ask the repo owner for intended deploy target (GitHub Pages, S3, etc.) if you need deployment steps.

Contact
- If additional conventions exist (deploy, CI), include them in this file so future agents can follow them.
