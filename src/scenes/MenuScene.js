import Phaser from "phaser"

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene")
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x000000)

    // Título
    this.add
      .text(400, 200, "🏓 PONG", {
        fontSize: "48px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    // Instrucciones
    this.add
      .text(400, 300, "Jugador 1: W / S\nJugador 2: ↑ / ↓", {
        fontSize: "20px",
        color: "#aaaaaa",
        align: "center",
      })
      .setOrigin(0.5)

    // Botón para iniciar
    const startText = this.add
      .text(400, 400, "Presiona ESPACIO para jugar", {
        fontSize: "24px",
        color: "#00ff00",
      })
      .setOrigin(0.5)

    // Efecto de parpadeo
    this.tweens.add({
      targets: startText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1,
    })

    // Input para iniciar
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("PongScene")
    })
  }
}
