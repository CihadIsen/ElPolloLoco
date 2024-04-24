class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
      * Constructor for initializing the game world
     * @param {object} enemies - object for the enemys of the world
     * @param {object} clouds - object for the clouds of the world
     * @param {object} coins  - object for the coins of the world
     * @param {object} bottles - object for the bottles of the world
     * @param {object} backgroundObjects - object for the backgrounds of the world
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}