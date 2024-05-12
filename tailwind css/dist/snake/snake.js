const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = 'black';
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight -50;
const ctx = canvas.getContext('2d');
ctx.font = '30px Arial';
let keysPressed = {};
let i;

window.addEventListener('keydown', function (event) {
    keysPressed[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    delete keysPressed[event.keyCode];
});


document.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 35;
})

function getRandomColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const blue = Math.floor(Math.random() * 256); // Random number between 0 and 255

    // Construct the RGB color string
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
}

function Rectangle(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;


    //this.color = getRandomColor();

}
let lastindex;




let color;
let lastkeypressed = 37;
let score = 0;
let headcolor = 'blue';
let speed = 1.4;
let increase = 1.3;

function SnakeBody(snakeArray, circle) {
    this.snakeArray = snakeArray;
    this.circle = circle
    this.draw = function (element, color, i) {
        if (element.x < 0) {
            element.x += canvas.width;
        }
        if (element.y < 0) {
            element.y += canvas.height;
        }
        if (element.x > canvas.width) {
            element.x -= canvas.width
        }
        if (element.y > canvas.height) {
            element.y -= canvas.height
        }


        //element.x = element.x % canvas.width;
        //element.y = element.y % canvas.height;

        if (i < 6) {
            ctx.fillStyle = 'yellow';
        }
        else {
            ctx.fillStyle = color;
        }

        ctx.fillRect(element.x, element.y, element.side, element.side);
        ctx.fillStyle = 'black'
        ctx.fillText('Score is ' + score + '!', 30, 30);


    }

    this.update = function () {
        if (CollisionByItself(this.snakeArray)) {
            score = 0
            knew = Math.floor(Math.random() * 5)
            canvas.style.backgroundColor = getRandomColor();
            this.snakeArray = this.snakeArray.slice(0, 20)
        }
        this.circle.draw()
        if (collision(this.circle, this.snakeArray)) {
            score = score + 5;
            console.log('collided');
            this.circle = init(this.snakeArray)
            lastindex = this.snakeArray.length - 1
            for (i = 0; i < 6; i++) {
                this.snakeArray.push(this.snakeArray[lastindex])
            }

        }
        if (keysPressed[37]) {
            if (lastkeypressed === 39) {
                this.snakeArray[0].x += speed;
                this.snakeArray[0].y += 0;
            }
            else {
                this.snakeArray[0].x += -speed - increase;
                this.snakeArray[0].y += 0;
                lastkeypressed = 37;
            }


        }

        if (keysPressed[39]) {
            if (lastkeypressed === 37) {
                this.snakeArray[0].x += -speed;
                this.snakeArray[0].y += 0;
            }
            else {
                this.snakeArray[0].x += speed + increase;
                this.snakeArray[0].y += 0;
                lastkeypressed = 39
            }


        }
        if (keysPressed[38]) {
            if (lastkeypressed === 40) {
                this.snakeArray[0].x += 0;
                this.snakeArray[0].y += speed;
            }
            else {
                this.snakeArray[0].x += 0;
                this.snakeArray[0].y += -speed - increase;
                lastkeypressed = 38
            }


        }
        if (keysPressed[40]) {
            if (lastkeypressed === 38) {
                this.snakeArray[0].x += 0;
                this.snakeArray[0].y += -speed;
            }
            else {
                this.snakeArray[0].x += 0;
                this.snakeArray[0].y += speed + increase;
                lastkeypressed = 40
            }


        }
        if (keysPressed[37] || keysPressed[38] || keysPressed[39] || keysPressed[40]) {

            this.snakeArray.unshift(new Rectangle(this.snakeArray[0].x, this.snakeArray[0].y, this.snakeArray[0].side));
            this.snakeArray.pop();
            whenStop = false;
        }
        else {

            whenStop = true;
            switch (lastkeypressed) {
                case 37:
                    this.snakeArray[0].x += -speed;
                    this.snakeArray[0].y += 0;
                    break;
                case 38:
                    this.snakeArray[0].x += 0;
                    this.snakeArray[0].y += -speed;
                    break;
                case 39:
                    this.snakeArray[0].x += speed;
                    this.snakeArray[0].y += 0;
                    break;
                case 40:
                    this.snakeArray[0].x += 0;
                    this.snakeArray[0].y += speed;
                    break;
            }
            this.snakeArray.unshift(new Rectangle(this.snakeArray[0].x, this.snakeArray[0].y, this.snakeArray[0].side));
            this.snakeArray.pop();
        }
        for (let i = this.snakeArray.length - 1; i >= 0; i--) {
            if (i > this.snakeArray.length - 10) {
                color = 'black'
            }

            else {

                color = 'violet'  //bigcolorarray[knew][i % 20]
            }

            this.draw(this.snakeArray[i], color, i)

        }
    }

}


function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    }

}

function CollisionByItself(snakeArray) {


    for (i = 30; i < snakeArray.length; i++) {
        if (distance(snakeArray[0].x, snakeArray[0].y, snakeArray[i].x, snakeArray[i].y) <= 10) {
            return true
        }
    }
    return false
}



let CircleRANdom = [];
let j;
let radius;
let x;
let y;


function init(snakeArray) {
    radius = 20
    x = Math.random() * (canvas.width - 3 * radius) + 1.5 * radius;
    y = Math.random() * (canvas.height - 3 * radius) + 1.5 * radius;
    for (j = 0; j < snakeArray.length; j++) {
        if ((distance(x, y, snakeArray[j].x + snakeArray[j].side / 2, snakeArray[j].y + snakeArray[j].side / 2)) <= radius + snakeArray[j].side / 2) {
            x = Math.random() * (canvas.width - 3 * radius) + 1.5 * radius;
            y = Math.random() * (canvas.height - 3 * radius) + 1.5 * radius;
            j = -1;
        }
    }
    CircleRANdom = new Circle(x, y, radius);
    return CircleRANdom
}


function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function collision(circle, snakeArray) {
    if (distance(circle.x, circle.y, snakeArray[0].x + snakeArray[0].side / 2, snakeArray[0].y + snakeArray[0].side / 2) <= circle.radius + snakeArray[0].side / 2) {
        return true
    }
    else {
        return false
    }
}

const snakeArray = [];
for (let i = 0; i < 35; i++) {
    snakeArray.push(new Rectangle(Math.floor(canvas.width / 2), Math.floor(canvas.width / 2), 10));
}

let Circle1 = new Circle(500, 200, 50)
const snake = new SnakeBody(snakeArray, Circle1);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    requestAnimationFrame(animate);
}
animate()