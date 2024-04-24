class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 280;
  width = 100;
  height = 150;

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * draws the image on the canvas context
   * @param {object} ctx - the canvas context to draw on
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads images from an array of paths and stores them in the image cache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays animation by cycling through the provided array of images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
