import type {TestRecord} from "./types";
const KEY="tonelab-profile-manager";
export function load():TestRecord[]{try{const x=localStorage.getItem(KEY);return x?JSON.parse(x):[];}catch{return[];}}
export function save(tests:TestRecord[]){localStorage.setItem(KEY,JSON.stringify(tests));}