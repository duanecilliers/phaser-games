import Phaser from 'phaser'

export default class ProgressBar extends Phaser.GameObjects.Container {
  /**
   * @param {object} config
   * @param {Phaser.Scene} config.scene Phaser scene
   * @param {string} config.color Bar color
   * @param {number} config.config.width Bar width
   * @param {number} config.height Bar height
   * @param {number} config.x Bar x
   * @param {number} config.y Bar y
   */
  constructor (config) {
    super(config.scene)
    const {
      scene,
      color = 0xff0000,
      width = 200,
      x,
      y
    } = config
    const { height = width / 4 } = config

    this.scene = scene

    // draw the bar
    this.graphics = this.scene.add.graphics()
    this.graphics.fillStyle(color, 1)
    this.graphics.fillRect(0, 0, width, height)
    this.add(this.graphics)
    this.graphics.x = -width / 2
    this.graphics.y = -height / 2
    this.graphics.scaleX = 0

    if (x) {
      this.x = x
    }
    if (y) {
      this.y = y
    }

    this.scene.add.existing(this)
  }

  setPercentage (val) {
    this.graphics.scaleX = val
  }
}
