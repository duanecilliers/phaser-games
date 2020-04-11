import * as constants from './constants'
import Model from './Model'

export default class Controller {
  /**
   * @param {*} emitter
   * @param {Model} model
   */
  constructor (emitter, model) {
    this.model = model
    this.emitter = emitter
    emitter.on(constants.SET_SCORE, this.setScore.bind(this))
    emitter.on(constants.ADD_POINTS, this.addPoints.bind(this))
    emitter.on(constants.TOGGLE_SOUND, this.toggleSound.bind(this))
    emitter.on(constants.TOGGLE_MUSIC, this.toggleMusic.bind(this))
  }

  setScore (score) {
    this.model.score = score
    this.emitter.emit(constants.SCORE_UPDATED)
  }

  addPoints (points) {
    const score = this.model.score
    this.model.score = score + points
    this.emitter.emit(constants.SCORE_UPDATED)
  }

  toggleSound (val) {
    this.model.soundOn = val
    this.emitter.emit(constants.SOUND_CHANGED)
  }

  toggleMusic (val) {
    this.model.musicOn = val
    this.emitter.emit(constants.MUSIC_CHANGED)
  }
}
