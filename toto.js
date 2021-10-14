const identity = a => a;
const toCont= v => callback=> callback(v);
var bind = (cont1, func) => callback => cont1(
    contResult => func(contResult)(callback)
);

const square = x => x * x;
const inc = x => x + 1;

const bound1 = bind(
    toCont(square), 
    y => toCont(y(4))
);

const bound2 = bind(
    toCont(inc),
    y => toCont(y(bound1(identity)))
);

bound2(console.log)
