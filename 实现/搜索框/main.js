(function() {
    const Matching = ['汪腾睿', '汪汪', '汪汪汪','克总', '克尔苏加德', 'kelthzuard']
    var isComp = false
    function debounce(f, delay) {
        let timer = null
        return function(...args) {
            clearTimeout(timer)
            timer = null
            timer = setTimeout(() => {
                f.apply(this, args)
            }, delay)
        }
    }
    function getMatch(str) {
        return new Promise((resolve, reject) => {
            const matching = Matching.filter(v => {
                return v.indexOf(str) !== -1 && str.length
            })
            resolve(matching)
        })
    }
    function createMatching(result) {
        const frag = document.createDocumentFragment()
        for(let r of result) {
            const node = document.createElement('div')
            node.innerHTML = r
            node.className = "matchItem"
            frag.appendChild(node)
        }
        matchingList.innerHTML = ""
        matchingList.appendChild(frag)
    }
    function handleInput(e) {
        if (isComp) return
        getMatch(e.target.value)
        .then(r => {
            createMatching(r)
        })

    }
    function handleCompositionStart(e) {
        isComp = true
    }
    function handleCompositionEnd(e) {
        isComp = false
        handleInput(e)
    }
    function sendRequest(str) {
        return new Promise((resolve, reject) => {
            resolve(`搜索${str}`)
        })
    }
    function search(e) {
        sendRequest(e.target.innerHTML)
        .then(r => {
            alert(r)
        })
    }
    var input = document.querySelector('input')
    input.addEventListener('input', debounce(handleInput, 200))
    input.addEventListener('compositionstart', handleCompositionStart)
    input.addEventListener('compositionend', handleCompositionEnd)
    const matchingList = document.querySelector('.match')
    matchingList.addEventListener('click', search)
})()