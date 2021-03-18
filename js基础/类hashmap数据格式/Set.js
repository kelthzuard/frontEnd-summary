let set = new Set([1,5])
set.add(2)
console.log(set)
set.delete(5)
console.log(set)
for (let val of set) {
    console.log(`val:${val}`)
}
set.forEach(val => {
    console.log(`val:${val}`)
})