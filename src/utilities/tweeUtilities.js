import * as Direction from '../const/direction'

const baseTweenForDirection = (directions) => {
  const baseTween = {
      duration: 500 
  }
  switch(directions) {
    case Direction.down:
      baseTween.y = '+=64'
      break
    case Direction.up:
      baseTween.y = '-=64'
      break
    case Direction.left:
      baseTween.x = '-=64'
      break
    case Direction.right:
      baseTween.x = '+=64'
      break
  }
  return baseTween
}

export {
  baseTweenForDirection
}