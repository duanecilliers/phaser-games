import Phase from 'phaser'
import Grid from '../../Grid'
import Align from '../../Align'
import survivor from '../img/survivor.png'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }

  preload() {
    this.load.image('survivor', survivor)
  }

  create() {
    const grid = new Grid({ scene: this })
    grid.show()

    this.survivor = this.add.image(0, 0, 'survivor')
    grid.placeAtIndex(7, this.survivor)
    grid.showNumbers()
    Align.scaleToGameWidth(this.survivor, 0.2, this.game.config)
  }

  update() { }
}
