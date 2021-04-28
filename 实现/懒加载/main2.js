(function(){
    function lazy(node) {
        node.setAttribute('src', node.getAttribute('data-src'))
        node.removeAttribute('data-src')
    }
    var interOb = new IntersectionObserver(function(nodes, observer) {
        nodes.forEach(function(node) {
            if (node.isIntersecting) {
                lazy(node.target)
                observer.unobserve(node.target)
            }
        })
    })
    var imgNodes = document.querySelectorAll('img[data-src]') 
    imgNodes.forEach(function(node) {
        interOb.observe(node)
    })
})()