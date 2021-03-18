[1,2,3,4].forEach(function(word,index,arr) {
    console.log(word)
    if (word == 2) {
        arr.shift()
    }
})
let i = ['1','2','3'].map(parseInt);
console.log(i)


let j = [1,2,3].reduce((prev,cur) => {
    return prev.then(value => {
        return new Promise((resolve,reject) => {
            resolve(value + cur);
        })
    });
},Promise.resolve(0));
j.then(v => {
    console.log(v)
})

Array.prototype.mapUsingReduce = function(callback, thisArg) {
    return this.reduce((mappedArray, currentValue, currentIndex, array) => {
        mappedArray[currentIndex] = callback.call(thisArg, currentValue, currentIndex, array);
        return mappedArray;
    }, [])
}

let k = [1,2,3].mapUsingReduce((val, index, array) => {return val ++;})
console.log(k)

// if (!Array.prototype.mapUsingReduce) {
//     Array.prototype.mapUsingReduce = function(callback, thisArg) {
//       return this.reduce(function(mappedArray, currentValue, index, array) {
//         mappedArray[index] = callback.call(thisArg, currentValue, index, array)
//         return mappedArray
//       }, [])
//     }
// }
  
// let k = [1, 2, , 3].mapUsingReduce(
// (currentValue, index, array) => currentValue + index + array.length
// ) // [5, 7, , 10]
// console.log(k)