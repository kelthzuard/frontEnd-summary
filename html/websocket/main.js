const wb = new WebSocket('ws://www.baidu.com')
wb.onopen = (e) => {
    console.log(wb.readyState)
}

wb.onmessage = (data) => {
    console.log(data)
}

wb.send(data)