import type { Project } from "../model";
import { referenceCovers } from "./covers";

// The two example workspaces in Demo R1, reduced to supported text formats.
// These are session fixtures, not persisted user documents.
export function makePreviewProjects(): Project[] {
  return [
    {
      id: "p_salma",
      title: "Le isole di Sàlma",
      category: "Romanzo di formazione",
      premise:
        "Un archivista torna su un’isola piccola durante una marea fuori stagione per riaprire un registro marittimo del 1968.",
      cover: referenceCovers[0] ?? null,
      folders: [
        { id: "f_ms", name: "Manoscritto", parentId: null },
        { id: "f_p1", name: "Prima parte", parentId: "f_ms" },
        { id: "f_notes", name: "Appunti e materiali", parentId: null },
      ],
      files: [
        {
          id: "doc_1",
          title: "Il porto sotto la pioggia",
          kind: "md",
          folderId: "f_p1",
          starred: true,
          body: "La pioggia arrivò prima del traghetto, sottile e ostinata come la sabbia quando cambia il vento da ovest. Dal molo nord di Sàlma si distinguevano appena le luci del Faro di Pietra Bianca, una lama pallida che tagliava la foschia ogni sette secondi.",
        },
        {
          id: "doc_2",
          title: "La scala del faro",
          kind: "md",
          folderId: "f_p1",
          starred: false,
          body: "",
        },
        {
          id: "doc_json",
          title: "cronologia-maree.json",
          kind: "json",
          folderId: "f_notes",
          starred: false,
          body: "{}",
        },
      ],
    },
    {
      id: "p_tesi",
      title: "Dinamica delle maree costiere",
      category: "Fisica e Matematica",
      premise:
        "Studio analitico e numerico dell’amplificazione armonica delle maree in stretti costieri poco profondi.",
      cover: referenceCovers[1] ?? null,
      folders: [
        { id: "f_tex", name: "Articolo", parentId: null },
        { id: "f_dat", name: "Dati e fonti", parentId: null },
        { id: "f_scripts", name: "Script e misure", parentId: "f_dat" },
      ],
      files: [
        {
          id: "doc_tex1",
          title: "main.tex",
          kind: "tex",
          folderId: "f_tex",
          starred: true,
          body: "\\section{Introduzione}\n",
        },
        {
          id: "doc_bib1",
          title: "riferimenti.bib",
          kind: "bib",
          folderId: "f_tex",
          starred: false,
          body: "",
        },
        {
          id: "doc_csv1",
          title: "misure_mareografo.csv",
          kind: "csv",
          folderId: "f_scripts",
          starred: false,
          body: "time,height\n",
        },
      ],
    },
  ];
}
