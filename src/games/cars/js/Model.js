/**
 * Model
 */
export default class Model {
  constructor () {
    this._score = 0
    this._soundOn = true
    this._musicOn = true
  }

  set score (val) {
    this._score = val
  }

  get score () {
    return this._score
  }

  set soundOn (val) {
    this._soundOn = val
  }

  get soundOn () {
    return this._soundOn
  }

  set musicOn(val) {
    this._musicOn = val
  }

  get musicOn() {
    return this._musicOn
  }
}
