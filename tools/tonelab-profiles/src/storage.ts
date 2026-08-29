import type {TestRecord, Pedal, PedalParam, Amp} from "./types";
import {defaultPedals} from "./pedalCatalog";
import {defaultAmpCatalog} from "./ampCatalog";
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

// Ordre historique des clés de l'ancien TestRecord.amp (Record<string,string>), pour migrer vers Amp.params.
const LEGACY_AMP_KEYS=["gain","bass","mid","edge","master","bright","focus","level","depth","masterPrincipal"];
// Migre l'ancien amp:Record<string,string>+channel (top-level) vers le nouvel amp:Amp catalogue-driven (lié au Brunetti par défaut).
function migrateAmp(raw:any):Amp {
 if(raw.amp&&Array.isArray(raw.amp.params))return raw.amp as Amp;
 const oldAmp:Record<string,string>=raw.amp||{};
 const tpl=defaultAmpCatalog[0];
 return {templateId:tpl.id,name:`${tpl.brand} ${tpl.model}`,channel:raw.channel||tpl.channels[0],params:tpl.params.map((p,i)=>({...p,value:oldAmp[LEGACY_AMP_KEYS[i]]??p.value}))};
}

export function migrateTest(raw:any):TestRecord {
 const {tubeScreamer,mxr,mooer,testVolume,profile,channel,...rest}=raw;
 const pedals=Array.isArray(raw.pedals)?ensureParamKinds(raw.pedals):migrateLegacyPedals(raw);
 const amp=migrateAmp(raw);
 return {...rest,pedals,amp} as TestRecord;
}

export function load():TestRecord[]{try{const x=localStorage.getItem(KEY);const arr=x?JSON.parse(x):[];return Array.isArray(arr)?arr.map(migrateTest):[];}catch(e){console.error("ToneLab: données corrompues dans localStorage",e);alert("Impossible de lire vos tests enregistrés (données corrompues). Un tableau vide a été chargé pour éviter toute perte supplémentaire — vérifiez vos sauvegardes/exports.");return[];}}
export function save(tests:TestRecord[]){localStorage.setItem(KEY,JSON.stringify(tests));}

// Fusionne des tests importés avec les tests existants : l'import gagne en cas de collision d'ID, les autres tests existants sont conservés.
export function mergeTests(existing:TestRecord[],imported:TestRecord[]):TestRecord[]{
 const byId=new Map(existing.map(t=>[t.id,t]));
 for(const t of imported)byId.set(t.id,t);
 return [...byId.values()];
}

const SNAP_KEY=KEY+"-snapshot", SNAP_DATE_KEY=KEY+"-snapshot-date";
// Capture une sauvegarde de secours de l'état de la veille, au plus une fois par jour, avant d'écraser avec les données du jour.
export function snapshotIfDue(){
 const today=new Date().toISOString().slice(0,10);
 if(localStorage.getItem(SNAP_DATE_KEY)===today)return;
 const prev=localStorage.getItem(KEY);
 if(prev){localStorage.setItem(SNAP_KEY,prev);localStorage.setItem(SNAP_DATE_KEY,today)}
}
export function loadSnapshot():{tests:TestRecord[],date:string}|null{
 const raw=localStorage.getItem(SNAP_KEY),date=localStorage.getItem(SNAP_DATE_KEY);
 if(!raw||!date)return null;
 try{return {tests:(JSON.parse(raw) as any[]).map(migrateTest),date}}catch{return null}
}