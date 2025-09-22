import Phaser from "phaser"

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene")
    this.selectedSceneIndex = 0
    this.scenes = [
      { name: "PongScene", displayName: "🏓 Pong" },
      { name: "BreakOutScene", displayName: "🧱 Breakout" },
    ]
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x000000)

    // Título
    this.add
      .text(400, 150, "🎮 SELECTOR DE ESCENAS", {
        fontSize: "36px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    // Crear elementos del selector
    this.createSceneSelector()

    // Instrucciones de navegación
    this.add
      .text(400, 480, "↑ / ↓ : Navegar\nESPACIO : Seleccionar\nESC : Salir", {
        fontSize: "18px",
        color: "#aaaaaa",
        align: "center",
      })
      .setOrigin(0.5)

    // Configurar controles
    this.setupControls()
  }

  createSceneSelector() {
    this.sceneTexts = []

    this.scenes.forEach((scene, index) => {
      const yPosition = 250 + index * 60

      // Crear texto de la escena
      const sceneText = this.add
        .text(400, yPosition, scene.displayName, {
          fontSize: "28px",
          color: "#ffffff",
        })
        .setOrigin(0.5)

      this.sceneTexts.push(sceneText)
    })

    // Actualizar la selección visual
    this.updateSelection()
  }

  updateSelection() {
    this.sceneTexts.forEach((text, index) => {
      if (index === this.selectedSceneIndex) {
        text.setColor("#00ff00")
        text.setScale(1.1)
        // Añadir indicador visual
        if (this.selector) {
          this.selector.destroy()
        }
        this.selector = this.add
          .text(300, text.y, "►", {
            fontSize: "28px",
            color: "#00ff00",
          })
          .setOrigin(0.5)
      } else {
        text.setColor("#ffffff")
        text.setScale(1)
      }
    })
  }

  setupControls() {
    // Navegación hacia arriba
    this.input.keyboard.on("keydown-UP", () => {
      this.selectedSceneIndex =
        (this.selectedSceneIndex - 1 + this.scenes.length) % this.scenes.length
      this.updateSelection()
    })

    // Navegación hacia abajo
    this.input.keyboard.on("keydown-DOWN", () => {
      this.selectedSceneIndex =
        (this.selectedSceneIndex + 1) % this.scenes.length
      this.updateSelection()
    })

    // Seleccionar escena
    this.input.keyboard.on("keydown-SPACE", () => {
      const selectedScene = this.scenes[this.selectedSceneIndex]
      this.scene.start(selectedScene.name)
    })

    // Salir del juego (opcional)
    this.input.keyboard.on("keydown-ESC", () => {
      this.game.destroy(true)
    })
  }
}
