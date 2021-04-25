var arr = [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]

function unique(arr) {
    for (let i = 0; i < arr.length; i ++) {
        for (let j = i+1; j < arr.length; j ++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j --
            }
        }
    }
    return arr
}

function uniqueEs6(arr) {
    return Array.from(new Set(arr))
}


console.log(unique(arr))
console.log(uniqueEs6(arr))

