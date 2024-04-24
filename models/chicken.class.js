class Chicken extends MovableObject {
  y = 340;
  height = 90;
  chickenDeath = new Audio("./audio/chicken.mp3");
  energy = 10;
  isDead = false;
  offset = {
    top: -48,
    bottom: 20,
    left: 20,
    right: 10,
  };
  hitted = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
 
  /**
   * creates an instance of enemy chicken. also gives them random speed and random location coordinates 
   * @constructor
   * @memberof Chicken
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + 200 + Math.random() * 1300;
    this.chickenSpeed = 1.15 + Math.random() * 1.5;
    this.animate();
  }

  /**
   * initiates the walking animation of the chickens
   * two intervals: one for movement and for the animation 
   * @memberof Chicken
   */
  animate() {
    this.walkingIntervalMoving = setInterval(() => {
      this.moveLeft(this.chickenSpeed);
    }, 1000 / 60);

    this.walkingIntervalAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  /**
   * stops the walking and the animations when chickens die
   * @memberof Chicken
   */
  stopAnimation() {
    clearInterval(this.walkingIntervalMoving);
    clearInterval(this.walkingIntervalAnimation);
  }

  /**
   * stops the animations of walking, plays the audio of dying chicken and plays death animations
   * @memberof Chicken
   */
  death() {
    this.stopAnimation();
    this.isDead = true;
    this.chickenDeath.pause();
    this.chickenDeath.play();
    this.chickenDeath.volume = 0.1;
    this.playAnimation(this.IMAGES_DEAD);
  }
}
