import { CENTER_X, CENTER_Y } from './constants'

export const getCenterX = (width: number) => {
  return CENTER_X - width / 2;
}

export const getCenterY = (height: number) => {
  return CENTER_Y - height / 2;
}