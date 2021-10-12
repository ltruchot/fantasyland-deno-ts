import { Setoid } from "./Setoid.ts";

export interface Ord<T> extends Setoid<T> {
    lte: (a: Ord<T>) => boolean
}

// classic example
export class Num implements Ord<number> {
    constructor (public value: number) {}
    equals (x: Setoid<number>) {
        return this.value === x.value;
    }
    lte (x: Ord<number>) {
        return this.value <= x.value;
    }
}

// custom example
export type TSize = "S" | "M" | "L" | "XL";
export class Size implements Ord<TSize> {
    constructor (public value: TSize) {}
    equals (x: Setoid<TSize>) {
        return this.value === x.value;
    }
    lte (ord: Ord<TSize>) {
        const ords: TSize[] = ["S", "M", "L", "XL"];
        const i1 = ords.findIndex(item => item === this.value);
        const i2 = ords.findIndex(item => item === ord.value);
        return i1 <= i2;
    } 
}
