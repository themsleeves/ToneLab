import type { AmpTemplate, PedalParam, Amp } from "./types";

const KEY = "tonelab-amp-catalog";

const knob = (name: string, value = "", onlyChannel?: string): PedalParam => (onlyChannel ? { name, kind: "knob", value, onlyChannel } : { name, kind: "knob", value });

// Premier modèle du catalogue d'amplis — reprend les réglages actuels du Brunetti XL R-EVO II.
// "Bright" (knob) n'est disponible que sur le canal "Clean" (onlyChannel).
export const defaultAmpCatalog: AmpTemplate[] = [
  {"id":"brunetti-xl-revo2","brand":"Brunetti","model":"XL R-EVO II","channels":["Clean","Boost","XLead"],"params":[{"name":"Gain","kind":"knob","value":""},{"name":"Bass","kind":"knob","value":""},{"name":"Mid","kind":"knob","value":""},{"name":"Edge","kind":"knob","value":""},{"name":"Master","kind":"knob","value":""},{"name":"Bright","kind":"knob","value":"","onlyChannel":"Clean"},{"name":"Focus","kind":"knob","value":""},{"name":"Level","kind":"knob","value":""},{"name":"Depth","kind":"knob","value":""},{"name":"Level","kind":"knob","value":""}]},
  {"id":"amptpl-1787349577156","brand":"Gibson","model":"Skylark 5w","channels":["Principal"],"params":[{"name":"Master","kind":"knob","value":"0"}]},
];

export function loadAmpCatalog(): AmpTemplate[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AmpTemplate[]) : defaultAmpCatalog;
  } catch {
    return defaultAmpCatalog;
  }
}

export function saveAmpCatalog(catalog: AmpTemplate[]) {
  localStorage.setItem(KEY, JSON.stringify(catalog));
}

export function mergeAmpCatalog(catalog?: AmpTemplate[]): AmpTemplate[] {
  return Array.isArray(catalog) && catalog.length ? catalog : defaultAmpCatalog;
}

export function newAmpTemplate(): AmpTemplate {
  return { id: `amptpl-${Date.now()}`, brand: "", model: "", channels: ["Canal 1"], params: [] };
}

export function instantiateAmp(tpl: AmpTemplate): Amp {
  return { templateId: tpl.id, name: `${tpl.brand} ${tpl.model}`, channel: tpl.channels[0] ?? "", params: tpl.params.map(p => ({ ...p })) };
}

// Réaligne les params d'un ampli déjà lié sur son modèle de catalogue, en conservant les valeurs encore valides (même logique que resyncPedalFromCatalog).
export function resyncAmpFromCatalog(amp: Amp, catalog: AmpTemplate[]): Amp {
  const tpl = catalog.find(t => t.id === amp.templateId);
  if (!tpl) return amp;
  const params = tpl.params.map(tp => {
    const existing = amp.params.find(p => p.name.trim().toLowerCase() === tp.name.trim().toLowerCase());
    return existing ? { ...tp, value: existing.value } : { ...tp };
  });
  return { ...amp, name: `${tpl.brand} ${tpl.model}`, channel: tpl.channels.includes(amp.channel) ? amp.channel : (tpl.channels[0] ?? ""), params };
}

// Signature structurelle (nom/type/positions/bornes/canal, hors valeur) pour détecter si un catalogue a évolué depuis la liaison de l'ampli.
const ampParamSignature = (params: PedalParam[]) => params.map(p => `${p.name.trim().toLowerCase()}|${p.kind}|${(p.options || []).join(",")}|${p.min ?? ""}|${p.max ?? ""}|${p.step ?? ""}|${p.onlyChannel ?? ""}`).join(";");

export function ampNeedsResync(amp: Amp, catalog: AmpTemplate[]): boolean {
  const tpl = catalog.find(t => t.id === amp.templateId);
  return !!tpl && ampParamSignature(tpl.params) !== ampParamSignature(amp.params);
}

// Génère le code source de `defaultAmpCatalog` à partir du catalogue actuel, pour mettre à jour la base de référence du dépôt.
export function defaultAmpCatalogCode(catalog: AmpTemplate[]): string {
  const lines = catalog.map(t => `  ${JSON.stringify(t)},`).join("\n");
  return `export const defaultAmpCatalog: AmpTemplate[] = [\n${lines}\n];\n`;
}

export function downloadAmpCatalogCode(catalog: AmpTemplate[]) {
  const blob = new Blob([defaultAmpCatalogCode(catalog)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "ampCatalog.defaults.ts"; a.click();
  URL.revokeObjectURL(url);
}
