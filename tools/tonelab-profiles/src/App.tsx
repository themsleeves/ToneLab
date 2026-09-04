import {useEffect,useMemo,useState} from "react";
import type {TestRecord,Pedal,PedalTemplate,AmpTemplate,Amp} from "./types";
import {emptyTest,sampleTests} from "./data";
import {load,save,migrateTest,mergeTests,snapshotIfDue,loadSnapshot} from "./storage";
import {json,markdown,markdownAll} from "./export";
import {TestForm,TestList,PedalCatalogManager,AmpCatalogManager,ListManager,useCloseOnOutsideClick} from "./components";
import {loadLists,saveLists,mergeLists,downloadListsCode,type ListKey} from "./lists";
import {instantiatePedal,loadPedalCatalog,savePedalCatalog,mergeCatalog,downloadPedalCatalogCode,resyncPedalFromCatalog} from "./pedalCatalog";
import {instantiateAmp,loadAmpCatalog,saveAmpCatalog,mergeAmpCatalog,downloadAmpCatalogCode,resyncAmpFromCatalog} from "./ampCatalog";
// Dérive un préfixe court à partir du nom d'artiste : 1 mot → 5 premières lettres, 2+ mots → initiale de chaque mot.
function artistPrefix(artist:string):string{
 const words=artist.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9\s]/g,"").trim().split(/\s+/).filter(Boolean);
 if(words.length===0)return "TEST";
 const prefix=words.length===1?words[0].slice(0,5):words.map(w=>w[0]).join("");
 return prefix.toUpperCase()||"TEST";
}
// Numéro incrémental scopé par préfixe (indépendant entre artistes).
function id(artist:string,t:TestRecord[]):string{
 const prefix=artistPrefix(artist);
 const re=new RegExp(`^${prefix}-(\\d+)$`);
 const max=t.reduce((m,x)=>{const match=x.id.match(re);return match?Math.max(m,parseInt(match[1],10)):m},0);
 return `${prefix}-${String(max+1).padStart(3,"0")}`;
}
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
 const [appDescription,setAppDescription]=useState("");
 const [theme,setTheme]=useState<string>(()=>localStorage.getItem("tonelab-theme")||"light");
 const [restoreOpen,setRestoreOpen]=useState(false);
 const [exportMdOpen,setExportMdOpen]=useState(false); const [mdScope,setMdScope]=useState<"current"|"all">("current");
 const [exportJsonOpen,setExportJsonOpen]=useState(false); const [jsonParts,setJsonParts]=useState({tests:true,lists:true,catalog:true,ampCatalog:true});
 const [importOpen,setImportOpen]=useState(false); const [importMode,setImportMode]=useState<"merge"|"replace">("merge");
 const [devOpen,setDevOpen]=useState(false);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("tonelab-theme",theme)},[theme]);
 useEffect(()=>{fetch(`${import.meta.env.BASE_URL}manifest.webmanifest`).then(r=>r.json()).then(m=>setAppDescription(m.description)).catch(()=>{})},[]);
 useEffect(()=>setMenuOpen(false),[selected,mobileView]);
 useCloseOnOutsideClick(menuOpen,()=>setMenuOpen(false));
 useEffect(()=>{snapshotIfDue();save(tests)},[tests]);
 useEffect(()=>saveLists(lists),[lists]);
 useEffect(()=>savePedalCatalog(catalog),[catalog]);
 useEffect(()=>saveAmpCatalog(ampCatalog),[ampCatalog]);
 const filtered=useMemo(()=>{const x=q.toLowerCase().trim();return tests.filter(t=>(statusFilter.has(t.status)||!lists.status.includes(t.status))&&(!x||[t.id,t.artistReference,t.song,t.guitar,t.cabinet,t.amp.channel,t.status].join(" ").toLowerCase().includes(x)))},[tests,q,statusFilter,lists.status]);
 const current=tests.find(t=>t.id===selected)||filtered[0]||tests[0];
 function selectTest(id:string){setSelected(id);setMobileView("form")}
 function settingsFingerprint(t:TestRecord){return JSON.stringify([t.guitar,t.tuning,t.pickup,t.cabinet,t.amp,t.pedals,t.otherPedals,t.objective,t.observations,t.conclusion,t.retained])}
 function update(t:TestRecord){
  let next=t;
  if(current&&t.artistReference!==current.artistReference){
   const newId=id(t.artistReference,tests.filter(x=>x!==current));
   next={...next,id:newId};
   setSelected(newId);
  }
  const changed=current&&settingsFingerprint(next)!==settingsFingerprint(current);
  const withDate=changed?{...next,date:new Date().toISOString().slice(0,10)}:next;
  setTests(a=>a.map(x=>x===current?withDate:x));
 }
 function newTest(){const t=emptyTest();t.id=id(t.artistReference,tests);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function duplicate(sourceId:string){const src=tests.find(t=>t.id===sourceId);if(!src)return;const t=JSON.parse(JSON.stringify(src)) as TestRecord;t.id=id(t.artistReference,tests);t.status="À tester";t.retained=false;t.date=new Date().toISOString().slice(0,10);setTests(a=>[t,...a]);setSelected(t.id);setMobileView("form")}
 function remove(id:string,toList?:boolean){if(!confirm(`Supprimer ${id} ?`))return;const a=tests.filter(x=>x.id!==id);setTests(a);if(current?.id===id){setSelected(a[0]?.id||"");if(!a.length||toList)setMobileView("list")}}
 function renameListItem(cat:ListKey,oldV:string,newV:string){setLists(l=>({...l,[cat]:l[cat].map(x=>x===oldV?newV:x)}));const field=CATEGORY_FIELD[cat];setTests(a=>a.map(t=>t[field]===oldV?{...t,[field]:newV}:t));if(cat==="status")setStatusFilter(f=>{if(!f.has(oldV))return f;const n=new Set(f);n.delete(oldV);n.add(newV);return n})}
 function removeListItem(cat:ListKey,v:string){setLists(l=>({...l,[cat]:l[cat].filter(x=>x!==v)}));if(cat==="status")setStatusFilter(f=>{if(!f.has(v))return f;const n=new Set(f);n.delete(v);return n})}
 function addListItem(cat:ListKey,v:string){setLists(l=>l[cat].includes(v)?l:{...l,[cat]:[...l[cat],v]});if(cat==="status")setStatusFilter(f=>new Set(f).add(v))}
 function toggleStatusFilter(s:string){setStatusFilter(f=>{const n=new Set(f);n.has(s)?n.delete(s):n.add(s);return n})}
 function addPedalFromCatalog(tpl:PedalTemplate){if(!current)return;if(current.pedals.some(p=>p.templateId===tpl.id)){alert(`"${tpl.brand} ${tpl.model}" est déjà présente dans ce test.`);return}update({...current,pedals:[...current.pedals,instantiatePedal(tpl)]})}
 function updatePedal(id:string,pedal:Pedal){if(!current)return;update({...current,pedals:current.pedals.map(p=>p.id===id?pedal:p)})}
 function removePedal(id:string){if(!current)return;update({...current,pedals:current.pedals.filter(p=>p.id!==id)})}
 function addCatalogTemplate(tpl:PedalTemplate){setCatalog(c=>[...c,tpl])}
 function updateCatalogTemplate(id:string,tpl:PedalTemplate){
  const nextCatalog=catalog.map(t=>t.id===id?tpl:t);
  setCatalog(nextCatalog);
  setTests(a=>a.map(t=>({...t,pedals:t.pedals.map(p=>p.templateId===id?resyncPedalFromCatalog(p,nextCatalog):p)})));
 }
 function removeCatalogTemplate(id:string){setCatalog(c=>c.filter(t=>t.id!==id))}
 function replaceAmpFromCatalog(tpl:AmpTemplate){if(!current)return;if(!confirm(`Remplacer l'ampli actuel par "${tpl.brand} ${tpl.model}" ? Les réglages actuels seront perdus.`))return;update({...current,amp:instantiateAmp(tpl)})}
 function updateAmpParams(amp:Amp){if(!current)return;update({...current,amp})}
 function addAmpCatalogTemplate(tpl:AmpTemplate){setAmpCatalog(c=>[...c,tpl])}
 function updateAmpCatalogTemplate(id:string,tpl:AmpTemplate){
  const nextCatalog=ampCatalog.map(t=>t.id===id?tpl:t);
  setAmpCatalog(nextCatalog);
  setTests(a=>a.map(t=>t.amp.templateId===id?{...t,amp:resyncAmpFromCatalog(t.amp,nextCatalog)}:t));
 }
 function removeAmpCatalogTemplate(id:string){setAmpCatalog(c=>c.filter(t=>t.id!==id))}
 // null si aucun export n'a jamais été fait, sinon le nombre de jours écoulés depuis le dernier.
 function daysSinceLastExport():number|null{const v=localStorage.getItem("tonelab-last-export");if(!v)return null;return Math.floor((Date.now()-new Date(v).getTime())/86400000)}
 function importJson(mode:"merge"|"replace"){const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async()=>{
  const f=i.files?.[0];if(!f)return;
  let d:any;
  try{d=JSON.parse(await f.text())}catch{alert("Fichier JSON invalide (impossible de le lire).");return}
  if(d.tests!==undefined&&!Array.isArray(d.tests)){alert("JSON ToneLab invalide (structure inattendue).");return}
  if(d.tests){
   const migrated=d.tests.map(migrateTest);
   const collisions=mode==="merge"?migrated.filter((t:TestRecord)=>tests.some(x=>x.id===t.id)).length:0;
   const msg=mode==="replace"
    ?`Remplacer TOUS les tests actuels (${tests.length}) par les ${migrated.length} test(s) importé(s) ?`
    :`Importer ${migrated.length} test(s) ?\n${collisions?`${collisions} test(s) existant(s) avec le même ID seront remplacés.\n`:""}Les autres tests actuels seront conservés.`;
   if(!confirm(msg))return;
   setTests(a=>mode==="replace"?migrated:mergeTests(a,migrated));
   setSelected(migrated[0]?.id||"");
  }
  if(d.lists)setLists(mergeLists(d.lists));
  if(d.catalog)setCatalog(mergeCatalog(d.catalog));
  if(d.ampCatalog)setAmpCatalog(mergeAmpCatalog(d.ampCatalog));
 };i.click()}
 return <main><header><div><div className="eyebrow">TONELAB</div><h1>Profiles</h1><p>{appDescription}</p></div><div className="actions">
  <button className="primary" onClick={newTest}>+ Nouveau test</button>
  <div className="menu">
   <button className="menu-trigger header-icon-btn" onClick={()=>setMenuOpen(o=>!o)} aria-label="Plus d'actions" aria-haspopup="true" aria-expanded={menuOpen}>⋮</button>
   {menuOpen&&<div className="menu-panel" role="menu">
    <div className="menu-info">{(()=>{const d=daysSinceLastExport();return d===null?"Aucun export effectué":`Dernier export : il y a ${d} jour(s)`})()}</div>
    <button onClick={()=>{setMenuOpen(false);setRestoreOpen(true)}}>Restaurer</button>
    <button onClick={()=>{setMenuOpen(false);setExportMdOpen(true)}} disabled={!current}>Exporter Markdown</button>
    <button onClick={()=>{setMenuOpen(false);setExportJsonOpen(true)}}>Exporter JSON</button>
    <button onClick={()=>{setMenuOpen(false);setImportOpen(true)}}>Importer JSON</button>
    <button onClick={()=>{setMenuOpen(false);setDevOpen(true)}}>Développeur</button>
   </div>}
  </div>
  <button type="button" className="header-icon-btn" onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} aria-label={theme==="dark"?"Passer en mode clair":"Passer en mode sombre"} title={theme==="dark"?"Passer en mode clair":"Passer en mode sombre"}>{theme==="dark"?"◐":"◑"}</button>
  <button type="button" className="header-icon-btn" onClick={()=>setSettingsOpen(true)} aria-label="Paramètres" title="Paramètres (listes, catalogue de pédales)">⚙</button>
 </div></header>
 {settingsOpen&&<div className="modal-overlay" onClick={()=>setSettingsOpen(false)}>
  <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="settings-title">Paramètres</h2><button type="button" className="modal-close" onClick={()=>setSettingsOpen(false)} aria-label="Fermer">✕</button></div>
   <PedalCatalogManager catalog={catalog} onUpdate={updateCatalogTemplate} onAdd={addCatalogTemplate} onRemove={removeCatalogTemplate}/>
   <AmpCatalogManager catalog={ampCatalog} onUpdate={updateAmpCatalogTemplate} onAdd={addAmpCatalogTemplate} onRemove={removeAmpCatalogTemplate}/>
   <ListManager lists={lists} onRename={renameListItem} onRemove={removeListItem} onAdd={addListItem}/>
  </div>
 </div>}
 {restoreOpen&&<div className="modal-overlay" onClick={()=>setRestoreOpen(false)}>
  <div className="modal-panel modal-panel--sm" role="dialog" aria-modal="true" aria-labelledby="restore-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="restore-title">Restaurer une sauvegarde</h2><button type="button" className="modal-close" onClick={()=>setRestoreOpen(false)} aria-label="Fermer">✕</button></div>
   <p>Une copie de secours de vos tests est conservée automatiquement une fois par jour, avant toute modification, pour permettre de revenir en arrière en cas d'erreur ou de perte de données.</p>
   {(()=>{const s=loadSnapshot();return s
    ?<>
     <p>Sauvegarde disponible : <strong>{s.date}</strong> ({s.tests.length} test(s)).</p>
     <button type="button" onClick={()=>{if(confirm(`Restaurer la sauvegarde du ${s.date} (${s.tests.length} test(s)) ? Cela remplacera les tests actuels.`)){setTests(s.tests);setRestoreOpen(false)}}}>Restaurer cette sauvegarde</button>
    </>
    :<p>Aucune sauvegarde de secours disponible pour le moment.</p>})()}
  </div>
 </div>}
 {exportMdOpen&&<div className="modal-overlay" onClick={()=>setExportMdOpen(false)}>
  <div className="modal-panel modal-panel--sm" role="dialog" aria-modal="true" aria-labelledby="export-md-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="export-md-title">Exporter en Markdown</h2><button type="button" className="modal-close" onClick={()=>setExportMdOpen(false)} aria-label="Fermer">✕</button></div>
   <p>Génère un fichier Markdown lisible reprenant le détail d'un ou plusieurs tests (réglages, objectif, observations...).</p>
   <div className="popup-choice">
    <label><input type="radio" name="mdScope" checked={mdScope==="current"} onChange={()=>setMdScope("current")} disabled={!current}/> Le test actuellement ouvert</label>
    <label><input type="radio" name="mdScope" checked={mdScope==="all"} onChange={()=>setMdScope("all")}/> Tous les tests (fichier unique)</label>
   </div>
   <button type="button" onClick={()=>{mdScope==="current"?current&&markdown(current):markdownAll(tests);setExportMdOpen(false)}}>Exporter</button>
  </div>
 </div>}
 {exportJsonOpen&&<div className="modal-overlay" onClick={()=>setExportJsonOpen(false)}>
  <div className="modal-panel modal-panel--sm" role="dialog" aria-modal="true" aria-labelledby="export-json-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="export-json-title">Exporter en JSON</h2><button type="button" className="modal-close" onClick={()=>setExportJsonOpen(false)} aria-label="Fermer">✕</button></div>
   <p>Génère une sauvegarde complète, réimportable depuis ce même menu. Choisissez ce qu'elle doit contenir :</p>
   <div className="popup-choice">
    <label><input type="checkbox" checked={jsonParts.tests} onChange={()=>setJsonParts(p=>({...p,tests:!p.tests}))}/> Tests</label>
    <label><input type="checkbox" checked={jsonParts.lists} onChange={()=>setJsonParts(p=>({...p,lists:!p.lists}))}/> Listes (artistes, statuts...)</label>
    <label><input type="checkbox" checked={jsonParts.catalog} onChange={()=>setJsonParts(p=>({...p,catalog:!p.catalog}))}/> Catalogue de pédales</label>
    <label><input type="checkbox" checked={jsonParts.ampCatalog} onChange={()=>setJsonParts(p=>({...p,ampCatalog:!p.ampCatalog}))}/> Catalogue d'amplis</label>
   </div>
   <button type="button" disabled={!Object.values(jsonParts).some(Boolean)} onClick={()=>{json({...(jsonParts.tests&&{tests}),...(jsonParts.lists&&{lists}),...(jsonParts.catalog&&{catalog}),...(jsonParts.ampCatalog&&{ampCatalog})});localStorage.setItem("tonelab-last-export",new Date().toISOString());setExportJsonOpen(false)}}>Exporter</button>
  </div>
 </div>}
 {importOpen&&<div className="modal-overlay" onClick={()=>setImportOpen(false)}>
  <div className="modal-panel modal-panel--sm" role="dialog" aria-modal="true" aria-labelledby="import-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="import-title">Importer un JSON</h2><button type="button" className="modal-close" onClick={()=>setImportOpen(false)} aria-label="Fermer">✕</button></div>
   <p>Importe un fichier de sauvegarde ToneLab. Seules les catégories présentes dans le fichier sont modifiées (un export partiel n'efface pas le reste).</p>
   <div className="popup-choice">
    <label><input type="radio" name="importMode" checked={importMode==="merge"} onChange={()=>setImportMode("merge")}/> Fusionner (recommandé) — conserve les tests existants</label>
    <label><input type="radio" name="importMode" checked={importMode==="replace"} onChange={()=>setImportMode("replace")}/> Remplacer tout — supprime les tests actuels</label>
   </div>
   <button type="button" onClick={()=>{importJson(importMode);setImportOpen(false)}}>Choisir un fichier…</button>
  </div>
 </div>}
 {devOpen&&<div className="modal-overlay" onClick={()=>setDevOpen(false)}>
  <div className="modal-panel modal-panel--sm" role="dialog" aria-modal="true" aria-labelledby="dev-title" onClick={e=>e.stopPropagation()}>
   <div className="modal-panel-header"><h2 id="dev-title">Actions développeur</h2><button type="button" className="modal-close" onClick={()=>setDevOpen(false)} aria-label="Fermer">✕</button></div>
   <p>Génère du code TypeScript prêt à coller dans le dépôt, pour mettre à jour les valeurs par défaut livrées avec l'application (listes, catalogues de pédales/amplis).</p>
   <div className="popup-choice">
    <button type="button" onClick={()=>{downloadListsCode(lists);setDevOpen(false)}}>Générer les listes par défaut (.ts)</button>
    <button type="button" onClick={()=>{downloadPedalCatalogCode(catalog);setDevOpen(false)}}>Générer le catalogue de pédales (.ts)</button>
    <button type="button" onClick={()=>{downloadAmpCatalogCode(ampCatalog);setDevOpen(false)}}>Générer le catalogue d'amplis (.ts)</button>
   </div>
  </div>
 </div>}
 <div className={`workspace ${mobileView==="form"?"show-form":"show-list"}`}><aside><label className="visually-hidden" htmlFor="test-search">Rechercher un test</label><input id="test-search" className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)}/>
  <TestList tests={filtered} selected={current?.id||""} onSelect={selectTest} statusOptions={lists.status} statusFilter={statusFilter} onToggleStatusFilter={toggleStatusFilter} onDuplicate={duplicate} onRemove={remove}/>
 </aside><article><div className="mobile-header">
  <button className="back-mobile" onClick={()=>setMobileView("list")} title="Retour à la liste" aria-label="Retour à la liste">←</button>
  {current&&<div className="mobile-test-id">
   <strong>{current.artistReference||"Sans artiste"}</strong>
   <span>{current.song||"—"}{current.status?` (${current.status})`:""}</span>
  </div>}
  {current&&<button type="button" className="header-delete-btn" onClick={()=>remove(current.id,true)} title="Supprimer ce test" aria-label="Supprimer ce test">🗑</button>}
 </div>{current?<TestForm test={current} lists={lists} onChange={update} catalog={catalog} onAddPedalFromCatalog={addPedalFromCatalog} onUpdatePedal={updatePedal} onRemovePedal={removePedal} ampCatalog={ampCatalog} onReplaceAmpFromCatalog={replaceAmpFromCatalog} onUpdateAmpParams={updateAmpParams}/>:<div className="empty">Aucun test.</div>}</article></div></main>
}