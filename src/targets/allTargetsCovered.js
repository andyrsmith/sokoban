import {targetColorToBoxColor } from '../utilities/colorUtilies'

const allTargetsCovered = (targetsCoveredByColor, boxesByColor) => {
    const targetCovers = Object.keys(targetsCoveredByColor)

    for (let i = 0; i < targetCovers.length; ++i) {
        const targetColor = targetCovers[i]
        const boxColor = targetColorToBoxColor(targetColor)
        if(!(boxColor in boxesByColor)) {
            continue
        }
        const numBoxes = boxesByColor[boxColor].length

        const numCovered = targetsCoveredByColor[targetColor]

        if(numCovered < numBoxes) {
            return false
        }
    }

    return true
}


export {
  allTargetsCovered
}