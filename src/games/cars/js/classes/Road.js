import Phaser from 'phaser'
import Align from '../../../../utils/Align'
import Collission from '../../../../utils/Collission'
import { SCORE_UPDATED, ADD_POINTS, SET_SCORE } from '../constants'

export default class Road extends Phaser.GameObjects.Container {
  constructor (config) {
    const { scene, game, emitter } = config
    super(scene)
    this.scene = scene
    this.game = game
    this.emitter = emitter

    this.back = this.scene.add.image(0, 0, 'road')
    this.add(this.back)
    this.scene.add.existing(this)

    Align.scaleToGameWidth(this.back, 0.5, game.config)

    this.setSize(this.back.displayWidth, game.config.height)

    this.lineGroup = this.scene.add.group()
    this.count = 0

    this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, 'cars')
    Align.scaleToGameWidth(this.car, .1, game.config)
    this.add(this.car)
    this.back.setInteractive()
    this.back.on('pointerdown', this.changeLanes.bind(this))

    this.addObjects()

    this.hasCollided = false
  }

  addObjects () {
    const objects = [
      { key: 'pcar1', speed: 10, scale: 10 },
      { key: 'pcar2', speed: 10, scale: 10 },
      { key: 'cone', speed: 20, scale: 5 },
      { key: 'barrier', speed: 20, scale: 8 }
    ]
    const lane = Math.random() * 100
    const index = Math.floor(Math.random() * 3)
    this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, objects[index].key)
    this.object.speed = objects[index].speed
    const scale = objects[index].scale / 100

    if (lane < 50) {
      this.object.x = this.displayWidth / 4
    }

    Align.scaleToGameWidth(this.object, scale, this.game.config)
    this.add(this.object)
  }

  moveObject () {
    this.object.y += this.vSpace / this.object.speed
    if (Collission.checkCollide(this.car, this.object)) {
      this.car.alpha = .5
      this.hasCollided = true
    } else {
      this.car.alpha = 1
    }

    if (this.object.y > this.game.config.height) {
      this.object.destroy()
      this.addObjects()
      if (!this.hasCollided) {
        this.emitter.emit(ADD_POINTS, 10)
      } else {
        this.emitter.emit(SET_SCORE, 0)
      }
      this.hasCollided = false
    }
  }

  makeLines () {
    this.vSpace = this.displayHeight / 10
    for ( let i = 0; i < 20; i++) {
      let line = this.scene.add.image(this.x, this.vSpace * i, 'line')
      line.oy = line.y
      this.lineGroup.add(line)
    }
  }

  moveLines () {
    this.lineGroup.children.iterate(function (child) {
      child.y += this.vSpace / 20
    }.bind(this))

    this.count++
    if (this.count === 20) {
      this.count = 0
      this.lineGroup.children.iterate(function (child) {
        child.y = child.oy
      }.bind(this))
    }
  }

  changeLanes () {
    if (this.car.x > 0) {
      this.car.x =- this.displayWidth / 4
    } else {
      this.car.x = this.displayWidth / 4
    }
  }
}
