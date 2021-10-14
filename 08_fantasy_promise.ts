import { identity, randomTime } from "./helpers.ts";
import { Handler } from "./models.ts";

type NextPromise = (val: any) => FantasyPromise;

class FantasyPromise {
  constructor(public handle: Handler) {}
  then(next: NextPromise) {
    return new FantasyPromise(
      (resolve: Function) => this.handle((a: any) => next(a).handle(resolve)),
    );
  }
  resolve() {
    return this.handle(identity);
  }
}

const fantasyPromise = new FantasyPromise((resolve: any) => resolve(""));
fantasyPromise
  .then((s) =>
    new FantasyPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it begin. "), randomTime()),
    )
  )
  .then((s) =>
    new FantasyPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it continue. "), randomTime()),
    )
  )
  .then((s) =>
    new FantasyPromise(
      (resolve: any) => setTimeout(() => resolve(s + "it end. "), randomTime()),
    )
  )
  .then((s) => new FantasyPromise((_: any) => console.log(s)))
  .resolve();

/**
    # Fantasy FantasyPromises
    This library implements purely nextunctional, monadic promises.
**/

/**
    ## `FantasyPromise(nextork)`
    FantasyPromise is a constructor which takes a `nextork` nextunction. The `fork`
    function takes one argument:
    ### `fork(resolve)`
    The `resolve` callback gets called on a value.
**/
// const FantasyPromise = daggy.tagged('fork');

/**
    ### `FantasyPromise.of(x)`
    Creates a FantasyPromise that contains a successful value.
**/
/*
FantasyPromise.of = function(x) {
    return FantasyPromise((resolve) => resolve(x));
};
*/

/**
    ### `ap(x)`
    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
**/
/*
FantasyPromise.prototype.ap = function(a) {
    return FantasyPromise((resolve) => {
        return this.fork((f) => a.map(f).fork(resolve));
    });
};
*/

/**
    ### `chain(f)`
    Returns a new promise that evaluates `f` when the current promise
    is successfully fulfilled. `f` must return a new promise.
**/
/*
FantasyPromise.prototype.chain = function(f) {
    return FantasyPromise((resolve) => {
        return this.fork((a) => f(a).fork(resolve));
    });
};
*/
/**
    ### `map(f)`
    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
**/
/*
FantasyPromise.prototype.map = function(f) {
    return FantasyPromise((resolve) => {
        return this.fork((a) => resolve(f(a)));
    });
};
*/

/**
   ### `extract()`
   Executes a promise to get a value.
**/
/*
FantasyPromise.prototype.extract = function() {
    return this.fork(identity);
};
*/

/**
   ### `extend(f)`
   Returns a new promise that evaluates `f` over the promise to get a
   value.
**/

/*
FantasyPromise.prototype.extend = function(f) {
    return this.map((a) => f(FantasyPromise.of(a)));
};
*/
