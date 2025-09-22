import Phaser from "phaser"

export default class BreakOutScene extends Phaser.Scene {
  constructor() {
    super("BreakOutScene")
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x222222)

    // Título
    this.add
      .text(400, 200, "🧱 BREAKOUT", {
        fontSize: "48px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    // Texto placeholder
    this.add
      .text(400, 300, "Escena en construcción...\n\nAquí irá el juego Breakout", {
        fontSize: "24px",
        color: "#aaaaaa",
        align: "center",
      })
      .setOrigin(0.5)

    // Botón para regresar al menú
    const backText = this.add
      .text(400, 450, "Presiona ESC para volver al menú", {
        fontSize: "20px",
        color: "#00ff00",
      })
      .setOrigin(0.5)

    // Efecto de parpadeo
    this.tweens.add({
      targets: backText,
      alpha: 0.3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    })

    // Input para regresar al menú
    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.start("MenuScene")
    })
  }
}