import Phaser from 'phaser'
import Grid from '../../../../utils/Grid'
import button from '../../../../ui/button/img/2/1.png'
import Align from '../../../../utils/Align'
import FlatButton from '../../../../ui/button/FlatButton'

export default class SceneTitle extends Phaser.Scene {
  constructor () {
    super('SceneTitle')
  }

  preload () {
    this.load.image('button', button)
  }

  create () {
    const emitter = new Phaser.Events.EventEmitter()
    this.grid = new Grid({
      scene: this,
      rows: 11,
      cols: 11
    })

    const { game: { config } } = this

    this.add.image(config.width / 2, config.height / 2, 'titleBackground')

    const title = this.add.image(0, 0, 'title')
    Align.scaleToGameWidth(title, .5, config)
    this.grid.placeAtIndex(38, title)

    const startBtn = new FlatButton({
      scene: this,
      emitter,
      key: 'button',
      text: 'Start',
      x: 20,
      y: 20,
      event: 'start_game'
    })

    this.grid.placeAtIndex(93, startBtn)

    emitter.on('start_game', this.startGame, this)
  }

  update () {

  }

  startGame () {
    this.scene.start('SceneMain')
  }
}
