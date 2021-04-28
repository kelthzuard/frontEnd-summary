(function() {
    var windowHeight = window.innerHeight
    function toLazy(e) {
        var img2Lazy = document.querySelectorAll('img[data-src]') //拿到所有未被加载的节点
        if (img2Lazy.length == 0) { // 如果拿不到，说明所有全部被加载，直接删除事件监听
            window.removeEventListener('scroll', throttle_lazy)
        }
        img2Lazy.forEach(node => {
            var top = node.getBoundingClientRect().top // 通过getBoundingClinetRect拿到节点距离视窗的距离。不要用offsetTop
            if (top < windowHeight) { // 如果小于窗口说明已经进入
                node.setAttribute('src', node.getAttribute('data-src')) // 拿到data-src的值，设置给src
                node.removeAttribute('data-src') // 已经加载过，删除data-src
            }
        })
    }
    function throttle(fn, delay) {
        var prev = 0
        var timer = null
        return function() {
            var that = this
            var args = Array.prototype.slice.call(arguments)
            var now = +new Date()
            var rest = delay - (now - prev)
            if (rest <= 0) {
                prev = now
                clearTimeout(timer)
                fn.apply(that, args)
                timer = null
            }
            else if (timer == null) {
                timer = setTimeout(function() {
                    fn.apply(that, args)
                    timer = null
                    clearTimeout(timer)
                    prev = +new Date()
                }, rest)
            }
        }
    }
    var throttle_lazy = throttle(toLazy, 500)
    window.addEventListener('scroll', throttle_lazy)
})()