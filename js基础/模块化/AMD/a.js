define('a', ['require', 'exports', 'b'], function(require, exports, b) {
    exports.verb = function() {
        return b.verb()
    }
})