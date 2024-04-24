class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;
  cloudSpeed = 0.5;

  /**
   * Creates a CloudObject with the specified image path and x-coordinate
   * Loads the image and sets the animation
   * @param {string} path- the path of the cloud images
   * @param {number} x -  the x coordinate of the cloud objects
   * @memberof Cloud
   */
  constructor(path, x) {
    super().loadImage(path, x);
    this.x = x;
    this.animate();
  }

  /**
   *initiates the moving animations of the clouds with a constant speed.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.cloudSpeed);
    }, 1000 / 60);
  }
}
