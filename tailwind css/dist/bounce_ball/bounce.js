const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = 'black';
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 35;
const ctx = canvas.getContext('2d');


// adding eventlistner for the me to know when the keys up down le,right is pressed 

let keysPressed = {};

document.addEventListener('keydown', function (event) {
    keysPressed[event.keyCode] = true;

    // Check if both 'a' and 'b' keys are pressed simultaneously
    if (keysPressed['a'] && keysPressed['b']) {
      
    }
});

document.addEventListener('keyup', function (event) {
    delete keysPressed[event.keyCode];
});

let mouse = {
    x: undefined,
    y: undefined
};

// this.y > canvas.width - 100
let speedOnAccelaration = 14;
let xDirectionNormalSpeed = 7;
let yDirectionNormalSpeed = 2;
let margin = 50;
let gravity = 0.1;
let restitution = 0.97

function getRandomColor() {
    // Generate random values for red, green, and blue components
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    // Construct the CSS color string
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";

    return color;
}


function GroupCircle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.MinRadius = this.radius;
    this.MaxRadius = 8;
    if (this.x - mouse.x < 40 || mouse.x - this.x < 40) {
        this.radius += 1;
    }
    this.color = 'white';
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
    this.update = function () {
        this.draw();
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        if (Math.abs(this.x - mouse.x) < 50 && Math.abs(this.y - mouse.y) < 50) {
            if (this.radius < this.MaxRadius) {
                this.radius += 1;
            }
        } else if (Math.abs(this.x - mouse.x) > 30 || Math.abs(this.y - mouse.y) > 30) {
            while (this.radius > this.MinRadius) {
                this.radius -= 1;
                this.color = getRandomColor();
            }
        }

        this.y += this.dy;
        this.x += this.dx;

    }
}

circlearray = [];
for (var i = 0; i < 100; i++) {

    var x = Math.random() * (canvas.width - 3 * radius) + 1.5 * radius;
    var y = Math.random() * (canvas.height - 3 * radius) + 1.5 * radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = Math.random() + 1
    circlearray.push(new GroupCircle(x, y, dx, dy, radius));

}


function Slider(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: 0,
        y: 0
    }
    this.width = 400;
    this.height = 7;
    this.color = 'violet'

    this.draw = function () {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
    this.update = function () {
        this.draw();

        if (!keysPressed[38] || !keysPressed[40]) {
            this.velocity.y = 0;
        }


        if (keysPressed[37] && keysPressed[38] && keysPressed[65] && this.x > 0 && this.y - speedOnAccelaration > canvas.height / 2 + margin) {
            this.velocity.y = -speedOnAccelaration
            this.y += this.velocity.y;
            this.velocity.x = -speedOnAccelaration
            this.x += this.velocity.x;


        }
        else if (keysPressed[37] && keysPressed[38] && this.x > 0 && this.y > canvas.height / 2 + margin) {
            this.velocity.y = -yDirectionNormalSpeed
            this.y += this.velocity.y
            this.velocity.x = -xDirectionNormalSpeed
            this.x += this.velocity.x


        }
        else if (keysPressed[38] && keysPressed[39] && keysPressed[65] && this.y - speedOnAccelaration > canvas.height / 2 + margin && this.x + this.width <= canvas.width) {
            this.velocity.y = -speedOnAccelaration;
            this.y += this.velocity.y
            this.velocity.x = speedOnAccelaration;
            this.x += this.velocity.x;


        }
        else if (keysPressed[38] && keysPressed[39] && this.x + this.width <= canvas.width && this.y > canvas.height / 2 + margin) {
            this.velocity.y = -yDirectionNormalSpeed
            this.y += this.velocity.y;
            this.velocity.x = xDirectionNormalSpeed;
            this.x += this.velocity.x


        }
        else if (keysPressed[39] && keysPressed[40] && keysPressed[65] && this.x + this.width <= canvas.width && this.y + this.height + speedOnAccelaration < canvas.height) {
            this.velocity.x = speedOnAccelaration;
            this.x += this.velocity.x
            this.velocity.y = speedOnAccelaration;
            this.y += this.velocity.y;


        }
        else if (keysPressed[39] && keysPressed[40] && this.y + this.height < canvas.height && this.x + this.width <= canvas.width) {
            this.velocity.x = xDirectionNormalSpeed;
            this.x += this.velocity.x;
            this.velocity.y = yDirectionNormalSpeed;
            this.y += this.velocity.y;


        }
        else if (keysPressed[40] && keysPressed[37] && keysPressed[65] && this.y + this.height + speedOnAccelaration < canvas.height && this.x > 0) {
            this.velocity.x = -speedOnAccelaration;
            this.x += this.velocity.x;
            this.velocity.y = speedOnAccelaration;
            this.y += this.velocity.y;


        }
        else if (keysPressed[40] && keysPressed[37] && this.y + this.height < canvas.height && this.x > 0) {
            this.velocity.x = -xDirectionNormalSpeed;
            this.x += this.velocity.x
            this.velocity.y = yDirectionNormalSpeed;
            this.y += this.velocity.y;


        }
        else if (keysPressed[38] && keysPressed[65] && this.y - speedOnAccelaration > canvas.height / 2 + margin) {   // up
            this.velocity.y = -speedOnAccelaration
            this.y += this.velocity.y

        }
        else if (keysPressed[38] && this.y > canvas.height / 2 + margin) {
            this.velocity.y = -yDirectionNormalSpeed
            this.y += this.velocity.y

        }
        else if (keysPressed[40] && keysPressed[65] && this.y + this.height + speedOnAccelaration < canvas.height) {   // down
            this.velocity.y = speedOnAccelaration
            this.y += this.velocity.y

        }
        else if (keysPressed[40] && this.y + this.height < canvas.height) {
            this.velocity.y = yDirectionNormalSpeed
            this.y += this.velocity.y;

        }
        else if (keysPressed[37] && keysPressed[65] && this.x > 0) { //left 
            this.velocity.x = -speedOnAccelaration
            this.x += this.velocity.x

        }
        else if (keysPressed[37] && this.x > 0) {
            this.velocity.x = -xDirectionNormalSpeed
            this.x += this.velocity.x

        }
        else if (keysPressed[39] && keysPressed[65] && this.x + this.width <= canvas.width) { // right
            this.velocity.x = speedOnAccelaration
            this.x += this.velocity.x;
        }
        else if (keysPressed[39] && this.x + this.width <= canvas.width) {
            this.velocity.x = xDirectionNormalSpeed
            this.x += this.velocity.x;

        }
        else {
            this.velocity.y = 0;
        }


    }
    this.update2 = function () {
        this.y += this.velocity.y;

    }
}

function getRandomColor() {
    const colors = ['blue', 'yellow', 'pink', 'white', 'red', 'grey', 'violet'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.color = getRandomColor();
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: 4
    }
    this.radius = Math.floor(Math.random() * 10 + 30);
    this.draw = function () {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
    this.update = function (slider) {


        resolveCollision(slider, this)




        if (this.y - this.radius <= 0) {
            this.velocity.y = - this.velocity.y;
        }

        else if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = - this.velocity.x;
        }
        else if (!(this.y + this.radius > canvas.height || this.y - this.radius < 0 && !(this.y + this.radius > slider.y && this.x > slider.x && this.x < slider.x + slider.width))) {
            this.velocity.y += gravity;

        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        mouse.x = this.x;
        mouse.y = this.y
        this.draw();


    }
}

ctx.beginPath();
ctx.moveTo(50, 50); // start of line
ctx.lineTo(300, 100); // it moved here 
ctx.lineTo(400, 300); // then it moved it here 
ctx.lineTo(30, 10);
ctx.strokeStyle = "white" // we changed the colour to some other color 
ctx.stroke() // it draws the line 


function RoundingCircle(x, y, i, angle) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.angle = angle;
    this.radius = Math.floor(Math.random() * 5 + 5);
    this.color = getRandomColor();
    this.bigradius = 15 * Math.random() + 20
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();


    }
    this.update = function (slider) {


        this.x = slider.x + this.bigradius * Math.cos(this.i);
        this.y = slider.y + this.bigradius * Math.sin(this.i);
        this.i = this.i + this.angle;
        this.draw();
    }
    this.update2 = function (slider) {


        this.x = slider.x + slider.width + this.bigradius * Math.cos(this.i);
        this.y = slider.y + this.bigradius * Math.sin(this.i);
        this.i = this.i + this.angle;
        this.draw();
    }

}




const roundcircle = new RoundingCircle(500, 200, Math.random(), 0.05)


const slider = new Slider(canvas.width / 2 - 200, canvas.height - 30);

const circle = new Circle(500, 100);
const circle2 = new Circle(500, 56);

// Set properties of the slider object
let a;
let b;
let c;
let d;
let roudingarray = [];
let roudingarray2 = [];
function init(emptyarray) {
    for (let j = 0; j < 2; j++) {
        a = 500
        b = 200
        c = Math.random()
        d = (Math.random() - 0.5) * 0.6
        emptyarray.push(new RoundingCircle(a, b, c, d))


    }
}
init(roudingarray)
init(roudingarray2)

function animate() {
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    slider.update();
    //groupOFlines1.update();

    circlearray.forEach(element => {
        element.update();
    });
    circle.update(slider);
    roudingarray.forEach(element => {
        element.update(slider);
    })
    roudingarray2.forEach(element => {
        element.update2(slider);
    })





}
animate()






function resolveCollision(slider, circle) {


    if (slider.y - circle.y - circle.velocity.y - circle.radius <= 0 && circle.x > slider.x && circle.x < slider.x + slider.width) {
        slider.color = 'black'

        if (slider.velocity.y === 0) {
            circle.velocity.y = - circle.velocity.y


        }
        else {
            circle.velocity.y = -circle.velocity.y + slider.velocity.y * 0.45

        }


    }
    else {
        slider.color = 'violet'

    }

}