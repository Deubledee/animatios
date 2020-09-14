
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
//import { html as litHtml, render } from 'lit-html//lit-html'
import { html, PolymerElement } from '@polymer/polymer';
import { Animate } from "./animate.js"

class gamesApp extends mixinBehaviors([Animate], PolymerElement) {
    static get template() {
        return html`    
    <style>
        div[canvas] {
            display: grid;
            box-sizing: border-box;
            padding-top: 100px;
            width: 85%;
        }

        canvas {
            margin-left: auto;
            margin-right: auto;
        }

        .container {
            display: flex;
            flex-direction: column;
            flex-flow: wrap;
        }

        .sidebar {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        table {
            margin-left: auto;
            margin-right: auto;
        }

        .head {
            width: 100%;
            text-align: left;
        }

        span {
            text-align: right;
        }

        div[buttons],
        div[inputs],
        .head {
            width: 45%;
            box-sizing: border-box;
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
        }

        input[type=text],
        button {
            border-style: unset;
            box-shadow: 1px 1px 3px black;
            border-radius: 4px;
        }

        button {
            width: 70px;
            height: 35px;
            font-weight: bold;
            background-color: deepskyblue;
            color: #fff;
            margin-right: 20px;
        }

        div[buttons] {
            display: flex;
            padding: 9px;
        }

        div[inputs] {
            margin-left: 254px;
        }
    </style>
    <app-location route="{{route}}"> 
    </app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}" query-params="{{query}}">
    </app-route>  
    <div class="container">
         <div canvas>
            <canvas width="900" height="800">
            </canvas>
        </div>
        <div buttons>
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
        </div>
        <div class="sidebar">
            <div inputs>
                <table>
                    <tr>
                        <th class="head">
                            <span>
                                position
                            </span>
                            <span>
                                x
                            </span>
                        </th>
                        <th class="">
                            <span>
                                y
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input placeholder="x" type="text" oninput="getXvalue(event)" />
                        </th>
                        <th>
                            <input placeholder="y" type="text" oninput="getYvalue(event)" />
                        </th>
                    </tr>
                    <tr>
                        <th class="head">
                            dimentions
                            width
                        </th>
                        <th class="">
                            height
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input placeholder="width" type="text" oninput="getWidthvalue(event)" />
                        </th>
                        <th>
                            <input placeholder="height" type="text" oninput="getHeightvalue(event)" />
                        </th>
                    </tr>
                    <tr>
                        <th class="head">
                            radius = speed
                        </th>
                    </tr>
                    <tr>
                        <th class="">
                            <input type="text" placeholder="&pi;/R" oninput="getRadiusvalue(event)" />
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    </div>`;
    }
    static get is() { return 'games-app'; }
    static get properties() {
        return {
            Animation: {
                type: Object,
                //   value: new Animate()
            },
            canvas: {
                type: Object
            }
        }
    }
    ready() {
        super.ready();
        this.setCanvas()
    }
    setCanvas() {
        this.canvas = this.shadowRoot.querySelector('canvas')
        this.ctx = temp1.canvas.getContext('2d')
        this.ctx.fillRect(0, 0, temp1.canvas.width, temp1.canvas.height)
        console.log(this)
    }

    toggleBounce() {
        this.current = "bouncy" //angle Math.sin(Math.PI * angle / 180)
    }

    start() {
        const types = { bouncy: bouncy }
        if (this.current in types)
            types[this.current].call(types[current], true)
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

customElements.define(gamesApp.is, gamesApp);

/////////////\\\\\\\\\\\\

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
