class Bottle extends DrawableObject {
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 40,
        bottom: 60,
        left: 60,
        right: 60,
    };

    /**
     * creates a new instance of a bottle on the ground which can be picked up by the character
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 400 + 200 + Math.random() * 1600;
        this.y = 330;
        this.height = 100;
        this.width = 100;
        this.animate();
        this.hasHitEnemy = false;
    }

    /**
     * @memberof bottle
     * start the animation of the bottle on the ground to better highlight bottle
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        },500);
    }
}