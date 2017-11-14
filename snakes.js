var KEYLEFT = 37;
var KEYDOWN = 38;
var KEYRIGHT = 39;
var KEYUP = 40;
var SPACE = 32;
var ESC = 27;
var MINUS = 189;
var PLUS = 187;

var player = class player {
    constructor(posx, posy, tail, alive, dirx, diry, score) {
        this.tail = tail;
        this.alive = alive;
        this.dirx = dirx;
        this.diry = diry;
        this.posx = posx;
        this.posy = posy;
        this.score = score;
    }
}

class food {
    constructor(posx, posy) {
        this.posx = posx;
        this.posy = posy;
    }
}

var player = new player(10,10,4,true,1,0, 0);
var gridSize = 10;
var tileCount =50;
var foods = [];
var foodSpawn = 0;
var trail = [];
var foodColor = "red"
var snakeColor = "lime";
var speed = 50;
var foodRate = 20;

window.onload=function() {
    trailLength = document.getElementById("snakeLength");
    speedUp = document.getElementById("speedUp");
    canvas = document.getElementById("snakeCanvas");
    context=canvas.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,speed);
}

speedUp.value = "Press [SPACE] for a CHALLENGE! [CMD R] to reset";
function game() {
    player.posx += player.dirx;
    player.posy += player.diry;
    
    if (player.posx < 0) {
        player.posx = tileCount - 1;
    }
    if (player.posy < 0) {
        player.posy = tileCount - 1;
    }
    if (player.posx > tileCount - 1) {
        player.posx = 0;
    }
    if (player.posy > tileCount - 1) {
        player.posy = 0;
    }
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width, canvas.height);
    foodSpawn += 1;
    // console.log(foodSpawn);
    if (foodSpawn >= foodRate) {
        foods.push({x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)});
        foodSpawn = 0;
    }
    
    context.fillStyle = snakeColor;
    for (var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x == player.posx && trail[i].y == player.posy) {
            player.tail = 4;
            player.score = 0;
            player.diry = 0;
            player.dirx = 0;
            // speed = 1000 / 15;

        }
    }
    trail.push({x: player.posx, y: player.posy});
    while (trail.length > player.tail) {
        trail.shift();
    }

    context.fillStyle=foodColor;
    for (var i = 0; i < foods.length; i++) {
        context.fillRect(foods[i].x*gridSize,foods[i].y*gridSize,gridSize-2,gridSize-2);
        // console.log(foods[i]);
        if (foods[i].x == player.posx && foods[i].y == player.posy) {
            player.tail += 1;
            foods.splice(i,1);
            player.score += 5;
            if (player.score % 50 == 0) {
                // speed -= 1;
                // setInterval(game,speed);
                // if (player.score % 100 == 0) {
                //     foodColor = "blue";
                // } else {
                //     foodColor = "cyan";
                // }
                foodColor = getRandomColor();
                snakeColor = getSnakeColor();
            }
        }
    }
    trailLength.value = "Player Length: " + player.tail + 
    "\nPlayer Score: " + player.score;
    // console.log("game running");

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function getSnakeColor() {
    var letters = 'ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

function keyPush(e) {
    console.log(e.keyCode);
    switch(e.keyCode) {
        // case ESC:
        //     var playerTail = player.tail;
        //     player.tail = 0;
        //     player.diry = 0;
        //     player.dirx = 0;
        //     player.tail = playerTail;
        //     break;
        case PLUS:
            foodRate -= 1;
            if (foodRate < 5) {
                foodRate = 5;
            }
            break;
        case MINUS:
            foodRate += 1;
            break;
        case SPACE:
            speed = 40;
            setInterval(game, speed);
            break;
        case KEYLEFT:
            if (player.dirx == 1) {
                break;
            }
            player.dirx = -1;
            player.diry = 0;
            break;
        case KEYDOWN:
            if (player.diry == 1) {
                break;
            }
            player.dirx = 0;
            player.diry =- 1;
            break;
        case KEYRIGHT:
            if (player.dirx == -1) {
                break;
            }
            player.dirx = 1;
            player.diry = 0;
            break;
        case KEYUP:
            if (player.diry == -1) {
                break;
            }
            player.dirx = 0;
            player.diry = 1;
            break;
    }
    // console.log("pushed a key");
}

// width="970" height="490"