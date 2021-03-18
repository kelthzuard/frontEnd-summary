# XMLHttpRequest

用法
```
var xhr = new XHRHttpRequest()
xhr.open('GET', url);
xhr.responseType = 'json'
xhr.send() //异步，所以加在哪里都无所谓
xhr.onload = function() {
    console.log(xhr.response);
}
```

# fetch

用法
```
fetch(url).then((res) => {
    res.json().then((json) => {
        console.log(json)
    });
});
```
或者写成链式调用
```
fetch(url).then((res) => {
    return res.json()
}).then((json) => {
    console.log(json)
})
```