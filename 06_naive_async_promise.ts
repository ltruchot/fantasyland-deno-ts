// TODO: get rid of autostart if possible
import { identity, randomTime } from "./helpers.ts";
import { Handler } from "./models.ts";

type NextPromise = (val: any) => NaiveAsyncPromise;

class NaiveAsyncPromise {
  private _callbacks: NextPromise[] = [];

  constructor(private handle: Handler, autostart?: boolean) {
    if (autostart) this.handle(identity);

    setTimeout(() => {
      if (this._callbacks.length) {
        this._callbacks.reduce((acc: NaiveAsyncPromise, cur: NextPromise) => {
          return new NaiveAsyncPromise(acc.resolve(cur), true);
        }, this);
      }
    });
  }

  private resolve(next: NextPromise) {
    return (resolve: any) =>
      this.handle(
        (result: any) => next(result).handle((x: any) => resolve(x)),
      );
  }

  then(next: NextPromise) {
    this._callbacks.push(next);
    return this;
  }
}

const naiveAsyncPromise = new NaiveAsyncPromise((resolve) => resolve(""));
naiveAsyncPromise
  .then((val: any) =>
    new NaiveAsyncPromise(
      (resolve) => setTimeout(() => resolve(val + "it begin. "), randomTime()),
    )
  )
  .then((val: any) =>
    new NaiveAsyncPromise(
      (resolve) =>
        setTimeout(() => resolve(val + "it continue. "), randomTime()),
    )
  )
  .then((val: any) =>
    new NaiveAsyncPromise(
      (resolve) => setTimeout(() => resolve(val + "it end. "), randomTime()),
    )
  )
  .then((val: any) =>
    new NaiveAsyncPromise(
      (_) => setTimeout(() => console.log(val), randomTime()),
    )
  );
