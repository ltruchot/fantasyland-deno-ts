const randomTime = () => Math.random() * 100;
type Executor = (resolve: Function) => void;
type UnaryFunction = (a: any) => any;
type PromiseCallback = (resolve: Function) => void;
type NextPromise = (val: any) => AsyncPromise;
const identity = (a: any) => a;


class AsyncPromise {
  private _callbacks: NextPromise[] = []
  constructor(private resolve: PromiseCallback) {
    setTimeout(() => {
        if (this._callbacks.length) {
            this._callbacks.forEach((cb: any) => new AsyncPromise(this.chain(cb)))
        } 
    })
  }

  private chain(func: NextPromise) {
    return (resolve: any) => this.next((result: any) => func(result).next((x: any) => resolve(x)))
  }

  next(callback: Function) {
    this.resolve((v: any) => callback(v));
  } 

  then (callback: NextPromise) {
    this._callbacks.push(callback);
    return this;
  }
}

const asyncPromise = new AsyncPromise(resolve => resolve("toto"));
asyncPromise
    .then((val: any) => new AsyncPromise(
      resolve => setTimeout(() => resolve(val + "it begin. "), randomTime()))
    )
    .then((val: any) => new AsyncPromise(
      resolve => setTimeout(() => resolve(val + "it continue. "), randomTime()))
     )
    .then((val: any) => new AsyncPromise(
      resolve => setTimeout(() => resolve(val + "it end. "), randomTime()))
    )
    .then((val: any) => new AsyncPromise(
      _ => setTimeout(() => console.log(val), randomTime()))
    );
