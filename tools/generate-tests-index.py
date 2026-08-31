#!/usr/bin/env python3

from pathlib import Path
import re


# Racine du dépôt
ROOT = Path(__file__).resolve().parent.parent

# Répertoire contenant les exports de tests
TESTS_DIR = ROOT / "01-brunetti" / "03-profils-sonores" / "tests"

# Index généré
INDEX_FILE = TESTS_DIR / "index.md"


def humanize_name(name: str) -> str:
    """
    Transforme un nom de dossier ou de fichier en libellé lisible.
    """
    name = re.sub(r"[-_]+", " ", name)
    name = re.sub(r"\s+", " ", name)
    return name.strip().title()


def get_title(markdown_file: Path) -> str:
    """
    Récupère le premier titre Markdown (# ...) du fichier.

    Si aucun titre n'est trouvé, utilise le nom du fichier.
    """
    try:
        content = markdown_file.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = markdown_file.read_text(encoding="utf-8-sig")

    for line in content.splitlines():
        match = re.match(r"^#\s+(.+?)\s*$", line)

        if match:
            return match.group(1).strip()

    return humanize_name(markdown_file.stem)


def build_index() -> str:
    """
    Construit le contenu complet de tests/index.md.
    """

    if not TESTS_DIR.exists():
        print(f"Répertoire introuvable : {TESTS_DIR}")
        return ""

    artist_sections = {}

    # Recherche récursive de tous les fichiers Markdown.
    for markdown_file in TESTS_DIR.rglob("*.md"):

        # L'index lui-même ne doit jamais être référencé.
        if markdown_file.resolve() == INDEX_FILE.resolve():
            continue

        relative_path = markdown_file.relative_to(TESTS_DIR)

        # L'artiste correspond au premier dossier sous tests/.
        if len(relative_path.parts) > 1:
            artist_key = relative_path.parts[0]
        else:
            # Les fichiers placés directement dans tests/
            # sont regroupés dans une section générique.
            artist_key = "_autres"

        artist_sections.setdefault(artist_key, []).append(
            (markdown_file, relative_path)
        )

    lines = [
        "# Tests ToneLab",
        "",
        "> Index généré automatiquement à partir des exports Markdown "
        "présents dans ce répertoire.",
        "",
        "Les fichiers de test sont générés depuis l'application "
        "**ToneLab Profiles** et conservés tels quels.",
        "",
    ]

    if not artist_sections:
        lines.extend(
            [
                "Aucun test n'est actuellement disponible.",
                "",
            ]
        )
        return "\n".join(lines)

    # Tri des artistes
    for artist_key in sorted(artist_sections, key=str.casefold):

        if artist_key == "_autres":
            title = "Autres tests"
        else:
            title = humanize_name(artist_key)

        lines.extend(
            [
                f"## {title}",
                "",
            ]
        )

        # Tri des tests par chemin puis nom
        tests = sorted(
            artist_sections[artist_key],
            key=lambda item: str(item[1]).casefold()
        )

        for markdown_file, relative_path in tests:

            title = get_title(markdown_file)

            # Chemin Markdown relatif depuis tests/index.md
            link = relative_path.as_posix()

            lines.append(f"- [{title}]({link})")

        lines.append("")

    lines.extend(
        [
            "---",
            "",
            "## Navigation",
            "",
            "[← Retour au chapitre 03 — Construction des profils sonores](../index.md)",
            "",
            "[↑ Retour au chapitre Brunetti XL R-EVO II](../index.md)",
            "",
        ]
    )

    return "\n".join(lines)


def main() -> None:
    content = build_index()

    if not content:
        return

    # Création du répertoire si nécessaire.
    TESTS_DIR.mkdir(parents=True, exist_ok=True)

    # Lecture de l'ancien contenu pour éviter un commit inutile.
    old_content = ""

    if INDEX_FILE.exists():
        old_content = INDEX_FILE.read_text(encoding="utf-8")

    if old_content == content:
        print("tests/index.md est déjà à jour.")
        return

    INDEX_FILE.write_text(content, encoding="utf-8")

    print(f"Index mis à jour : {INDEX_FILE}")


if __name__ == "__main__":
    main()