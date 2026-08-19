import type {TestRecord} from "./types";
export const emptyTest=():TestRecord=>({
 id:"",artistReference:"",song:"",date:new Date().toISOString().slice(0,10),status:"À tester",
 guitar:"",tuning:"",pickup:"",cabinet:"",channel:"",
 amp:{gain:"",bass:"",mid:"",edge:"",master:"",bright:"OFF",focus:"",level:"",depth:"",masterPrincipal:""},
 tubeScreamer:{enabled:"OFF",drive:"",tone:"",level:""},
 mxr:{enabled:"OFF","100":"","200":"","400":"","800":"","1600":"","3200":""},
 mooer:{enabled:"OFF","100":"","250":"","630":"","1600":"","4000":""},
 otherPedals:"",objective:"",observations:"",conclusion:"",retained:false
});
export const sampleTests:TestRecord[]=[
 {...emptyTest(),id:"QOTSA-001",artistReference:"Queens of the Stone Age",song:"No One Knows",guitar:"Gibson Les Paul Classic DC",tuning:"Drop C#",cabinet:"Marshall 4x12",channel:"XLead",objective:"Chercher une base Stoner dense"},
 {...emptyTest(),id:"QOTSA-002",artistReference:"Queens of the Stone Age",song:"Go With The Flow",status:"Prometteur",guitar:"Gibson Les Paul Classic DC",tuning:"Drop C#",cabinet:'Thiele maison + Celestion 15" 4 Ω',channel:"XLead",tubeScreamer:{enabled:"ON",drive:"",tone:"",level:""},objective:"Comparer les deux cabinets"},
 {...emptyTest(),id:"FOO-001",artistReference:"Foo Fighters",song:"Everlong",guitar:"Gretsch John Gourley Broadkaster",tuning:"Standard",cabinet:"Marshall 4x12",channel:"Boost",objective:"Base Rock dynamique"}
];