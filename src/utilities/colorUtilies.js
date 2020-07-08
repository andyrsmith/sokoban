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

export {
  boxColorToTileColor
}