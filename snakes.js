var KEYLEFT = 37;
var KEYDOWN = 38;
var KEYRIGHT = 39;
var KEYUP = 40;

var player = class player {
    constructor(posx, posy, tail, alive, dirx, diry) {
        this.tail = tail;
        this.alive = alive;
        this.dirx = dirx;
        this.diry = diry;
        this.posx = posx;
        this.posy = posy;
    }
}

class food {
    constructor(posx, posy) {
        this.posx = posx;
        this.posy = posy;
    }
}

var player = new player(10,10,4,true,1,0);
var gridSize = 10;
var tileCount =100;
var foods = [];
var foodSpawn = 0;
var trail = [];

window.onload=function() {
    canvas = document.getElementById("snakeCanvas");
    context=canvas.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);
}

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
    if (foodSpawn >= 30) {
        foods.push({x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)});
        foodSpawn = 0;
    }
    
    context.fillStyle="lime";
    for (var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x== player.posx && trail[i].y == player.posy) {
            player.tail = 4;
        }
    }
    trail.push({x: player.posx, y: player.posy});
    while (trail.length > player.tail) {
        trail.shift();
    }

    context.fillStyle="red";
    for (var i = 0; i < foods.length; i++) {
        context.fillRect(foods[i].x*gridSize,foods[i].y*gridSize,gridSize-2,gridSize-2);
        // console.log(foods[i]);
        if (foods[i].x == player.posx && foods[i].y == player.posy) {
            player.tail += 1;
            foods.splice(i,1);
        }
    }
    // console.log("game running");

}
function keyPush(e) {
    switch(e.keyCode) {
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
            if (player.dirx == -11) {
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