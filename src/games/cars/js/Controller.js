import * as constants from './constants'

export default class Controller {
  constructor (emitter, model) {
    this.model = model
    this.emitter = emitter
    emitter.on(constants.SET_SCORE, this.setScore.bind(this))
    emitter.on(constants.ADD_POINTS, this.addPoints.bind(this))
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
}
