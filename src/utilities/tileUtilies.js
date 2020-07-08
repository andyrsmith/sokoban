import * as Directions from '../const/direction'

const TILE_SIZE = 64

const offsetForDirections = (directions, step = 1) => {
  const stepsMinusOne = step - 1
  switch(directions) {
    case Directions.left:
      return {
        x: (TILE_SIZE* -stepsMinusOne) - 32,
        y: 32  
      }
    case Directions.right:
      return {
        x: (TILE_SIZE* stepsMinusOne) + 96,
        y: 32
      }
    case Directions.up:
      return {
        x: 32,
        y: (TILE_SIZE* -stepsMinusOne) - 32
      }
    case Directions.down:
      return {
        x: 32,
        y: (TILE_SIZE* stepsMinusOne) + 96
      }
    default:
      return {
        x: 0,
        y: 0
      }
  }
}

export {
  offsetForDirections
}