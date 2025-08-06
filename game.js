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
        // Use selected car from GlobalState, default to green
        const selectedCarKey = (window.GlobalState && GlobalState.selectedCar) ? GlobalState.selectedCar : 'green';
        const carConfig = CAR_DATA[selectedCarKey] || CAR_DATA.green;
        this.car = createCar({
            ...carConfig,
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

// Export CarGame for use in index.html
window.CarGame = CarGame;
