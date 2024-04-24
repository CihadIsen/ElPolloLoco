class Statusbar extends DrawableObject {
  percentage;

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * Create a instace of status bar for the character like health.
   * @param Constructor
   * @param {String} images - images of the array above.
   * @param {number} percentage - a number that is for proofing for the right index of the images.
   * @param {number} x - set up the x coordinate
   * @param {number} y - set up the y coordinate
   * @param {number} width - set the width of the statusbar
   * @param {number} height - set the height of the statusbar
   * @memberof StatusBar
   */
  constructor(images, percentage, x, y) {
    super();
    this.chooseRightPicturesPaths(images);
    this.x = x;
    this.y = y;
    this.setPercentage(percentage);
    this.width = 180;
    this.height = 60;
  }

  /**
   * Sets the percentage value and updates the object's image accordingly.
   * @param {number} percentage - The new percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Chooses the appropriate set of images based on the specified type.
   * Loads the selected images into the image cache.
   * @param {string} images - The type of images to choose. Valid values are "health", "coin", "bottle", or "endboss".
   */
  chooseRightPicturesPaths(images) {
    if (images === "health") {
      this.IMAGES = this.IMAGES_HEALTH;
    } else if (images === "coin") {
      this.IMAGES = this.IMAGES_COINS;
    } else if (images === "bottle") {
      this.IMAGES = this.IMAGES_BOTTLES;
    } else if (images === "endboss") {
      this.IMAGES = this.IMAGES_ENDBOSS;
    } else {
      console.error("Invalid images parameter:", images);
      return;
    }
    this.loadImages(this.IMAGES);
  }

  /**
   * Resolves the index of the image to be displayed based on the current percentage value.
   * @returns {number} The index of the image to be displayed.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
