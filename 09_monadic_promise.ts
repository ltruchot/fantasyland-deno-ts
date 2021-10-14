//TODO: check all mirrors, find example for all, do a promise.all (lift) example
// TODO add a reject
import { identity, inc, randomTime } from "./helpers.ts";
import { Handler } from "./models.ts";

type NextPromise = (val: any) => MonadicPromise;

class MonadicPromise {
  constructor(public fork: Handler) {}
  // mirror resolve
  static of(x: any) {
    return new MonadicPromise((resolve) => resolve(x));
  }

  // mirror then
  chain(next: NextPromise) {
    return new MonadicPromise(
      (resolve: Function) => this.fork((a: Handler) => next(a).fork(resolve)),
    );
  }

  // "derive a functor", mirror then
  map(f: Function) {
    return new MonadicPromise((resolve) =>
      this.fork((a: Handler) => resolve(f(a)))
    );
  }

  // "derive an applicative", usefull to mirror "Promise.all"  
  /**
    ### `ap(x)`
    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
  **/
  ap(m: MonadicPromise) {
    return new MonadicPromise((resolve) => {
      return this.fork((f: any) => m.map(f).fork(resolve));
    });
  }

  // partly mirror "subscribe" in Observable world
  extract() {
    return this.fork(identity);
  }
}

const monadicPromise = MonadicPromise.of("");

monadicPromise
  .chain((s) =>
    new MonadicPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it begin. "), randomTime()),
    )
  )
  .chain((s) =>
    new MonadicPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it continue. "), randomTime()),
    )
  )
  .chain((s) =>
    new MonadicPromise(
      (resolve: any) => setTimeout(() => resolve(s + "it end."), randomTime()),
    )
  )
  .map(console.log)
  .extract();
