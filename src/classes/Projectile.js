class Projectile {
    constructor(position, velop) {
        this.position = position;
        this.width = 2;
        this.height = 20;
        this.velop = velop;
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velop;
    }
}

export default Projectile;