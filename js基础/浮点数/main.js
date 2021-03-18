console.log(1 + {})
console.log(1 + {
    valueOf() {
        return 2
    }
})
var a = {}
a.valueOf = function() {
    return 2;
}
console.log(a+1)