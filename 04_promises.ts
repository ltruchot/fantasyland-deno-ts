const randomTime = () => Math.random() * 100;
const identity = (a: any) => a;
type UnaryFunction = (a: any) => any;
type PromiseCallback = (resolve: Function) => void;
type NextPromise = (x: any) => BasicPromise;

class BasicPromise {
    constructor(public executor: Function, autostart?: boolean) {
        if (autostart) {
            this.next(identity);
        }        
    }     
    
    private next(callback: Function) {
        this.executor((v: any) => callback(v));
    } 

    private chain(func: NextPromise) {
        return (resolve: any) => this.next((result: any) => func(result).next((x: any) => resolve(x)))
    }

    then (func: NextPromise) { 
        return new BasicPromise(this.chain(func), true);
    }
}

const p = new BasicPromise((resolve: any) => resolve(""))
    .then((x) => new BasicPromise(
        (resolve: any) => setTimeout(() => resolve(x + "it begin. "), randomTime()))
    )
    .then((x) => new BasicPromise(
        (resolve: any) => setTimeout(() => resolve(x + "it continue. "), randomTime()))
    )
    .then((x) => new BasicPromise(
        (resolve: any) => setTimeout(() => resolve(x + "it end. "), randomTime()))
    )
    .then((x) => new BasicPromise((_: any) => console.log(x)))
