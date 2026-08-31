import {useState,useRef,useEffect,useId} from "react";
import type {ReactNode,CSSProperties} from "react";
import type {TestRecord,Pedal,PedalParam,PedalTemplate,ControlKind,AmpTemplate,Amp} from "./types";
import {resyncPedalFromCatalog,pedalNeedsResync} from "./pedalCatalog";
import {resyncAmpFromCatalog,ampNeedsResync} from "./ampCatalog";
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
 const opts=options.includes(value)?options:[value,...options]; // garantit une option correspondant à value="" pour éviter la fausse pré-sélection du navigateur
 return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></label>
}
function Area({label,value,onChange,autoGrow}:{label?:string,value:string,onChange:(v:string)=>void,autoGrow?:boolean}){
 const ref=useRef<HTMLTextAreaElement>(null);
 const resize=()=>{const el=ref.current;if(el){el.style.height="auto";el.style.height=el.scrollHeight+"px"}};
 useEffect(()=>{if(autoGrow)resize()},[value,autoGrow]);
 return <label className={autoGrow?"field full area-autogrow":"field full"}>{label&&<span>{label}</span>}<textarea ref={ref} value={value} onChange={e=>onChange(e.target.value)} rows={autoGrow?3:4}/></label>;
}
const LIST_KEYS:ListKey[]=["status","artist","guitar","tuning","pickup","cabinet"];
const PEDAL_PARAM_SUGGESTIONS=["Drive","Gain","Tone","Level","Volume","Bass","Mid","Treble","Presence","Depth","Bloom","Fuzz","Sustain","Attack","Release","Speed","Rate","Mix","Sensitivity","Output","Blend"];
function ParamRow({param,onChange,onRemove,removable=true,ampChannels,dragHandle}:{param:PedalParam,onChange:(patch:Partial<PedalParam>)=>void,onRemove:()=>void,removable?:boolean,ampChannels?:string[],dragHandle?:ReactNode}){
 const configTitleId=useId();
 const [nameEditing,setNameEditing]=useState(false);
 const [nameDraft,setNameDraft]=useState(param.name);
 const commitName=()=>{const v=nameDraft.trim();if(v)onChange({name:v});setNameEditing(false)};
 const nameField=nameEditing
  ?<input autoFocus className="pedal-param-name-input" list="pedal-param-names" value={nameDraft} onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commitName();if(e.key==="Escape"){setNameDraft(param.name);setNameEditing(false)}}} onBlur={commitName}/>
  :<span className="pedal-param-name-label" onClick={()=>{setNameDraft(param.name);setNameEditing(true)}} title="Cliquer pour renommer">{param.name}</span>;
 const [configOpen,setConfigOpen]=useState(false);
 const setPositionsCount=(n:2|3)=>{
  const current=param.options||["OFF","ON"];
  const next=current.slice(0,n);
  while(next.length<n)next.push(`Position ${next.length+1}`);
  onChange({options:next,value:next.includes(param.value)?param.value:next[0]});
 };
 const setPositionLabel=(idx:number,label:string)=>{
  const next=[...(param.options||["OFF","ON"])];
  next[idx]=label;
  onChange({options:next,value:next.includes(param.value)?param.value:next[0]});
 };
 const toggleChannel=(c:string)=>{
  const current=param.onlyChannels||[];
  const next=current.includes(c)?current.filter(x=>x!==c):[...current,c];
  onChange({onlyChannels:next.length?next:undefined});
 };
 const configPanel=removable&&<>
  <button type="button" className="switch-config" onClick={()=>setConfigOpen(true)} title="Configurer ce réglage" aria-label="Configurer ce réglage">⚙</button>
  {configOpen&&<div className="param-config-overlay" onClick={()=>setConfigOpen(false)}>
   <div className="param-config-panel" role="dialog" aria-modal="true" aria-labelledby={configTitleId} onClick={e=>e.stopPropagation()}>
    <div className="param-config-panel-header"><strong id={configTitleId}>{param.name}</strong><button type="button" className="modal-close" onClick={()=>setConfigOpen(false)} aria-label="Fermer">✕</button></div>
    {param.kind==="switch"?<>
     <div className="param-config-positions-count">
      <button type="button" className={(param.options||["OFF","ON"]).length===2?"switch-toggle-option active":"switch-toggle-option"} onClick={()=>setPositionsCount(2)}>2</button>
      <button type="button" className={(param.options||["OFF","ON"]).length===3?"switch-toggle-option active":"switch-toggle-option"} onClick={()=>setPositionsCount(3)}>3</button>
     </div>
     <div className="param-config-positions-labels">
      {(param.options||["OFF","ON"]).map((opt,idx)=><input key={idx} type="text" value={opt} onChange={e=>setPositionLabel(idx,e.target.value)}/>)}
     </div>
    </>:<div className="param-config-minmaxstep">
     <label>Min<input type="number" value={param.min??0} onChange={e=>{const n=Number(e.target.value);if(!isNaN(n))onChange({min:n})}}/></label>
     <label>Max<input type="number" value={param.max??10} onChange={e=>{const n=Number(e.target.value);if(!isNaN(n))onChange({max:n})}}/></label>
     <label>Pas<input type="number" step="0.1" value={param.step??0.5} onChange={e=>{const n=Number(e.target.value);if(!isNaN(n))onChange({step:n})}}/></label>
    </div>}
    {ampChannels&&<>
     <span className="param-config-title">Canaux</span>
     <div className="param-config-channels">
      {ampChannels.map(c=><label key={c} className="channel-picker-option"><input type="checkbox" checked={(param.onlyChannels||[]).includes(c)} onChange={()=>toggleChannel(c)}/> {c}</label>)}
     </div>
    </>}
   </div>
  </div>}
 </>;
 return <div className={param.kind==="switch"?"field pedal-param pedal-param--switch":"field pedal-param"}>
  {param.kind==="switch"
   ?<div className="pedal-param-row">
     {dragHandle}
     <div className="switch-toggle">
      {(param.options||["OFF","ON"]).map(o=><button type="button" key={o} className={param.value===o?"switch-toggle-option active":"switch-toggle-option"} onClick={()=>onChange({value:o})}>{o}</button>)}
     </div>
     {configPanel}
     {nameField}
     {removable&&<button type="button" className="chip-remove" onClick={onRemove} aria-label="Supprimer ce composant">✕</button>}
    </div>
   :<div className={removable?"pedal-param-row pedal-param-row--range":"pedal-param-row pedal-param-row--range pedal-param-row--aligned"}>
     {dragHandle}
     {nameField}
     <div className={param.kind==="slider"?"range-row range-row--slider":"range-row range-row--knob"}>
      {(()=>{const min=param.min??0;const max=param.max??10;const step=param.step??0.5;const num=Number(param.value)||0;const set=(n:number)=>onChange({value:String(Math.min(max,Math.max(min,n)))});return <>
       <button type="button" onClick={()=>set(num-step)}>−</button>
       <input type="range" min={min} max={max} step={step} value={num} onChange={e=>set(Number(e.target.value))}/>
       <output>{num}</output>
       <button type="button" onClick={()=>set(num+step)}>+</button>
      </>})()}
     </div>
     {configPanel}
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
  <button type="button" className="menu-trigger" onClick={()=>setOpen(o=>!o)} aria-label="Ajouter un réglage" aria-haspopup="true" aria-expanded={open}>+</button>
  {open&&<div className="menu-panel param-add-panel" role="menu">
   <button type="button" onClick={()=>pick("knob")}>+ Potard</button>
   <button type="button" onClick={()=>pick("slider")}>+ Slider</button>
   <button type="button" onClick={()=>pick("switch")}>+ Switch</button>
  </div>}
 </div>;
}
function AmpSwitcher({catalog,onPick}:{catalog:AmpTemplate[],onPick:(tpl:AmpTemplate)=>void}){
 const [open,setOpen]=useState(false);
 useCloseOnOutsideClick(open,()=>setOpen(false));
 if(catalog.length===0)return null;
 return <div className="menu amp-switch-menu">
  <button type="button" className="switch-config" onClick={()=>setOpen(o=>!o)} title="Changer d'ampli" aria-label="Changer d'ampli" aria-haspopup="true" aria-expanded={open}>⇄</button>
  {open&&<div className="menu-panel" role="menu">
   {catalog.map(tpl=><button type="button" key={tpl.id} onClick={()=>{onPick(tpl);setOpen(false)}}>{tpl.brand} — {tpl.model}</button>)}
  </div>}
 </div>;
}
function ParamListEditor({params,onChange,removable=true,ampChannels}:{params:PedalParam[],onChange:(params:PedalParam[])=>void,removable?:boolean,ampChannels?:string[]}){
 const [dragIndex,setDragIndex]=useState<number|null>(null);
 const [hoverIndex,setHoverIndex]=useState<number|null>(null);
 const rowRefs=useRef<(HTMLDivElement|null)[]>([]);
 const setParam=(i:number,patch:Partial<PedalParam>)=>onChange(params.map((p,idx)=>idx===i?{...p,...patch}:p));
 const removeParam=(i:number)=>onChange(params.filter((_,idx)=>idx!==i));
 const reorder=(from:number,to:number)=>{
  if(from===to)return;
  const next=[...params];
  const [moved]=next.splice(from,1);
  next.splice(to,0,moved);
  onChange(next);
 };
 // Glisser-déposer via Pointer Events (souris + tactile), même mécanisme que le réordonnancement des pédales.
 const handlePointerMove=(e:{clientY:number})=>{
  if(dragIndex===null)return;
  const y=e.clientY;
  let closest=dragIndex,closestDist=Infinity;
  params.forEach((_,idx)=>{
   const el=rowRefs.current[idx];
   if(!el)return;
   const rect=el.getBoundingClientRect();
   const dist=Math.abs(y-(rect.top+rect.height/2));
   if(dist<closestDist){closestDist=dist;closest=idx}
  });
  setHoverIndex(closest);
 };
 const handlePointerUp=()=>{
  if(dragIndex!==null&&hoverIndex!==null)reorder(dragIndex,hoverIndex);
  setDragIndex(null);
  setHoverIndex(null);
 };
 const rangeLengths=params.filter(p=>p.kind!=="switch").map(p=>p.name.length);
 const labelCh=rangeLengths.length?Math.min(16,Math.max(6,Math.max(...rangeLengths)))+1:0;
 const style=!removable&&labelCh?({"--param-label-ch":`${labelCh}ch`} as CSSProperties):(removable?({gridTemplateColumns:"1fr"} as CSSProperties):undefined);
 return <div className="grid" style={style}>{params.map((p,i)=>
  <div key={i} ref={el=>{rowRefs.current[i]=el}} className={dragIndex===i?"pedal-drag-wrapper dragging":hoverIndex===i&&dragIndex!==null?"pedal-drag-wrapper drop-target":"pedal-drag-wrapper"}>
   <ParamRow param={p} onChange={patch=>setParam(i,patch)} onRemove={()=>removeParam(i)} removable={removable} ampChannels={ampChannels}
    dragHandle={removable?<span className="pedal-drag-handle" onPointerDown={e=>{setDragIndex(i);(e.target as HTMLElement).setPointerCapture(e.pointerId)}} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} title="Glisser pour réordonner">⣿</span>:undefined}/>
  </div>)}
 </div>;
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
    <button type="button" className="pedal-reset-btn" onClick={resetParams} title="Remettre tous les réglages à 0">⏮</button>
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
function AmpTemplateEditor({template,onChange,onRemove}:{template:AmpTemplate,onChange:(tpl:AmpTemplate)=>void,onRemove:()=>void}){
 const [channelDraft,setChannelDraft]=useState("");
 const addChannel=()=>{const v=channelDraft.trim();if(v&&!template.channels.includes(v)){onChange({...template,channels:[...template.channels,v]});setChannelDraft("")}};
 return <div className="template-editor">
  <div className="template-editor-header">
   <input value={template.brand} placeholder="Marque" onChange={e=>onChange({...template,brand:e.target.value})}/>
   <input value={template.model} placeholder="Modèle" onChange={e=>onChange({...template,model:e.target.value})}/>
  </div>
  <div className="chip-row">
   {template.channels.map(ch=><Chip key={ch} item={ch} onRename={v=>onChange({...template,channels:template.channels.map(c=>c===ch?v:c)})} onRemove={()=>onChange({...template,channels:template.channels.filter(c=>c!==ch)})}/>)}
   <span className="chip chip-add">
    <input placeholder="+ Canal" value={channelDraft} onChange={e=>setChannelDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addChannel()}}/>
    <button type="button" onClick={addChannel} aria-label="Ajouter un canal">+</button>
   </span>
  </div>
  <div className="template-editor-toolbar">
   <AddParamMenu onAdd={kind=>onChange({...template,params:[...template.params,newParam(kind)]})}/>
   <button type="button" className="danger template-remove-btn" onClick={onRemove}>✕ Supprimer ce modèle</button>
  </div>
  <ParamListEditor params={template.params} onChange={params=>onChange({...template,params})} ampChannels={template.channels}/>
 </div>;
}
export function AmpCatalogManager({catalog,onUpdate,onAdd,onRemove}:{catalog:AmpTemplate[],onUpdate:(id:string,tpl:AmpTemplate)=>void,onAdd:()=>void,onRemove:(id:string)=>void}){
 const [selectedId,setSelectedId]=useState<string|null>(catalog[0]?.id??null);
 const selected=catalog.find(t=>t.id===selectedId)??null;
 return <CollapsibleSection title="Gérer le catalogue d'amplis">
  <div className="catalog-manager-toolbar">
   <button type="button" className="catalog-add-model" onClick={onAdd}>+ Nouveau modèle</button>
  </div>
  <div className="catalog-manager-list">
   {catalog.map(tpl=><button type="button" key={tpl.id} className={selectedId===tpl.id?"catalog-manager-item active":"catalog-manager-item"} onClick={()=>setSelectedId(tpl.id)}>{tpl.brand||"?"} {tpl.model||"Nouveau"}</button>)}
  </div>
  {selected&&<AmpTemplateEditor template={selected} onChange={tpl=>onUpdate(selected.id,tpl)} onRemove={()=>{if(confirm(`Supprimer le modèle "${selected.brand} ${selected.model}" ?`)){onRemove(selected.id);setSelectedId(catalog.find(t=>t.id!==selected.id)?.id??null)}}}/>}
 </CollapsibleSection>;
}
function CatalogPicker<T extends {id:string,brand:string,model:string}>({catalog,onPick,placeholder="Depuis le catalogue…"}:{catalog:T[],onPick:(tpl:T)=>void,placeholder?:string}){
 const [resetKey,setResetKey]=useState(0);
 if(catalog.length===0)return <select disabled className="catalog-picker-select"><option>Catalogue vide</option></select>;
 return <label className="field field-inline">
  <span className="visually-hidden">{placeholder}</span>
  <select key={resetKey} className="catalog-picker-select" defaultValue="" onChange={e=>{const tpl=catalog.find(t=>t.id===e.target.value);if(tpl){onPick(tpl);setResetKey(k=>k+1)}}}>
   <option value="" hidden>{placeholder}</option>
   {catalog.map(tpl=><option key={tpl.id} value={tpl.id}>{tpl.brand} — {tpl.model}</option>)}
  </select>
 </label>;
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
export function TestForm({test,lists,onChange,catalog,onAddPedalFromCatalog,onUpdatePedal,onRemovePedal,onSaveAsTemplate,ampCatalog,onReplaceAmpFromCatalog,onUpdateAmpParams}:{
 test:TestRecord,lists:Lists,onChange:(t:TestRecord)=>void,
 catalog:PedalTemplate[],onAddPedalFromCatalog:(tpl:PedalTemplate)=>void,onUpdatePedal:(id:string,pedal:Pedal)=>void,onRemovePedal:(id:string)=>void,onSaveAsTemplate:(tpl:PedalTemplate)=>void,
 ampCatalog:AmpTemplate[],onReplaceAmpFromCatalog:(tpl:AmpTemplate)=>void,onUpdateAmpParams:(amp:Amp)=>void
}){
 const set=(k:keyof TestRecord,v:unknown)=>onChange({...test,[k]:v});
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
 const resetAmp=()=>{if(!confirm("Remettre tous les réglages ampli à 0 ?"))return;onUpdateAmpParams({...test.amp,params:test.amp.params.map(p=>({...p,value:"0"}))})};
 const ampTpl=ampCatalog.find(t=>t.id===test.amp.templateId);
 const ampOutOfSync=ampNeedsResync(test.amp,ampCatalog);
 const [ampLinking,setAmpLinking]=useState(false);
 const visibleAmpParams=test.amp.params.filter(p=>!p.onlyChannels||p.onlyChannels.length===0||p.onlyChannels.includes(test.amp.channel));
 const onAmpParamsChange=(params:PedalParam[])=>{
  const byName=new Map(params.map(p=>[p.name,p]));
  onUpdateAmpParams({...test.amp,params:test.amp.params.map(p=>byName.get(p.name)??p)});
 };
 return <div className="form">
  <datalist id="pedal-param-names">{PEDAL_PARAM_SUGGESTIONS.map(n=><option key={n} value={n}/>)}</datalist>
  <CollapsibleSection title="Identification" defaultOpen><div className="grid">
   <Field label="ID test" value={test.id} onChange={v=>set("id",v)}/><SelectField label="Artiste / Référence" value={test.artistReference} options={lists.artist} onChange={v=>set("artistReference",v)}/>
   <Field label="Morceau / Riff" value={test.song} onChange={v=>set("song",v)}/><Field label="Date" value={test.date} onChange={v=>set("date",v)}/>
   <SelectField label="Statut" value={test.status} options={lists.status} onChange={v=>set("status",v)}/>
  </div></CollapsibleSection>
  <CollapsibleSection title="Configuration"><div className="grid">
   <SelectField label="Guitare" value={test.guitar} options={lists.guitar} onChange={v=>set("guitar",v)}/><SelectField label="Accordage" value={test.tuning} options={lists.tuning} onChange={v=>set("tuning",v)}/>
   <SelectField label="Micro / Position" value={test.pickup} options={lists.pickup} onChange={v=>set("pickup",v)}/><SelectField label="Cabinet" value={test.cabinet} options={lists.cabinet} onChange={v=>set("cabinet",v)}/>
  </div></CollapsibleSection>
  <CollapsibleSection title={test.amp.name||"Ampli"} actions={<span className="pedal-card-actions">
   <button type="button" className="pedal-reset-btn" onClick={resetAmp} title="Remettre tous les réglages à 0">⏮</button>
   <AmpSwitcher catalog={ampCatalog.filter(t=>t.id!==test.amp.templateId)} onPick={onReplaceAmpFromCatalog}/>
  </span>}>
   {ampTpl&&<div className="amp-channel-row">
    <label className="field field-inline">
     <span>Canal</span>
     <select value={test.amp.channel} onChange={e=>onUpdateAmpParams({...test.amp,channel:e.target.value})}>
      {ampTpl.channels.map(c=><option key={c} value={c}>{c}</option>)}
     </select>
    </label>
   </div>}
   {ampTpl
    ?(ampOutOfSync&&<button type="button" className="pedal-resync-corner" onClick={()=>{if(confirm(`Resynchroniser l'ampli avec le modèle "${ampTpl.brand} ${ampTpl.model}" du catalogue ? Les valeurs compatibles seront conservées.`))onUpdateAmpParams(resyncAmpFromCatalog(test.amp,ampCatalog))}} title="Le catalogue a changé — recharger les réglages">⟳</button>)
    :(ampLinking
      ?<CatalogPicker catalog={ampCatalog} onPick={tpl=>{onUpdateAmpParams(resyncAmpFromCatalog({...test.amp,templateId:tpl.id},ampCatalog));setAmpLinking(false)}} placeholder="Choisir un modèle…"/>
      :<button type="button" className="pedal-resync-corner" onClick={()=>setAmpLinking(true)} title="Relier cet ampli à un modèle du catalogue">🔗</button>)}
   <ParamListEditor params={visibleAmpParams} onChange={onAmpParamsChange} removable={false}/>
  </CollapsibleSection>
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
  <div className="test-list">{tests.map(t=><div key={t.id} className={selected===t.id?"test-item active menu":"test-item menu"}>
   <div className="test-item-row">
    <button className="test-item-btn" onClick={()=>onSelect(t.id)}><strong>{t.artistReference||"Artiste non défini"}</strong><span>{t.song||"Morceau non défini"}</span><div className="test-item-meta"><small>{t.id}</small><span className="status-badge">{t.status}</span></div></button>
    <div className="test-item-menu">
     <button type="button" className="menu-trigger" onClick={()=>setOpenMenu(m=>m===t.id?null:t.id)} aria-label="Actions sur ce test" aria-haspopup="true" aria-expanded={openMenu===t.id}>⋮</button>
     {openMenu===t.id&&<div className="test-item-menu-panel" role="menu">
      <button type="button" title="Dupliquer" onClick={()=>{setOpenMenu(null);onDuplicate(t.id)}}>⧉</button>
      <button type="button" title="Renommer" onClick={()=>{setOpenMenu(null);onRename(t.id)}}>✎</button>
      <button type="button" className="danger" title="Supprimer" onClick={()=>{setOpenMenu(null);onRemove(t.id)}}>🗑</button>
     </div>}
    </div>
   </div>
  </div>)}</div>
 </div>;
}