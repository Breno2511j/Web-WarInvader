
 export class BarraDeVida {
  constructor(Divemcss, VidaMaxima = 100, VidaAtual = 100) {
    this.vidaMaxima = VidaMaxima;
    this.vidaAtual = VidaAtual;
    this.barraEmcss = document.querySelector(Divemcss);
    this.update();
  }

  update() {
    const percent = (this.vidaAtual / this.vidaMaxima) * 100;
    this.barraEmcss.style.height = percent + "%";
    this.barraEmcss.style.top = `${100 - percent}%`;
  }

  diminuirVida(valorV = 0.5) {
    this.vidaAtual -= valorV;
    if (this.vidaAtual < 0) this.vidaAtual = 0;
    this.update();
  }

}


export class BarraDeSobrecarga {
  constructor(DivSemcss, SobrecargaMaxima = 100, Barras) {
    this.sobrecargaMaxima = SobrecargaMaxima;
    this.sobrecargaAtual = Barras;
    this.barraSEmcss = document.querySelector(DivSemcss);
    this.update();
  }

  update() {
    const percent = (this.sobrecargaAtual.sobrecargaatual / this.sobrecargaMaxima) * 100;
    this.barraSEmcss.style.height = percent + "%";
  }

}

export class BarraDeVelocidade {
  constructor(DivVemcss, VelocidadeMaxima, player) {
    this.player = player;
    this.velocidadeMaxima = VelocidadeMaxima;
    this.barraVEmcss = document.querySelector(DivVemcss);
    this.update();
  }

 update() {
    const vMin = 4;
    const vMax = 12;
    const vp = this.player.velo;

    const percent = ((vp - vMin) / (vMax - vMin)) * 100;

    this.barraVEmcss.style.height = percent + "%";
}
}
