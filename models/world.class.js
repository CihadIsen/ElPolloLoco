class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthbar = new Statusbar("health", 100, 0, -10);
  coinsbar = new Statusbar("coin", 0, 200, -10);
  bottlebar = new Statusbar("bottle", 0, 400, -10);
  endbossbar = new Statusbar("endboss", 0, 250, 40);
  throwableObjects = [];
  showEndboss = false;
  lastAction = new Date().getTime();
  collectedCoins = 0;
  coinAudio = new Audio("./audio/coin.mp3");
  hitAudio = new Audio("./audio/ouch.mp3");
  losingAudio = new Audio("./audio/losing.mp3");
  collectedBottles = 0;
  glassAudio = new Audio("./audio/glass.mp3");
  bottleAudio = new Audio("audio/bottle.mp3");
  endbossIntro = new Audio("audio/endbossIntro.mp3");
  endbossScream = new Audio("audio/endbossScream.mp3");
  endbossHurt = new Audio("audio/endbossHurt.mp3");
  victorySound = new Audio("audio/win.mp3");

  /**
   * Creates a new game instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {object} keyboard - The keyboard controller for the game.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, which runs various game logic at regular intervals.
   */
  run() {
    setInterval(() => {
      this.createThrowObject();
      this.checkCollisions();
      this.checkCollisionsCoins();
      this.checkCollisionWithEnemy();
      this.checkCollisionsBottle();
      this.endbossIsShowingUp();
      this.updateStatusBars();
    }, 50);
  }

  /**
   * Checks collisions between the character and enemies, triggering character hits if collision occurs.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
      }
    });
  }

  /**
   * Checks collisions between the character and coins, triggering coin collection if collision occurs.
   */
  checkCollisionsCoins() {
    this.level.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin) && this.collectedCoins < 100) {
        this.coinAudio.pause();
        this.coinAudio.currentTime = 0;
        this.coinAudio.volume = 0.1;
        this.coinAudio.play();
        this.collectedCoins += 10;
        this.level.coins.splice(coinIndex, 1);
      }
    });
  }

  /**
   * Updates the status bars based on the current game state.
   */
  updateStatusBars() {
    this.coinsbar.setPercentage(this.collectedCoins);
    this.healthbar.setPercentage(this.character.energy);
    this.bottlebar.setPercentage(this.collectedBottles);
  }

  /**
   * Checks for collision between the character and enemies.
   * Handles collision caused by throwing bottles and jumping.
   */
  checkCollisionWithEnemy() {
    this.collisionThroughBottle();
    this.collisionThroughJumping();
  }

  /**
   * Handles collision between the character and enemies caused by jumping.
   * Reduces enemy energy on collision and removes them if their energy is depleted.
   */
  collisionThroughJumping() {
    const character = this.character;
    if (!character.isAboveGround()) return;
    for (const enemy of this.level.enemies) {
      if (!character.isColliding(enemy) || enemy instanceof Endboss) continue;
      if (!enemy.isDead) {
        enemy.energy -= 20;
        if (enemy.energy <= 0) {
          enemy.death();
          this.removeEnemyFromArray(enemy);
          return;
        }
      }
      character.speedY = 20;
      return;
    }
  }

  /**
   * Creates a throwable object (bottle) when the D key is pressed and certain conditions are met.
   * Decrements the collected bottles count and adds the created bottle to the throwable objects array.
   */
  createThrowObject() {
    if (this.keyboard.D && this.currentAction() && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 20,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles -= 20;
    }
  }

  /**
   * Checks for collisions between the character and bottles.
   * If a collision is detected and the character has space in the inventory,
   * adds bottles to the collected bottles count, plays the bottle audio, and removes the bottle from the level.
   */
  checkCollisionsBottle() {
    let character = this.character;
    let collectedBottles = this.collectedBottles;
    this.level.bottles.forEach((bottle, index) => {
      if (character.isColliding(bottle) && collectedBottles < 100) {
        collectedBottles += 20;
        this.bottleAudio.play();
        this.level.bottles.splice(index, 1);
      }
    });
    this.collectedBottles = collectedBottles;
  }

  /**
   * Checks for collisions between throwable objects (e.g., bottles) and enemies.
   * If a collision is detected and the throwable object has not hit an enemy yet,
   * it triggers a splash animation, stops the throw animation, reduces the enemy's energy,
   * updates the end boss health bar if applicable, and checks if the enemy is dead.
   */
  collisionThroughBottle() {
    this.throwableObjects.forEach((bottle) => {
      if (!bottle.hasHitEnemy) {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
            bottle.splash();
            bottle.stopThrowAnimation();
            if (this.level.enemies[this.level.enemies.length - 1]) {
              this.endbossbar.setPercentage(
                this.level.enemies[this.level.enemies.length - 1].energy
              );
            }
            bottle.hitted = true;
            enemy.energy -= 20;
            this.checkEnemyIsDead(enemy, bottle);
          }
        });
      }
    });
  }

  /**
   * Checks if an enemy is dead based on its energy level. If the enemy's energy is less than or equal to 0 and it's not already dead,
   * it triggers the death animation for the enemy and removes it from the array of enemies.
   * @param {Object} enemy - The enemy object to check for death.
   * @param {Object} obj - The object responsible for causing damage to the enemy.
   */
  checkEnemyIsDead(enemy, obj) {
    if (enemy.energy <= 0 && !enemy.isDead) {
      console.log("Enemy killed. Energy:", enemy.energy);
      enemy.death();
      this.removeEnemyFromArray(enemy);
    }
  }

  /**
   * Removes an enemy from the enemies array after a delay.
   * @param {object} enemy - The enemy to be removed.
   */
  removeEnemyFromArray(enemy) {
    setTimeout(() => {
      let enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex !== -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 350);
  }

  /**
   * Determines if the character has performed an action within a certain time frame.
   * @returns {boolean} - True if the character has performed an action within the specified time frame, otherwise false.
   */
  currentAction() {
    let timePassed = new Date().getTime() - this.lastAction;
    timePassed = timePassed / 1000;
    this.lastAction = new Date().getTime();
    return timePassed > 0.1;
  }

  /**
   * Clears the canvas and draws all objects in the game world.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    //------- Space for fixed Objects ------
    this.addStatusBarsToMap();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    //draw() is called continuously
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - An array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the map and draws it on the canvas context.
   * @param {MovableObject} mo - The movable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {MovableObject} mo - The movable object whose image will be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1; // Adjust x-coordinate for flipped image
  }

  /**
   * Restores the canvas context after flipping the image back.
   * @param {MovableObject} mo - The movable object whose image was flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; // Restore original x-coordinate
    this.ctx.restore(); // Restore canvas context
  }

  /**
   * Adds status bars to the map.
   */
  addStatusBarsToMap() {
    this.addToMap(this.healthbar); // Add health bar
    this.addToMap(this.coinsbar); // Add coins bar
    this.addToMap(this.bottlebar); // Add bottle bar
    if (this.showEndboss) {
      this.addToMap(this.endbossbar); // Add endboss bar if it is shown
    }
  }

  /**
   * Checks if the endboss is showing up and handles related actions.
   */
  endbossIsShowingUp() {
    if (this.character.x > 720 * 3) {
      this.showEndboss = true;
      const muteMusic = document.getElementById("muteMusic").firstChild;
      if (!muteMusic.src.endsWith("mute.png")) {
        menuAudio.pause();
        this.endbossIntro.play();
        this.endbossIntro.volume = 0.4;
      } else {
        this.endbossIntro.pause();
      }
    }
  }
}
