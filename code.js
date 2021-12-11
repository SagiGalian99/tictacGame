const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Player{
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
        this.vel = 3;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Ball{
    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.velX = 3;
        this.velY = 3;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

class Button{
    constructor(x, y, w, h, dir, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dir = dir;
        this.color = color
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    onclick(x, y){
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h){
            return true;
        }
    }
}

mouse = {
    x:undefined,
    y:undefined
}
moveDir = "none";
window.addEventListener("touchstart", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    clicked1 = buttonDown.onclick(mouse.x, mouse.y);
    clicked2 = buttonUp.onclick(mouse.x, mouse.y);
    if (clicked1) moveDir = "down";
    else moveDir = "up";
})
window.addEventListener("touchend", function(e){
    mouseClicked = false;
})


ball = new Ball(window.innerWidth / 2 - 5, window.innerHeight / 2 - 5, 10, "yellow")
player = new Player(70, window.innerHeight / 2 - 50, 15, 100, "red");
bot = new Player(window.innerWidth - 70, 10, 15, 100, "red");
buttonUp = new Button(10, window.innerHeight - 60, 50, 50, "down", "blue");
buttonDown = new Button(window.innerWidth - 60, window.innerHeight - 60, 50, 50, "up", "blue");
function main(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    player.draw();
    buttonUp.draw();
    buttonDown.draw();    
    bot.y = ball.y - bot.h / 2;
    bot.draw();
    
    if (moveDir == "down"){
        if (player.y + player.h < window.innerHeight){
            player.y += player.vel
        }
    } 
    else if (moveDir == "up"){
        if (player.y > 0){
            player.y -= player.vel
        }
    } 

    if (ball.x < player.x + 15 && ball.y > player.y && ball.y < player.y + player.h || ball.x >= bot.x){
        ball.velX = ball.velX * -1;
    }
    else if(ball.x <= 0){
        document.getElementById("canvas").style.visibility = "hidden";
        document.getElementById("lost").innerHTML = "G A M E\u00A0 \u00A0O V E R";
    }

    if (ball.y <= 0 || ball.y >= window.innerHeight){
        ball.velY = ball.velY * -1;
    } 
    ball.y += ball.velY;
    ball.x += ball.velX

    ball.draw();

    
    
    

    requestAnimationFrame(main);
}
main();
