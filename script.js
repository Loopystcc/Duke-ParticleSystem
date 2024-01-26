const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const particalArray = [];
const AmountEl = document.getElementById("amountRange");
const speedEl = document.getElementById("speedRange");
const sizeEl = document.getElementById("sizeRange");
const colorEl = document.getElementById("color");

let color = colorEl.value;
let amount = parseFloat(AmountEl.value);
let size = parseFloat(sizeEl.value);
let speed = parseFloat(speedEl.value);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

class Particle{
    constructor(x,y,size,speedX,speedY,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x > canvas.width || this.x < 0 || this.y >canvas.height || this.y < 0 ){
            this.speedX *= -1;
            this.speedY *= -1;
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    draw(){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}

function init(){
    amount = parseFloat(AmountEl.value);
    size = parseFloat(sizeEl.value);
    speed = parseFloat(speedEl.value);
    color = colorEl.value;
    particalArray.length = 0;
    for(let i = 0;i < amount;i++){
        particalArray.push(new Particle(Math.random() * canvas.width,Math.random() * canvas.height,
        Math.random() * size + 1,Math.random() * speed * 2 -speed,Math.random() * speed * 2 - speed,color));
    }
}

function handleParticles(){
    for(let i = 0; i< particalArray.length;i++){
        particalArray[i].update();
        particalArray[i].draw();
    }
}



init();
animate();



