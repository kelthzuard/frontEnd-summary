// 浅拷贝就是值得赋值，对于对象就是赋予对象得引用

function deepCopy_json(obj) {
    return JSON.parse(JSON.stringify(obj))
    //只有能转成JSON得对象才可以使用，比如function就会失效
}


function getEmpty(obj) {
    if (Object.prototype.toString.call(obj) == '[object Object]') {
        return {}
    }
    if (Object.prototype.toString.call(obj) == '[object Array]') {
        return []
    }
    return obj
}

// 递归得方式
function deepCopy(obj, map=new Map()) {
    if (map.has(obj)) { //去重，防止出现环，会循环调用
        return map.get(obj)
    }
    var newObj = getEmpty(obj) //根据obj得类型copy一个控制过来，数组返回[]，对象返回{},其他直接返回
    map.set(obj, newObj) //设置map
    for (let key in obj) { //遍历属性，并设置属性
        newObj[key] = getEmpty(obj[key]) //设置一个初始属性
        if (newObj !== obj[key]) { //如果这个属性不是基本属性
            newObj[key] = deepCopy(obj[key], map) //递归赋值。
        }
    }
    return newObj //返回
}


// bfs得方式
function deepCopy_dfs(obj) {
    var queue = []
    var map = new Map()
    var tar = getEmpty(obj)
    queue.push([tar, obj]) //这里队列是push得两个值得数组。
    map.set(obj, tar)
    while(queue.length) {
        var [copy, ori] = queue.shift()
        for (let key in ori) {
            if (map.has(ori[key])) {
                copy[key] = map.get(ori[key])
                continue
            }
            copy[key] = getEmpty(ori[key])
            if (copy[key] !== ori[key]) {
                queue.push([copy[key], ori[key]])
                map.set(ori[key], copy[key])
            }
        }
    }
    return tar
}

var obj = {
    c: {d:2},
    e: 3
}
var a = [1,2,3,4]
var b = a
a.push(b)
obj.a = a
console.log(obj)
var b = deepCopy(obj)
console.log(b)
var h = deepCopy_dfs(obj)
console.log(h)

