import Player from "./classes/Player.js" ;
import Inimigo1 from "./classes/Inimigo1.js";
import Inimigo2 from "./classes/Inimigo2.js";
import Grupodeinvasores from "./classes/Grupodeinvasores.js";
import {BarraDeVida, BarraDeSobrecarga, BarraDeVelocidade} from "./menu1.js";

const botaoTiroContinuo = document.getElementById("TiroContinuo");
const botaoTiroPerfurante = document.getElementById("TiroPerfurante"); 

const haperfurante = document.getElementById("HaPerfurante");
const haconstante = document.getElementById("HaConstante");


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player(canvas.width, canvas.height);
const playerProjectiles = [];
const inimigo2Projectiles = [];
const inimigo1 = new Inimigo1({x: 150, y:150});
const inimigo2 = new Inimigo2();
const grupodeinvasores = new Grupodeinvasores (2,3);

let barradevida;
let barradesobrecarga;
let barradevelocidade;

const Barras = {
    sobrecargaatual: 0,
    tiro: false,
    vidaatual: 100,
    alvo: 100,
};

const Botoes = {
    TiroContinuo: false,
    TiroPerfurante: false,
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
    barradevida = new BarraDeVida(".Barra .Vida", 100, Barras); 
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

//loop reanimar orda
const LRO = {
    delay: 0,
    delaymax: 100,
    
};

const ReanimarOrda = () => {
   if (grupodeinvasores.inimigos.length === 0) {

    if (LRO.delay === 0) {
      LRO.delay = LRO.delaymax;
    }

    if (LRO.delay > 0) LRO.delay--;  
    if (LRO.delay === 0)  {
    grupodeinvasores.cols = Math.round(Math.random() * 9) + 1;
    grupodeinvasores.rows = Math.round(Math.random() * 4) + 1;
    grupodeinvasores.Recomeço();
  }
 }
};

const hitboxinimigos2 = () => {
    grupodeinvasores.inimigos.forEach((inimigo2, Inimigo2index) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (inimigo2.hit(projectile)) {
                grupodeinvasores.inimigos.splice(Inimigo2index, 1)
                //tiro perfurante remover "layerProjectiles.splice(projectileIndex, 1)"
                //tiro perfurante
                if (Botoes.TiroPerfurante === false) {
                playerProjectiles.splice(projectileIndex, 1)
                }
            }
        })
    })
}

const hitbpoxplayer = () => {
    inimigo2Projectiles.some((projectile, projectileIndex) => {
            if (player.hit(projectile)) {
                inimigo2Projectiles.splice(projectileIndex, 1)
                
                Barras.alvo -= 10; 
                if (Barras.alvo > 100) Barras.alvo = 100;

                if (Barras.vidaatual < 0)  Barras.vidaatual = 0;
                barradevida.update();
            }
        })
}


function verification(){
    //player
    if (keys.shoot.pressed && keys.shoot.released && Barras.sobrecargaatual < 100) {
        player.shoot(playerProjectiles);
        Barras.tiro = true;
        //tiro continuo remover "keys.shoot.released = false;"

        //Apertar se quiser tiro continuo
            if (Botoes.TiroContinuo) {
        keys.shoot.released = true; 
    } else {
        keys.shoot.released = false;
    }
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

let lastTime = Date.now();
let fps = 0;

const gameloop = () => {

    const now = Date.now();
    fps = Math.round(1000 / (now - lastTime));
    lastTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "Black";
    ctx.font = "10px Arial";
    ctx.fillText(`FPS: ${fps}`, 1, 8);


    
    inimigo1.draw(ctx);
    

    grupodeinvasores.draw(ctx);
    //movimentação dos inimigos
    //grupodeinvasores.update();
    
    ReanimarOrda();
    
    hitbpoxplayer();
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


//Loops das barras
//Loop da sobrecarga
let delayCounter = 0;
const delayMax = 2000 / 50;

function atualizaVida() {
    if (Barras.vidaatual > Barras.alvo) {
        Barras.vidaatual -= 1; 
        if (Barras.vidaatual < Barras.alvo) Barras.vidaatual = Barras.alvo;
    }
    barradevida.update();
}

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

const VBS = {
    Aum: 5, //Aumento da barrra
};

function sobrecargaplayer() {
    
    const VBS = {
        Min: 0,
        Max: 100,
        Aum: 5, //Aumento da barrra
        Dim: 1, //Velocidade de redução

    };
    //Ajuste do aumento da barra
    if (Botoes.TiroContinuo) VBS.Aum = 15;
    if (Botoes.TiroPerfurante) VBS.Aum = 10;
    
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

//Eventos do botão
botaoTiroContinuo.addEventListener("mousedown", () => {
    Botoes.TiroContinuo = true;
    botaoTiroContinuo.disabled = true;

    if (Botoes.TiroContinuo) {
         setTimeout(() => {
        Botoes.TiroContinuo = false;
    }, 10000); //duração do poder
    }

    let tempoBTCH = 9; //tempo de duração poder

    const intervaloBTCH = setInterval(() => {
      haconstante.textContent = tempoBTCH; 
      tempoBTCH--;

      if (tempoBTCH < 0) clearInterval(intervaloBTCH),haconstante.textContent = 'Acabou';
    } , 1000);

    let tempoBTC = 39; //tempo de recarga poder

    const intervaloBTC = setInterval(() => {
      botaoTiroContinuo.textContent = tempoBTC; 
      tempoBTC--;

      if (tempoBTC < 0) clearInterval(intervaloBTC),botaoTiroContinuo.textContent = 'Pronto';
    } , 1000);

    if (botaoTiroContinuo.disabled) {
        botaoTiroContinuo.style.backgroundColor = 'gray';
    setTimeout(() => {
        botaoTiroContinuo.disabled = false;
        botaoTiroContinuo.style.backgroundColor = 'pink';
    }, 40000);//tempo para poder usar novamente
    }

});

botaoTiroPerfurante.addEventListener("mouseup", () => {
    Botoes.TiroPerfurante = true;
    botaoTiroPerfurante.disabled = true;

    if (Botoes.TiroPerfurante) {
         setTimeout(() => {
        Botoes.TiroPerfurante = false;
    }, 10000);//duração do poder
    }

    let tempoBTPH = 9; //tempo de duração poder

    const intervaloBTPH = setInterval(() => {
      haperfurante.textContent = tempoBTPH; 
      tempoBTPH--;

      if (tempoBTPH < 0) clearInterval(intervaloBTPH),haperfurante.textContent = 'Acabou';
    } , 1000);

    let tempoBTP = 9; //tempo de recarga poder
    
    const intervaloBTP = setInterval(() => {
      botaoTiroPerfurante.textContent = tempoBTP; 
      tempoBTP--;

      if (tempoBTP < 0) clearInterval(intervaloBTP),botaoTiroPerfurante.textContent = 'Pronto';
    } , 1000);

    if (botaoTiroPerfurante.disabled) {

        botaoTiroPerfurante.style.backgroundColor = 'gray';
        setTimeout(() => {
            botaoTiroPerfurante.disabled = false;
            botaoTiroPerfurante.style.backgroundColor = 'pink';
        }, 40000);//tempo para poder usar novamente
    }


});

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
    atualizaVida();
}, 50);