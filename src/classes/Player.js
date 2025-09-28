
import Projectile from "./Projectile.js";

class Player {
   constructor(canvasWidth, canvasHeight){
    this.width = 100;
    this.height = 100;
    this.velo = 6;

    this.position = {
        x: canvasWidth /2 - this.width / 2,
        y: canvasHeight - this.height - 33,
    };
  }
    moveLeft() {
        this.position.x -= this.velo;
    }

    moveRight(){
        this.position.x += this.velo;
    }

  draw(ctx) {
     ctx.fillStyle = "red";
     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }





   shoot(projectiles) {
    const p = new Projectile(
        {
            x: this.position.x + this.width / 2,
            y: this.position.y,
        },
        -8
    );

    projectiles.push(p);
   }

     hit(projectile) {
    return (
        projectile.position.x >= this.position.x && 
        projectile.position.x <= this.position.x + this.width &&
        projectile.position.y >= this.position.y && 
        projectile.position.y <= this.position.y + this.height
    )
   }
    
}
export default Player;