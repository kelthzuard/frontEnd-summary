function compose(middwareList) {
    return function (context, next) {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            if (i <= index) {
                return Promise.reject('next execute multiple times')
            }
            index = i
            let fn = middwareList[index]
            if (i === middwareList.length) fn = next
            if (!fn) return Promise.resolve()
            try{
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i+1)
                }))
            }
            catch(e) {
                return Promise.reject(err)
            }
        }
    }
}