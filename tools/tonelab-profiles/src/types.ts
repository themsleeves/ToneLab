export type TestStatus = "À tester" | "Prometteur" | "Validé" | "Rejeté";
export type ControlKind = "knob" | "slider" | "switch";
export interface PedalParam { name:string; kind:ControlKind; value:string; options?:string[]; min?:number; max?:number; step?:number; onlyChannels?:string[] }
export interface Pedal { id:string; name:string; enabled:string; notes:string; params:PedalParam[]; templateId?:string }
export interface PedalTemplate { id:string; brand:string; model:string; params:PedalParam[] }
export interface AmpTemplate { id:string; brand:string; model:string; channels:string[]; params:PedalParam[] }
export interface Amp { templateId?:string; name:string; channel:string; params:PedalParam[] }
export interface TestRecord {
  id:string; artistReference:string; song:string; date:string; status:string;
  guitar:string; tuning:string; pickup:string; cabinet:string;
  amp:Amp; pedals:Pedal[];
  otherPedals:string; objective:string; observations:string; conclusion:string; retained:boolean;
}