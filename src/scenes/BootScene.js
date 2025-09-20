import Phaser from "phaser"

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene")
  }

  preload() {
    this.load.image("logo", "assets/javascript.svg")
  }

  create() {
    this.scene.start("GameScene")
  }
}
