export type TestStatus = "À tester" | "Prometteur" | "Validé" | "Rejeté";
export type ControlKind = "knob" | "slider" | "switch";
export interface PedalParam { name:string; kind:ControlKind; value:string; options?:string[] }
export interface Pedal { id:string; name:string; enabled:string; notes:string; params:PedalParam[]; templateId?:string }
export interface PedalTemplate { id:string; brand:string; model:string; params:PedalParam[] }
export interface TestRecord {
  id:string; artistReference:string; song:string; date:string; status:string;
  guitar:string; tuning:string; pickup:string; cabinet:string; channel:string;
  amp:Record<string,string>; pedals:Pedal[];
  otherPedals:string; objective:string; observations:string; conclusion:string; retained:boolean;
}
// Libellés lisibles des clés brutes de amp (affichage formulaire + export).
export const PARAM_LABELS:Record<"amp",Record<string,string>> = {
  amp:{gain:"Gain",bass:"Bass",mid:"Mid",edge:"Edge",master:"Master",bright:"Bright",focus:"Focus",level:"Level",depth:"Depth",masterPrincipal:"Master principal"},
};