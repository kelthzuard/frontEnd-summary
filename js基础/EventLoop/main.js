setTimeout(()=> {
    console.log('settimeout1');
}, 0);

new Promise((resolve) => {
    console.log('p1')
    resolve()
    console.log('p2')
}).then(() => {
    console.log('p3');
})

console.log('global1')

setTimeout(() => {
    console.log('settimeout2')
}, 0);