import type {Pedal, PedalParam, PedalTemplate} from "./types";

const KEY = "tonelab-pedal-catalog";
let seq = 0;
const newId = () => `pedal-${Date.now()}-${(seq++).toString(36)}`;

const knob = (name: string, value = ""): PedalParam => ({ name, kind: "knob", value });
const sel = (name: string, options: string[]): PedalParam => ({ name, kind: "switch", value: options[0], options });
// Bande d'EQ graphique (ex. MXR M109S, Mooer Graphic G) : curseur bipolaire -18 dB / +18 dB, 0 = plat.
const eqBand = (name: string): PedalParam => ({ name, kind: "slider", value: "0", min: -18, max: 18, step: 1 });

// Modèles repris de specs constructeur (Ibanez, Dunlop/MXR, Mooer, Fender) — gérables ensuite depuis le catalogue.
export const defaultPedalCatalog: PedalTemplate[] = [
  {"id":"tube-screamer","brand":"Ibanez","model":"Tube Screamer (TS9 / TS808)","params":[{"name":"Drive","kind":"knob","value":""},{"name":"Tone","kind":"knob","value":""},{"name":"Level","kind":"knob","value":""}]},
  {"id":"mxr-6-band-eq","brand":"MXR","model":"M109S Six Band EQ","params":[{"name":"100 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"200 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"400 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"800 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"1.6 kHz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"3.2 kHz","kind":"slider","value":"0","min":-18,"max":18,"step":1}]},
  {"id":"mooer-graphic-g","brand":"Mooer","model":"Graphic G","params":[{"name":"100 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"250 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"630 Hz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"1.6 kHz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"4 kHz","kind":"slider","value":"0","min":-18,"max":18,"step":1},{"name":"Level","kind":"knob","value":"-0.5","min":-5,"max":5,"step":0.5}]},
  {"id":"fender-the-pelt","brand":"Fender","model":"The Pelt Fuzz","params":[{"name":"Fuzz","kind":"knob","value":"0","min":0,"max":10,"step":0.5},{"name":"Level","kind":"knob","value":""},{"name":"Tone","kind":"knob","value":""},{"name":"Bloom","kind":"knob","value":""},{"name":"Mid","kind":"switch","value":"Cut","options":["Cut","Flat","Boost"]},{"name":"Thick","kind":"switch","value":"OFF","options":["OFF","ON"]}]},
  {"id":"ehx-pulsar-tremolo","brand":"Electro-Harmonix","model":"Pulsar Tremolo","params":[{"name":"Vol","kind":"knob","value":"0"},{"name":"Shape","kind":"knob","value":"0"},{"name":"Depth","kind":"knob","value":"0"},{"name":"Rate","kind":"knob","value":"0"},{"name":"Type","kind":"switch","value":"^^","options":["^^","~"]}]},
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
// Une ligne compacte par modèle (au lieu du JSON entièrement indenté) pour rester cohérent avec le style condensé du fichier.
export function defaultPedalCatalogCode(catalog: PedalTemplate[]): string {
  const lines = catalog.map(t => `  ${JSON.stringify(t)},`).join("\n");
  return `export const defaultPedalCatalog: PedalTemplate[] = [\n${lines}\n];\n`;
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
const paramSignature = (params: PedalParam[]) => params.map(p => `${p.name.trim().toLowerCase()}|${p.kind}|${(p.options || []).join(",")}|${p.min ?? ""}|${p.max ?? ""}|${p.step ?? ""}`).join(";");

export function pedalNeedsResync(pedal: Pedal, catalog: PedalTemplate[]): boolean {
  const tpl = catalog.find(t => t.id === pedal.templateId);
  return !!tpl && paramSignature(tpl.params) !== paramSignature(pedal.params);
}

export function newTemplate(): PedalTemplate {
  return { id: `tpl-${Date.now()}-${(seq++).toString(36)}`, brand: "", model: "", params: [] };
}

export function defaultPedals(): Pedal[] {
  return ["tube-screamer", "mxr-6-band-eq", "mooer-graphic-g"].map(id => instantiatePedal(defaultPedalCatalog.find(t => t.id === id)!));
}
