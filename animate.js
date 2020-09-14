
import '@polymer/polymer/polymer-legacy.js';
import { ballRefraction } from "./figures.js"
import { Bouncy } from "./animations.js"
export const Animate = {
    properties: {
        stopAnimation: {
            type: Boolean,
            value: true
        },
        restart: {
            type: Boolean,
            value: false
        },
        background: {
            type: String,
            value: "#000000"
        },
        BouncyAnimation: {
            type: Object,
            value: new Bouncy()
        }
    },
    bouncy() {
        var fig = new ballRefraction(canvas.getContext('2d'), this.BouncyAnimation.Balls.length)
        this.BouncyAnimation.Balls.push(fig)
        if (!!this.stopAnimation) {
            this.stopAnimation = false
            this.restart = false
            this.BouncyAnimation._startBouncy()
            if (!Animation.restart) {
                this.Animation.Balls.forEach(ball => ball.start())
            }
        }
    },
    _startBouncy() {
        let run = () => {
            if (!this.stopAnimation) {
                this.setBackgound()
                this.BouncyAnimation.Balls.forEach((playBall, i) => {
                    if (!!playBall && playBall.stopAnimation === false) {
                        this.BouncyAnimation.checkCollision.call(playBall, this.BouncyAnimation.Balls, i)
                        this.BouncyAnimation.runBounce(playBall)
                    }
                });
                requestAnimationFrame(run)
            } else {
                this.BouncyAnimation.Balls.forEach(playBall => {
                    playBall.stop()
                });
                cancelAnimationFrame(run)
            }
        }
        run()
    }
}
