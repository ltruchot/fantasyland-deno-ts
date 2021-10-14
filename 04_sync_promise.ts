// @see: https://brianmckenna.org/blog/category_theory_promisesaplus
type NextPromise = (val: any) => SyncPromise;

class SyncPromise {
  constructor(public value: any) {}
  then(next: NextPromise) {
    setTimeout(() => {
      this.value = next(this.value).value;
    });
    return this;
  }
}

const syncPromise = new SyncPromise("");
syncPromise
  .then((value) => new SyncPromise(value + "it begin. "))
  .then((value) => new SyncPromise(value + "it continue. "))
  .then((value) => new SyncPromise(value + "it end."))
  .then((value) => {
    console.log(value);
    return new SyncPromise(value);
  });
