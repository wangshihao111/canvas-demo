import {
  calcHeartPoints,
  defaultHeartColor,
  generateHeartPoints,
  generateHeartPointsByOffset,
  pointListToPair,
  pointToCenter,
} from "./heart";
import { HEART_SIZE } from "../utils/constants";
import { Animate } from "./animate";

const duration = 3000;
export const maxOffset = 16;

class Point {
  x: number;
  y: number;
  randomOffset: number;
  animation: Animate;
  constructor(
    private ctx: CanvasRenderingContext2D,
    private point: { x: number; y: number; size: number }
  ) {
    const [x, y] = pointToCenter([point.x, point.y]);
    this.x = x;
    this.y = y;
    this.randomOffset = 20;
    this.animation = new Animate(3000, 5);
    this.animation.start();
  }

  getNextPosition(offset: number) {
    [this.x, this.y] = pointToCenter([
      Math.floor(this.point.x - offset / 2 + this.animation.random()),
      Math.floor(this.point.y - offset / 2 + this.animation.random()),
    ]);
  }

  draw(offset?: number) {
    this.getNextPosition(offset || 0);
    const ctx = this.ctx;
    ctx.moveTo(this.x, this.y);
    ctx.beginPath();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = defaultHeartColor;
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class HeartEngine {
  canvas: HTMLCanvasElement;
  drawCtx: CanvasRenderingContext2D;
  dotList: Point[];
  private prevTime: number = 0;

  constructor(ref: React.MutableRefObject<HTMLCanvasElement | undefined>) {
    this.canvas = ref.current as any;
    this.drawCtx = this.canvas.getContext("2d")!;
    this.dotList = generateHeartPoints(calcHeartPoints(HEART_SIZE)).map(
      (item) => new Point(this.drawCtx, item)
    );
  }

  play() {
    this.prevTime = Date.now();
    const frame = () => {
      this.draw();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(() => {
      frame();
    });
  }

  pause() {}

  draw() {
    const now = Date.now();
    const delta = ((2 * Math.PI) / duration) * (now - this.prevTime);
    const o = Math.sin(delta) * maxOffset;
    const r = HEART_SIZE + o;
    const heartData = calcHeartPoints(r);
    this.drawHeart(heartData);
    // this.drawAllPoints();
    this.dotList = generateHeartPoints(heartData,).map(
      (item) => new Point(this.drawCtx, item)
    );
    for (const dot of this.dotList) {
      dot.draw();
    }
    const offsetDotList = generateHeartPointsByOffset(o).map(
      (item) => new Point(this.drawCtx, item)
    );
    for (const dot of offsetDotList) {
      dot.draw();
    }
  }

  drawHeart(originPoints: number[]) {
    const heartPoints = pointListToPair(originPoints);
    const ctx = this.drawCtx;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    const [beginX, beginY] = heartPoints[0];
    ctx.save();
    ctx.moveTo(beginX, beginY);
    ctx.strokeStyle = defaultHeartColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 1; i < heartPoints.length; i++) {
      const [x, y] = pointToCenter(heartPoints[i]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawAllPoints() {
    this.dotList.forEach((dot) => {
      dot.draw()
    });
  }
}
