function ex() {
    var a = 1
    return function() {
        console.log(a);
    }
}
var e = ex()
e();

var counter = (function(){
    var val = 0;
    return {
        increment: function() {
            val += 1;
        },
        get: function() {
            return val;
        }
    }
})();

counter.increment();
console.log(counter.get());

var Person = function(name) {
    this.name = name;
    this.say = function() {
        return this.name
    }
}

function loop() {
    var a = [1,2,3];
    var b = [];
    for (var i = 0; i < a.length; i ++) {
        b[i] = function() {
            console.log(i);
        }
    }
    return b;
}
var r = loop()
r[0]();
r[1]();
r[2]();

function loop2() {
    var a = [1,2,3];
    var b = [];
    for (var i = 0; i < a.length; i ++) {
        b[i] = (function(val) {
            return function() {
                console.log(val);
            }
        })(i);
    }
    return b;
}
var r2 = loop2()
r2[0]();
r2[1]();
r2[2]();

function loop3() {
    var a = [1,2,3];
    for (var i = 0; i < a.length; i ++) {
        setTimeout(() => {
            console.log(i)
        }, 0);
    }
}
loop3()

function loop4() {
    var a = [1,2,3];
    for (var i = 0; i < a.length; i ++) {
        (function(val) {
            setTimeout(() => {
                console.log(val);
            }, 0);
        })(i)
    }
}
loop4()
