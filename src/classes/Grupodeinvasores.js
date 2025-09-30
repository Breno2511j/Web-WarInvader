import Inimigo2 from "./Inimigo2.js";

class Grupodeinvasores {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols; 

        this.direcao = "right";
        this.moveDown = false;

        this.inimigos = this.init();
    }
    init() {
        const array = []

        for (let row = 0; row < this.rows; row++){
            
            for (let col = 0; col < this.cols; col++) {
                const inimigo2 = new Inimigo2({
              x: col * 50 + 10,
              y: row * 50 + 10,

                },
            );
            array.push(inimigo2);
            }
        }
        return array;
    }
     draw(ctx) {
            this.inimigos.forEach(inimigo2 => inimigo2.draw(ctx));
        };

        update(){

           if(this.TBR()){
             this.direcao = "left";
             this.moveDown = true;
          } else if (this.TBL()) {
             this.direcao = "right";
             this.moveDown = true; 
          } 

          this.inimigos.forEach((Inimigo2) => {
            
             if(this.moveDown) {
                Inimigo2.moveDown();
                Inimigo2.velo +=0.85;
             }

           if (this.direcao === "right") Inimigo2.moveRight();
           if (this.direcao === "left") Inimigo2.moveLeft();
          });

          this.moveDown = false;

        }
      TBR() {
        return this.inimigos.some((Inimigo2) => Inimigo2.position.x + Inimigo2.width >= innerWidth )
      }
      TBL() {
        return this.inimigos.some(((Inimigo2) => Inimigo2.position.x <= 0))
      }
      GRandomIn () {
        const index = Math.floor(Math.random() * this.inimigos.length);
        return this.inimigos[index];
      }

      Recomeço() {
        this.inimigos = this.init();
        this.direcao = "right";
      }
} 

export default Grupodeinvasores;