type Executor = (resolve: Function) => void;
type UnaryFunction = (a: any) => any;
const identity = (a: any) => a;
const applyTo = (val: any, f: UnaryFunction) => f(val);
const pipe= (...fns: UnaryFunction[]) => (val: any) => fns.reduce((applyTo), val);

class SyncPromise {
  private _callbacks: UnaryFunction[] = []
  constructor(firstValue: any) {
      setTimeout(() => {
          pipe(...this._callbacks)(firstValue);
      })
  }
  then (callback: UnaryFunction) {
    this._callbacks.push(callback);
    return this;
  }
}

const syncPromise = new SyncPromise("");
syncPromise
    .then((value) => value + "it begin. ")
    .then((value) => value + "it continue. ")
    .then((value) => value + "it end.")
    .then(console.log)
    