import Phaser from 'phaser'
import * as Colors from '../const/color'
import {boxColorToTileColor} from '../utilities/colorUtilies'
import * as Directions from '../const/direction'
import {offsetForDirections} from '../utilities/tileUtilies'

export default class Game extends Phaser.Scene
{
    cursors
    player
    //blueBoxes
    layer
    boxesByColor = {}
    
    TargetsCoveredByColor = {}

	constructor()
	{
		super('hello-world')
	}

	preload()
    {

        this.load.spritesheet('tiles', 'assets/sokoban_tilesheet.png', {
            frameWidth: 64,
            startFrame: 0
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        const level = [
            [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            [100,   0,   0,   0,   0,   0,   0,   0,   0, 100],
            [100,   6,   7,   8,   9,   10,   0,   0,   0, 100],
            [100,   25, 38,  51,   64,  77,  52,   0,   0, 100],
            [100,   0,   0,   0,   0,   0,   0,   0,   0, 100],
            [100,   0,   0,   0,   0,   0,   0,   0,   0, 100],
            [100,   0,   0,   0,   0,   0,   0,   0,   0, 100],
            [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        ]

        const map = this.make.tilemap({ 
            data: level, 
            tileHeight: 64, 
            tileWidth: 64
        })

        const tile = map.addTilesetImage('tiles')

        this.layer = map.createStaticLayer(0, tile, 0, 0)
        this.player = this.layer.createFromTiles(52, 0, {
            key: 'tiles',
            frame: 52
        }).pop()
        this.player.setOrigin(0)



        this.createPlayerAnimations()

        this.extractBoxes(this.layer)

        // this.blueBoxes = this.layer.createFromTiles(8, 0, {
        //     key: 'tiles',
        //     frame: 8
        // })

        // this.blueBoxes.map(box => box.setOrigin(0))

    }

    getBoxAt(x, y) {
        const keys = Object.keys(this.boxesByColor)
        for(let i = 0; i < keys.length; ++i) {
            const color =keys[i]
            const box = this.boxesByColor[color].find(box => {
                const rect = box.getBounds()
                return rect.contains(x, y)
            })
            if(!box) {
                continue
            }

            return {
                box,
                color
            }
        }
        return undefined
    }

    update() {
        if(!this.cursors || !this.player){
            return
        }

        const justLeft = Phaser.Input.Keyboard.JustDown(this.cursors.left)
        const justRight = Phaser.Input.Keyboard.JustDown(this.cursors.right)
        const justDown = Phaser.Input.Keyboard.JustDown(this.cursors.down)
        const justUp = Phaser.Input.Keyboard.JustDown(this.cursors.up)

        if(justLeft) {

            this.tweenMove({x: '-=64',duration: 500 },  Directions.left, () => {
                this.player.anims.play('left', true)
            })

        } else if (justRight) {
           
            this.tweenMove({x: '+=64',duration: 500 }, Directions.right, () => {
                this.player.anims.play('right', true)
            })

        } else if (justUp) {
            this.tweenMove({y: '-=64',duration: 500 }, Directions.up, () => {
                this.player.anims.play('up', true)
            })

        } else if (justDown) {
            this.tweenMove({y: '+=64',duration: 500 }, Directions.down, () => {
                this.player.anims.play('down', true)
            })
        }
    }

    extractBoxes(layer) {
        const boxColors = [Colors.boxBlue, Colors,Colors.boxGreen, Colors.boxGrey, Colors.boxOrange, Colors.boxRed]
        boxColors.forEach(color => {
            this.boxesByColor[color] = layer.createFromTiles(color, 0, {
                key: 'tiles',
                frame: color
            }).map(box => box.setOrigin(0))
        })

    }

    tweenMove(baseTween, direction, onStart) {

        if(!this.player || this.tweens.isTweening(this.player)) {
            return 
        }

        const x = this.player.x
        const y = this.player.y
        //need to center x and y, x and y in upper left of player
        const offset = offsetForDirections(direction)
        const ox = x + offset.x
        const oy = y + offset.y
        const boxData = this.getBoxAt(ox, oy)

        const isWall = this.hasWallAt(ox, oy)
        if(isWall) {
            return
        }

        if(boxData) {
            const nextOffset = offsetForDirections(direction, 2)

            const nx = x + nextOffset.x
            const ny = y + nextOffset.y
            const nextBoxData = this.getBoxAt(nx, ny)
            if(nextBoxData) {
                return
            }
            const nextIsWall = this.hasWallAt(nx, ny)
            if(nextIsWall) {
                return
            }
            const targetColor = boxColorToTileColor(boxData.color)
            const coveredTarget = this.coveredTargetAt(boxData.box.x, boxData.box.y, targetColor)
            if(coveredTarget) {
                this.incrementCountForColor(targetColor, -1)
            }
            this.tweens.add(Object.assign(
                baseTween,
                {
                    
                    targets: boxData.box,
                    onComplete: () => {

                        const coveredTarget = this.coveredTargetAt(boxData.box.x, boxData.box.y, targetColor)
                        if(coveredTarget) {
                            this.incrementCountForColor(targetColor, 1)
                        } 

                        console.dir(this.TargetsCoveredByColor)
                    }
                })
            )
        }

        this.tweens.add(Object.assign(
            baseTween,
            {
                targets: this.player, 
                onComplete: this.stopPlayerAnimation,
                onCompleteScope: this,
                onStart: onStart
            }
        ))
    }

    coveredTargetAt(x, y, tileIndex) {
        if(!this.layer) {
            return false
        }

        const tile = this.layer.getTileAtWorldXY(x, y)

        if(!tile) {
            return false
        }

        return tile.index === tileIndex

    }

    hasWallAt(x, y) {
        if(!this.layer) {
            return false
        }

        const tile = this.layer.getTileAtWorldXY(x, y)
        if(!tile) {
            return false
        }

        return tile.index === 100;

    }

    incrementCountForColor(color, change) {
        if(!(color in this.TargetsCoveredByColor)) {
            this.TargetsCoveredByColor[color] = change
        } else {
            this.TargetsCoveredByColor[color] += change
        }
    }

    stopPlayerAnimation() {
        if(!this.player) {
            return
        }
        const currentAnimKey = this.player.anims.currentAnim?.key
        if(!currentAnimKey.startsWith('idle')) {
            this.player.anims.play(`idle-${currentAnimKey}`)

        }
    }


    createPlayerAnimations() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('tiles', {
                start: 81, end: 83
            }), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'idle-down',
            frames: [{ key: 'tiles', frame: 52}]
        })

        this.anims.create({
            key: 'idle-left',
            frames: [{ key: 'tiles', frame: 81}]
        })
        this.anims.create({
            key: 'idle-right',
            frames: [{ key: 'tiles', frame: 78}]
        })

        this.anims.create({
            key: 'idle-up',
            frames: [{ key: 'tiles', frame: 55}]
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('tiles', {
                start: 78, end: 80
            }), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('tiles', {
                start: 55, end: 57
            }), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('tiles', {
                start: 52, end: 54
            }), 
            frameRate: 10,
            repeat: -1
        })
    }
}
