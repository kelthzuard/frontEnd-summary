async function func1() {
    console.log('1s')
    await func2()
    console.log('1e')
}

async function func2() {
    console.log('2')
}

func1()