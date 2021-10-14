// TODO: provide a proper chain example
import { double, inc, identity } from "./helpers.ts" 
import { UnaryFn } from "./models.ts";

// continuation approach
type Continuation = (g: UnaryFn) => (f: UnaryFn) => UnaryFn
const continuation: Continuation = g => f => f(g);

/**
 * @param fn partial application of first fn, waiting an argument
 * @param x argument to pass to the first fn
 * 
 * @returns fn that take a callback as argument, 
 * then return a partial continuation of the result of callback(fn(x))
 */
const continuable = (fn: UnaryFn) => (x: any) => continuation(fn)(
    (f: UnaryFn) => continuation(f(x))
);
/*
const doubleThen = continuable(double);
const incThen = continuable(inc);
doubleThen(1)(doubleThen)(incThen)(console.log);
*/
const toto = continuable(resolve => {
    setTimeout(() => resolve("toto"), 500)
});
const gotoTheBeach = continuable(x => setTimeout(() => {
    console.log(x + " go to the beach.")
}, 500));

toto(gotoTheBeach)
// but how tell it that console.log is the next continuation ?



// chain approach (AKA bind)
/**
 * @description chain is a way to ensure my function returns a function 
 * with a similiar signature, so we can continue the pattern indefinitely
 * 
 * if you give me a partial "continutation" (cont)
 * 
 * and a function that will takes that continuation (func)
 * and gives a new continuation encapsulating the first
 * then I'll give you that new partial continuation, ready to repeat the pattern
 * 
 * @param cont partial continuation of a function
 * @param func function that will take "cont" 
 * and return a partial continuation of it, applied to a given value
 * 
 * @returns a function that takes a callback
 * and return the fullfilled continuation
 * where func is applied with to the contiuation returned by func
 * AKA a deffered continuation
 */
var chain = (cont: UnaryFn, func: UnaryFn) => (
    (callback: Function) => cont((result: UnaryFn) => func(result)(callback))
);
/*
const totoChain = chain(
    continuation((resolve: Function) => setTimeout(() => resolve("toto"), 500)),
    (f: UnaryFn) => continuation(f(identity))
);
totoChain(console.log)
*/
/*
const gotoTheBeach = continuable(x => setTimeout(() => {
    console.log(x + " go to the beach.")
}, 500));

toto(gotoTheBeach)
*/

/*
const gotoTheBeach = (s: string) => console.log(s + " go to the beachhh");
const totoChain = chain(
    continuation(gotoTheBeach),
    (f: UnaryFn) => setTimeout(() => continuation(f("toto")), 200)
);

totoChain(gotoTheBeach);

*/
/*
const gotoTheBeachThen = continuable((x) => setTimeout(() => {
    console.log(x + " go to the beach.")
}, 500));
*/
/*
const doubleChain = chain(
    continuation(double),
    (f: UnaryFn) => continuation(f(1))
);

doubleChain(doubleThen)(incThen)(console.log); // will log 5 too
*/
