import Player from "./classes/Player.js" ;
import Inimigo1 from "./classes/Inimigo1.js";
import Inimigo2 from "./classes/Inimigo2.js";
import Grupodeinvasores from "./classes/Grupodeinvasores.js";
import {BarraDeVida, BarraDeSobrecarga, BarraDeVelocidade} from "./menu1.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player(canvas.width, canvas.height);
const playerProjectiles = [];
const inimigo2Projectiles = [];
const inimigo1 = new Inimigo1({x: 150, y:150});
const inimigo2 = new Inimigo2({x: 250, y:250});
const grupodeinvasores = new Grupodeinvasores (2,3);

let barradevida;
let barradesobrecarga;
let barradevelocidade;

const Barras = {
    sobrecargaatual: 0,
    tiro: false,
};

const keys = {
    BS: false,
    act: false,
    left: false,
    right: false,
    shoot: {
             pressed: false,
             released: true,
   },
    chef: {
    left: false,
    right: false,
    up: false,
    down: false,
    },

    teste: {
        Real: false,
        Falso: false,
    },
};

window.addEventListener("DOMContentLoaded", () => {
    barradevida = new BarraDeVida(".Barra .Vida"); 
    barradesobrecarga = new BarraDeSobrecarga(".BarraS .Sobrecarga", 100, Barras);
    barradevelocidade = new BarraDeVelocidade(".BarraV .Velocidade", 100, player);
    gameloop();
});

const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...inimigo2Projectiles];

    projectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
    });
};

const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, index) =>{
        if (projectile.position.y <=0) {
            playerProjectiles.splice(index, 1);
        }
    }); 
};

const hitboxinimigos2 = () => {
    grupodeinvasores.inimigos.forEach((inimigo2, Inimigo2index) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (inimigo2.hit(projectile)) {
                grupodeinvasores.inimigos.splice(Inimigo2index, 1)
                //tiro perfurante remover "layerProjectiles.splice(projectileIndex, 1)"
                playerProjectiles.splice(projectileIndex, 1)
            }
        })
    })
}



function verification(){
    //player
    if (keys.shoot.pressed && keys.shoot.released && Barras.sobrecargaatual < 100) {
        player.shoot(playerProjectiles);
        Barras.tiro = true;
        //tiro continuo remover "keys.shoot.released = false;"
        keys.shoot.released = false;
    }
    
    if (keys.left && player.position.x >= 0) {
        player.moveLeft();
    }
    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight();
    }

    //chef
    if (keys.chef.up && inimigo1.position.y >= 0) {
        inimigo1.moveUp();
    }
    if (keys.chef.down && inimigo1.position.y <= canvas.height - player.height -100) {
        inimigo1.moveDown();
    }
     if (keys.chef.left && inimigo1.position.x >= 0) {
        inimigo1.moveLeft();
    }
    if (keys.chef.right && inimigo1.position.x <= canvas.width - inimigo1.width) {
        inimigo1.moveRight();

    }

  //Teste
    if (barradevida && keys.teste.Real) {
        barradevida.diminuirVida();
    }
}



const gameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    inimigo1.draw(ctx);
    inimigo2.draw(ctx);

    grupodeinvasores.draw(ctx);
    //movimentação dos inimigos
    //grupodeinvasores.update();
    
    hitboxinimigos2();

    drawProjectiles();

    clearProjectiles();

    ctx.save();

    verification();

    player.draw(ctx);

    ctx.restore();

    window.requestAnimationFrame(gameloop);
};



window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
  //player
    if (key === "a") keys.left = true, keys.act = true;
    if (key === "d") keys.right = true, keys.act = true;
    if (key === "j" ) keys.shoot.pressed = true, keys.BS = true;
    if (key === " " ) keys.shoot.pressed = true;
    
  //Chef
    if (event.key === "ArrowUp") keys.chef.up = true;
    if (event.key === "ArrowDown") keys.chef.down = true;
    if (event.key === "ArrowRight") keys.chef.right = true;
    if (event.key === "ArrowLeft") keys.chef.left = true;

  //Teste
   if (event.key === "t") keys.teste.Real = true;
  
});

window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

 //Player   
    if (key === "a") keys.left = false, keys.act = false ;
    if (key === "d") keys.right = false, keys.act = false ;
    if (key === "j") {
        keys.shoot.pressed = false;   
        keys.shoot.released = true;
    }
    if (key === " ") {
        keys.shoot.pressed = false;   
        keys.shoot.released = true;
    }

 //Chef
    if (event.key === "ArrowUp") keys.chef.up = false;
    if (event.key === "ArrowDown") keys.chef.down = false;
    if (event.key === "ArrowRight") keys.chef.right = false;
    if (event.key === "ArrowLeft") keys.chef.left = false;

 //Teste
   if (event.key === "t") keys.teste.Real = false;

});



//Loop da sobrecarga
let delayCounter = 0;
const delayMax = 2000 / 50;

function velocidadeplayer() {
   const vMin = 4;
   const vMax = 12;
   const acel = 0.5;
   const desacel = 0.6;

  if (keys.act === true)  player.velo += acel; 
   
  if (keys.act === false) player.velo -= desacel;

  if (player.velo < vMin) player.velo = vMin;

  if (player.velo > vMax) player.velo = vMax;

   if (player.position.x <= 0) {
    player.position.x = 0 ;
    player.velo = vMin;
  }

  if (player.position.x + player.width > canvas.width) {
    player.position.x = canvas.width - player.width ;
    player.velo = vMin;
  }
  barradevelocidade.update();
}

function sobrecargaplayer() {

    const VBS = {
        Min: 0,
        Max: 100,
        Aum: 7, //Aumento da barrra
        Dim: 1, //Velocidade de redução
    };

    if (Barras.tiro) {

        Barras.sobrecargaatual += VBS.Aum;

        if (Barras.sobrecargaatual > VBS.Max) Barras.sobrecargaatual = VBS.Max;

        Barras.tiro = false;

        delayCounter = delayMax;
    } 

  
    if (delayCounter > 0) delayCounter--;

    else {
    Barras.sobrecargaatual -= VBS.Dim;

    if (Barras.sobrecargaatual < VBS.Min) Barras.sobrecargaatual = VBS.Min;
    }

    barradesobrecarga.update()
}



//loop movimentação inimigos
setInterval(() => {
    const Inimigo2 = grupodeinvasores.GRandomIn();

    if (Inimigo2) {
        Inimigo2.shoot(inimigo2Projectiles);
    }

}, 1000);

//loop movimentação das barras
setInterval(() => {
   velocidadeplayer();
   sobrecargaplayer();
}, 50);