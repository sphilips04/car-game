class Particles {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
    }

    emit(x, y) {
        // Create a dark transparent particle (circle)
        const particle = this.scene.add.circle(x, y, 3, 0x222222, 0.5);
        particle.setDepth(0); // behind car
        particle.life = 100; // frames
        particle.vx = 0;
        particle.vy = 0;
        this.particles.push(particle);
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life--;
            p.setAlpha(Math.max(0, p.life / 40 * 0.25));
            if (p.life <= 0) {
                p.destroy();
                this.particles.splice(i, 1);
            }
        }
    }
}