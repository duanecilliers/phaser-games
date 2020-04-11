import Phaser from 'phaser'
import Align from '../../utils/Align'

export default class ToggleButton extends Phaser.GameObjects.Container {
  /**
   * @param {object} config
   * @param config.scene {Phaser.Scene} Phaser scene
   * @param config.emitter {Phaser.Events.EventEmitter} Phaser scene
   * @param config.bgKey {string} Background image key
   * @param config.onIcon {string} On icon image key
   * @param config.offIcon {string} Off icon image key
   * @param config.value {boolean} Toggle value
   * @param config.x {number} Button x position
   * @param config.y {number} Button y position
   * @param config.event Button click event
   */
  constructor (config) {
    const {
      scene,
      emitter,
      bgKey,
      onIcon,
      offIcon,
      value,
      x,
      y,
      event
    } = config

    super(scene)
    this.scene = scene
    this.emitter = emitter

    this.bg = this.scene.add.image(0, 0, bgKey)
    this.onIcon = this.scene.add.image(0, 0, onIcon)
    this.offIcon = this.scene.add.image(0, 0, offIcon)

    /**
     * @todo remove config as param
     */
    Align.scaleToGameWidth(this.bg, 0.1, this.scene.game.config)
    Align.scaleToGameWidth(this.onIcon, 0.5, this.scene.game.config)
    Align.scaleToGameWidth(this.offIcon, 0.1, this.scene.game.config)

    this.add(this.bg)
    this.add(this.onIcon)
    this.add(this.offIcon)

    this.value = value || true

    if (event) {
      this.event = event
    }

    if (x) {
      this.x = x
    }

    if (y) {
      this.y = y
    }

    this.bg.setInteractive()
    this.bg.on('pointerdown', this.toggle, this)

    this.scene.add.existing(this)
  }

  toggle () {
    this.value = !this.value
    this.setIcons()

    if (this.event) {
      console.log('this.event', this.event)
      this.emitter.emit(this.event, this.value)
    }
  }

  setIcons () {
    if (this.value === true) {
      this.onIcon.visible = true
      this.offIcon.visible = false
    } else {
      this.onIcon.visible = false
      this.offIcon.visible = true
    }
  }
}
