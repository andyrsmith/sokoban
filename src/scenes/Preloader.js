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

  }

  create() {
    this.scene.start('level-finished')
  }
}