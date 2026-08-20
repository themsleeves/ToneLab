import {useState,useRef} from "react";
import type {ReactNode} from "react";
import type {TestRecord,Pedal,PedalParam,PedalTemplate,ControlKind} from "./types";
import {PARAM_LABELS} from "./types";
import {resyncPedalFromCatalog,pedalNeedsResync} from "./pedalCatalog";
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
const LIST_KEYS:ListKey[]=["status","artist","guitar","tuning","pickup","channel","cabinet"];
const PEDAL_PARAM_SUGGESTIONS=["Drive","Gain","Tone","Level","Volume","Bass","Mid","Treble","Presence","Depth","Bloom","Fuzz","Sustain","Attack","Release","Speed","Rate","Mix","Sensitivity","Output","Blend"];
function ParamRow({param,onChange,onRemove}:{param:PedalParam,onChange:(patch:Partial<PedalParam>)=>void,onRemove:()=>void}){
 const [nameEditing,setNameEditing]=useState(false);
 const [nameDraft,setNameDraft]=useState(param.name);
 const commitName=()=>{const v=nameDraft.trim();if(v)onChange({name:v});setNameEditing(false)};
 const nameField=nameEditing
  ?<input autoFocus className="pedal-param-name-input" list="pedal-param-names" value={nameDraft} onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commitName();if(e.key==="Escape"){setNameDraft(param.name);setNameEditing(false)}}} onBlur={commitName}/>
  :<span className="pedal-param-name-label" onClick={()=>{setNameDraft(param.name);setNameEditing(true)}} title="Cliquer pour renommer">{param.name}</span>;
 const configurePositions=()=>{
  const current=param.options||["OFF","ON"];
  const nStr=prompt("Nombre de positions (2 ou 3) ?",String(current.length));
  if(nStr===null)return;
  const n=Math.min(3,Math.max(2,parseInt(nStr,10)||current.length));
  const next:string[]=[];
  for(let i=0;i<n;i++){
   const label=prompt(`Libellé position ${i+1}`,current[i]??(i===0?"OFF":"ON"));
   if(label===null)return;
   next.push(label.trim()||current[i]||`Position ${i+1}`);
  }
  onChange({options:next,value:next.includes(param.value)?param.value:next[0]});
 };
 return <div className={param.kind==="switch"?"field pedal-param pedal-param--switch":"field pedal-param"}>
  {param.kind==="switch"
   ?<div className="pedal-param-row">
     <div className="switch-toggle">
      {(param.options||["OFF","ON"]).map(o=><button type="button" key={o} className={param.value===o?"switch-toggle-option active":"switch-toggle-option"} onClick={()=>onChange({value:o})}>{o}</button>)}
     </div>
     <button type="button" className="switch-config" onClick={configurePositions} title="Configurer le nombre et le nom des positions">⚙</button>
     {nameField}
     <button type="button" className="chip-remove" onClick={onRemove} aria-label="Supprimer ce composant">✕</button>
    </div>
   :<>
     <div className="pedal-param-meta">
      {nameField}
      <button type="button" className="chip-remove" onClick={onRemove} aria-label="Supprimer ce composant">✕</button>
     </div>
     <div className={param.kind==="slider"?"range-row range-row--slider":"range-row range-row--knob"}>
      {(()=>{const num=Number(param.value)||0;const set=(n:number)=>onChange({value:String(Math.min(10,Math.max(0,n)))});return <>
       <button type="button" onClick={()=>set(num-0.5)}>−</button>
       <input type="range" min={0} max={10} step={0.5} value={num} onChange={e=>set(Number(e.target.value))}/>
       <output>{num}</output>
       <button type="button" onClick={()=>set(num+0.5)}>+</button>
      </>})()}
     </div>
    </>}
 </div>;
}
function ParamListEditor({params,onChange}:{params:PedalParam[],onChange:(params:PedalParam[])=>void}){
 const setParam=(i:number,patch:Partial<PedalParam>)=>onChange(params.map((p,idx)=>idx===i?{...p,...patch}:p));
 const removeParam=(i:number)=>onChange(params.filter((_,idx)=>idx!==i));
 const addParam=(kind:ControlKind)=>onChange([...params,kind==="switch"?{name:"Réglage",kind,value:"OFF",options:["OFF","ON"]}:{name:"Réglage",kind,value:"0"}]);
 return <>
  <div className="grid">{params.map((p,i)=><ParamRow key={i} param={p} onChange={patch=>setParam(i,patch)} onRemove={()=>removeParam(i)}/>)}</div>
  <div className="pedal-add-row">
   <button type="button" onClick={()=>addParam("knob")}>+ Potard</button>
   <button type="button" onClick={()=>addParam("slider")}>+ Slider</button>
   <button type="button" onClick={()=>addParam("switch")}>+ Commutateur</button>
  </div>
 </>;
}
function PedalCard({pedal,catalog,onChange,onRemove,onSaveAsTemplate,dragHandle}:{pedal:Pedal,catalog:PedalTemplate[],onChange:(p:Pedal)=>void,onRemove:()=>void,onSaveAsTemplate:(tpl:PedalTemplate)=>void,dragHandle?:ReactNode}){
 const [nameEditing,setNameEditing]=useState(false);
 const [nameDraft,setNameDraft]=useState(pedal.name);
 const commitName=()=>{const v=nameDraft.trim();if(v)onChange({...pedal,name:v});setNameEditing(false)};
 const tpl=catalog.find(t=>t.id===pedal.templateId);
 const needsResync=pedalNeedsResync(pedal,catalog);
 const saveAsTemplate=()=>{
  const brand=prompt("Marque ?","");if(brand===null)return;
  const model=prompt("Modèle ?",pedal.name);if(model===null)return;
  onSaveAsTemplate({id:`tpl-${Date.now()}`,brand:brand||"Perso",model:model||pedal.name,params:pedal.params.map(p=>({...p}))});
 };
 return <section className="pedal-card">
  {needsResync&&<button type="button" className="pedal-resync-corner" onClick={()=>{if(confirm(`Resynchroniser "${pedal.name}" avec le modèle "${tpl!.brand} ${tpl!.model}" du catalogue ? Les valeurs compatibles seront conservées.`))onChange(resyncPedalFromCatalog(pedal,catalog))}} title="Le catalogue a changé — recharger les réglages">⟳</button>}
  <h2>
   {dragHandle}
   <label className="section-toggle"><input type="checkbox" checked={pedal.enabled==="ON"} onChange={e=>onChange({...pedal,enabled:e.target.checked?"ON":"OFF"})}/>
    {nameEditing
     ?<input autoFocus className="pedal-name-input" value={nameDraft} onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commitName();if(e.key==="Escape"){setNameDraft(pedal.name);setNameEditing(false)}}} onBlur={commitName}/>
     :<span onClick={()=>{setNameDraft(pedal.name);setNameEditing(true)}} title="Cliquer pour renommer">{pedal.name}</span>}
   </label>
   <span className="pedal-card-actions">
    <button type="button" className="pedal-save-template" onClick={saveAsTemplate} title="Enregistrer comme modèle du catalogue">☆ Modèle</button>
    <button type="button" className="danger pedal-remove" onClick={()=>{if(confirm(`Supprimer la pédale "${pedal.name}" ?`))onRemove()}}>✕ Supprimer</button>
   </span>
  </h2>
  <ParamListEditor params={pedal.params} onChange={params=>onChange({...pedal,params})}/>
  <Area label="Notes" value={pedal.notes} onChange={v=>onChange({...pedal,notes:v})}/>
 </section>;
}
function PedalTemplateEditor({template,onChange}:{template:PedalTemplate,onChange:(tpl:PedalTemplate)=>void}){
 return <div className="template-editor">
  <div className="template-editor-header">
   <input value={template.brand} placeholder="Marque" onChange={e=>onChange({...template,brand:e.target.value})}/>
   <input value={template.model} placeholder="Modèle" onChange={e=>onChange({...template,model:e.target.value})}/>
  </div>
  <ParamListEditor params={template.params} onChange={params=>onChange({...template,params})}/>
 </div>;
}
function CollapsibleSection({title,children}:{title:string,children:ReactNode}){
 const [open,setOpen]=useState(false);
 return <div className="collapsible-section">
  <button type="button" className="collapsible-toggle" onClick={()=>setOpen(o=>!o)} aria-expanded={open}>
   <h2>{title}</h2>
   <span className={open?"collapsible-chevron open":"collapsible-chevron"} aria-hidden="true">⌄</span>
  </button>
  {open&&<div className="collapsible-body">{children}</div>}
 </div>;
}
function PedalCatalogManager({catalog,onUpdate,onAdd,onRemove}:{catalog:PedalTemplate[],onUpdate:(id:string,tpl:PedalTemplate)=>void,onAdd:()=>void,onRemove:(id:string)=>void}){
 const [selectedId,setSelectedId]=useState<string|null>(catalog[0]?.id??null);
 const selected=catalog.find(t=>t.id===selectedId)??null;
 return <CollapsibleSection title="Gérer le catalogue de pédales">
  <div className="list-cat-tabs">
   {catalog.map(tpl=><button type="button" key={tpl.id} className={selectedId===tpl.id?"list-cat active":"list-cat"} onClick={()=>setSelectedId(tpl.id)}>{tpl.brand||"?"} {tpl.model||"Nouveau"}</button>)}
   <button type="button" className="list-cat" onClick={()=>{onAdd();}}>+ Nouveau modèle</button>
  </div>
  {selected&&<>
   <PedalTemplateEditor template={selected} onChange={tpl=>onUpdate(selected.id,tpl)}/>
   <button type="button" className="danger" onClick={()=>{if(confirm(`Supprimer le modèle "${selected.brand} ${selected.model}" ?`)){onRemove(selected.id);setSelectedId(catalog.find(t=>t.id!==selected.id)?.id??null)}}}>✕ Supprimer ce modèle</button>
  </>}
 </CollapsibleSection>;
}
function CatalogPicker({catalog,onPick}:{catalog:PedalTemplate[],onPick:(tpl:PedalTemplate)=>void}){
 const [open,setOpen]=useState(false);
 return <div className="menu">
  <button type="button" className="menu-trigger catalog-trigger" onClick={()=>setOpen(o=>!o)}>Depuis le catalogue ▾</button>
  {open&&<div className="menu-panel catalog-panel">
   {catalog.length===0&&<p className="catalog-empty">Catalogue vide</p>}
   {catalog.map(tpl=><button type="button" key={tpl.id} className="catalog-item" onClick={()=>{onPick(tpl);setOpen(false)}}>{tpl.brand} — {tpl.model}</button>)}
  </div>}
 </div>;
}
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
 return <CollapsibleSection title="Gérer les listes">
  <div className="list-cat-tabs">{LIST_KEYS.map(k=><button type="button" key={k} className={cat===k?"list-cat active":"list-cat"} onClick={()=>setCat(k)}>{LIST_LABELS[k]}</button>)}</div>
  <div className="chip-row">
   {lists[cat].map(item=><Chip key={item} item={item} onRename={v=>onRename(cat,item,v)} onRemove={()=>{if(confirm(`Supprimer "${item}" de la liste ${LIST_LABELS[cat]} ?`))onRemove(cat,item)}}/>)}
   <span className="chip chip-add">
    <input placeholder="+ Ajouter" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add()}}/>
    <button type="button" onClick={add} aria-label="Ajouter">+</button>
   </span>
  </div>
 </CollapsibleSection>
}
export function TestForm({test,lists,onChange,onRenameListItem,onRemoveListItem,onAddListItem,catalog,onAddPedal,onAddPedalFromCatalog,onUpdatePedal,onRemovePedal,onSaveAsTemplate,onAddCatalogTemplate,onUpdateCatalogTemplate,onRemoveCatalogTemplate}:{
 test:TestRecord,lists:Lists,onChange:(t:TestRecord)=>void,
 onRenameListItem:(k:ListKey,oldV:string,newV:string)=>void,onRemoveListItem:(k:ListKey,v:string)=>void,onAddListItem:(k:ListKey,v:string)=>void,
 catalog:PedalTemplate[],onAddPedal:()=>void,onAddPedalFromCatalog:(tpl:PedalTemplate)=>void,onUpdatePedal:(id:string,pedal:Pedal)=>void,onRemovePedal:(id:string)=>void,onSaveAsTemplate:(tpl:PedalTemplate)=>void,onAddCatalogTemplate:()=>void,onUpdateCatalogTemplate:(id:string,tpl:PedalTemplate)=>void,onRemoveCatalogTemplate:(id:string)=>void
}){
 const set=(k:keyof TestRecord,v:unknown)=>onChange({...test,[k]:v});
 const nest=(k:"amp",f:string,v:string)=>onChange({...test,[k]:{...test[k], [f]:v}});
 const [dragIndex,setDragIndex]=useState<number|null>(null);
 const [hoverIndex,setHoverIndex]=useState<number|null>(null);
 const pedalRefs=useRef<Record<string,HTMLDivElement|null>>({});
 const reorderPedals=(from:number,to:number)=>{
  if(from===to)return;
  const next=[...test.pedals];
  const [moved]=next.splice(from,1);
  next.splice(to,0,moved);
  set("pedals",next);
 };
 // Glisser-déposer via Pointer Events (souris + tactile), pointer capturé par la poignée.
 const handlePointerMove=(e:{clientY:number})=>{
  if(dragIndex===null)return;
  const y=e.clientY;
  let closest=dragIndex,closestDist=Infinity;
  test.pedals.forEach((p,idx)=>{
   const el=pedalRefs.current[p.id];
   if(!el)return;
   const rect=el.getBoundingClientRect();
   const dist=Math.abs(y-(rect.top+rect.height/2));
   if(dist<closestDist){closestDist=dist;closest=idx}
  });
  setHoverIndex(closest);
 };
 const handlePointerUp=()=>{
  if(dragIndex!==null&&hoverIndex!==null)reorderPedals(dragIndex,hoverIndex);
  setDragIndex(null);
  setHoverIndex(null);
 };
 return <div className="form">
  <datalist id="pedal-param-names">{PEDAL_PARAM_SUGGESTIONS.map(n=><option key={n} value={n}/>)}</datalist>
  <PedalCatalogManager catalog={catalog} onUpdate={onUpdateCatalogTemplate} onAdd={onAddCatalogTemplate} onRemove={onRemoveCatalogTemplate}/>
  <ListManager lists={lists} onRename={onRenameListItem} onRemove={onRemoveListItem} onAdd={onAddListItem}/>
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
  <div className="pedals-section">
   <div className="pedals-header">
    <h2>Pédales d'effets</h2>
    <div className="pedals-header-actions">
     <button type="button" onClick={onAddPedal}>+ Ajouter une pédale</button>
     <CatalogPicker catalog={catalog} onPick={onAddPedalFromCatalog}/>
    </div>
   </div>
   {test.pedals.map((p,i)=><div key={p.id} ref={el=>{pedalRefs.current[p.id]=el}} className={dragIndex===i?"pedal-drag-wrapper dragging":hoverIndex===i&&dragIndex!==null?"pedal-drag-wrapper drop-target":"pedal-drag-wrapper"}>
    <PedalCard pedal={p} catalog={catalog} onChange={updated=>onUpdatePedal(p.id,updated)} onRemove={()=>onRemovePedal(p.id)} onSaveAsTemplate={onSaveAsTemplate} dragHandle={<span className="pedal-drag-handle" onPointerDown={e=>{setDragIndex(i);(e.target as HTMLElement).setPointerCapture(e.pointerId)}} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} title="Glisser pour réordonner">⠿</span>}/>
   </div>)}
  </div>
  <section><h2>Notes du test</h2><div className="grid">
   <Area label="Autres pédales / chaîne" value={test.otherPedals} onChange={v=>set("otherPedals",v)}/><Area label="Objectif du test" value={test.objective} onChange={v=>set("objective",v)}/>
   <Area label="Observations" value={test.observations} onChange={v=>set("observations",v)}/><Area label="Résultat / Conclusion" value={test.conclusion} onChange={v=>set("conclusion",v)}/>
  </div><label className="check"><input type="checkbox" checked={test.retained} onChange={e=>set("retained",e.target.checked)}/> Profil retenu</label></section>
 </div>
}
export function TestList({tests,selected,checked,onSelect,onToggleCheck}:{tests:TestRecord[],selected:string,checked:Set<string>,onSelect:(id:string)=>void,onToggleCheck:(id:string)=>void}){
 return <div className="test-list">{tests.map(t=><div key={t.id} className={selected===t.id?"test-item active":"test-item"}>
  <input type="checkbox" checked={checked.has(t.id)} onChange={()=>onToggleCheck(t.id)}/>
  <button className="test-item-btn" onClick={()=>onSelect(t.id)}><strong>{t.artistReference||"Artiste non défini"}</strong><span>{t.song||"Morceau non défini"}</span><small>{t.id} · {t.status}</small></button>
 </div>)}</div>
}