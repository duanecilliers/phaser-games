import Phase from 'phaser'
import Model from '../Model'
import Road from '../classes/Road'
import ScoreBox from '../components/ScoreBox'
import road from '../../assets/images/road.jpg'
import carsSprite from '../../assets/images/cars.png'
import line from '../../assets/images/line.png'
import pcar1 from '../../assets/images/pcar1.png'
import pcar2 from '../../assets/images/pcar2.png'
import cone from '../../assets/images/cone.png'
import barrier from '../../assets/images/barrier.png'
import button from '../../../../ui/button/img/1/1.png'
import Controller from '../Controller'
import FlatButton from '../../../../ui/button/FlatButton'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
    this.model = new Model()
    this.emitter = null
    this.controller = null
  }

  preload() {
    this.load.image('road', road)
    this.load.spritesheet('cars', carsSprite, { frameWidth: 60, frameHeight: 126 })
    this.load.image('line', line)
    this.load.image('pcar1', pcar1)
    this.load.image('pcar2', pcar2)
    this.load.image('cone', cone)
    this.load.image('barrier', barrier)
    this.load.image('button', button)
  }

  create() {
    this.emitter = new Phaser.Events.EventEmitter()
    this.controller = new Controller(this.emitter, this.model)

    // Road
    this.road = new Road({ scene: this, game: this.game, emitter: this.emitter })
    this.road.x = this.game.config.width / 2
    this.road.makeLines()

    // Score
    this.model.score = 100
    this.scoreBox = new ScoreBox({ scene: this, emitter: this.emitter, model: this.model })
    this.scoreBox.x = this.game.config.width - 100
    this.scoreBox.y = 50

    // Button
    const flatButton = new FlatButton({
      scene: this,
      emitter: this.emitter,
      key: 'button',
      text: 'Click me',
      x: 100,
      y: 50,
      event: 'button_pressed',
      args: ['test1', 'test2'],
      textConfig: { color: 'red', fontSize: 20 }
    })

    this.emitter.on('button_pressed', this.buttonPressed, this)
  }

  update() {
    this.road.moveLines()
    this.road.moveObject()
  }

  buttonPressed (params) {
    console.log('button pressed', params)
  }
}
