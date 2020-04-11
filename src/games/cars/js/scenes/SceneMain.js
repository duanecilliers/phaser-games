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
import backgroundSoundMp3 from '../../../../audio/background.mp3'
import backgroundSoundOgg from '../../../../audio/background.ogg'
import barrier from '../../assets/images/barrier.png'
import button from '../../../../ui/button/img/1/1.png'
import toggleBg from '../../../../ui/ToggleButton/img/toggles/2.png'
import sfxOff from '../../../../ui/ToggleButton/img/icons/sfx_off.png'
import sfxOn from '../../../../ui/ToggleButton/img/icons/sfx_on.png'
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
    this.load.image('road', road)
    this.load.spritesheet('cars', carsSprite, { frameWidth: 60, frameHeight: 126 })
    this.load.image('line', line)
    this.load.image('pcar1', pcar1)
    this.load.image('pcar2', pcar2)
    this.load.image('cone', cone)
    this.load.image('barrier', barrier)
    this.load.image('toggle_bg', toggleBg)
    this.load.image('sfx_on', sfxOn)
    this.load.image('sfx_off', sfxOff)
    this.load.audio('backgroundSound', [backgroundSoundMp3, backgroundSoundOgg])
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
