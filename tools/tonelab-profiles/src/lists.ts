export type ListKey = "status" | "artist" | "guitar" | "tuning" | "pickup" | "channel" | "cabinet";
export type Lists = Record<ListKey, string[]>;

export const LIST_LABELS: Record<ListKey, string> = {
  status: "Statut",
  artist: "Artiste",
  guitar: "Guitare",
  tuning: "Accordage",
  pickup: "Micro / Position",
  channel: "Canal",
  cabinet: "Cabinet",
};

// Valeurs reprises de l'ancien prototype (main.jsx) pour ne pas repartir de zéro.
export const defaultLists: Lists = {
  status: ["À tester", "Prometteur", "Validé", "Rejeté"],
  artist: ["Foo Fighters", "Queens of the Stone Age", "Refused", "Rage Against The Machine", "Tool", "Kyuss", "Hermano", "Deftones", "Biffy Clyro", "Autre"],
  guitar: ["Gibson Les Paul Classic DC", "Gretsch John Gourley Broadkaster", "Autre"],
  tuning: ["Standard", "Drop D", "Drop C#", "Drop C", "Autre"],
  pickup: ["Chevalet", "Manche", "Intermédiaire", "Autre"],
  channel: ["Clean", "Boost", "XLead"],
  cabinet: ["Marshall 4x12", 'Thiele + Celestion 15" 4 Ω', "Autre"],
};

const KEY = "tonelab-lists";

export function loadLists(): Lists {
  try {
    const raw = localStorage.getItem(KEY);
    const saved = raw ? (JSON.parse(raw) as Partial<Lists>) : {};
    return { ...defaultLists, ...saved };
  } catch {
    return { ...defaultLists };
  }
}

export function saveLists(lists: Lists) {
  localStorage.setItem(KEY, JSON.stringify(lists));
}
