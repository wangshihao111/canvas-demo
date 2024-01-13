export class Animate {

  private prevTime: number;
  private prevValue: number;
  constructor(private duration: number, private range: number) {
    this.prevTime = 0;
    this.prevValue = 0;
  }

  start() {
    this.prevTime = Date.now();
    this.prevValue = this.range * Math.sin(Math.random() * Math.PI)
  }

  random() {
    const now = Date.now();
    const ratio = 2 * Math.PI / (this.duration);
    // const delta = (now - this.prevTime) * ratio;
    // this.prevValue += 0.5 - Math.random();
    // return this.prevValue;
    return Math.random() * this.range;
  }
}