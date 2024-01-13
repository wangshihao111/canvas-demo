import { FC, useEffect, useRef, useState } from "react";
import { Layer, Line, Circle } from "react-konva";
import { Spring, Animatable, animated } from "@react-spring/konva";
import { calcHeartPoints, generateHeartPoints } from "../../heart/heart";
import { getCenterX, getCenterY } from "../../utils/position";
import { HEART_SIZE } from "../../utils/constants";

// const heartPoints = calcHeartPoints();
// const pointsList = generateHeartPoints(heartPoints);

// const { Line: AnimatedLine } = animated;

const Heart: FC = () => {
  const [heartPoints, setHeartPoints] = useState<number[]>([]);

  const [points, setPoints] = useState<any[]>([]);
  useEffect(() => {
    const prevTime = Date.now();
    const duration = 3000;
    const maxOffset = 50;

    let direct: "l" | "r" = "l";
    let sign = -1; // -1 | 1;

    const animateFrame = () => {
      const now = Date.now();
      const delta = now - prevTime;
      const o = (delta / duration) * maxOffset;
      const r = HEART_SIZE + sign * o;
      const heartPoints = calcHeartPoints(r);
      const pointsList = generateHeartPoints(heartPoints);
      setHeartPoints(heartPoints);
      setPoints(pointsList);
      requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }, []);

  return (
    <>
      <Layer>
        <Line
          x={getCenterX(0)}
          y={getCenterY(0)}
          closed
          scale={{ x: 0.9, y: 0.9 }}
          lineCap="round"
          strokeWidth={8}
          stroke="#ef6480"
          points={heartPoints}
          shadowColor="#ef6480"
          shadowBlur={20}
        />
      </Layer>
      <Layer>
        {points.map(({ x, y, size }) => (
          <Circle
            x={getCenterX(2 * x)}
            y={getCenterY(2 * y)}
            width={size}
            height={size}
            fill="#ef6480"
          />
        ))}
      </Layer>
    </>
  );
};

export default Heart;
