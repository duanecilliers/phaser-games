import Phaser from 'phaser'
import isMobile from '../../utils/isMobile'

export default class FlatButton extends Phaser.GameObjects.Container {
  /**
   * Create a FlatButton
   *
   * @param {object} config
   * @param config.scene {Phaser.Scene} Phaser scene
   * @param config.emitter {Phaser.Events.EventEmitter} Phaser scene
   * @param config.key {string} Button image key
   * @param config.text {string} Button text
   * @param config.x {number} Button x position
   * @param config.y {number} Button y position
   * @param config.event Button click event
   * @param config.args Arguments passed to the click event
   * @param config.textConfig Text config object
   */
  constructor (config) {
    if (!config.scene) {
      console.error('No scene!')
      return
    }

    if (!config.key) {
      console.error('No key!')
    }

    const {
      scene,
      emitter,
      key,
      text,
      x,
      y,
      event,
      textConfig = {}
    } = config

    super(scene)

    this.scene = scene
    this.config = config
    this.bg = this.scene.add.image(0, 0, key)
    this.config
    this.add(this.bg)

    if (text) {
      this.text = this.scene.add.text(0, 0, text, textConfig)
      this.text.setOrigin(0.5, 0.5)
      this.add(this.text)
    }

    if (x) {
      this.x = x
    }

    if (y) {
      this.y = y
    }

    if (event) {
      this.bg.setInteractive()
      this.bg.on('pointerdown', this.pressed, this)
    }

    if (!isMobile()) {
      this.bg.on('pointerover', this.over, this)
      this.bg.on('pointerout', this.out, this)
    }

    this.scene.add.existing(this)
  }

  pressed () {
    const { emitter, event, args } = this.config
    emitter.emit(event, args)
  }

  over () {
    this.y -= 2
  }

  out () {
    this.y += 2
  }
}
