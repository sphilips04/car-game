class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }
    create() {
        // Title
        this.add.text(325, 100, 'Car Game', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
        // Start button
        const startBtn = this.add.text(325, 250, 'Start', { fontSize: '32px', color: '#0f0', backgroundColor: '#222', padding: { x: 20, y: 10 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MapSelect'));

        // Select Car button
        const selectCarBtn = this.add.text(325, 300, 'Select Car', { fontSize: '28px', color: '#ff0', backgroundColor: '#222', padding: { x: 18, y: 8 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('CarSelect');
            });

        // Settings button
        const settingsBtn = this.add.text(325, 350, 'Settings', { fontSize: '28px', color: '#0ff', backgroundColor: '#222', padding: { x: 18, y: 8 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {/* To be implemented */});
    }
}

// Export for use in index.html or other scripts
window.MainMenu = MainMenu;
