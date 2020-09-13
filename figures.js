export class figure {
    constructor(ctx, fig) {
        this.ctx = ctx
        this.figure = fig
        this.x = Math.floor(Math.random() * canvas.width)
        this.y = Math.floor(Math.random() * canvas.height)
        this.vx = 2
        this.vy = 0
        this.radius = 50
        this.resistance = Math.random() * 1
        this.collisions = 50
        this.gravity = 0.01
        this.mass = 1
        this.stroke = true
        this.circle = true
        this.stopAnimation = false
        this.count = 10
        this.refraction = false
        this.refractions = []
        this.refractionX = 20
        this.refractionY = 20
        this.strokeStyle = `rgb(125, 55, 75)})`
        this.fillStyle = `rgb(125, 55, 75)})`
        this.refractionXDistance = 30
        this.refractionYDistance = 30
        this.refractionPosition = Math.PI / 30
    }
    createRefaction() {
        this.refractions.push(new figure(canvas.getContext('2d'), this.refractions.length - 1))
        this.refractions[this.refractions.length - 1].radius = this.radius / 5
        this.refractions[this.refractions.length - 1].refraction = true
    }
    figureStyle(pos) {
        if (!!this.stroke) {
            this.ctx.strokeStyle = pos || this.strokeStyle
        } else {
            this.ctx.fillStyle = pos || this.fillStyle
        }
    }
    get pos2D() {
        return new Vector2D(this.x, this.y);
    }
    set pos2D(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }
    get velo2D() {
        return new Vector2D(this.vx, this.vy);
    }
    set velo2D(velo) {
        this.vx = velo.x;
        this.vy = velo.y;
    }
    start() {
        this.stopAnimation = false
    }
    stop() {
        this.stopAnimation = true
    }
}
