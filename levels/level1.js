let level1;

/**
 * creates the level of the game. creates small enemies and the Boss enemie, collectable bottles and coins, and the background and clouds.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new BabyChicken(),
      new Chicken(),
      new BabyChicken(),
      new Chicken(),
      new BabyChicken(),

      new Endboss(),
    ],
  
    [
      new Cloud('img/5_background/layers/4_clouds/1.png',0),
      new Cloud('img/5_background/layers/4_clouds/1.png',720),
      new Cloud('img/5_background/layers/4_clouds/1.png',720 * 2),
      new Cloud('img/5_background/layers/4_clouds/1.png',720 * 3),
      new Cloud('img/5_background/layers/4_clouds/1.png',720 * 4),
      new Cloud('img/5_background/layers/4_clouds/1.png',720 * 5),
      new Cloud('img/5_background/layers/4_clouds/1.png',720 * 6),
    ],

    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],

    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
    
    [
      new BackgroundObject("img/5_background/layers/air.png", -719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        -719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        -719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        -719 * 2
      ),

      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ]
  );
}
