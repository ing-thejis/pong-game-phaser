import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene")
  }

  create() {
    this.logo = this.add.image(400, 300, "logo")
    this.tweens.add({
      targets: this.logo,
      y: 500,
      duration: 1500,
      yoyo: true,
      repeat: -1,
    })
  }
}
