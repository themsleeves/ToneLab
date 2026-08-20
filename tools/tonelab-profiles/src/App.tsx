import {useEffect,useMemo,useState} from "react";
import type {TestRecord,Pedal,PedalTemplate} from "./types";
import {emptyTest,sampleTests} from "./data";
import {load,save,migrateTest} from "./storage";
import {csv,json,markdown} from "./export";
import {TestForm,TestList} from "./components";
import {loadLists,saveLists,mergeLists,downloadListsCode,type ListKey} from "./lists";
import {newPedal,newTemplate,instantiatePedal,loadPedalCatalog,savePedalCatalog,mergeCatalog,downloadPedalCatalogCode} from "./pedalCatalog";
function id(t:TestRecord[]){return `TEST-${String(t.length+1).padStart(3,"0")}`}
type CategoryField="status"|"artistReference"|"guitar"|"tuning"|"pickup"|"channel"|"cabinet";
const CATEGORY_FIELD:Record<ListKey,CategoryField>={status:"status",artist:"artistReference",guitar:"guitar",tuning:"tuning",pickup:"pickup",channel:"channel",cabinet:"cabinet"};
export default function App(){
 const [tests,setTests]=useState<TestRecord[]>(()=>load().length?load():sampleTests);
 const [selected,setSelected]=useState(""); const [q,setQ]=useState("");
 const [checked,setChecked]=useState<Set<string>>(new Set());
 const [lists,setLists]=useState(()=>loadLists());
 const [statusFilter,setStatusFilter]=useState<Set<string>>(()=>new Set(loadLists().status));
 const [catalog,setCatalog]=useState(()=>loadPedalCatalog());
 const [mobileView,setMobileView]=useState<"list"|"form">("list");
 const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>save(tests),[tests]);
 useEffect(()=>saveLists(lists),[lists]);
 useEffect(()=>savePedalCatalog(catalog),[catalog]);
 const filtered=useMemo(()=>{const x=q.toLowerCase().trim();return tests.filter(t=>(statusFilter.has(t.status)||!lists.status.includes(t.status))&&(!x||[t.id,t.artistReference,t.song,t.guitar,t.cabinet,t.channel,t.status].join(" ").toLowerCase().includes(x)))},[tests,q,statusFilter,lists.status]);
 const current=tests.find(t=>t.id===selected)||filtered[0]||tests[0];
 function selectTest(id:string){setSelected(id);setMobileView("form")}
 function update(t:TestRecord){setTests(a=>a.map(x=>x.id===current?.id?t:x))}
 function newTest(){const t=emptyTest();t.id=id(tests);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function duplicate(){if(!current)return;const t=JSON.parse(JSON.stringify(current)) as TestRecord;t.id=id(tests);t.status="À tester";t.retained=false;t.date=new Date().toISOString().slice(0,10);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function remove(id:string){if(!confirm(`Supprimer ${id} ?`))return;const a=tests.filter(x=>x.id!==id);setTests(a);if(current?.id===id){setSelected(a[0]?.id||"");if(!a.length)setMobileView("list")}}
 function rename(id:string){const next=prompt("Nouvel ID",id);if(!next||next===id)return;if(tests.some(t=>t.id===next)){alert("Cet ID existe déjà.");return}setTests(a=>a.map(x=>x.id===id?{...x,id:next}:x));if(current?.id===id)setSelected(next)}
 function toggleCheck(id:string){setChecked(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n})}
 function toggleCheckAll(){setChecked(s=>s.size===filtered.length&&filtered.length>0?new Set():new Set(filtered.map(t=>t.id)))}
 function removeSelected(){if(checked.size===0)return;if(!confirm(`Supprimer ${checked.size} test(s) ?`))return;const a=tests.filter(x=>!checked.has(x.id));setTests(a);if(current&&checked.has(current.id)){setSelected(a[0]?.id||"");if(!a.length)setMobileView("list")}setChecked(new Set())}
 function renameListItem(cat:ListKey,oldV:string,newV:string){setLists(l=>({...l,[cat]:l[cat].map(x=>x===oldV?newV:x)}));const field=CATEGORY_FIELD[cat];setTests(a=>a.map(t=>t[field]===oldV?{...t,[field]:newV}:t));if(cat==="status")setStatusFilter(f=>{if(!f.has(oldV))return f;const n=new Set(f);n.delete(oldV);n.add(newV);return n})}
 function removeListItem(cat:ListKey,v:string){setLists(l=>({...l,[cat]:l[cat].filter(x=>x!==v)}));if(cat==="status")setStatusFilter(f=>{if(!f.has(v))return f;const n=new Set(f);n.delete(v);return n})}
 function addListItem(cat:ListKey,v:string){setLists(l=>l[cat].includes(v)?l:{...l,[cat]:[...l[cat],v]});if(cat==="status")setStatusFilter(f=>new Set(f).add(v))}
 function toggleStatusFilter(s:string){setStatusFilter(f=>{const n=new Set(f);n.has(s)?n.delete(s):n.add(s);return n})}
 function addPedal(){if(!current)return;update({...current,pedals:[...current.pedals,newPedal()]})}
 function addPedalFromCatalog(tpl:PedalTemplate){if(!current)return;if(current.pedals.some(p=>p.templateId===tpl.id)){alert(`"${tpl.brand} ${tpl.model}" est déjà présente dans ce test.`);return}update({...current,pedals:[...current.pedals,instantiatePedal(tpl)]})}
 function updatePedal(id:string,pedal:Pedal){if(!current)return;update({...current,pedals:current.pedals.map(p=>p.id===id?pedal:p)})}
 function removePedal(id:string){if(!current)return;update({...current,pedals:current.pedals.filter(p=>p.id!==id)})}
 function saveAsTemplate(tpl:PedalTemplate){setCatalog(c=>[...c,tpl])}
 function addCatalogTemplate(){setCatalog(c=>[...c,newTemplate()])}
 function updateCatalogTemplate(id:string,tpl:PedalTemplate){setCatalog(c=>c.map(t=>t.id===id?tpl:t))}
 function removeCatalogTemplate(id:string){setCatalog(c=>c.filter(t=>t.id!==id))}
 function importJson(){const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async()=>{const f=i.files?.[0];if(!f)return;const d=JSON.parse(await f.text());if(!Array.isArray(d.tests))throw new Error("JSON ToneLab invalide");const migrated=d.tests.map(migrateTest);setTests(migrated);setSelected(migrated[0]?.id||"");setLists(mergeLists(d.lists));setCatalog(mergeCatalog(d.catalog))};i.click()}
 return <main><header><div><div className="eyebrow">TONELAB</div><h1>Profiles</h1><p>Laboratoire de réglages du Brunetti XL R-EVO II</p></div><div className="actions">
  <button className="primary" onClick={newTest}>+ Nouveau test</button>
  <div className="menu">
   <button className="menu-trigger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Plus d'actions">⋮</button>
   {menuOpen&&<div className="menu-panel">
    <button onClick={()=>{duplicate();setMenuOpen(false)}} disabled={!current}>Dupliquer</button>
    <button onClick={()=>{current&&markdown(current);setMenuOpen(false)}} disabled={!current}>Exporter Markdown</button>
    <button onClick={()=>{csv(tests);setMenuOpen(false)}}>Exporter CSV</button>
    <button onClick={()=>{json(tests,lists,catalog);setMenuOpen(false)}}>Exporter JSON</button>
    <button onClick={()=>{importJson();setMenuOpen(false)}}>Importer JSON</button>
    <button onClick={()=>{downloadListsCode(lists);setMenuOpen(false)}}>Générer les listes par défaut (.ts)</button>
    <button onClick={()=>{downloadPedalCatalogCode(catalog);setMenuOpen(false)}}>Générer le catalogue de pédales (.ts)</button>
   </div>}
  </div>
 </div></header>
 <div className={`workspace ${mobileView==="form"?"show-form":"show-list"}`}><aside><input className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)}/>
  <div className="bulk-actions"><button onClick={toggleCheckAll}>{checked.size===filtered.length&&filtered.length>0?"Tout désélectionner":"Tout sélectionner"}</button><button className="danger" onClick={removeSelected} disabled={checked.size===0}>Supprimer la sélection ({checked.size})</button></div>
  <TestList tests={filtered} selected={current?.id||""} checked={checked} onSelect={selectTest} onToggleCheck={toggleCheck} statusOptions={lists.status} statusFilter={statusFilter} onToggleStatusFilter={toggleStatusFilter} onRename={rename} onRemove={remove}/>
 </aside><article><button className="back-mobile" onClick={()=>setMobileView("list")}>← Tests</button>{current?<TestForm test={current} lists={lists} onChange={update} onRenameListItem={renameListItem} onRemoveListItem={removeListItem} onAddListItem={addListItem} catalog={catalog} onAddPedal={addPedal} onAddPedalFromCatalog={addPedalFromCatalog} onUpdatePedal={updatePedal} onRemovePedal={removePedal} onSaveAsTemplate={saveAsTemplate} onAddCatalogTemplate={addCatalogTemplate} onUpdateCatalogTemplate={updateCatalogTemplate} onRemoveCatalogTemplate={removeCatalogTemplate}/>:<div className="empty">Aucun test.</div>}</article></div></main>
}