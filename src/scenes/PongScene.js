import Phaser from "phaser"

export default class PongScene extends Phaser.Scene {
  constructor() {
    super("PongScene")
  }

  create() {
    // Puntuación
    this.scoreLeft = 0
    this.scoreRight = 0
    this.scoreText = this.add
      .text(400, 50, "0 - 0", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5)

    // Temporizador de juego
    this.timeLeft = 120
    this.timerText = this.add
      .text(400, 100, "Tiempo: 120", {
        fontSize: "24px",
        color: "#ffcc00",
      })
      .setOrigin(0.5)

    // Jugadores
    this.leftPaddle = this.add.rectangle(50, 300, 20, 100, 0xffffff)
    this.physics.add.existing(this.leftPaddle, true)

    this.rightPaddle = this.add.rectangle(750, 300, 20, 100, 0xffffff)
    this.physics.add.existing(this.rightPaddle, true)

    // Pelota
    this.ball = this.add.circle(400, 300, 10, 0xffffff)
    this.physics.add.existing(this.ball)
    this.ball.body.setCollideWorldBounds(true, 1, 1)
    this.ball.body.setBounce(1, 1)
    this.ball.body.setVelocity(0, 0) // 🔹 La pelota no se mueve aún

    // Colisiones
    this.physics.add.collider(this.ball, this.leftPaddle)
    this.physics.add.collider(this.ball, this.rightPaddle)

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    // 🔹 Contador regresivo
    this.startCountdown()
  }

  startCountdown() {
    this.countdownValue = 3
    this.countdownText = this.add
      .text(400, 300, this.countdownValue, {
        fontSize: "72px",
        color: "#ff0000",
      })
      .setOrigin(0.5)

    // Evento cada segundo
    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.countdownValue--

        if (this.countdownValue > 0) {
          this.countdownText.setText(this.countdownValue)
        } else if (this.countdownValue === 0) {
          this.countdownText.setText("GO!")
        } else {
          this.countdownText.destroy()
          this.startGame() // 🔹 Empieza el juego real
        }
      },
      callbackScope: this,
      repeat: 3, // 3 → 2 → 1 → GO → start
    })
  }

  startGame() {
    // 🔹 Activar pelota
    this.resetBall()

    // 🔹 Iniciar temporizador de 2 min
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--
        this.timerText.setText("Tiempo: " + this.timeLeft)

        if (this.timeLeft <= 0) {
          this.endGame()
        }
      },
      callbackScope: this,
      loop: true,
    })

    // 🔹 Evento cada 30 segundos: aumentar velocidad de la bola
    this.speedUpEvent = this.time.addEvent({
      delay: 30000, // 30s
      callback: this.increaseBallSpeed,
      callbackScope: this,
      loop: true,
    })
  }

  update() {
    // 🔹 Bloquear movimiento hasta que termine el countdown
    if (this.countdownTimer && this.countdownTimer.getProgress() < 1) {
      return
    }

    // Movimiento jugador izquierdo
    if (this.wKey.isDown) {
      this.leftPaddle.y -= 5
    } else if (this.sKey.isDown) {
      this.leftPaddle.y += 5
    }
    // Limitar jugador izquierdo
    this.leftPaddle.y = Phaser.Math.Clamp(this.leftPaddle.y, 50, 550)
    this.leftPaddle.body.updateFromGameObject()

    // Movimiento jugador derecho
    if (this.cursors.up.isDown) {
      this.rightPaddle.y -= 5
    } else if (this.cursors.down.isDown) {
      this.rightPaddle.y += 5
    }

    // Limitar jugador derecho
    this.rightPaddle.y = Phaser.Math.Clamp(this.rightPaddle.y, 50, 550)
    this.rightPaddle.body.updateFromGameObject()

    // Goles
    if (this.ball.x < 20) {
      this.scoreRight++
      this.updateScore()
      this.resetBall()
    } else if (this.ball.x > 780) {
      this.scoreLeft++
      this.updateScore()
      this.resetBall()
    }
  }

  updateScore() {
    this.scoreText.setText(`${this.scoreLeft} - ${this.scoreRight}`)
  }

  resetBall() {
    this.ball.setPosition(400, 300)

    // Velocidad base depende de cuántas veces ya se aceleró
    let speed = 200
    if (this.speedUpEvent) {
      speed *= Math.pow(
        1.2,
        this.speedUpEvent.getRepeatCount() - this.speedUpEvent.repeatCount
      )
    }

    const velocityX = Phaser.Math.Between(0, 1) === 0 ? speed : -speed
    const velocityY = Phaser.Math.Between(-speed, speed)
    this.ball.body.setVelocity(velocityX, velocityY)
  }

  increaseBallSpeed() {
    if (!this.ball || !this.ball.body) return

    // Multiplica la velocidad actual por 1.2 (20% más rápido)
    const vx = this.ball.body.velocity.x * 1.2
    const vy = this.ball.body.velocity.y * 1.2

    this.ball.body.setVelocity(vx, vy)

    // Mensaje visual rápido (feedback)
    const flashText = this.add
      .text(400, 300, "¡Más rápido!", {
        fontSize: "32px",
        color: "#ff0000",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    this.tweens.add({
      targets: flashText,
      alpha: 0,
      duration: 1500,
      onComplete: () => flashText.destroy(),
    })
  }

  endGame() {
    this.scene.start("GameOverScene", {
      left: this.scoreLeft,
      right: this.scoreRight,
    })
  }
}
