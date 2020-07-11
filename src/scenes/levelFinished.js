import Phaser from 'phaser'
import {createButton} from '../UI/button'

export default class LevelFinished extends Phaser.Scene {

  constructor() {
    super('level-finished')
  }

  create(data) {
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
    // const buttonHtml = `
    //       <button class="button is-primary is-large">
    //         <span>${buttonText}</span>
    //       </button>
    // `
    const buttonHtml = createButton(text)
    //this.add.dom(x, y, element, style, text)
      const button = this.add.dom(width * 0.5, height * 0.7)
        .createFromHTML(buttonHtml)
        .addListener('click').once('click', () => {
            this.scene.start('game')
          })
        .setOrigin(0.5)

  }
}