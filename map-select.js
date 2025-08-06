class MapSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'MapSelect' });
    }
    create() {
        this.add.text(325, 100, 'Select Map', { fontSize: '40px', color: '#fff' }).setOrigin(0.5);
        // Placeholder: one map for now
        const mapBtn = this.add.text(325, 250, 'Default Track', { fontSize: '28px', color: '#ff0', backgroundColor: '#222', padding: { x: 18, y: 8 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                GlobalState.selectedMap = 'default';
                this.scene.start('CarGame');
            });
        // Back button
        this.add.text(325, 400, 'Back', { fontSize: '24px', color: '#fff', backgroundColor: '#222', padding: { x: 12, y: 6 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}

window.MapSelect = MapSelect;
