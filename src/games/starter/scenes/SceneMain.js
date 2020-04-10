import Phase from 'phaser'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
  }

  create() {
    console.log("Ready!");
  }

  update() { }
}
