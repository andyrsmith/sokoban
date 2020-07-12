import {levelOne} from './levelOne'
import {levelTwo} from './levelTwo'
import {levelThree} from './levelThree'

class LevelService {
  levels = [
    levelOne,
    levelTwo,
    levelThree
  ]

  getLevel(level) {
    const stage = this.levels[level - 1]
    return stage
  }

  levelsCount() {
    return this.levels.length
  }
}
const sharedInstance = new LevelService()
export {
  sharedInstance
}