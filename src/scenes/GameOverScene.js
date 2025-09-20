import Phaser from "phaser"

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene")
  }

  init(data) {
    this.leftScore = data.left
    this.rightScore = data.right
  }

  create() {
    // Determinar ganador
    let winnerText = "Empate 🤝"
    if (this.leftScore > this.rightScore) {
      winnerText = "Jugador 1 gana 🏆"
    } else if (this.rightScore > this.leftScore) {
      winnerText = "Jugador 2 gana 🏆"
    }

    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x000000)

    // Texto final
    this.add
      .text(400, 200, "Fin del Juego", {
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5)

    this.add
      .text(400, 300, `${this.leftScore} - ${this.rightScore}`, {
        fontSize: "36px",
        color: "#ffffff",
      })
      .setOrigin(0.5)

    this.add
      .text(400, 380, winnerText, {
        fontSize: "28px",
        color: "#00ff00",
      })
      .setOrigin(0.5)

    // Opción de reinicio
    this.add
      .text(400, 500, "Presiona ESPACIO para volver al menú", {
        fontSize: "20px",
        color: "#aaaaaa",
      })
      .setOrigin(0.5)

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("MenuScene")
    })
  }
}
