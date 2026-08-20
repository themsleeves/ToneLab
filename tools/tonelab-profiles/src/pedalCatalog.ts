import type {Pedal, PedalParam, PedalTemplate} from "./types";

const KEY = "tonelab-pedal-catalog";
const newId = () => `pedal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const knob = (name: string, value = ""): PedalParam => ({ name, kind: "knob", value });
const sel = (name: string, options: string[]): PedalParam => ({ name, kind: "switch", value: options[0], options });

// Modèles repris de specs constructeur (Ibanez, Dunlop/MXR, Mooer, Fender) — gérables ensuite depuis le catalogue.
export const defaultPedalCatalog: PedalTemplate[] = [
  { id: "tube-screamer", brand: "Ibanez", model: "Tube Screamer (TS9 / TS808)", params: [knob("Drive"), knob("Tone"), knob("Level")] },
  { id: "mxr-6-band-eq", brand: "MXR", model: "M109S Six Band EQ", params: [knob("100 Hz"), knob("200 Hz"), knob("400 Hz"), knob("800 Hz"), knob("1.6 kHz"), knob("3.2 kHz")] },
  { id: "mooer-graphic-g", brand: "Mooer", model: "Graphic G", params: [knob("100 Hz"), knob("250 Hz"), knob("630 Hz"), knob("1.6 kHz"), knob("4 kHz")] },
  {
    "id": "fender-the-pelt",
    "brand": "Fender",
    "model": "The Pelt Fuzz",
    "params": [
      {
        "name": "Fuzz",
        "kind": "knob",
        "value": ""
      },
      {
        "name": "Level",
        "kind": "knob",
        "value": ""
      },
      {
        "name": "Tone",
        "kind": "knob",
        "value": ""
      },
      {
        "name": "Bloom",
        "kind": "knob",
        "value": ""
      },
      {
        "name": "Mid",
        "kind": "switch",
        "value": "Cut",
        "options": [
          "Cut",
          "Flat",
          "Boost"
        ]
      },
      {
        "name": "Thick",
        "kind": "switch",
        "value": "OFF",
        "options": [
          "OFF",
          "ON"
        ]
      }
    ]
  },
];

export function loadPedalCatalog(): PedalTemplate[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PedalTemplate[]) : defaultPedalCatalog;
  } catch {
    return defaultPedalCatalog;
  }
}

export function savePedalCatalog(catalog: PedalTemplate[]) {
  localStorage.setItem(KEY, JSON.stringify(catalog));
}

export function mergeCatalog(catalog?: PedalTemplate[]): PedalTemplate[] {
  return Array.isArray(catalog) && catalog.length ? catalog : defaultPedalCatalog;
}

// Génère le code source de `defaultPedalCatalog` à partir du catalogue actuel, pour mettre à jour la base de référence du dépôt.
export function defaultPedalCatalogCode(catalog: PedalTemplate[]): string {
  return `export const defaultPedalCatalog: PedalTemplate[] = ${JSON.stringify(catalog, null, 2)};\n`;
}

export function downloadPedalCatalogCode(catalog: PedalTemplate[]) {
  const blob = new Blob([defaultPedalCatalogCode(catalog)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "pedalCatalog.defaults.ts"; a.click();
  URL.revokeObjectURL(url);
}

export function instantiatePedal(tpl: PedalTemplate): Pedal {
  return { id: newId(), name: `${tpl.brand} ${tpl.model}`, enabled: "OFF", notes: "", params: tpl.params.map(p => ({ ...p })), templateId: tpl.id };
}

// Réaligne les params d'une pédale déjà ajoutée sur son modèle de catalogue, en conservant les valeurs encore valides.
export function resyncPedalFromCatalog(pedal: Pedal, catalog: PedalTemplate[]): Pedal {
  const tpl = catalog.find(t => t.id === pedal.templateId);
  if (!tpl) return pedal;
  const params = tpl.params.map(tp => {
    const existing = pedal.params.find(p => p.name.trim().toLowerCase() === tp.name.trim().toLowerCase());
    if (!existing) return { ...tp };
    if (tp.kind === "switch") return { ...tp, value: (tp.options || []).includes(existing.value) ? existing.value : tp.value };
    return { ...tp, value: existing.value };
  });
  return { ...pedal, params };
}

// Signature structurelle (nom/type/positions, hors valeur) pour détecter si un catalogue a évolué depuis l'ajout de la pédale.
const paramSignature = (params: PedalParam[]) => params.map(p => `${p.name.trim().toLowerCase()}|${p.kind}|${(p.options || []).join(",")}`).join(";");

export function pedalNeedsResync(pedal: Pedal, catalog: PedalTemplate[]): boolean {
  const tpl = catalog.find(t => t.id === pedal.templateId);
  return !!tpl && paramSignature(tpl.params) !== paramSignature(pedal.params);
}

export function newPedal(): Pedal {
  return { id: newId(), name: "Nouvelle pédale", enabled: "OFF", notes: "", params: [knob("Réglage", "0")] };
}

export function newTemplate(): PedalTemplate {
  return { id: `tpl-${Date.now()}`, brand: "", model: "", params: [] };
}

export function defaultPedals(): Pedal[] {
  return ["tube-screamer", "mxr-6-band-eq", "mooer-graphic-g"].map(id => instantiatePedal(defaultPedalCatalog.find(t => t.id === id)!));
}
