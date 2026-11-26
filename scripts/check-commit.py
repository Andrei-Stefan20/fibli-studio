import argparse
import re
from pathlib import Path

PATTERN = re.compile(r"^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9./_-]*\))?!?: \S.*$")
parser = argparse.ArgumentParser()
group = parser.add_mutually_exclusive_group(required=True)
group.add_argument("--title")
group.add_argument("--file", type=Path)
args = parser.parse_args()
lines = args.file.read_text(encoding="utf-8").splitlines() if args.file else [args.title]
title = next((line for line in lines if line.strip() and not line.startswith("#")), "")
if len(title) > 100 or not PATTERN.fullmatch(title):
    raise SystemExit("Use Conventional Commits: type(scope): imperative description (max 100 characters)")
print("Commit title OK")
