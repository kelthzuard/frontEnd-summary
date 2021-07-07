const myNew = (func, ...args) => {
    var obj = Object.create(fuc.prototype)
    var r = func.apply(obj, args)
    return r instanceof Object?r:obj
} 