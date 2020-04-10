/**
 * Create a Grid for positioning
 */
export default class Grid {
  /**
   * @param {Object} config
   * @param config.scene {Phaser.Scene}
   * @param config.rows {number} number of rows
   * @param config.cols {number} number of columns
   * @param config.height {number}
   * @param config.width {number}
   */
  constructor (config) {
    if (!config.scene) {
      console.error('Missing scene!')
      return
    }

    this.config = config
    this.scene = config.scene

    if (!config.rows) {
      config.rows = 5
    }

    if (!config.cols) {
      config.cols = 5
    }

    if (!config.height) {
      config.height = this.scene.game.config.height
    }

    if (!config.width) {
      config.width = this.scene.game.config.width
    }

    this.cellWidth = config.width / config.cols
    this.cellHeight = config.height / config.rows
  }

  show () {
    this.graphics = this.scene.add.graphics()
    this.graphics.lineStyle(2, 0xff0000)

    // draw vertical lines
    for (let i = 0; i < this.config.width; i += this.cellWidth ) {
      this.graphics.moveTo(i, 0)
      this.graphics.lineTo(i, this.config.height)
    }

    // draw horiztonal lines
    for (let i = 0; i < this.config.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i)
      this.graphics.lineTo(this.config.width, i)
    }

    this.graphics.strokePath()
  }

  placeAt (x, y, obj) {
    // calculate position based on the cellWidth and cellHeight
    const x2 = this.cellWidth * x
    const y2 = this.cellHeight * y
    obj.x = x2 + this.cellWidth / 2
    obj.y = y2 + this.cellHeight / 2
  }

  placeAtIndex (index, obj) {
    const y = Math.floor(index / this.config.cols)
    const x = index - (y * this.config.cols)
    this.placeAt(x, y, obj)
  }

  showNumbers () {
    let count = 0
    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        const numText = this.scene.add.text(0, 0, count, { color: '#ff0000' })
        numText.setOrigin(0.5, 0.5)
        this.placeAtIndex(count, numText)
        count++
      }
    }
  }
}
