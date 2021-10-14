import { double, inc } from "./helpers.ts" 
import { UnaryFn } from "./models.ts";

// how to flatten synchronous callbacks
console.log(inc(double(double(1)))); // 5, not flat

// compose approach
const compose = (f: UnaryFn, g: UnaryFn) => (a: any) => f(g(a));
const quadruple = compose(double, double);
console.log(quadruple(1));// 4, a little flatter

// compose many appoach
const composeN = (...fns: UnaryFn[]) => (val: any) => fns
    .reverse()
    .reduce((acc: any, cur: UnaryFn) => cur(acc), val);
const quadrupleThenIncThenLog = composeN(console.log, inc, double, double);
quadrupleThenIncThenLog(1); // 5, very flat

// pipe approach
const applyTo = (val: any, f: UnaryFn) => f(val);
const pipe = (...fns: UnaryFn[]) => (val: any) => fns.reduce(applyTo, val);
pipe(double, double, double, console.log)(1); // flat heaven