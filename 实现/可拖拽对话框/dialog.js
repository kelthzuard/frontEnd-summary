function Dialog(text) {
    this.text = text || ''
    this.x = 0 // 这个时目前元素在的位置
    this.y = 0
    this.lastX = 0 // 这个是元素距离本身的偏移量
    this.lastY = 0
    this.isMoving = false
    this.dia = null
    this.bg = null
}

Dialog.prototype.open = function() {
    this.bg = document.createElement('div')
    this.bg.id = 'bg'
    this.bg.style = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    `
    this.dia = document.createElement('div')
    this.dia.innerText = this.text
    this.dia.style = `
    padding: 20px;
    background-color: #fff;
    cursor: pointer;
    `
    this.bg.appendChild(this.dia)
    document.body.appendChild(this.bg)
    this.bg.addEventListener('click', this.close.bind(this))
    this.dia.addEventListener('click', function(e) {e.stopPropagation()})
    this.dia.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this.dia.addEventListener('mousemove', this.handleMouseMove.bind(this))
    this.dia.addEventListener('mouseup', this.handleMouseUp.bind(this))
}

Dialog.prototype.close = function() {
    document.body.removeChild(this.bg)
}

Dialog.prototype.handleMouseDown = function(e) {
    this.isMoving = true
    this.x = e.clientX
    this.y = e.clientY
}

Dialog.prototype.handleMouseMove = function(e) {
    if (this.isMoving) {
        var transX = e.clientX - (this.x - this.lastX) // this.x - this.lastX才是start的时候的偏移量
        var tranxY = e.clientY - (this.y - this.lastY)
        this.dia.style.transform = `translate(${transX}px, ${tranxY}px)`
    }
}

Dialog.prototype.handleMouseUp = function(e) {
    this.isMoving = false
    this.lastX = e.clientX - (this.x - this.lastX)
    this.lastY = e.clientY - (this.y - this.lastY)
}