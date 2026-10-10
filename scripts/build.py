"""Validate reviewed public listings and build a dependency-free Pages artifact."""
import json
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
GROUPS = [f"G{i:02d}" for i in range(1, 16)]


def text(record, key, maximum=500):
    value = record.get(key)
    if not isinstance(value, str) or not value.strip() or len(value) > maximum:
        raise ValueError(f"{key} must be nonempty text of at most {maximum} characters")
    return value


def url(record, key, required=False, github=False):
    value = record.get(key, "")
    if not value and not required:
        return
    if not isinstance(value, str):
        raise ValueError(f"{key} must be a URL")
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError(f"{key} must be an HTTPS URL without credentials")
    if github and parsed.hostname != "github.com":
        raise ValueError(f"{key} must link to github.com")


def validate(record, kind):
    if not isinstance(record, dict):
        raise ValueError("record must be a JSON object")
    allowed = {"id", "group", "title", "summary", "repository", "demo", "submission", "tags"} if kind == "projects" else {"id", "name", "github", "website"}
    if set(record) - allowed:
        raise ValueError(f"Unexpected fields: {sorted(set(record) - allowed)}")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", text(record, "id", 80)):
        raise ValueError("id must be a lowercase URL-safe identifier")
    if kind == "projects":
        if record.get("group") not in GROUPS:
            raise ValueError("group must be G01 through G15")
        text(record, "title", 100)
        text(record, "summary", 500)
        url(record, "repository", required=True, github=True)
        url(record, "demo")
        url(record, "submission", required=True, github=True)
        submission = urlparse(record["submission"])
        repository = urlparse(record["repository"])
        if not re.fullmatch(re.escape(repository.path.rstrip("/")) + r"/commit/[0-9a-f]{40}", submission.path):
            raise ValueError("submission must link to a full 40-character commit in the project repository")
        tags = record.get("tags", [])
        if not isinstance(tags, list) or len(tags) > 5 or any(not isinstance(t, str) or not t.strip() or len(t) > 32 for t in tags):
            raise ValueError("tags must contain at most five short strings")
    else:
        text(record, "name", 100)
        url(record, "github", required=True, github=True)
        url(record, "website", required=True)
    return record


def catalog():
    data = {"groups": GROUPS, "projects": [], "students": []}
    for kind in ("projects", "students"):
        seen = set()
        for path in sorted((ROOT / "data" / kind).glob("*.json")):
            record = validate(json.loads(path.read_text(encoding="utf-8")), kind)
            if record["id"] in seen:
                raise ValueError(f"Duplicate {kind} id: {record['id']}")
            seen.add(record["id"])
            data[kind].append(record)
    return data


def build():
    data = catalog()
    destination = ROOT / "dist"
    destination.mkdir(exist_ok=True)
    # Explicit allowlist: course materials and development documents never enter Pages.
    for filename in ("index.html", "styles.css", "app.js"):
        shutil.copyfile(ROOT / filename, destination / filename)
    (destination / "assets/fonts").mkdir(parents=True, exist_ok=True)
    for filename in ("Newsreader.ttf", "OFL.txt"):
        shutil.copyfile(ROOT / "assets/fonts" / filename, destination / "assets/fonts" / filename)
    (destination / "data").mkdir(exist_ok=True)
    (destination / "data/catalog.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    (destination / "templates").mkdir(exist_ok=True)
    for filename in ("project.json", "student.json"):
        shutil.copyfile(ROOT / "templates" / filename, destination / "templates" / filename)
    (destination / ".nojekyll").touch()
    print(f"Built {len(data['projects'])} projects, {len(data['students'])} portfolios, {len(GROUPS)} groups")


if __name__ == "__main__":
    build()
