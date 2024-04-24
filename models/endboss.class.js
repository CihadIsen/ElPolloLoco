class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ANGRY = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  height = 400;
  width = 250;
  y = 50;
  energy = 100;
  speed = 40;
  x = 2800;

  /**
   * creates an instance of the endboss. loads the images to animate in other functions
   */
  constructor() {
    super().loadImage(this.IMAGES_ANGRY[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * initiates the animation for the endboss for attacking, dying and getting hurted
   */
  animate() {
    this.attackIntervall = setInterval(() => {
      this.endbossIsAttacking();
    }, 250);
    this.dyingIntervall = setInterval(() => {
      this.endbossDying();
    }, 250);
    this.hurtingIntervall = setInterval(() => {
      this.endbossIsGettingHurted();
    }, 250);
  }

  /**
   * checks if the character is within attack range of the endboss
   * @returns {boolean} returns true if the character is within attack range,otherwise false
   */
  characterIsInAttackRange() {
    let characterX = world.character.x;
    let endbossX = 0;
    if (world.level.enemies.length > 0) {
      endbossX = world.level.enemies[world.level.enemies.length - 1].x;
    } else {
      endbossX = world.level.enemies[0];
    }
    let distance = endbossX - characterX;
    return distance < 1000 && distance > 0;
  }

  /**
   * checks if the energy of the endboss is below 100
   * @returns {boolean} returns true if the energy of the endboss is below 100, otherwise false
   */
  hurt() {
    return this.energy < 100;
  }

  /**
   * checks if the energy of the endboss is 0 or lower to initiate the death function
   */
  endbossDying() {
    if (this.energy <= 0) {
      this.death();
    }
  }

  /**
   * checks if the character is near the endboss
   * @returns {boolean} returns true, if the character is near endboss, otherwise false
   */
  characterIsNearEndboss() {
    try {
      return world.character.x >= 720 * 3;
    } catch {
      console.log("outside range");
    }
  }

  /**
   * handles the death of the endboss
   */
  death() {
    clearInterval(this.attackIntervall);
    clearInterval(this.hurtingIntervall);
    this.isDead = true;
    world.endbossIntro.pause();
    world.victorySound.volume = 0.3;
    world.victorySound.play();
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.y += 150;
    }, 750);
    setTimeout(() => {
      victory();
      clearInterval(this.dyingIntervall);
    }, 2000);
  }

  /**
   * handles the endboss being hurt
   */
  endbossIsGettingHurted() {
    if (this.hurt()) {
      if (!this.hurtSoundPlaying) {
        world.endbossHurt.volume = 0.3;
        world.endbossHurt.play();
        this.hurtSoundPlaying = true;
      }
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * handles the endboss attacking behavior
   */
  endbossIsAttacking() {
    if (this.characterIsInAttackRange()) {
      if (this.characterIsNearEndboss()) {
        world.endbossScream.volume = 0.3;
        world.endbossScream.play();
        this.playAngryAnimationsBeforeAttack(() => {
          this.moveLeft(this.speed);
          this.playAnimation(this.IMAGES_ATTACK);
        });
      } else {
        this.moveLeft(this.speed);
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }
  }

  /**
   * Checks if the character is behind the endboss.
   * @returns {boolean} True if the character is behind the endboss, otherwise false.
   */
  characterIsBehindEndboss() {
    let characterX = world.character.x;
    let endbossX = this.x;
    return characterX > endbossX;
  }

  /**
   * Plays angry animations before the attack.
   * @param {Function} callback - Callback function to continue with the attack.
   */
  playAngryAnimationsBeforeAttack(callback) {
    let delay = 500;
    let index = 0;
    let interval = setInterval(() => {
      this.playAnimation([this.IMAGES_ANGRY[index]]);
      index++;
      if (index >= this.IMAGES_ANGRY.length || index * 300 > delay) {
        clearInterval(interval);
        callback(); 
      }
    }, 300); 
  }
}
