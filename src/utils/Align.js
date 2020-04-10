export default class Align {
  static scaleToGameWidth(obj, percent, gameConfig) {
    obj.displayWidth = gameConfig.width * percent
    obj.scaleY = obj.scaleX
  }

  static center(obj, gameConfig) {
    const { width, height } = gameConfig
    obj.x = width / 2
    obj.y = height / 2
  }

  static centerH(obj, gameConfig) {
    obj.y = gameConfig.width / 2
  }

  static centerV(obj, gameConfig) {
    obj.y = gameConfig.height / 2
  }
}
