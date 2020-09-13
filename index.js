import { figure } from "./figures.js"
import { html as litHtml, render } from `lit-html//lit-html`
import { PolymerElement, html } from '@polymer/polymer';


const canvas = document.querySelector("canvas")
const inputX = document.querySelector("input[placeholder=x]")
const inputY = document.querySelector("input[placeholder=y")
const inputWidth = document.querySelector("input[placeholder=width]")
const inputHeight = document.querySelector("input[placeholder=height")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "#000000"
ctx.fillRect(0, 0, canvas.width, canvas.height)
/*
inputX.setAttribute("value", figure.x)
inputY.setAttribute("value", figure.y)
inputWidth.setAttribute("value", figure.width)
inputHeight.setAttribute("value", figure.height)
inputX.setAttribute("placeholder", figure.x)
inputY.setAttribute("placeholder", figure.y)
inputWidth.setAttribute("placeholder", figure.width)
inputHeight.setAttribute("placeholder", figure.height)*/
class games extends PolymerElement {
    static get properties() { return { mood: String } }
    static get template() {
        return html`<div buttons>
                <button  on-click="start">
                    start
                </button>

                <button  on-click="stop">
                    stop
                </button>
                <button  on-click="clearCanvas">
                    clear
                </button>
                <div>
                    <input type="radio" id="togglecirccle" name="circle" value="false"  on-click="toggleBounce"/>
                    <label for="togglecirccle">bounce</label>
                </div>
                <div>
                    <input type="radio" id="togglecirccle" name="circle" value="false"  on-click="toggleCircle"/>
                    <label for="togglecirccle">circle</label>
                </div>
                <div>
                    <input type="radio" id="togglecstroke" name="stroke" value="false"  on-click="toggleStroke"/>
                    <label for="togglecstroke">stroke</label>
                </div>               
            </div>
        </div>`;
    }
    static get properties() {
        return {
            Animation: new Animate()
        }
    }
    ready() {

    }
    bouncy() {
        var fig = new figure(canvas.getContext('2d'), this.Animation.Balls.length)
        // if (!Animation.restart)
        this.Animation.Balls.push(fig)

        if (!!this.Animation.stopAnimation) {
            this.Animation.stopAnimation = false
            this.Animation.restart = false
            this.Animation.startBouncy()
            if (this.Animation.Balls.length > 1) {
                this.Animation.Balls.forEach(ball => ball.start())
            }
        }
    }

    toggleBounce() {
        window.current = Math.sin(Math.PI * angle / 180)

    }

    start() {
        const types = { bouncy: bouncy }
        if (window.current in types)
            types[window.current].call(types[current], true)
        //startThisAnimation(window.current)
    }

    stop() {
        this.Animation.stopAnimation = true
        this.Animation.restart = true
    }

    _map(value, start, stop, start2, stop2) {
        var result = (value - start) / (stop - start) * (stop2 - start2) + start2;
        return result
    }
    clearCanvas() {
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.Animation.Balls = []
        this.Animation.restart = false
    }
}

customElements.define('my-element', games);

/////////////\\\\\\\\\\\\

function Vector2D(x, y) {
    this.x = x;
    this.y = y;
}

// PUBLIC METHODS	
Vector2D.prototype = {
    lengthSquared: function () {
        return this.x * this.x + this.y * this.y;
    },
    length: function () {
        return Math.sqrt(this.lengthSquared());
    },
    clone: function () {
        return new Vector2D(this.x, this.y);
    },
    negate: function () {
        this.x = -this.x;
        this.y = -this.y;
    },
    normalize: function () {
        var length = this.length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        return this.length();
    },
    add: function (vec) {
        return new Vector2D(this.x + vec.x, this.y + vec.y);
    },
    incrementBy: function (vec) {
        this.x += vec.x;
        this.y += vec.y;
    },
    subtract: function (vec) {
        return new Vector2D(this.x - vec.x, this.y - vec.y);
    },
    decrementBy: function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    },
    multiply: function (k) {
        return new Vector2D(k * this.x, k * this.y);
    },
    addScaled: function (vec, k) {
        return new Vector2D(this.x + k * vec.x, this.y + k * vec.y);
    },
    scaleBy: function (k) {
        this.x *= k;
        this.y *= k;
    },
    dotProduct: function (vec) {
        return this.x * vec.x + this.y * vec.y;
    }
};

// STATIC METHODS
Vector2D.distance = function (vec1, vec2) {
    return (vec1.subtract(vec2)).length();
}
Vector2D.angleBetween = function (vec1, vec2) {
    return Math.acos(vec1.dotProduct(vec2) / (vec1.length() * vec2.length()));
}

function* getValues(fig) {
    if (!!fig) {
        yield fig.x
        yield fig.y
        yield fig.vx
        yield fig.vy
        yield fig.radius
        yield fig.gravity
        yield fig.mass
        yield fig.stroke
        yield fig.circle
    }
}
/*
function getXvalue(event) {
    console.log(event.srcElement.value)
    figure.x = event.srcElement.value
}

function getYvalue(event) {
    console.log(event)
    figure.y = event.srcElement.value
}

function getWidthvalue(event) {
    console.log(event)
    figure.width = event.srcElement.value
}

function getHeightvalue(event) {
    console.log(event)
    figure.height = event.srcElement.value
}
function getRadiusvalue(event) {
    console.log(event)
    figure.radius = event.srcElement.value
}
function toggleCircle(event) {
    event.srcElement.checked = !figure.circle
    figure.circle = event.srcElement.checked
}
function toggleStroke(event) {
    event.srcElement.checked = !figure.stroke
    figure.stroke = event.srcElement.checked
}

function elliptic(ctxe, fig, c) {
    let [ax, ay, aw, ah, radius, stroke, circle, counter, xCentre, yCentre] = getValues(fig, c, false);
    let x = ax, y = ay, z = (ax * ax + ay * ay)
    anime()
    function anime() {
        if (!figure.stopAnimation) {
            let increase = Math.PI / radius
            ax = xCentre - (x * Math.sin(counter));
            ay = yCentre + (y * Math.cos(counter));
            z = (ax * ax + ay * ay) / 1000
            let r = parseInt(_map(ax, 225, 600, 0, 255)),
                g = parseInt(_map(ay, 225, 600, 0, 255)),
                b = parseInt(_map(z, 149, 590, 0, 255))
            clearPreviousEliptic(ctxe, ax, ay, aw, ah, stroke, circle)
            setNextEliptic(ctxe, ax, ay, aw, ah, stroke, circle, r, g, b)
            counter += increase;
            requestAnimationFrame(anime)
        } else {
            cancelAnimationFrame(anime)
        }
    }
}

function setNextEliptic(ctxe, ax, ay, aw, ah, stroke, circle, r, g, b) {
    ctxe.strokeStyle = ctxe.fillStyle = `rgb(${r}, ${g}, ${b})`
    if (!circle) {
        if (!stroke) {
            ctxe.fillRect(ax, ay, aw, ah)
        } else {
            ctxe.strokeRect(ax, ay, aw, ah)
        }
    } else {
        ctxe.beginPath();
        ctxe.arc(ax, ay, aw, 0, 2 * Math.PI);
        if (!stroke) {
            ctxe.fill()
        } else {
            ctxe.stroke();
        }
    }
}

function clearPreviousEliptic(ctx2, ax, ay, aw, ah, stroke, circle) {
    if (!circle) {
        ctx2.fillStyle = "#ffffff"
        if (!stroke) {
            ctx2.fillRect(ax, ay, aw, ah)
        } else {
            ctx2.strokeRect(ax, ay, aw, ah)
        }
    } else {
        ctx2.strokeStyle = "#ffffff"
        ctx2.beginPath();
        ctx2.arc(ax, ay, aw, 0, 2 * Math.PI);
        if (!stroke) {
            ctx2.fill()
        } else {
            ctx2.stroke();
        }
    }
}

let canvas, ctx, gravity, ball, friction

function init() {

    canvas.width = 800
    canvas.height = 800

    gravity = 0.25
    friction = 0.98

    ball = {
        bounce: 0.75, // energy lost on bounce (25%)
        radius: 30,
        x: canvas.width / 2,
        y: canvas.height / 2,
        velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
        velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
    }

    window.requestAnimationFrame(update)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw the ball (only object in this scene)
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(
        balctx.x, balctx.y,
        balctx.radius,
        0, Math.PI * 2
    )
    ctx.fill()
}

function update() {
    window.requestAnimationFrame(update)

    draw()
}
// vx and vy are the respective speeds

var x = Math.floor(Math.random() * innerWidth);
var y = Math.floor(Math.random() * innerHeight);
var vx = Math.floor(Math.random() * 2);
var vy = Math.floor(Math.random() * 4);
var radius = 20;

move();

// This function will do the animation
function move() {
    requestAnimationFrame(move);

    // It clears the specified pixels within
    // the given rectangle
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Creating a circle
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.stroke();

    // Conditions sso that the ball bounces
    // from the edges
    if (radius + x > innerWidth)
        vx = 0 - vx;

    if (x - radius < 0)
        vx = 0 - vx;

    if (y + radius > innerHeight)
        vy = 0 - vy;

    if (y - radius < 0)
        vy = 0 - vy;

    x = x + vx;
    y = y + vy;

}

document.addEventListener('DOMContentLoaded', init)
*/
