class CarGame extends Phaser.Scene {
    constructor() {
        super({ key: 'CarGame' });
    }
    preload() {
        // Load assets here
    }
    create() {
        // Particle system
        this.particles = new Particles(this);
        // Create car instance using car-data.js
        this.car = createCar({
            ...CAR_DATA.green,
            scene: this,
            x: 300,
            y: 350,
            driftParticleCallback: (x, y, angle) => this.particles.emit(x, y, angle)
        });
        // Keyboard input
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }
    update() {
        // Update particles first so they are drawn under the car
        this.particles.update();

        // Rotate car with A/D
        let rotateDir = 0;
        if (this.cursors.left.isDown) rotateDir = -1;
        if (this.cursors.right.isDown) rotateDir = 1;
        this.car.rotate(rotateDir);
        // Accelerate with W/S
        const forward = this.cursors.up.isDown;
        const backward = this.cursors.down.isDown;
        const multiAngularVelocity = this.cursors.space.isDown;
        this.car.updatePhysics(forward, backward, multiAngularVelocity);
    }
    
}

const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    backgroundColor: '#808080', // gray
    scene: CarGame
};

const game = new Phaser.Game(config);

// Car class import
// Assumes car.js is loaded before this file in index.html
// If using modules, use: import { Car } from './car.js';
