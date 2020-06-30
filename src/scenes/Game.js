import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    cursors
    player
    boxes
    
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
            [100,   0,   0,   0,   0,   0,   0,   0,   0, 100],
            [100,   0,   0,  51,   0,  52,   8,   0,   0, 100],
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

        const layer = map.createStaticLayer(0, tile, 0, 0)
        this.player = layer.createFromTiles(52, 0, {
            key: 'tiles',
            frame: 52
        }).pop()
        this.player.setOrigin(0)
        //this.player = this.add.sprite(400, 300, 'tiles', 52)

        this.createPlayerAnimations()

        this.boxes = layer.createFromTiles(8, 0, {
            key: 'tiles',
            frame: 8
        })

        this.boxes.map(box => box.setOrigin(0))

    }

    getBoxAt(x, y) {
        return this.boxes.find((box) => {
            const rect = box.getBounds()
            return rect.contains(x, y)
        })
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
            const box = this.getBoxAt(this.player.x - 32, this.player.y)
            this.tweenMove(box, {x: '-=64',duration: 500 },  () => {
                this.player.anims.play('left', true)
            })

        } else if (justRight) {
            
            const box = this.getBoxAt(this.player.x + 96, this.player.y)

            this.tweenMove(box, {x: '+=64',duration: 500 }, () => {
                this.player.anims.play('right', true)
            })

        } else if (justUp) {

            const box = this.getBoxAt(this.player.x, this.player.y - 32)

            this.tweenMove(box, {y: '-=64',duration: 500 }, () => {
                this.player.anims.play('up', true)
            })

        } else if (justDown) {
            this.player.anims.play('down', true)
            const box = this.getBoxAt(this.player.x, this.player.y + 96)

            this.tweenMove(box, {y: '+=64',duration: 500 }, () => {
                this.player.anims.play('down', true)
            })
        }
        // } else if(this.player.anims.currentAnim) {

        //     this.stopPlayerAnimation();
        //     //this.player.anims.play('idle')
        //     //this.player.anims.currentAnim?.pause()
        // }

    }

    tweenMove(box, baseTween, onStart) {

        if(box) {
            this.tweens.add(Object.assign(
                baseTween,
                {
                    targets: box
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
