import type {TestRecord, Pedal, PedalParam} from "./types";
import {defaultPedals} from "./pedalCatalog";
const KEY="tonelab-profile-manager";

function knobParam(name:string, value:unknown):PedalParam { return {name, kind:"knob", value:String(value||"")}; }

// Reconstruit des pédales dynamiques à partir de l'ancien format figé (tubeScreamer/mxr/mooer).
function migrateLegacyPedals(raw:any):Pedal[] {
 const mk=(name:string,enabled:string|undefined,params:PedalParam[]):Pedal=>({id:name,name,enabled:enabled||"OFF",notes:"",params});
 const pedals:Pedal[]=[];
 if(raw.tubeScreamer)pedals.push(mk("Tube Screamer",raw.tubeScreamer.enabled,[knobParam("Drive",raw.tubeScreamer.drive),knobParam("Tone",raw.tubeScreamer.tone),knobParam("Level",raw.tubeScreamer.level)]));
 if(raw.mxr)pedals.push(mk("MXR 6 Band EQ",raw.mxr.enabled,[knobParam("100 Hz",raw.mxr["100"]),knobParam("200 Hz",raw.mxr["200"]),knobParam("400 Hz",raw.mxr["400"]),knobParam("800 Hz",raw.mxr["800"]),knobParam("1.6 kHz",raw.mxr["1600"]),knobParam("3.2 kHz",raw.mxr["3200"])]));
 if(raw.mooer)pedals.push(mk("Mooer Graphic G",raw.mooer.enabled,[knobParam("100 Hz",raw.mooer["100"]),knobParam("250 Hz",raw.mooer["250"]),knobParam("630 Hz",raw.mooer["630"]),knobParam("1.6 kHz",raw.mooer["1600"]),knobParam("4 kHz",raw.mooer["4000"])]));
 return pedals.length?pedals:defaultPedals();
}

// Ajoute kind:"knob" aux pédales déjà migrées avant l'introduction des types de contrôle.
function ensureParamKinds(pedals:Pedal[]):Pedal[] {
 return pedals.map(p=>({...p,params:p.params.map(pr=>('kind' in pr)?pr:{...pr,kind:"knob"} as PedalParam)}));
}

export function migrateTest(raw:any):TestRecord {
 const {tubeScreamer,mxr,mooer,testVolume,profile,...rest}=raw;
 const pedals=Array.isArray(raw.pedals)?ensureParamKinds(raw.pedals):migrateLegacyPedals(raw);
 return {...rest,pedals} as TestRecord;
}

export function load():TestRecord[]{try{const x=localStorage.getItem(KEY);const arr=x?JSON.parse(x):[];return Array.isArray(arr)?arr.map(migrateTest):[];}catch{return[];}}
export function save(tests:TestRecord[]){localStorage.setItem(KEY,JSON.stringify(tests));}