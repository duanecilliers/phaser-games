import Phase from 'phaser'
import Model from '../Model'
import Road from '../classes/Road'
import ScoreBox from '../components/ScoreBox'
import Controller from '../Controller'
import FlatButton from '../../../../ui/button/FlatButton'
import MediaManager from '../classes/MediaManager'
import ToggleButton from '../../../../ui/ToggleButton/ToggleButton'
import { TOGGLE_SOUND, TOGGLE_MUSIC } from '../constants'
import Grid from '../../../../utils/Grid'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
    this.model = new Model()
    this.emitter = null
    this.controller = null
  }

  preload() {

  }

  create() {
    this.emitter = new Phaser.Events.EventEmitter()
    this.controller = new Controller(this.emitter, this.model)
    this.grid = new Grid({ scene: this, rows: 10, cols: 10 })

    const configObj = { scene: this, emitter: this.emitter, model: this.model }

    // Sound
    const mediaManager = new MediaManager(configObj)
    mediaManager.setBackgroundMusic('backgroundSound', { loop: true, volume: 0.5 })

    // Toggle Sound
    const toggleSoundButton = new ToggleButton({
      ...configObj,
      bgKey: 'toggle_bg',
      onIcon: 'sfx_on',
      offIcon: 'sfx_off',
      event: TOGGLE_SOUND,
      value: this.model.soundOn,
      x: 240,
      y: 450
    })
    this.grid.placeAtIndex(10, toggleSoundButton)


    // Road
    this.road = new Road(configObj)
    this.road.x = this.game.config.width / 2
    this.road.makeLines()

    // Score
    this.model.score = 100
    this.scoreBox = new ScoreBox(configObj)
    this.scoreBox.x = this.game.config.width - 100
    this.scoreBox.y = 50
  }

  update() {
    this.road.moveLines()
    this.road.moveObject()
  }
}
