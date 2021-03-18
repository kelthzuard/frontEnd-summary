function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('1sec pass');
            resolve();
        }, 1000);
    });
}

function chainPromise() {
    Promise.resolve().then(() => {
        return f1()
    }).then(() => {
        return f1()
    }).then(() => {
        console.log('done')
    })
}

async function asyncFunction() {
    try {
        await f1();
        await f1();
    }
    catch{
        await console.log('error')
    }

    await console.log('done')
}

//asyncFunction()
//chainPromise()

async function wrong() {
    const t1 = f1();
    const t2 = f2();

    await t1;
    await t2;
}

function PromiseParrel() {
    return Promise.all([f1(), f1()]).then(() => {
        console.log('done')
    })
}
async function ChainParrel() {
    await Promise.all([
        (async() => await f1())(),
        (async() => await f1())(),
    ]).then(()=> {
        console.log('done');
    })
}

ChainParrel()