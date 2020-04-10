// import createUtilsTest from './utils/tests'
// import createStarterGame from './games/starter'
// import createFpsGame from './games/fps'
import createCarsGame from './games/cars'
import './index.css'

const main = async () => {
  // createUtilsTest()
  // createStarterGame()
  // createFpsGame()
  createCarsGame()
}

main().then(() => console.log('Started'));
