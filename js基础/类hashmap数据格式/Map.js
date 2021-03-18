let map = new Map()
let obj = {'a': 1}
map.set(obj, 'objective')
map.set('str', 'string')
map.set(3,3)
console.log(`map has ${obj}:${map.has(obj)}`)
console.log(map.keys())
map.delete([...map][1][0])
for (let [key, value] of map) {
    console.log(`${key},${value}`)
}
map.forEach((value, key) => {
    console.log(`${key},${value}`)
})