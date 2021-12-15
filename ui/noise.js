
// const width = Math.min(window.innerWidth, window.innerHeight) * .8;
// const height = width;
const width = 300;
const height = 300;
const cell = 10;
const simplex = new SimplexNoise();
const loop = 0;

class Raf {
  constructor() {
    this.raf();
  }
  raf() {
    if (this.onRaf) {
      window.requestAnimationFrame(() => {
        const o = {};
        o.time = window.performance.now() / 1000;
        o.playhead = o.time % loop / loop;
        this.raf();
        this.onRaf(o);
      });
    }
  }}

  //
class Canvas extends Raf {
  constructor(obj) {
    super();
    this.canvas = document.getElementById(obj.id);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.events();
  }

  resize() {
    this.dpr = window.devicePixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);
  }

  events() {
    window.addEventListener('resize', this.resize);
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  onRaf() {
    this.clear();
  }}

  //
class Fur extends Raf {
  constructor(obj) {
    super();
    Object.assign(this, obj);
    this.draw();
  }

  draw(playhead, time) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    const n = this.simplex.noise3D(time * 0.1 + this.x * 0.002, -time * 0.2 + this.y * 0.002, time * 0.3);

    this.ctx.fillStyle = 'white';

    const t = Math.round(22 * ((n + 2) * .5)) % 10;

    for (let i = 0; i < t; i++) {
      this.ctx.fillRect(Math.random() * cell, Math.random() * 30, 1, 1);
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  onRaf({ playhead, time }) {
    this.draw(playhead, time);
  }}

// init
const canvas = new Canvas({
  id: 'canvas' });

for (let y = 0; y < height; y += cell) {
  for (let x = 0; x < width; x += cell) {
    const i = y * width / cell + x / cell;
    new Fur({
      ctx: canvas.ctx,
      x: x,
      y: y,
      id: i,
      simplex: simplex });
  }
}