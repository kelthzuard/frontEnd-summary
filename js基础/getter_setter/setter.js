var obj = {
    val: 1,
    set add(x) {
        this.val += x;
    }
}
obj.add = 1;
console.log(obj.val);