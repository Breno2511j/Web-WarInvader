import { PATH_IMG_ENEMY } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Inimigo2 {
   constructor(position){
    this.width = 50;
    this.height = 50;
    this.velo = 5;
    this.position = position;

    this.image = this.getImage(PATH_IMG_ENEMY)
  }

  getImage (path){
    const image = new Image();
    image.src = path;
    return image;
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
        this.position.y += this.height;
    }

  draw(ctx) {
     ctx.drawImage (
    this.image,
    this.position.x, 
    this.position.y, 
    this.width, 
    this.height
   );}





   shoot(projectiles) {
    const p = new Projectile(
        {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height /1.3,
        },
        5
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
export default Inimigo2