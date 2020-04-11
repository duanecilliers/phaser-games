import Phase from 'phaser'
import road from '../../assets/images/road.jpg'
import carsSprite from '../../assets/images/cars.png'
import line from '../../assets/images/line.png'
import pcar1 from '../../assets/images/pcar1.png'
import pcar2 from '../../assets/images/pcar2.png'
import cone from '../../assets/images/cone.png'
import backgroundSoundMp3 from '../../../../audio/random-race.mp3'
import backgroundSoundOgg from '../../../../audio/random-race.ogg'
import whooshSoundMp3 from '../../../../audio/whoosh.mp3'
import whooshSoundOgg from '../../../../audio/whoosh.ogg'
import boomSoundMp3 from '../../../../audio/boom.mp3'
import boomSoundOgg from '../../../../audio/boom.ogg'
import barrier from '../../assets/images/barrier.png'
import button from '../../../../ui/button/img/1/1.png'
import toggleBg from '../../../../ui/ToggleButton/img/toggles/2.png'
import sfxOff from '../../../../ui/ToggleButton/img/icons/sfx_off.png'
import sfxOn from '../../../../ui/ToggleButton/img/icons/sfx_on.png'

export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoad')
  }

  preload() {
    const { game } = this
    this.progressText = this.add.text(game.config.width / 2, game.config.height / 2, '0%', {
      color: '#ffffff', fontSize: game.config.width / 20
    })
    this.progressText.setOrigin(0.5, 0.5)
    this.load.on('progress', progress => this.progressText.text = `${Math.floor(progress * 100)}%`)

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
    this.load.audio('whooshSound', [whooshSoundMp3, whooshSoundOgg])
    this.load.audio('boomSound', [boomSoundMp3, boomSoundOgg])
  }

  create() {
    this.scene.start('SceneTitle')
  }

  update() { }
}
