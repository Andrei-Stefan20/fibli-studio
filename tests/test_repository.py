import subprocess
import sys
import tomllib
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class RepositoryTests(unittest.TestCase):
    def test_commit_titles(self):
        cases = {
            "feat(ui): add toolbar": True,
            "fix(storage)!: change schema": True,
            "docs: update setup": True,
            "update": False,
            "feat: ": False,
            "feat: " + "x" * 100: False,
            "feat: x\nfix: y": False,
        }
        for title, valid in cases.items():
            with self.subTest(title=title):
                result = subprocess.run(
                    [sys.executable, str(ROOT / "scripts/check-commit.py"), "--title", title],
                    capture_output=True,
                )
                self.assertEqual(result.returncode == 0, valid)

    def test_agent_profiles(self):
        codex = ROOT / ".codex/agents"
        claude = ROOT / ".claude/agents"
        copilot = ROOT / ".github/agents"
        names = {path.stem for path in codex.glob("*.toml")}
        self.assertTrue(names)
        self.assertEqual(names, {path.stem for path in claude.glob("*.md")})
        self.assertEqual(names, {path.name.removesuffix(".agent.md") for path in copilot.glob("*.agent.md")})
        for path in codex.glob("*.toml"):
            data = tomllib.loads(path.read_text(encoding="utf-8"))
            self.assertEqual(data["name"], path.stem)
            self.assertIn("AGENTS.md", data["developer_instructions"])

    def test_skill_references(self):
        skills = ROOT / ".agents/skills"
        adapters = ROOT / ".claude/skills"
        names = {path.parent.name for path in skills.glob("*/SKILL.md")}
        self.assertTrue(names)
        self.assertEqual(names, {path.parent.name for path in adapters.glob("*/SKILL.md")})
        for name in names:
            source = skills / name / "SKILL.md"
            adapter = adapters / name / "SKILL.md"
            self.assertIn(f"name: {name}", source.read_text(encoding="utf-8"))
            self.assertIn(source.relative_to(ROOT).as_posix(), adapter.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
