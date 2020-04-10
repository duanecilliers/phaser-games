import Phaser from 'phaser'
import * as constants from '../constants'

export default class ScoreBox extends Phaser.GameObjects.Container {
  constructor (config) {
    const { scene, emitter, model } = config
    super(scene)
    this.scene = scene
    this.model = model
    this.text1 = this.scene.add.text(0, 0, 'SCORE: 0')
    this.text1.setOrigin(0.5, 0.5)
    this.add(this.text1)

    this.scene.add.existing(this)
    emitter.on(constants.SCORE_UPDATED, this.scoreUpdated.bind(this))
  }

  scoreUpdated () {
    this.text1.setText(`SCORE: ${this.model.score}`)
  }
}
