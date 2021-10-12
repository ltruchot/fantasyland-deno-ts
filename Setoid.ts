// ALGEBRAS

// -- methods
// ----fantasy-land/equals :: Setoid a => a ~> a -> Boolean
// Setoid gets a method that takes a Setoid and return a boolean

export interface Setoid<T> {
    value: T;
    equals: (a: Setoid<T>) => boolean
}

// classic example
export class Bool implements Setoid<boolean> {
    constructor (public value: boolean) {}
    equals (setoid: Setoid<boolean>) {
        return this.value === setoid.value;
    }
}

// custom example
type TCoord = {x: number, y: number};
export class Coord implements Setoid<TCoord> {
    public value: TCoord;
    constructor(x: number, y: number){
        this.value = {x, y};
    }
    equals (setoid: Setoid<TCoord>) {
        return this.value.x === setoid.value.x && this.value.y === setoid.value.y;
    }
}
