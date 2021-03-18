var a = Symbol('a')
var b = Symbol('b')
console.log(a == b);

var c = {
    [a]: 1
};
c[b] = 2;
console.log(c[a], c[b])

var type_map = {
    type1: Symbol(),
    type2: Symbol()
}

function f(type) {
    switch (type) {
        case type_map.type1: console.log('type1');
    }
}
f(type_map.type1);