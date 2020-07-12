import Phaser from 'phaser'
import {createRetryButton, createDefaultButton} from '../UI/button'
import { sharedInstance as levels } from '../levels/levelService'

export default class LevelFinished extends Phaser.Scene {

  constructor() {
    super('level-finished')
  }

  create(d) {
    const data = Object.assign({moves: 0, currentLevel: 1}, d)
    const text = 'Retry'
    const width = this.scale.width
    const height = this.scale.height
    this.add.text(width * 0.5, height * 0.5, 'Level Complete!', {
      fontSize: 48,
      fontFamily: 'Righteous',
      color: "#a4eb34"
    }).setOrigin(0.5)

    this.add.text(width * 0.5, height * 0.6, `Moves: ${data.moves}`,
    {
      fontFamily: 'Poppins'
    }).setOrigin(0.5)

    const retyButtonHtml = createRetryButton(text)
    //this.add.dom(x, y, element, style, text)
      const button = this.add.dom(width * 0.5, height * 0.7)
        .createFromHTML(retyButtonHtml)
        .addListener('click').once('click', () => {
            this.scene.start('game', {
              levelMap: data.currentLevel
            })
          })
        .setOrigin(0.5)

    if(data.currentLevel + 1 > levels.levelsCount()) {
      return
    }

    const nextLevelButton = createDefaultButton('Next Level')
    this.add.dom(width * 0.5, button.x + button.y * 0.3)
          .createFromHTML(nextLevelButton)
          .addListener('click').once('click', () => {
            this.scene.start('game', {
              levelMap: data.currentLevel + 1
            })
          })

  }
}