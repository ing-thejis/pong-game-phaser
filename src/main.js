import Phaser from "phaser"
import PongScene from "./scenes/PongScene"
import MenuScene from "./scenes/MenuScene"
import GameOverScene from "./scenes/GameOverScene"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [MenuScene, PongScene, GameOverScene],
}

new Phaser.Game(config)
