import type {TestRecord} from "./types";
import {PARAM_LABELS} from "./types";
import type {Lists} from "./lists";
function download(name:string,text:string,type="text/plain;charset=utf-8"){const b=new Blob([text],{type}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
const esc=(x:string)=>`"${String(x??"").replaceAll('"','""')}"`;
export function json(tests:TestRecord[],lists:Lists){download("tonelab-data.json",JSON.stringify({version:2,tests,lists},null,2),"application/json");}
export function csv(tests:TestRecord[]){
 const h=["ID test","Artiste / Référence","Morceau / Riff","Date","Statut","Guitare","Accordage","Micro / Position","Cabinet","Canal","Gain","Bass","Mid","Edge","Master","Bright","Focus","Level","Depth","Master principal","Tube Screamer","TS Drive","TS Tone","TS Level","MXR 6 Band","MXR 100 Hz","MXR 200 Hz","MXR 400 Hz","MXR 800 Hz","MXR 1.6 kHz","MXR 3.2 kHz","Mooer Graphic G","Mooer 100 Hz","Mooer 250 Hz","Mooer 630 Hz","Mooer 1.6 kHz","Mooer 4 kHz","Autres pédales / chaîne","Objectif du test","Observations","Résultat / Conclusion","Profil retenu"];
 const rows=tests.map(t=>[t.id,t.artistReference,t.song,t.date,t.status,t.guitar,t.tuning,t.pickup,t.cabinet,t.channel,t.amp.gain,t.amp.bass,t.amp.mid,t.amp.edge,t.amp.master,t.amp.bright,t.amp.focus,t.amp.level,t.amp.depth,t.amp.masterPrincipal,t.tubeScreamer.enabled,t.tubeScreamer.drive,t.tubeScreamer.tone,t.tubeScreamer.level,t.mxr.enabled,t.mxr["100"],t.mxr["200"],t.mxr["400"],t.mxr["800"],t.mxr["1600"],t.mxr["3200"],t.mooer.enabled,t.mooer["100"],t.mooer["250"],t.mooer["630"],t.mooer["1600"],t.mooer["4000"],t.otherPedals,t.objective,t.observations,t.conclusion,t.retained?"Oui":"Non"]);
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

## Tube Screamer
| Paramètre | Réglage |
|---|---:|
${Object.entries(t.tubeScreamer).map(([k,v])=>r(PARAM_LABELS.tubeScreamer[k]??k,v)).join("\n")}

## MXR 6 Band EQ
| Bande | Réglage |
|---|---:|
${Object.entries(t.mxr).map(([k,v])=>r(PARAM_LABELS.mxr[k]??k,v)).join("\n")}

## Mooer Graphic G
| Bande | Réglage |
|---|---:|
${Object.entries(t.mooer).map(([k,v])=>r(PARAM_LABELS.mooer[k]??k,v)).join("\n")}

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