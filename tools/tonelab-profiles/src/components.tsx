import {useState} from "react";
import type {TestRecord} from "./types";
import {PARAM_LABELS} from "./types";
import {LIST_LABELS} from "./lists";
import type {ListKey,Lists} from "./lists";
function Field({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}){return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)}/></label>}
function ReadOnlyField({label,value}:{label:string,value:string}){return <label className="field"><span>{label}</span><input value={value} disabled/></label>}
function SelectField({label,value,options,onChange}:{label:string,value:string,options:string[],onChange:(v:string)=>void}){
 const opts=value&&!options.includes(value)?[value,...options]:options;
 return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></label>
}
function Area({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}){return <label className="field full"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)} rows={4}/></label>}
function RangeField({label,value,onChange,min=0,max=10,step=0.5}:{label:string,value:string,onChange:(v:string)=>void,min?:number,max?:number,step?:number}){
 const num=Number(value)||0;
 const set=(n:number)=>onChange(String(Math.min(max,Math.max(min,n))));
 return <label className="field"><span>{label}</span><div className="range-row">
  <button type="button" onClick={()=>set(num-step)}>−</button>
  <input type="range" min={min} max={max} step={step} value={num} onChange={e=>set(Number(e.target.value))}/>
  <output>{num}</output>
  <button type="button" onClick={()=>set(num+step)}>+</button>
 </div></label>
}
const TOGGLE_KEYS:Partial<Record<"amp"|"tubeScreamer"|"mxr"|"mooer",string>>={tubeScreamer:"enabled",mxr:"enabled",mooer:"enabled"};
const LIST_KEYS:ListKey[]=["status","artist","guitar","tuning","pickup","channel","cabinet"];
function Chip({item,onRename,onRemove}:{item:string,onRename:(v:string)=>void,onRemove:()=>void}){
 const [editing,setEditing]=useState(false);
 const [draft,setDraft]=useState(item);
 const commit=()=>{const v=draft.trim();if(v&&v!==item)onRename(v);setEditing(false)};
 const cancel=()=>{setDraft(item);setEditing(false)};
 if(editing)return <span className="chip chip-editing">
  <input autoFocus value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")cancel()}} onBlur={commit}/>
 </span>;
 return <span className="chip" onClick={()=>{setDraft(item);setEditing(true)}} title="Cliquer pour renommer">
  <span className="chip-label">{item}</span>
  <button type="button" className="chip-remove" onClick={e=>{e.stopPropagation();onRemove()}} aria-label={`Supprimer ${item}`}>✕</button>
 </span>;
}
function ListManager({lists,onRename,onRemove,onAdd}:{lists:Lists,onRename:(k:ListKey,oldV:string,newV:string)=>void,onRemove:(k:ListKey,v:string)=>void,onAdd:(k:ListKey,v:string)=>void}){
 const [cat,setCat]=useState<ListKey>("status");
 const [draft,setDraft]=useState("");
 const add=()=>{if(draft.trim()){onAdd(cat,draft.trim());setDraft("")}};
 return <details className="list-manager">
  <summary>Gérer les listes</summary>
  <div className="list-cat-tabs">{LIST_KEYS.map(k=><button type="button" key={k} className={cat===k?"list-cat active":"list-cat"} onClick={()=>setCat(k)}>{LIST_LABELS[k]}</button>)}</div>
  <div className="chip-row">
   {lists[cat].map(item=><Chip key={item} item={item} onRename={v=>onRename(cat,item,v)} onRemove={()=>{if(confirm(`Supprimer "${item}" de la liste ${LIST_LABELS[cat]} ?`))onRemove(cat,item)}}/>)}
   <span className="chip chip-add">
    <input placeholder="+ Ajouter" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add()}}/>
    <button type="button" onClick={add} aria-label="Ajouter">+</button>
   </span>
  </div>
 </details>
}
export function TestForm({test,lists,onChange,onRenameListItem,onRemoveListItem,onAddListItem}:{
 test:TestRecord,lists:Lists,onChange:(t:TestRecord)=>void,
 onRenameListItem:(k:ListKey,oldV:string,newV:string)=>void,onRemoveListItem:(k:ListKey,v:string)=>void,onAddListItem:(k:ListKey,v:string)=>void
}){
 const set=(k:keyof TestRecord,v:unknown)=>onChange({...test,[k]:v});
 const nest=(k:"amp"|"tubeScreamer"|"mxr"|"mooer",f:string,v:string)=>onChange({...test,[k]:{...test[k], [f]:v}});
 const block=(title:string,key:"tubeScreamer"|"mxr"|"mooer")=>{
  const toggleKey=TOGGLE_KEYS[key];
  const entries=Object.entries(test[key]).filter(([k])=>k!==toggleKey);
  return <section><h2>{toggleKey?<label className="section-toggle"><input type="checkbox" checked={test[key][toggleKey]==="ON"} onChange={e=>nest(key,toggleKey,e.target.checked?"ON":"OFF")}/> {title}</label>:title}</h2><div className="grid">{entries.map(([k,v])=><RangeField key={k} label={PARAM_LABELS[key][k]??k} value={v} onChange={x=>nest(key,k,x)}/>)}</div></section>;
 };
 return <div className="form">
  <section><h2>Identification</h2><div className="grid">
   <ReadOnlyField label="ID test" value={test.id}/><SelectField label="Artiste / Référence" value={test.artistReference} options={lists.artist} onChange={v=>set("artistReference",v)}/>
   <Field label="Morceau / Riff" value={test.song} onChange={v=>set("song",v)}/><Field label="Date" value={test.date} onChange={v=>set("date",v)}/>
   <SelectField label="Statut" value={test.status} options={lists.status} onChange={v=>set("status",v)}/>
  </div></section>
  <section><h2>Configuration</h2><div className="grid">
   <SelectField label="Guitare" value={test.guitar} options={lists.guitar} onChange={v=>set("guitar",v)}/><SelectField label="Accordage" value={test.tuning} options={lists.tuning} onChange={v=>set("tuning",v)}/>
   <SelectField label="Micro / Position" value={test.pickup} options={lists.pickup} onChange={v=>set("pickup",v)}/><SelectField label="Cabinet" value={test.cabinet} options={lists.cabinet} onChange={v=>set("cabinet",v)}/>
  </div></section>
  <section><h2>Brunetti XL R-EVO II</h2><div className="grid">
   <SelectField label="Canal Brunetti" value={test.channel} options={lists.channel} onChange={v=>set("channel",v)}/>
   {Object.entries(test.amp).map(([k,v])=><RangeField key={k} label={PARAM_LABELS.amp[k]??k} value={v} onChange={x=>nest("amp",k,x)}/>)}
  </div></section>
  {block("Tube Screamer","tubeScreamer")}{block("MXR 6 Band EQ","mxr")}{block("Mooer Graphic G — 5 bandes","mooer")}
  <section><h2>Notes du test</h2><div className="grid">
   <Area label="Autres pédales / chaîne" value={test.otherPedals} onChange={v=>set("otherPedals",v)}/><Area label="Objectif du test" value={test.objective} onChange={v=>set("objective",v)}/>
   <Area label="Observations" value={test.observations} onChange={v=>set("observations",v)}/><Area label="Résultat / Conclusion" value={test.conclusion} onChange={v=>set("conclusion",v)}/>
  </div><label className="check"><input type="checkbox" checked={test.retained} onChange={e=>set("retained",e.target.checked)}/> Profil retenu</label></section>
  <ListManager lists={lists} onRename={onRenameListItem} onRemove={onRemoveListItem} onAdd={onAddListItem}/>
 </div>
}
export function TestList({tests,selected,checked,onSelect,onToggleCheck}:{tests:TestRecord[],selected:string,checked:Set<string>,onSelect:(id:string)=>void,onToggleCheck:(id:string)=>void}){
 return <div className="test-list">{tests.map(t=><div key={t.id} className={selected===t.id?"test-item active":"test-item"}>
  <input type="checkbox" checked={checked.has(t.id)} onChange={()=>onToggleCheck(t.id)}/>
  <button className="test-item-btn" onClick={()=>onSelect(t.id)}><strong>{t.artistReference||"Artiste non défini"}</strong><span>{t.song||"Morceau non défini"}</span><small>{t.id} · {t.status}</small></button>
 </div>)}</div>
}