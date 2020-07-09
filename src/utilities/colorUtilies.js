import * as Colors from '../const/color'

const boxColorToTileColor = (boxColor) => {
  switch(parseInt(boxColor)) {
    case Colors.boxBlue:
      return Colors.targetBlue
    
    case Colors.boxGreen:
      return Colors.targetGreen

    case Colors.boxGrey:
      return Colors.targetGrey

    case Colors.boxOrange:
      return Colors.targetOrange
    
    case Colors.boxRed:
      return Colors.targetRed
  }
}

const targetColorToBoxColor = (targetColor) => {
  switch(parseInt(targetColor)) {
    case Colors.targetBlue:
      return Colors.boxBlue
    
    case Colors.targetGreen:
      return Colors.boxGreen

    case Colors.targetGrey:
      return Colors.boxGrey

    case Colors.targetOrange:
      return Colors.boxOrange
    
    case Colors.targetRed:
      return Colors.boxRed
  }
}

export {
  boxColorToTileColor,
  targetColorToBoxColor
}