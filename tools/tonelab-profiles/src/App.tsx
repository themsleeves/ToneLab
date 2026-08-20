import {useEffect,useMemo,useState} from "react";
import type {TestRecord} from "./types";
import {emptyTest,sampleTests} from "./data";
import {load,save} from "./storage";
import {csv,json,markdown} from "./export";
import {TestForm,TestList} from "./components";
import {loadLists,saveLists,mergeLists,downloadListsCode,type ListKey} from "./lists";
function id(t:TestRecord[]){return `TEST-${String(t.length+1).padStart(3,"0")}`}
type CategoryField="status"|"artistReference"|"guitar"|"tuning"|"pickup"|"channel"|"cabinet";
const CATEGORY_FIELD:Record<ListKey,CategoryField>={status:"status",artist:"artistReference",guitar:"guitar",tuning:"tuning",pickup:"pickup",channel:"channel",cabinet:"cabinet"};
export default function App(){
 const [tests,setTests]=useState<TestRecord[]>(()=>load().length?load():sampleTests);
 const [selected,setSelected]=useState(""); const [q,setQ]=useState("");
 const [checked,setChecked]=useState<Set<string>>(new Set());
 const [lists,setLists]=useState(()=>loadLists());
 const [mobileView,setMobileView]=useState<"list"|"form">("list");
 const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>save(tests),[tests]);
 useEffect(()=>saveLists(lists),[lists]);
 const filtered=useMemo(()=>{const x=q.toLowerCase().trim();return x?tests.filter(t=>[t.id,t.artistReference,t.song,t.guitar,t.cabinet,t.channel,t.status].join(" ").toLowerCase().includes(x)):tests},[tests,q]);
 const current=tests.find(t=>t.id===selected)||filtered[0]||tests[0];
 function selectTest(id:string){setSelected(id);setMobileView("form")}
 function update(t:TestRecord){setTests(a=>a.map(x=>x.id===current?.id?t:x))}
 function newTest(){const t=emptyTest();t.id=id(tests);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function duplicate(){if(!current)return;const t=JSON.parse(JSON.stringify(current)) as TestRecord;t.id=id(tests);t.status="À tester";t.retained=false;t.date=new Date().toISOString().slice(0,10);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function remove(){if(!current)return;if(confirm(`Supprimer ${current.id} ?`)){const a=tests.filter(x=>x.id!==current.id);setTests(a);setSelected(a[0]?.id||"");if(!a.length)setMobileView("list")}}
 function rename(){if(!current)return;const next=prompt("Nouvel ID",current.id);if(!next||next===current.id)return;if(tests.some(t=>t.id===next)){alert("Cet ID existe déjà.");return}const prev=current.id;setTests(a=>a.map(x=>x.id===prev?{...x,id:next}:x));setSelected(next)}
 function toggleCheck(id:string){setChecked(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n})}
 function toggleCheckAll(){setChecked(s=>s.size===filtered.length&&filtered.length>0?new Set():new Set(filtered.map(t=>t.id)))}
 function removeSelected(){if(checked.size===0)return;if(!confirm(`Supprimer ${checked.size} test(s) ?`))return;const a=tests.filter(x=>!checked.has(x.id));setTests(a);if(current&&checked.has(current.id)){setSelected(a[0]?.id||"");if(!a.length)setMobileView("list")}setChecked(new Set())}
 function renameListItem(cat:ListKey,oldV:string,newV:string){setLists(l=>({...l,[cat]:l[cat].map(x=>x===oldV?newV:x)}));const field=CATEGORY_FIELD[cat];setTests(a=>a.map(t=>t[field]===oldV?{...t,[field]:newV}:t))}
 function removeListItem(cat:ListKey,v:string){setLists(l=>({...l,[cat]:l[cat].filter(x=>x!==v)}))}
 function addListItem(cat:ListKey,v:string){setLists(l=>l[cat].includes(v)?l:{...l,[cat]:[...l[cat],v]})}
 function importJson(){const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async()=>{const f=i.files?.[0];if(!f)return;const d=JSON.parse(await f.text());if(!Array.isArray(d.tests))throw new Error("JSON ToneLab invalide");setTests(d.tests);setSelected(d.tests[0]?.id||"");setLists(mergeLists(d.lists))};i.click()}
 return <main><header><div><div className="eyebrow">TONELAB</div><h1>Profiles</h1><p>Laboratoire de réglages du Brunetti XL R-EVO II</p></div><div className="actions">
  <button className="primary" onClick={newTest}>+ Nouveau test</button>
  <div className="menu">
   <button className="menu-trigger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Plus d'actions">⋮</button>
   {menuOpen&&<div className="menu-panel">
    <button onClick={()=>{duplicate();setMenuOpen(false)}} disabled={!current}>Dupliquer</button>
    <button onClick={()=>{current&&markdown(current);setMenuOpen(false)}} disabled={!current}>Exporter Markdown</button>
    <button onClick={()=>{csv(tests);setMenuOpen(false)}}>Exporter CSV</button>
    <button onClick={()=>{json(tests,lists);setMenuOpen(false)}}>Exporter JSON</button>
    <button onClick={()=>{importJson();setMenuOpen(false)}}>Importer JSON</button>
    <button onClick={()=>{downloadListsCode(lists);setMenuOpen(false)}}>Générer les listes par défaut (.ts)</button>
   </div>}
  </div>
 </div></header>
 <section className="stats"><div><b>{tests.length}</b><span>Tests</span></div><div><b>{tests.filter(t=>t.retained).length}</b><span>Profils retenus</span></div><div><b>{tests.filter(t=>t.status==="Prometteur").length}</b><span>Prometteurs</span></div></section>
 <div className={`workspace ${mobileView==="form"?"show-form":"show-list"}`}><aside><input className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)}/>
  <div className="bulk-actions"><button onClick={toggleCheckAll}>{checked.size===filtered.length&&filtered.length>0?"Tout désélectionner":"Tout sélectionner"}</button><button className="danger" onClick={removeSelected} disabled={checked.size===0}>Supprimer la sélection ({checked.size})</button></div>
  <TestList tests={filtered} selected={current?.id||""} checked={checked} onSelect={selectTest} onToggleCheck={toggleCheck}/>
  <div className="bulk-actions"><button onClick={rename} disabled={!current}>Renommer</button><button className="danger" onClick={remove} disabled={!current}>Supprimer</button></div>
 </aside><article><button className="back-mobile" onClick={()=>setMobileView("list")}>← Tests</button>{current?<TestForm test={current} lists={lists} onChange={update} onRenameListItem={renameListItem} onRemoveListItem={removeListItem} onAddListItem={addListItem}/>:<div className="empty">Aucun test.</div>}</article></div></main>
}