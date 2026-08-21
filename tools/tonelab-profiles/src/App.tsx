import {useEffect,useMemo,useState} from "react";
import type {TestRecord,Pedal,PedalTemplate,AmpTemplate,Amp} from "./types";
import {emptyTest,sampleTests} from "./data";
import {load,save,migrateTest} from "./storage";
import {json,markdown} from "./export";
import {TestForm,TestList,PedalCatalogManager,AmpCatalogManager,ListManager,useCloseOnOutsideClick} from "./components";
import {loadLists,saveLists,mergeLists,downloadListsCode,type ListKey} from "./lists";
import {newTemplate,instantiatePedal,loadPedalCatalog,savePedalCatalog,mergeCatalog,downloadPedalCatalogCode,resyncPedalFromCatalog} from "./pedalCatalog";
import {newAmpTemplate,instantiateAmp,loadAmpCatalog,saveAmpCatalog,mergeAmpCatalog,downloadAmpCatalogCode,resyncAmpFromCatalog} from "./ampCatalog";
function id(t:TestRecord[]){return `TEST-${String(t.length+1).padStart(3,"0")}`}
type CategoryField="status"|"artistReference"|"guitar"|"tuning"|"pickup"|"cabinet";
const CATEGORY_FIELD:Record<ListKey,CategoryField>={status:"status",artist:"artistReference",guitar:"guitar",tuning:"tuning",pickup:"pickup",cabinet:"cabinet"};
export default function App(){
 const [tests,setTests]=useState<TestRecord[]>(()=>load().length?load():sampleTests);
 const [selected,setSelected]=useState(""); const [q,setQ]=useState("");
 const [lists,setLists]=useState(()=>loadLists());
 const [statusFilter,setStatusFilter]=useState<Set<string>>(()=>new Set(loadLists().status));
 const [catalog,setCatalog]=useState(()=>loadPedalCatalog());
 const [ampCatalog,setAmpCatalog]=useState(()=>loadAmpCatalog());
 const [mobileView,setMobileView]=useState<"list"|"form">("list");
 const [menuOpen,setMenuOpen]=useState(false);
 const [settingsOpen,setSettingsOpen]=useState(false);
 useEffect(()=>setMenuOpen(false),[selected,mobileView]);
 useCloseOnOutsideClick(menuOpen,()=>setMenuOpen(false));
 useEffect(()=>save(tests),[tests]);
 useEffect(()=>saveLists(lists),[lists]);
 useEffect(()=>savePedalCatalog(catalog),[catalog]);
 useEffect(()=>saveAmpCatalog(ampCatalog),[ampCatalog]);
 const filtered=useMemo(()=>{const x=q.toLowerCase().trim();return tests.filter(t=>(statusFilter.has(t.status)||!lists.status.includes(t.status))&&(!x||[t.id,t.artistReference,t.song,t.guitar,t.cabinet,t.amp.channel,t.status].join(" ").toLowerCase().includes(x)))},[tests,q,statusFilter,lists.status]);
 const current=tests.find(t=>t.id===selected)||filtered[0]||tests[0];
 function selectTest(id:string){setSelected(id);setMobileView("form")}
 function settingsFingerprint(t:TestRecord){return JSON.stringify([t.guitar,t.tuning,t.pickup,t.cabinet,t.amp,t.pedals,t.otherPedals,t.objective,t.observations,t.conclusion,t.retained])}
 function update(t:TestRecord){
  const changed=current&&settingsFingerprint(t)!==settingsFingerprint(current);
  const next=changed?{...t,date:new Date().toISOString().slice(0,10)}:t;
  setTests(a=>a.map(x=>x.id===current?.id?next:x));
 }
 function newTest(){const t=emptyTest();t.id=id(tests);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function duplicate(sourceId:string){const src=tests.find(t=>t.id===sourceId);if(!src)return;const t=JSON.parse(JSON.stringify(src)) as TestRecord;t.id=id(tests);t.status="À tester";t.retained=false;t.date=new Date().toISOString().slice(0,10);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function remove(id:string){if(!confirm(`Supprimer ${id} ?`))return;const a=tests.filter(x=>x.id!==id);setTests(a);if(current?.id===id){setSelected(a[0]?.id||"");if(!a.length)setMobileView("list")}}
 function rename(id:string){const next=prompt("Nouvel ID",id);if(!next||next===id)return;if(tests.some(t=>t.id===next)){alert("Cet ID existe déjà.");return}setTests(a=>a.map(x=>x.id===id?{...x,id:next}:x));if(current?.id===id)setSelected(next)}
 function renameListItem(cat:ListKey,oldV:string,newV:string){setLists(l=>({...l,[cat]:l[cat].map(x=>x===oldV?newV:x)}));const field=CATEGORY_FIELD[cat];setTests(a=>a.map(t=>t[field]===oldV?{...t,[field]:newV}:t));if(cat==="status")setStatusFilter(f=>{if(!f.has(oldV))return f;const n=new Set(f);n.delete(oldV);n.add(newV);return n})}
 function removeListItem(cat:ListKey,v:string){setLists(l=>({...l,[cat]:l[cat].filter(x=>x!==v)}));if(cat==="status")setStatusFilter(f=>{if(!f.has(v))return f;const n=new Set(f);n.delete(v);return n})}
 function addListItem(cat:ListKey,v:string){setLists(l=>l[cat].includes(v)?l:{...l,[cat]:[...l[cat],v]});if(cat==="status")setStatusFilter(f=>new Set(f).add(v))}
 function toggleStatusFilter(s:string){setStatusFilter(f=>{const n=new Set(f);n.has(s)?n.delete(s):n.add(s);return n})}
 function addPedalFromCatalog(tpl:PedalTemplate){if(!current)return;if(current.pedals.some(p=>p.templateId===tpl.id)){alert(`"${tpl.brand} ${tpl.model}" est déjà présente dans ce test.`);return}update({...current,pedals:[...current.pedals,instantiatePedal(tpl)]})}
 function updatePedal(id:string,pedal:Pedal){if(!current)return;update({...current,pedals:current.pedals.map(p=>p.id===id?pedal:p)})}
 function removePedal(id:string){if(!current)return;update({...current,pedals:current.pedals.filter(p=>p.id!==id)})}
 function saveAsTemplate(tpl:PedalTemplate){setCatalog(c=>[...c,tpl])}
 function addCatalogTemplate(){setCatalog(c=>[...c,newTemplate()])}
 function updateCatalogTemplate(id:string,tpl:PedalTemplate){
  const nextCatalog=catalog.map(t=>t.id===id?tpl:t);
  setCatalog(nextCatalog);
  setTests(a=>a.map(t=>({...t,pedals:t.pedals.map(p=>p.templateId===id?resyncPedalFromCatalog(p,nextCatalog):p)})));
 }
 function removeCatalogTemplate(id:string){setCatalog(c=>c.filter(t=>t.id!==id))}
 function replaceAmpFromCatalog(tpl:AmpTemplate){if(!current)return;if(!confirm(`Remplacer l'ampli actuel par "${tpl.brand} ${tpl.model}" ? Les réglages actuels seront perdus.`))return;update({...current,amp:instantiateAmp(tpl)})}
 function updateAmpParams(amp:Amp){if(!current)return;update({...current,amp})}
 function addAmpCatalogTemplate(){setAmpCatalog(c=>[...c,newAmpTemplate()])}
 function updateAmpCatalogTemplate(id:string,tpl:AmpTemplate){
  const nextCatalog=ampCatalog.map(t=>t.id===id?tpl:t);
  setAmpCatalog(nextCatalog);
  setTests(a=>a.map(t=>t.amp.templateId===id?{...t,amp:resyncAmpFromCatalog(t.amp,nextCatalog)}:t));
 }
 function removeAmpCatalogTemplate(id:string){setAmpCatalog(c=>c.filter(t=>t.id!==id))}
 function importJson(){const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async()=>{const f=i.files?.[0];if(!f)return;const d=JSON.parse(await f.text());if(!Array.isArray(d.tests))throw new Error("JSON ToneLab invalide");const migrated=d.tests.map(migrateTest);setTests(migrated);setSelected(migrated[0]?.id||"");setLists(mergeLists(d.lists));setCatalog(mergeCatalog(d.catalog));setAmpCatalog(mergeAmpCatalog(d.ampCatalog))};i.click()}
 return <main><header><div><div className="eyebrow">TONELAB</div><h1>Profiles</h1><p>Laboratoire de réglages du Brunetti XL R-EVO II</p></div><div className="actions">
  <button className="primary" onClick={newTest}>+ Nouveau test</button>
  <div className="menu">
   <button className="menu-trigger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Plus d'actions">⋮</button>
   {menuOpen&&<div className="menu-panel">
    <button onClick={()=>{current&&markdown(current);setMenuOpen(false)}} disabled={!current}>Exporter Markdown</button>
    <button onClick={()=>{json(tests,lists,catalog,ampCatalog);setMenuOpen(false)}}>Exporter JSON</button>
    <button onClick={()=>{importJson();setMenuOpen(false)}}>Importer JSON</button>
    <button onClick={()=>{downloadListsCode(lists);setMenuOpen(false)}}>Générer les listes par défaut (.ts)</button>
    <button onClick={()=>{downloadPedalCatalogCode(catalog);setMenuOpen(false)}}>Générer le catalogue de pédales (.ts)</button>
    <button onClick={()=>{downloadAmpCatalogCode(ampCatalog);setMenuOpen(false)}}>Générer le catalogue d'amplis (.ts)</button>
   </div>}
  </div>
  <button type="button" className="settings-trigger" onClick={()=>setSettingsOpen(true)} aria-label="Paramètres" title="Paramètres (listes, catalogue de pédales)">⚙</button>
 </div></header>
 {settingsOpen&&<div className="modal-overlay" onClick={()=>setSettingsOpen(false)}>
  <div className="modal-panel" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2>Paramètres</h2><button type="button" className="modal-close" onClick={()=>setSettingsOpen(false)} aria-label="Fermer">✕</button></div>
   <PedalCatalogManager catalog={catalog} onUpdate={updateCatalogTemplate} onAdd={addCatalogTemplate} onRemove={removeCatalogTemplate}/>
   <AmpCatalogManager catalog={ampCatalog} onUpdate={updateAmpCatalogTemplate} onAdd={addAmpCatalogTemplate} onRemove={removeAmpCatalogTemplate}/>
   <ListManager lists={lists} onRename={renameListItem} onRemove={removeListItem} onAdd={addListItem}/>
  </div>
 </div>}
 <div className={`workspace ${mobileView==="form"?"show-form":"show-list"}`}><aside><input className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)}/>
  <TestList tests={filtered} selected={current?.id||""} onSelect={selectTest} statusOptions={lists.status} statusFilter={statusFilter} onToggleStatusFilter={toggleStatusFilter} onRename={rename} onDuplicate={duplicate} onRemove={remove}/>
 </aside><article><button className="back-mobile" onClick={()=>setMobileView("list")}>← Tests</button>{current?<TestForm test={current} lists={lists} onChange={update} catalog={catalog} onAddPedalFromCatalog={addPedalFromCatalog} onUpdatePedal={updatePedal} onRemovePedal={removePedal} onSaveAsTemplate={saveAsTemplate} ampCatalog={ampCatalog} onReplaceAmpFromCatalog={replaceAmpFromCatalog} onUpdateAmpParams={updateAmpParams}/>:<div className="empty">Aucun test.</div>}</article></div></main>
}