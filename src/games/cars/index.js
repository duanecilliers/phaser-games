import Phaser from 'phaser'
import isMobile from '../../utils/isMobile'
import SceneMain from './js/scenes/SceneMain'
import SceneTitle from './js/scenes/SceneTitle';
import SceneOver from './js/scenes/SceneOver';

const div = document.createElement('div');
div.id = 'main'
document.body.appendChild(div);

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  parent: 'main',
  width: isMobile() ? window.innerWidth : 480,
  height: isMobile() ? window.innerHeight : 640,
  scene: [SceneTitle, SceneMain, SceneOver]
}

export default () => new Phaser.Game(config)
