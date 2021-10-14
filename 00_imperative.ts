import { randomTime } from "./helpers.ts";

// imperative version, leads to uncertain results
let val = "";
setTimeout(() => val += "it begin. ", randomTime());
setTimeout(() => val += "it continue. ", randomTime());
setTimeout(() => val += "it end. ", randomTime());
setTimeout(() => console.log(val), randomTime());
