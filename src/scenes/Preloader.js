import Phaser from 'phaser'
import WebFontFile from '../files/webFontFile'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    const fonts = new WebFontFile(this.load, [
      'Poppins',
      'Righteous'
    ])

    this.load.addFile(fonts)

    this.load.audio('game-music', 'assets/music/8BitCave.wav')
    this.load.audio('confirmation', 'assets/sfx/confirmation_003.ogg')

  }

  create() {
    this.sound.play('game-music', {
      loop: true,
      volume: 0.25
    })
    this.scene.start('game', { levelMap: 1})
    //this.scene.start('level-finished')
  }
}