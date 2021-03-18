function* maker() {
    yield 1;    
}
let m = maker()
console.log(m.next())
console.log(m.next())

var arr = [1,2,3];
for (let val of arr) {
    console.log(val)
}

function* geneArr(arr) {
    for (let val of arr) {
        yield val;
    }
}
var g = geneArr(arr);
console.log(g.next().value)
console.log(g.next().value)
console.log(g.next().value)

console.log(...arr)

function* gene2(arr) {
    yield* arr;
}
var g2 = gene2(arr);
console.log(g2.next().value)
console.log(g2.next().value)
console.log(g2.next().value)