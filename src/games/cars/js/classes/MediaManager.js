import { PLAY_SOUND, MUSIC_CHANGED, SOUND_CHANGED } from "../constants"

export default class MediaManager {
  /**
   * @param {Object} config
   * @param config.scene {Phaser.Scene}
   * @param config.emitter {Phaser.Events.EventEmitter}
   * @param config.model {Model}
   */
  constructor (config) {
    this.scene = config.scene
    this.emitter = config.emitter
    this.model = config.model
    this.emitter.on(PLAY_SOUND, this.playSound, this)
    this.emitter.on(SOUND_CHANGED, this.soundChanged, this)
    this.emitter.on(MUSIC_CHANGED, this.musicChanged, this)
  }

  /**
   * @param {string} key Sound file key
   * @param {Phaser.Types.Sound.SoundConfig} config sound config
   */
  playSound (key, config = {}) {
    if (this.model.soundOn) {
      const sound = this.scene.sound.add(key, config)
      sound.play()
      return sound
    }
  }

  /**
   * @param {string} key Sound file key
   * @param {Phaser.Types.Sound.SoundConfig} config sound config
   */
  setBackgroundMusic (key, config) {
    if (this.model.musicOn) {
      this.background = this.playSound(key, config)
    }
  }

  soundChanged () {
    if (this.background) {
      if (this.model.soundOn) {
        this.background.play()
      } else {
        this.background.stop()
      }
    }
  }

  musicChanged () {
    if (this.background) {
      if (this.model.musicOn) {
        this.background.stop()
      } else {
        this.background.play()
      }
    }
  }
}
