export default class Model {
  constructor () {
    this._score = 0
  }

  set score (val) {
    this._score = val
  }

  get score () {
    return this._score
  }
}
