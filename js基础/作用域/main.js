var a = 1;
b = 2
function func() {
    var c = 3;
    d = 4;
}
func();
console.log(window.a, window.b, window.c, window.d);
console.log(delete a);
console.log(delete b);