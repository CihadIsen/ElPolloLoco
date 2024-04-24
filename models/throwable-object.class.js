class ThrowableObject extends MovableObject {
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
  ];

  hitted = false;

  /**
   * Constructor for initializing a throwable object.
   * @param {number} x - The x-coordinate of the throwable object.
   * @param {number} y - The y-coordinate of the throwable object.
   * @param {boolean} isOtherDirection - Indicates if the object is thrown in the opposite direction.
   */
  constructor(x, y, isOtherDirection) {
    super().loadImage(this.IMAGES_THROW[0]);
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 50;
    this.throw();
    this.direction = isOtherDirection;
    this.damage = 20;
  }

  /**
   * Initiates the throwing action for the throwable object.
   */
  throw() {
    this.speedY = 30;
    this.bottleThrown();
    this.applyGravity();
    this.speedX = 6;
    this.throwingInterval = setInterval(() => {
      if (this.direction) {
        this.throwingRight();
      } else {
        this.throwingLeft();
      }
    }, 30);
  }

  /**
   * Initiates the throwing animation for the bottle.
   */
  bottleThrown() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
    }, 100);
  }

  /**
   * Initiates the splash animation and plays the glass audio.
   */
  splash() {
    world.glassAudio.play();
    setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 150);
    this.hasHitEnemy = true;
  }

  /**
   * Checks if the object is on the ground.
   * @returns {boolean} True if the object is on the ground, false otherwise.
   */
  isOnGround() {
    return this.y === 140;
  }

  /**
   * Stops the throwing animation.
   */
  stopThrowAnimation() {
    clearInterval(this.throwingInterval);
  }

  /**
   * Simulates the action of throwing to the right.
   */
  throwingRight() {
    this.x -= this.speedX;
    this.playAnimation(this.IMAGES_THROW);
  }

  /**
   * Simulates the action of throwing to the left.
   */
  throwingLeft() {
    this.x += this.speedX;
    this.playAnimation(this.IMAGES_THROW);
  }
}
