import Phaser from 'phaser'
import CharScene from './scenes/CharScene'

const div = document.createElement('div');
div.id = 'main'
document.body.appendChild(div);

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  parent: 'main',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [SceneMain]
}

export default () => new Phaser.Game(config)
