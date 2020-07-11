import Phaser from 'phaser'
import Game from './scenes/Game'
import LevelFinished from './scenes/levelFinished'
import Preloader from './scenes/Preloader'

const config = {
	type: Phaser.AUTO,
	width: 640,
	height: 512,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	parent: 'mphaser',
	dom: {
		createContainer: true
	},
	scene: [Preloader, Game, LevelFinished]
}

export default new Phaser.Game(config)
