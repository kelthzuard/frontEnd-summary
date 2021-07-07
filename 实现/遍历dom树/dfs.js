(function() {
    var root = document.querySelector('#root')
    var r = []
    function dfs(node, path) {
        path.push(node.tagName)
        let child = [...node.children]
        if (child.length == 0) {
            r.push([...path])
            return
        }
        child.forEach((next) => {
            dfs(next, path)
            path.pop()
        })
    }
    dfs(root, [])
    console.log(r)
})()