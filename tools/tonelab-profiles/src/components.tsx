import {useState,useRef,useEffect} from "react";
import type {ReactNode,CSSProperties} from "react";
import type {TestRecord,Pedal,PedalParam,PedalTemplate,ControlKind} from "./types";
import {PARAM_LABELS} from "./types";
import {resyncPedalFromCatalog,pedalNeedsResync} from "./pedalCatalog";
import {LIST_LABELS} from "./lists";
import type {ListKey,Lists} from "./lists";
// Referme un menu ouvert au clic en dehors de tout élément `.menu` (trigger + panneau).
export function useCloseOnOutsideClick(active:boolean,close:()=>void){
 useEffect(()=>{
  if(!active)return;
  const onDoc=(e:MouseEvent)=>{if(!(e.target as HTMLElement).closest(".menu"))close()};
  document.addEventListener("mousedown",onDoc);
  return ()=>document.removeEventListener("mousedown",onDoc);
 },[active,close]);
}
function Field({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}){return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)}/></label>}
function ReadOnlyField({label,value}:{label:string,value:string}){return <label className="field"><span>{label}</span><input value={value} disabled/></label>}
function SelectField({label,value,options,onChange}:{label:string,value:string,options:string[],onChange:(v:string)=>void}){
 const opts=value&&!options.includes(value)?[value,...options]:options;
 return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></label>
}
function Area({label,value,onChange,autoGrow}:{label?:string,value:string,onChange:(v:string)=>void,autoGrow?:boolean}){
 const ref=useRef<HTMLTextAreaElement>(null);
 const resize=()=>{const el=ref.current;if(el){el.style.height="auto";el.style.height=el.scrollHeight+"px"}};
 useEffect(()=>{if(autoGrow)resize()},[value,autoGrow]);
 return <label className={autoGrow?"field full area-autogrow":"field full"}>{label&&<span>{label}</span>}<textarea ref={ref} value={value} onChange={e=>onChange(e.target.value)} rows={autoGrow?3:4}/></label>;
}
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
function ParamRow({param,onChange,onRemove,removable=true}:{param:PedalParam,onChange:(patch:Partial<PedalParam>)=>void,onRemove:()=>void,removable?:boolean}){
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
 const configureRange=()=>{
  const minStr=prompt("Valeur minimale ?",String(param.min??0));
  if(minStr===null)return;
  const maxStr=prompt("Valeur maximale ?",String(param.max??10));
  if(maxStr===null)return;
  const stepStr=prompt("Pas (incrément) ?",String(param.step??0.5));
  if(stepStr===null)return;
  const min=Number(minStr),max=Number(maxStr),step=Number(stepStr);
  if(isNaN(min)||isNaN(max)||isNaN(step)||min>=max||step<=0)return;
  const value=String(Math.min(max,Math.max(min,Number(param.value)||0)));
  onChange({min,max,step,value});
 };
 return <div className={param.kind==="switch"?"field pedal-param pedal-param--switch":"field pedal-param"}>
  {param.kind==="switch"
   ?<div className="pedal-param-row">
     <div className="switch-toggle">
      {(param.options||["OFF","ON"]).map(o=><button type="button" key={o} className={param.value===o?"switch-toggle-option active":"switch-toggle-option"} onClick={()=>onChange({value:o})}>{o}</button>)}
     </div>
     {removable&&<button type="button" className="switch-config" onClick={configurePositions} title="Configurer le nombre et le nom des positions">⚙</button>}
     {nameField}
     {removable&&<button type="button" className="chip-remove" onClick={onRemove} aria-label="Supprimer ce composant">✕</button>}
    </div>
   :<div className={removable?"pedal-param-row pedal-param-row--range":"pedal-param-row pedal-param-row--range pedal-param-row--aligned"}>
     {nameField}
     <div className={param.kind==="slider"?"range-row range-row--slider":"range-row range-row--knob"}>
      {(()=>{const min=param.min??0;const max=param.max??10;const step=param.step??0.5;const num=Number(param.value)||0;const set=(n:number)=>onChange({value:String(Math.min(max,Math.max(min,n)))});return <>
       <button type="button" onClick={()=>set(num-step)}>−</button>
       <input type="range" min={min} max={max} step={step} value={num} onChange={e=>set(Number(e.target.value))}/>
       <output>{num}</output>
       <button type="button" onClick={()=>set(num+step)}>+</button>
      </>})()}
     </div>
     {removable&&<button type="button" className="switch-config" onClick={configureRange} title="Configurer les bornes (min/max/pas)">⚙</button>}
     {removable&&<button type="button" className="chip-remove" onClick={onRemove} aria-label="Supprimer ce composant">✕</button>}
    </div>}
 </div>;
}
const newParam=(kind:ControlKind):PedalParam=>kind==="switch"?{name:"Réglage",kind,value:"OFF",options:["OFF","ON"]}:{name:"Réglage",kind,value:"0"};
function AddParamMenu({onAdd}:{onAdd:(kind:ControlKind)=>void}){
 const [open,setOpen]=useState(false);
 useCloseOnOutsideClick(open,()=>setOpen(false));
 const pick=(kind:ControlKind)=>{onAdd(kind);setOpen(false)};
 return <div className="menu param-add-menu">
  <button type="button" className="menu-trigger" onClick={()=>setOpen(o=>!o)} aria-label="Ajouter un réglage">+</button>
  {open&&<div className="menu-panel param-add-panel">
   <button type="button" onClick={()=>pick("knob")}>+ Potard</button>
   <button type="button" onClick={()=>pick("slider")}>+ Slider</button>
   <button type="button" onClick={()=>pick("switch")}>+ Switch</button>
  </div>}
 </div>;
}
function ParamListEditor({params,onChange,removable=true}:{params:PedalParam[],onChange:(params:PedalParam[])=>void,removable?:boolean}){
 const setParam=(i:number,patch:Partial<PedalParam>)=>onChange(params.map((p,idx)=>idx===i?{...p,...patch}:p));
 const removeParam=(i:number)=>onChange(params.filter((_,idx)=>idx!==i));
 const rangeLengths=params.filter(p=>p.kind!=="switch").map(p=>p.name.length);
 const labelCh=rangeLengths.length?Math.min(16,Math.max(6,Math.max(...rangeLengths)))+1:0;
 const style=!removable&&labelCh?({"--param-label-ch":`${labelCh}ch`} as CSSProperties):undefined;
 return <div className="grid" style={style}>{params.map((p,i)=><ParamRow key={i} param={p} onChange={patch=>setParam(i,patch)} onRemove={()=>removeParam(i)} removable={removable}/>)}</div>;
}
function PedalCard({pedal,catalog,onChange,onRemove,onSaveAsTemplate,dragHandle}:{pedal:Pedal,catalog:PedalTemplate[],onChange:(p:Pedal)=>void,onRemove:()=>void,onSaveAsTemplate:(tpl:PedalTemplate)=>void,dragHandle?:ReactNode}){
 const [nameEditing,setNameEditing]=useState(false);
 const [nameDraft,setNameDraft]=useState(pedal.name);
 const [notesOpen,setNotesOpen]=useState(()=>!!pedal.notes);
 const [linking,setLinking]=useState(false);
 const commitName=()=>{const v=nameDraft.trim();if(v)onChange({...pedal,name:v});setNameEditing(false)};
 const tpl=catalog.find(t=>t.id===pedal.templateId);
 const saveAsTemplate=()=>{
  const brand=prompt("Marque ?","");if(brand===null)return;
  const model=prompt("Modèle ?",pedal.name);if(model===null)return;
  onSaveAsTemplate({id:`tpl-${Date.now()}`,brand:brand||"Perso",model:model||pedal.name,params:pedal.params.map(p=>({...p}))});
 };
 const resetParams=()=>{if(!confirm(`Remettre à 0 tous les réglages de "${pedal.name}" ?`))return;onChange({...pedal,params:pedal.params.map(p=>p.kind==="switch"?{...p,value:(p.options||["OFF","ON"])[0]}:{...p,value:String(Math.min(p.max??10,Math.max(p.min??0,0)))})})};
 const needsResync=pedalNeedsResync(pedal,catalog);
 return <section className="pedal-card">
  {tpl
   ?(needsResync&&<button type="button" className="pedal-resync-corner" onClick={()=>{if(confirm(`Resynchroniser "${pedal.name}" avec le modèle "${tpl.brand} ${tpl.model}" du catalogue ? Les valeurs compatibles seront conservées.`))onChange(resyncPedalFromCatalog(pedal,catalog))}} title="Le catalogue a changé — recharger les réglages">⟳</button>)
   :(linking
     ?<CatalogPicker catalog={catalog} onPick={t=>{onChange(resyncPedalFromCatalog({...pedal,templateId:t.id},catalog));setLinking(false)}} placeholder="Choisir un modèle…"/>
     :<button type="button" className="pedal-resync-corner" onClick={()=>setLinking(true)} title="Relier cette pédale à un modèle du catalogue">🔗</button>)}
  <h2>
   {dragHandle}
   <label className="section-toggle"><input type="checkbox" checked={pedal.enabled==="ON"} onChange={e=>onChange({...pedal,enabled:e.target.checked?"ON":"OFF"})}/>
    {nameEditing
     ?<input autoFocus className="pedal-name-input" value={nameDraft} onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commitName();if(e.key==="Escape"){setNameDraft(pedal.name);setNameEditing(false)}}} onBlur={commitName}/>
     :<span onClick={()=>{setNameDraft(pedal.name);setNameEditing(true)}} title="Cliquer pour renommer">{pedal.name}</span>}
   </label>
   <span className="pedal-card-actions">
    <button type="button" className="pedal-reset-btn" onClick={resetParams} title="Remettre tous les réglages à 0">🧹</button>
    <button type="button" className="pedal-save-template" onClick={saveAsTemplate} title="Enregistrer comme modèle du catalogue">☆ Modèle</button>
    <button type="button" className="danger pedal-remove" onClick={()=>{if(confirm(`Supprimer la pédale "${pedal.name}" ?`))onRemove()}}>✕ Supprimer</button>
   </span>
  </h2>
  <ParamListEditor params={pedal.params} onChange={params=>onChange({...pedal,params})} removable={false}/>
  <button type="button" className="pedal-notes-toggle" onClick={()=>setNotesOpen(o=>!o)}>
   <span className={notesOpen?"collapsible-chevron open":"collapsible-chevron"} aria-hidden="true">⌄</span> Notes
  </button>
  {notesOpen&&<Area value={pedal.notes} onChange={v=>onChange({...pedal,notes:v})} autoGrow/>}
 </section>;
}
function PedalTemplateEditor({template,onChange,onRemove}:{template:PedalTemplate,onChange:(tpl:PedalTemplate)=>void,onRemove:()=>void}){
 return <div className="template-editor">
  <div className="template-editor-header">
   <input value={template.brand} placeholder="Marque" onChange={e=>onChange({...template,brand:e.target.value})}/>
   <input value={template.model} placeholder="Modèle" onChange={e=>onChange({...template,model:e.target.value})}/>
  </div>
  <div className="template-editor-toolbar">
   <AddParamMenu onAdd={kind=>onChange({...template,params:[...template.params,newParam(kind)]})}/>
   <button type="button" className="danger template-remove-btn" onClick={onRemove}>✕ Supprimer ce modèle</button>
  </div>
  <ParamListEditor params={template.params} onChange={params=>onChange({...template,params})}/>
 </div>;
}
function CollapsibleSection({title,children,actions,defaultOpen=false}:{title:string,children:ReactNode,actions?:ReactNode,defaultOpen?:boolean}){
 const [open,setOpen]=useState(defaultOpen);
 return <div className="collapsible-section">
  <button type="button" className="collapsible-toggle" onClick={()=>setOpen(o=>!o)} aria-expanded={open}>
   <h2>{title}</h2>
   <span className={open?"collapsible-chevron open":"collapsible-chevron"} aria-hidden="true">⌄</span>
  </button>
  {open&&<div className="collapsible-body">
   {actions&&<div className="collapsible-body-actions">{actions}</div>}
   {children}
  </div>}
 </div>;
}
export function PedalCatalogManager({catalog,onUpdate,onAdd,onRemove}:{catalog:PedalTemplate[],onUpdate:(id:string,tpl:PedalTemplate)=>void,onAdd:()=>void,onRemove:(id:string)=>void}){
 const [selectedId,setSelectedId]=useState<string|null>(catalog[0]?.id??null);
 const selected=catalog.find(t=>t.id===selectedId)??null;
 return <CollapsibleSection title="Gérer le catalogue de pédales">
  <div className="catalog-manager-toolbar">
   <button type="button" className="catalog-add-model" onClick={onAdd}>+ Nouveau modèle</button>
  </div>
  <div className="catalog-manager-list">
   {catalog.map(tpl=><button type="button" key={tpl.id} className={selectedId===tpl.id?"catalog-manager-item active":"catalog-manager-item"} onClick={()=>setSelectedId(tpl.id)}>{tpl.brand||"?"} {tpl.model||"Nouveau"}</button>)}
  </div>
  {selected&&<PedalTemplateEditor template={selected} onChange={tpl=>onUpdate(selected.id,tpl)} onRemove={()=>{if(confirm(`Supprimer le modèle "${selected.brand} ${selected.model}" ?`)){onRemove(selected.id);setSelectedId(catalog.find(t=>t.id!==selected.id)?.id??null)}}}/>}
 </CollapsibleSection>;
}
function CatalogPicker({catalog,onPick,placeholder="Depuis le catalogue…"}:{catalog:PedalTemplate[],onPick:(tpl:PedalTemplate)=>void,placeholder?:string}){
 const [resetKey,setResetKey]=useState(0);
 if(catalog.length===0)return <select disabled className="catalog-picker-select"><option>Catalogue vide</option></select>;
 return <select key={resetKey} className="catalog-picker-select" defaultValue="" onChange={e=>{const tpl=catalog.find(t=>t.id===e.target.value);if(tpl){onPick(tpl);setResetKey(k=>k+1)}}}>
  <option value="" disabled>{placeholder}</option>
  {catalog.map(tpl=><option key={tpl.id} value={tpl.id}>{tpl.brand} — {tpl.model}</option>)}
 </select>;
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
export function ListManager({lists,onRename,onRemove,onAdd}:{lists:Lists,onRename:(k:ListKey,oldV:string,newV:string)=>void,onRemove:(k:ListKey,v:string)=>void,onAdd:(k:ListKey,v:string)=>void}){
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
export function TestForm({test,lists,onChange,catalog,onAddPedalFromCatalog,onUpdatePedal,onRemovePedal,onSaveAsTemplate}:{
 test:TestRecord,lists:Lists,onChange:(t:TestRecord)=>void,
 catalog:PedalTemplate[],onAddPedalFromCatalog:(tpl:PedalTemplate)=>void,onUpdatePedal:(id:string,pedal:Pedal)=>void,onRemovePedal:(id:string)=>void,onSaveAsTemplate:(tpl:PedalTemplate)=>void
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
 const resetAmp=()=>{if(!confirm("Remettre tous les réglages Brunetti à 0 ?"))return;set("amp",Object.fromEntries(Object.keys(test.amp).map(k=>[k,"0"])))};
 return <div className="form">
  <datalist id="pedal-param-names">{PEDAL_PARAM_SUGGESTIONS.map(n=><option key={n} value={n}/>)}</datalist>
  <CollapsibleSection title="Identification" defaultOpen><div className="grid">
   <ReadOnlyField label="ID test" value={test.id}/><SelectField label="Artiste / Référence" value={test.artistReference} options={lists.artist} onChange={v=>set("artistReference",v)}/>
   <Field label="Morceau / Riff" value={test.song} onChange={v=>set("song",v)}/><Field label="Date" value={test.date} onChange={v=>set("date",v)}/>
   <SelectField label="Statut" value={test.status} options={lists.status} onChange={v=>set("status",v)}/>
  </div></CollapsibleSection>
  <CollapsibleSection title="Configuration"><div className="grid">
   <SelectField label="Guitare" value={test.guitar} options={lists.guitar} onChange={v=>set("guitar",v)}/><SelectField label="Accordage" value={test.tuning} options={lists.tuning} onChange={v=>set("tuning",v)}/>
   <SelectField label="Micro / Position" value={test.pickup} options={lists.pickup} onChange={v=>set("pickup",v)}/><SelectField label="Cabinet" value={test.cabinet} options={lists.cabinet} onChange={v=>set("cabinet",v)}/>
  </div></CollapsibleSection>
  <CollapsibleSection title="Brunetti XL R-EVO II" actions={<button type="button" className="reset-section-btn" onClick={resetAmp} title="Remettre tous les réglages à 0">🧹 Remettre à 0</button>}><div className="grid">
   <SelectField label="Canal Brunetti" value={test.channel} options={lists.channel} onChange={v=>set("channel",v)}/>
   {Object.entries(test.amp).map(([k,v])=><RangeField key={k} label={PARAM_LABELS.amp[k]??k} value={v} onChange={x=>nest("amp",k,x)}/>)}
  </div></CollapsibleSection>
  <CollapsibleSection title="Pédales d'effets" actions={<CatalogPicker catalog={catalog} onPick={onAddPedalFromCatalog}/>}>
   {test.pedals.map((p,i)=><div key={p.id} ref={el=>{pedalRefs.current[p.id]=el}} className={dragIndex===i?"pedal-drag-wrapper dragging":hoverIndex===i&&dragIndex!==null?"pedal-drag-wrapper drop-target":"pedal-drag-wrapper"}>
    <PedalCard pedal={p} catalog={catalog} onChange={updated=>onUpdatePedal(p.id,updated)} onRemove={()=>onRemovePedal(p.id)} onSaveAsTemplate={onSaveAsTemplate} dragHandle={<span className="pedal-drag-handle" onPointerDown={e=>{setDragIndex(i);(e.target as HTMLElement).setPointerCapture(e.pointerId)}} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} title="Glisser pour réordonner">⠿</span>}/>
   </div>)}
  </CollapsibleSection>
  <CollapsibleSection title="Notes du test"><div className="grid">
   <Area label="Autres pédales / chaîne" value={test.otherPedals} onChange={v=>set("otherPedals",v)}/><Area label="Objectif du test" value={test.objective} onChange={v=>set("objective",v)}/>
   <Area label="Observations" value={test.observations} onChange={v=>set("observations",v)}/><Area label="Résultat / Conclusion" value={test.conclusion} onChange={v=>set("conclusion",v)}/>
  </div><label className="check"><input type="checkbox" checked={test.retained} onChange={e=>set("retained",e.target.checked)}/> Profil retenu</label></CollapsibleSection>
 </div>
}
export function TestList({tests,selected,onSelect,statusOptions,statusFilter,onToggleStatusFilter,onRename,onDuplicate,onRemove}:{tests:TestRecord[],selected:string,onSelect:(id:string)=>void,statusOptions:string[],statusFilter:Set<string>,onToggleStatusFilter:(s:string)=>void,onRename:(id:string)=>void,onDuplicate:(id:string)=>void,onRemove:(id:string)=>void}){
 const [openMenu,setOpenMenu]=useState<string|null>(null);
 useEffect(()=>setOpenMenu(null),[selected]);
 useCloseOnOutsideClick(openMenu!==null,()=>setOpenMenu(null));
 return <div className="test-list-wrap">
  <div className="status-filter-bar">
   {statusOptions.map(s=><label key={s} className="status-filter-chip"><input type="checkbox" checked={statusFilter.has(s)} onChange={()=>onToggleStatusFilter(s)}/>{s}</label>)}
  </div>
  <div className="test-list">{tests.map(t=><div key={t.id} className={selected===t.id?"test-item active":"test-item"}>
   <button className="test-item-btn" onClick={()=>onSelect(t.id)}><strong>{t.artistReference||"Artiste non défini"}</strong><span>{t.song||"Morceau non défini"}</span><div className="test-item-meta"><small>{t.id}</small><span className="status-badge">{t.status}</span></div></button>
   <div className="menu test-item-menu">
    <button type="button" className="menu-trigger" onClick={()=>setOpenMenu(m=>m===t.id?null:t.id)} aria-label="Actions sur ce test">⋮</button>
    {openMenu===t.id&&<div className="menu-panel">
     <button type="button" onClick={()=>{setOpenMenu(null);onDuplicate(t.id)}}>Dupliquer</button>
     <button type="button" onClick={()=>{setOpenMenu(null);onRename(t.id)}}>Renommer</button>
     <button type="button" className="danger" onClick={()=>{setOpenMenu(null);onRemove(t.id)}}>Supprimer</button>
    </div>}
   </div>
  </div>)}</div>
 </div>;
}