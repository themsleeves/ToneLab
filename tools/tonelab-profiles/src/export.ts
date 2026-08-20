import type {TestRecord,Pedal,PedalTemplate} from "./types";
import {PARAM_LABELS} from "./types";
import type {Lists} from "./lists";
function download(name:string,text:string,type="text/plain;charset=utf-8"){const b=new Blob([text],{type}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
const esc=(x:string)=>`"${String(x??"").replaceAll('"','""')}"`;
// Résume dynamiquement toutes les pédales/réglages d'un test, quel que soit leur nombre (pour la colonne CSV).
function pedalsSummary(pedals:Pedal[]):string {
 return pedals.map(p=>`${p.name} (${p.enabled==="ON"?"ON":"OFF"}): ${p.params.map(pr=>`${pr.name}=${pr.value}`).join(", ")}${p.notes?` [${p.notes}]`:""}`).join(" | ");
}
export function json(tests:TestRecord[],lists:Lists,catalog:PedalTemplate[]){download("tonelab-data.json",JSON.stringify({version:3,tests,lists,catalog},null,2),"application/json");}
export function csv(tests:TestRecord[]){
 const h=["ID test","Artiste / Référence","Morceau / Riff","Date","Statut","Guitare","Accordage","Micro / Position","Cabinet","Canal","Gain","Bass","Mid","Edge","Master","Bright","Focus","Level","Depth","Master principal","Pédales d'effets","Autres pédales / chaîne","Objectif du test","Observations","Résultat / Conclusion","Profil retenu"];
 const rows=tests.map(t=>[t.id,t.artistReference,t.song,t.date,t.status,t.guitar,t.tuning,t.pickup,t.cabinet,t.channel,t.amp.gain,t.amp.bass,t.amp.mid,t.amp.edge,t.amp.master,t.amp.bright,t.amp.focus,t.amp.level,t.amp.depth,t.amp.masterPrincipal,pedalsSummary(t.pedals),t.otherPedals,t.objective,t.observations,t.conclusion,t.retained?"Oui":"Non"]);
 download("tonelab-tests.csv","\uFEFF"+[h,...rows].map(r=>r.map(esc).join(";")).join("\n"),"text/csv;charset=utf-8");
}
export function markdown(t:TestRecord){
 const r=(a:string,b:string)=>`| ${a} | ${b||"—"} |`;
 const md=`# ${t.artistReference||"Test"} — ${t.song||t.id}

## Statut
${t.status}

## Référence
${r("Artiste / référence",t.artistReference)}
${r("Morceau / riff",t.song)}
${r("ID test",t.id)}

## Configuration
${r("Guitare",t.guitar)}
${r("Accordage",t.tuning)}
${r("Micro / position",t.pickup)}
${r("Cabinet",t.cabinet)}

## Brunetti XL R-EVO II
| Paramètre | Réglage |
|---|---:|
${r("Canal",t.channel)}
${Object.entries(t.amp).map(([k,v])=>r(PARAM_LABELS.amp[k]??k,v)).join("\n")}

${t.pedals.map(p=>`## ${p.name} (${p.enabled==="ON"?"Activée":"Désactivée"})
| Paramètre | Réglage |
|---|---:|
${p.params.map(param=>r(param.name,param.value)).join("\n")}${p.notes?`\n\nNotes : ${p.notes}`:""}`).join("\n\n")}

## Autres pédales / chaîne
${t.otherPedals||"—"}

## Objectif
${t.objective||"—"}

## Observations
${t.observations||"—"}

## Résultat / conclusion
${t.conclusion||"—"}

## Profil retenu
${t.retained?"Oui":"Non"}
`;
 download(`${t.id||"profil-tonelab"}.md`,md,"text/markdown;charset=utf-8");
}