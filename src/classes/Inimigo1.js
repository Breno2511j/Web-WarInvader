import Projectile from "./Projectile.js";

class Inimigo1 {
   constructor(position){
    this.width = 70;
    this.height = 60;
    this.velo = 8;
    this.position = position;
  }

    moveLeft() {
        this.position.x -= this.velo;
    }

    moveRight(){
        this.position.x += this.velo;
    }
    moveUp(){
        this.position.y -= this.velo;
    }
    moveDown(){
        this.position.y += this.velo;
    }

  draw(ctx) {
     ctx.fillStyle = "blue";
     ctx.fillRect(
    this.position.x, 
    this.position.y, 
    this.width, 
    this.height
   );}





   shoot(projectiles) {
    const p = new Projectile(
        {
            x: this.position.x + this.width / 2,
            y: this.position.y,
        },
        8 
    );

    projectiles.push(p);
   }
}
export default Inimigo1;