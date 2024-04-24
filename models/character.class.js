class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  running_sound = new Audio("audio/running.mp3");
  width = 150;
  height = 290;
  y = 140;
  speed = 10;
  otherDirection = false;
  jumping_sound = new Audio("audio/jump.mp3");
  currentTime = new Date().getTime();
  offset = {
    top: 20,
    bottom: 20,
    left: -10,
    right: 20,
  };

  /**
   * constructor for initializing the character
   * loading different images for different situations
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Animate the character's actions.
   */
  animate() {
    let gameOverCalled = false;
    let soundPlayed = false;
    this.characterMoving();
    const animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.handleDeadAnimation(soundPlayed,gameOverCalled,animationInterval);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        this.handleMovementAnimation();
      }
    }, 150);
  }

  /**
   * Handle the animation when the character is dead.
   * @param {boolean} soundPlayed - Flag indicating if death sound has been played
   * @param {boolean} gameOverCalled - Flag indicating if game over has been called
   * @param {number} animationInterval - Interval ID for animation loop
   */
  handleDeadAnimation(soundPlayed, gameOverCalled, animationInterval) {
    this.playAnimation(this.IMAGES_DEAD);
    this.y += soundPlayed ? 50 : 100;
    if (!soundPlayed) {
      this.world.losingAudio.currentTime = 0;
      this.world.losingAudio.play();
      this.world.losingAudio.volume = 0.1;
      soundPlayed = true;
      clearInterval(animationInterval);
    }
    if (!gameOverCalled && soundPlayed) {
      gameOverCalled = true;
      gameOver();
    }
  }

  /**
   * Handle the movement animation based on keyboard input.
   */
  handleMovementAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.timePassedCheck()) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Moves the character based on keyboard input.
   */
  characterMoving() {
    setInterval(() => {
      this.running_sound.pause();
      this.handleMoveRight();
      this.handleJump();
      this.handleMoveLeft();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Handles the character's movement to the right based on keyboard input.
   */
  handleMoveRight() {
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.energy == 0
    ) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) {
        this.running_sound.play();
      }
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Handles the character's movement to the left based on keyboard input.
   */
  handleMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0 && !this.energy == 0) {
      this.moveLeft();
      if (!this.isAboveGround()) {
        this.running_sound.play();
      }
      this.otherDirection = true;
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Handles the character's jump action based on keyboard input.
   */
  handleJump() {
    if (
      this.world.keyboard.SPACE &&
      !this.isAboveGround() &&
      !this.isHurt() &&
      !this.energy == 0
    ) {
      this.jump();
      this.jumping_sound.play();
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Checks if enough time has passed for a certain action to trigger.
   * @returns {boolean} Returns true if enough time has passed, otherwise false.
   */
  timePassedCheck() {
    let timepassed = new Date().getTime() - this.currentTime;
    timepassed = timepassed / 1000;
    return timepassed > 5 ? true : false;
  }
}
