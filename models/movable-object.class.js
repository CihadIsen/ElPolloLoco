class MovableObject extends DrawableObject {
  speed = 0.75;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  running_sound = new Audio("audio/running.mp3");
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  /**
   * applies gravity to the object
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 140;
    }
  }

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * moves the object to the right side with a fixed speed
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * moves the object to the left side with a fixed speed
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * If the character is not above ground, decreases the enemy's energy by 5, plays the hit audio,
   * and stops the hit audio if the enemy's energy becomes less than 0.
   */
  hit() {
    if (!this.world.character.isAboveGround()) {
      this.energy -= 1;
      this.world.hitAudio.play();
      if (this.energy < 0) {
        this.energy = 0;
        this.world.hitAudio.pause();
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  /**
   * Determines if the enemy has been hurt within the last second.
   * @returns {boolean} True if the enemy has been hurt within the last second, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * checks if the energy is 0
   * @returns true if the energy is exact 0
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Initiates a jump action by setting the vertical speed of the object.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the current object is colliding with another object.
   * @param {object} mo - The other object to check collision with.
   * @returns {boolean} - Returns true if collision occurs, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Plays animation frames from the given array of image paths.
   * @param {string[]} images - An array of image paths representing the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
