import { UnaryFn } from "./models.ts";

const applyTo = (val: any, f: UnaryFn) => f(val);
const pipe = (...fns: UnaryFn[]) => (val: any) => fns.reduce(applyTo, val);

class NaiveSyncPromise {
  private _callbacks: UnaryFn[] = [];
  constructor(firstValue: any) {
    setTimeout(() => pipe(...this._callbacks)(firstValue));
  }
  then(callback: UnaryFn) {
    this._callbacks.push(callback);
    return this;
  }
}

const naiveSyncPromise = new NaiveSyncPromise("");
naiveSyncPromise
  .then((value) => value + "it begin. ")
  .then((value) => value + "it continue. ")
  .then((value) => value + "it end.")
  .then(console.log);
