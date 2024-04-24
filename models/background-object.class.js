class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of a BackgroundObject, a subclass of MovableObject.
   * @memberof BackgroundObject
   * @constructor
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.y = 480 - this.height;
    this.x = x;
  }
}
