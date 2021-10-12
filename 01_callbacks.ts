const randomTime = () => Math.random() * 100;

// callback hell: pyramid of doom
let val = "";
setTimeout(() => {
    val += "it begin. ";
    setTimeout(() => {
        val += "it continue. ";
        setTimeout(() => {
            val += "it end. ";
            setTimeout(() => {
                console.log(val), randomTime()
            });
        }, randomTime());
    }, randomTime());
}, randomTime());

// callback hell: spaghetti code
const start = (val: string, callback: Function) => {
    setTimeout(() => callback(val + "it begin. ", addEnd), randomTime())
};
const addContinue = (val: string, callback: Function) => {
    setTimeout(() => callback(val + "it continue. ", console.log), randomTime());
}
const addEnd = (val: string, callback: Function) => {
    setTimeout(() => callback(val + "it end. "), randomTime());
}
start("", addContinue);
