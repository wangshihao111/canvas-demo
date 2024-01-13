import { CENTER_X, CENTER_Y, HEART_SIZE } from "../utils/constants";
import { maxOffset } from './canvas';

const { cos, sin, pow } = Math;

export const defaultHeartColor = "#ef6480";

// 笛卡尔
// function getPointByTheta(theta: number): [number, number] {
//   const { cos, sin } = Math;
//   const a = 100;
//   const x = a * (1 + sin(theta)) * cos(theta);
//   const y = a * (1 + sin(theta)) * sin(theta);
//   return [x, y];
// }

/**
 * 桃心
 * X=16(sinθ)³
  Y=13cosθ-5cos2θ-2cos3θ-cos4θ (0≤θ≤2π)
 * @returns 
 */
function getPeachHeartPoints(t: number, r?: number) {
  const x = pow(sin(t), 3);
  const y = (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) / 16;

  return [
    -Math.floor(x * (r || HEART_SIZE)),
    -Math.floor(y * (r || HEART_SIZE)),
  ];
}

function getAllThetaStop() {
  const pointCount = 100;
  const delta = (2 * Math.PI) / pointCount;
  const result: number[] = [];
  for (let i = 0; i < pointCount; i++) {
    result.push(i * delta);
  }
  return result;
}

export function calcHeartPoints(r?: number) {
  const thetaList = getAllThetaStop();
  return thetaList
    .map((theta) => getPeachHeartPoints(theta, r))
    .reduce((result, next) => [...result, ...next], [] as number[]);
}

export function pointListToPair(pointsData: number[]) {
  const pointsPairs: [number, number][] = [];
  for (let i = 0; i < pointsData.length; i += 2) {
    pointsPairs.push([pointsData[i], pointsData[i + 1]]);
  }
  return pointsPairs;
}

export function pointToCenter([x, y]: [number, number]) {
  return [x + CENTER_X, y + CENTER_Y];
}

export function generateHeartPoints(pointsData: number[]) {
  const pointsPairs = pointListToPair(pointsData);
  const pointLength = pointsPairs.length;
  const result: { x: number; y: number; size: number }[] = [];
  const getRandomSize = (delta: number) => {
    const randomSize = delta * (0.5 - Math.random());
    return Math.floor(randomSize);
  };
  for (let i = 0; i < pointLength; i++) {
    const [x, y] = pointsPairs[i];
    // 随机生成5个点
    for (let i = 0; i < 15; i++) {
      result.push(
        {
          x: x + getRandomSize(10),
          y: y + getRandomSize(10),
          size: 5,
        },
        {
          x: x + getRandomSize(50),
          y: y + getRandomSize(50),
          size: 5,
        },
        {
          x: x + getRandomSize(100),
          y: y + getRandomSize(100),
          size: 5,
        }      );
    }
  }
  return result;
}

export function generateHeartPointsByOffset(offset: number) {
  const pointData = calcHeartPoints(HEART_SIZE + offset)
  const pointsPairs = pointListToPair(pointData);
  const pointLength = pointsPairs.length;
  const result: { x: number; y: number; size: number }[] = [];
  const getRandomSize = (delta: number) => {
    const randomSize = delta * (0.5 - Math.random());
    return Math.floor(randomSize);
  };
  const dotCount = offset / maxOffset * 30;
  for (let i = 0; i < pointLength; i++) {
    const [x, y] = pointsPairs[i];
    // 随机生成5个点
    for (let i = 0; i < dotCount; i++) {
      result.push(
        {
          x: x + getRandomSize(10),
          y: y + getRandomSize(5),
          size: 5,
        },
        {
          x: x + getRandomSize(50),
          y: y + getRandomSize(20),
          size: 5,
        },
        {
          x: x + getRandomSize(100),
          y: y + getRandomSize(50),
          size: 5,
        },
      );
    }
  }
  return result;
}