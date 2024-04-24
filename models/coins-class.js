class Coin extends MovableObject {
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 60,
    bottom: 10,
    left: 60,
    right: 60,
  };

  /**
   * creates an instance of Coin
   * sets a random x and y coordinate, and a fixed width and height
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES);
    this.x = 180 + Math.random() * 2000;
    this.y = this.getRandomYPosition();
    this.height = 150;
    this.width = 150;
    this.animate();
  }

  /**
   * 
   * @returns a random position for the coins on the x and y axes
   */
  getRandomYPosition() {
    let minY = 160;
    let maxY = 300;
    return maxY - minY + Math.random() * 200;
  }
  
  /**
   * interval for playing an animation for the coins
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 500);
  }
}
