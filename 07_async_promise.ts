import { identity, randomTime } from "./helpers.ts";
import { Handler } from "./models.ts";

type NextPromise = (val: any) => AsyncPromise;

class AsyncPromise {
  constructor(public handle: Handler, keepGoing?: boolean) {
    if (keepGoing) this.handle(identity);
  }

  private next(next: NextPromise) {
    return (resolve: any) =>
      this.handle(
        (result: any) => next(result).handle((x: any) => resolve(x)),
      );
  }

  then(next: NextPromise) {
    return new AsyncPromise(this.next(next), true);
  }
}

const asyncPromise = new AsyncPromise((resolve: any) => resolve(""));
asyncPromise
  .then((s) =>
    new AsyncPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it begin. "), randomTime()),
    )
  )
  .then((s) =>
    new AsyncPromise(
      (resolve: any) =>
        setTimeout(() => resolve(s + "it continue. "), randomTime()),
    )
  )
  .then((s) =>
    new AsyncPromise(
      (resolve: any) => setTimeout(() => resolve(s + "it end. "), randomTime()),
    )
  )
  .then((s) => new AsyncPromise((_: any) => console.log(s)));
