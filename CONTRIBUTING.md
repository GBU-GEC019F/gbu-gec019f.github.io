# Publish your work

## Group project listing

1. Check your assigned group, G01–G15. Keep each distinct project in a separate repository, for example `g01-p01-project-name`. Use `main` for stable work and `dev` for development.
2. Finish the project README and assignment-specific evidence in the project repository. Explain setup, contributions, AI use, and your own verification as required by the assignment.
3. Open the commit you are submitting on GitHub and copy its full URL ending in `/commit/<40-character SHA>`. A later update requires a new reviewed listing commit.
4. Fork this **website** repository. In your fork, copy `templates/project.json` to `data/projects/<your-project-id>.json` and replace all template values. The project repository can be a different repository from this website fork. The demo URL is optional; leave it empty if there is no live demo.
5. Commit the JSON record to a branch such as `listing/g01-p01`, then open a pull request from your fork to this website's `main`. Include the project repository, exact submitted commit, and any demo link in the PR description.
6. Check the build result, address instructor/TA review, and wait for a maintainer to merge. After deployment, verify your public listing.

Do not submit source code from the project into this website repository. An empty `demo` is valid; do not invent a live URL. Links must use HTTPS. Project submission links must point to the same project repository and a full commit SHA.

## Individual portfolio

1. In your own GitHub account, create `<username>.github.io` and publish your personal website using GitHub Pages. Keep individual project repositories under your own account.
2. Fork this website repository and copy `templates/student.json` to `data/students/<username>.json`.
3. Use your chosen public display name, GitHub profile, and personal website URL. Open a PR to `main` for review. Only share information you intend to make public; omit student numbers and private contact details.

## Maintainer review

Check group/identity, functioning source/demo links, the exact commit, public-sharing suitability, and assignment-specific evidence outside this catalog. Merge only reviewed changes. Automated format validation does not perform grading. Invite TAs with appropriate repository roles separately; the course website never grants access to private instructor repositories.

To change or remove a listing, open a PR editing or removing its JSON record. If GitHub is inaccessible, contact the instructor/TA for an approved submission alternative.
