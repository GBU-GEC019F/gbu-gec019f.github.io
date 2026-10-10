# GBU GEC019F

Building Agentic AI Products with Vibe Coding · Great Bay University

Public course hub: https://gbu-gec019f.github.io/

The site lists work from 15 groups (G01–G15) and links to student-owned portfolios. Each group project keeps its own source repository. A website listing is published after instructor/TA review; it is not a grade or a substitute for assignment-specific evidence requirements.

## Update the website

See [CONTRIBUTING.md](CONTRIBUTING.md). Add project JSON records to `data/projects/` and portfolio JSON records to `data/students/`. Never place student IDs, grades, credentials, private reports, teacher notes, or the instructor's private project source here.

`main` is published. Use `dev` for integration work and `feature/<short-name>` for changes. Open pull requests into `main` for publication review. Students should fork this website repository when contributing a listing.

## Local preview

Requires Python 3. Run from this repository:

```sh
python scripts/build.py
python -m http.server 8000 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Stop with Ctrl+C. The site has no frontend packages, account system, analytics, or remote font dependencies.

## Publication

Repository Settings → Pages → Source: **GitHub Actions**. The included workflow validates listings on PRs and pushes to `main`/`dev`, and publishes `main` only. The builder copies an explicit public-file allowlist into `dist`; development documents and course files are excluded.

Instructor/TAs should review all public text and outbound links before merging. GitHub checks validate format, not correctness, authorship, link availability, or grades. GitHub access on the campus network has not been verified; contact the teaching team for an approved alternative if access is blocked.
