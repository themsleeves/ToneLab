export type ListKey = "status" | "artist" | "guitar" | "tuning" | "pickup" | "cabinet";
export type Lists = Record<ListKey, string[]>;

export const LIST_LABELS: Record<ListKey, string> = {
  status: "Statut",
  artist: "Artiste",
  guitar: "Guitare",
  tuning: "Accordage",
  pickup: "Micro / Position",
  cabinet: "Cabinet",
};

// Valeurs reprises de l'ancien prototype (main.jsx) pour ne pas repartir de zéro.
export const defaultLists: Lists = {
  status: ["À tester","Prometteur","Validé","Rejeté"],
  artist: ["Foo Fighters","Queens of the Stone Age","Refused","Rage Against The Machine","Kyuss","Hermano","Deftones","Biffy Clyro","ACDC","The Darkness"],
  guitar: ["Gibson Les Paul Classic DC","Gretsch Gourley Broadkaster","Stratocaster \"The Strat\"","Autre"],
  tuning: ["Standard","Drop D","Drop C#","Drop C","Autre"],
  pickup: ["Chevalet","Manche","Middle","Autre"],
  cabinet: ["Marshall 4x12","Thiele Celestion 15\" 4 Ω","2x12 Closed V70","2x12 Open Back","Autre"],
};

const KEY = "tonelab-lists";
const LIST_ORDER: ListKey[] = ["status","artist","guitar","tuning","pickup","cabinet"];

export function mergeLists(partial?: Partial<Lists>): Lists {
  return { ...defaultLists, ...(partial || {}) };
}

export function loadLists(): Lists {
  try {
    const raw = localStorage.getItem(KEY);
    const saved = raw ? (JSON.parse(raw) as Partial<Lists>) : {};
    return mergeLists(saved);
  } catch {
    return mergeLists();
  }
}

export function saveLists(lists: Lists) {
  localStorage.setItem(KEY, JSON.stringify(lists));
}

// Génère le code source de `defaultLists` à partir des listes actuelles, pour mettre à jour la base de référence du dépôt.
export function defaultListsCode(lists: Lists): string {
  const body = LIST_ORDER.map(k => `  ${k}: ${JSON.stringify(lists[k])},`).join("\n");
  return `export const defaultLists: Lists = {\n${body}\n};\n`;
}

export function downloadListsCode(lists: Lists) {
  const blob = new Blob([defaultListsCode(lists)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "lists.defaults.ts"; a.click();
  URL.revokeObjectURL(url);
}
