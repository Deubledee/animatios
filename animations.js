class Animations {
    constructor() { }
    bouncy(fig) {
        fig.vy += fig.gravity
        fig.x += fig.vx
        fig.y += fig.vy
        if (!fig.stopAnimation) {
            if (!this.refraction) {
                this.setPosition.call(fig)
                if (fig.refractions.length === 0 && !fig.refraction) {
                    fig.createRefaction()
                }
                this.setRefraction.call(fig, this)
                this.setLabel.call(fig)
                // this.checkSpeed.call(fig)
            }
            if (!!fig.circle) {
                this.setBall.call(fig)
            } else {
                this.setRect.call(fig)
            }
        }
    }
    setPosition() {
        if (this.y > canvas.height - this.radius) {
            this.y -= this.count
            this.vy *= -this.mass;
            this.vx *= this.mass
            //console.log((fig.mass * fig.gravity) * 2)
            this.count -= (this.mass * this.gravity) * 4
            if (this.count < 0) {
                this.count = 0
                this.y = canvas.height - this.radius
            }
        }
        if (this.x > canvas.width - this.radius) {
            this.x = canvas.width - this.radius
            this.vx = -this.vx
        }
        if (this.x <= this.radius) {
            this.vx = -this.vx
            this.x = this.radius + this.vx
        }
        if (this.collisions <= 0) {
            this.stop()
            setTimeout(() => {
                this.collisions = 50
                this.start()
            }, 1000);
        }
    }
    setLabel() {
        let str = `figure ${this.figure} collisions ${this.collisions}`
        this.ctx.strokeText(str, this.x + ((this.radius * 2) * Math.sin(this.vx * this.vy)), this.y + ((this.radius * 2) * Math.sin(this.vx * this.vy)));
        this.ctx.font = "20px Verdana"
    }
    setBall() {
        this.figureStyle(`rgb(${250}, ${Math.floor(Math.random() * ((this.collisions * 5) - this.collisions + 1) + this.collisions)}, 
                                        ${Math.floor(Math.random() * ((this.collisions * 5) - this.collisions + 1) + this.collisions)})`)
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        if (!!this.stroke) {
            this.ctx.stroke();
        } else {
            this.ctx.fill();
        }
    }
    setRect() {
        if (!!this.stroke) {
            this.ctx.strokeRect(this.x, this.y, this.radius, this.radius);
        } else {
            this.ctx.fillRect(this.x, this.y, this.radius, this.radius);
        }
    }
    setRefraction(spr) {
        this.refractions.forEach(refraction => {
            // refraction.figureStyle(`rgb(${250}, ${this.collisions * 5}, ${this.collisions * 5})`)
            refraction.x = this.x + ((this.radius - refraction.refractionX) * Math.sin(this.vy * this.vx))
            refraction.y = this.y + ((this.radius - refraction.refractionY) * Math.cos(this.vy * this.vx))
            if (!!refraction.circle) {
                spr.setBall.call(refraction)
            } else {
                spr.setRect.call(refraction)
            }
        })
    }
    checkSpeed() {
        if ((new Date - this.lastCollision) < 1000) {
            /*  let positiveX = this.vx < 0 ? this.vx * -1 : this.vx
              let positiveY = this.vy < 0 ? this.vy * -1 : this.vy
              if (positiveX >= 10 || positiveY >= 5) {*/
            this.vx = this.vx * -1 + 0.5
            this.vy = this.vy * -1 + 0.5
            console.log(this.vy)
            console.log(' normal', this.figure)
            //  }
        }
    }
    checkCollision(Balls, i) {
        for (var j = i + 1; j < Balls.length; j++) {
            var ball2 = Balls[j];
            if (Vector2D.distance(this.pos2D, ball2.pos2D) <= this.radius + ball2.radius) {
                var vtemp = this.velo2D;
                this.velo2D = ball2.velo2D;
                ball2.velo2D = vtemp;
                this.collisions -= this.resistance + (this.mass * this.gravity) * 4
                ball2.collisions -= ball2.resistance + (ball2.mass * ball2.gravity) * 4
            }
            this.lastCollision = new Date()
            ball2.lastCollision = new Date()
        }
    }
    setBackgound() {
        ctx.fillStyle = this.background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

class Animate extends Animations {
    constructor() {
        super()
        this.Balls = []
        this.stopAnimation = true
        this.restart = false
        this.background = "#000000"
    }
    startBouncy() {
        let run = () => {
            if (!this.stopAnimation) {
                this.setBackgound()
                this.Balls.forEach((playBall, i) => {
                    if (!!playBall && playBall.stopAnimation === false) {
                        this.checkCollision.call(playBall, this.Balls, i)
                        this.bouncy(playBall)
                    }
                });
                requestAnimationFrame(run)
            } else {
                this.Balls.forEach(playBall => {
                    playBall.stop()
                });
                cancelAnimationFrame(run)
            }
        }
        run()
    }
}
