function f(){
    var o = {};
    var o2 = {};
    o.a = o2; // o 引用 o2
    o2.a = o; // o2 引用 o
    return "azerty";
}
f();