import React, {useEffect, useRef} from "react";
import "./App.css";
import { Stage, Layer, Group, Rect } from "react-konva";
import { getCenterX, getCenterY } from './utils/position';
import Heart from './components/Heart';
import { HeartEngine } from './heart/canvas';

function App() {
  const ref = useRef<HTMLCanvasElement>();
  useEffect(() => {
    const heart = new HeartEngine(ref);
    heart.play();
  }, []);
  return (
    <div className="App">
      {/* <Stage width={window.innerWidth} height={window.innerHeight}>
        <Heart />
      </Stage> */}
      <canvas width={window.innerWidth} height={window.innerHeight} ref={ref as any} />
    </div>
  );
}

export default App;
