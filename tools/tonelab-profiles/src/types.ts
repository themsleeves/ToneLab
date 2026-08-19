export type TestStatus = "À tester" | "Prometteur" | "Validé" | "Rejeté";
export interface TestRecord {
  id:string; artistReference:string; song:string; date:string; status:string;
  guitar:string; tuning:string; pickup:string; cabinet:string; channel:string;
  amp:Record<string,string>; tubeScreamer:Record<string,string>;
  mxr:Record<string,string>; mooer:Record<string,string>;
  otherPedals:string; objective:string; observations:string; conclusion:string; retained:boolean;
}
// Libellés lisibles des clés brutes de amp/tubeScreamer/mxr/mooer (affichage formulaire + export).
export const PARAM_LABELS:Record<"amp"|"tubeScreamer"|"mxr"|"mooer",Record<string,string>> = {
  amp:{gain:"Gain",bass:"Bass",mid:"Mid",edge:"Edge",master:"Master",bright:"Bright",focus:"Focus",level:"Level",depth:"Depth",masterPrincipal:"Master principal"},
  tubeScreamer:{enabled:"Activée",drive:"Drive",tone:"Tone",level:"Level"},
  mxr:{enabled:"Activé","100":"100 Hz","200":"200 Hz","400":"400 Hz","800":"800 Hz","1600":"1.6 kHz","3200":"3.2 kHz"},
  mooer:{enabled:"Activé","100":"100 Hz","250":"250 Hz","630":"630 Hz","1600":"1.6 kHz","4000":"4 kHz"},
};