import Phase from 'phaser'
// import survivor from '../assets/img/survivor-idle_handgun_0.png'
import amg1 from '../assets/img/last-guardian-sprites/amg1.png'
import avt1 from '../assets/img/last-guardian-sprites/avt1.png'
import bmg1 from '../assets/img/last-guardian-sprites/bmg1.png'

export default class CharScene extends Phaser.Scene {
	constructor() {
    super('CharScene');
  }

  createAnimation (key, frames) {
    this.anims.create({
      key,
      frames: [
        { key: 'amg1', frame: frames[0] },
        { key: 'amg1', frame: frames[1] },
      ],
      frameRate: 4,
      repeat: -1
    });
  }

	preload () {
    this.load.spritesheet('amg1', amg1, { frameWidth: 32, frameHeight: 32 });
  }

	create() {
    const { config } = this.game
    this.char = this.add.sprite(0, config.height / 2)
    // const frameNames = this.textures.get('char').getFrameNames();

    this.createAnimation('walkUp', [0, 1])
    this.createAnimation('walkDown', [2, 3])
    this.createAnimation('walkLeft', [4, 5])
    this.createAnimation('walkRight', [6, 7])

    this.char.play('walkRight');
    this.walk()
  }

  walk () {
    this.tweens.add({
      targets: this.char,
      duration: 2000,
      x: this.game.config.width,
      onComplete: this.onCompleteHandler.bind(this)
    })
  }

  onCompleteHandler (tween, targets) {
    const char = targets[0]
    char.x = 0
    char.y = this.game.config.height / 2
    char.alpha = 1
    this.walk()
  }

	update() {

  }
}
