class CarSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'CarSelect' });
    }
    create() {
        // Car keys and names
        this.carKeys = Object.keys(CAR_DATA);
        this.carNames = { red: 'Red', green: 'Green' };
        // Start with selected or first car
        this.selectedIndex = this.carKeys.indexOf(GlobalState.selectedCar) >= 0 ? this.carKeys.indexOf(GlobalState.selectedCar) : 0;
        this.previewGroup = this.add.group();
        this.drawUI();
    }
    drawUI() {
        this.previewGroup.clear(true, true);
        const centerX = 325, centerY = 250;
        const carKey = this.carKeys[this.selectedIndex];
        const carData = CAR_DATA[carKey];
        // Car preview (drawn using drawCarBasic)
        const previewScene = this;
        const previewObj = {};
        drawCarBasic.call(previewObj, {
            scene: this,
            carX: centerX - carData.width / 2,
            carY: centerY - carData.height / 2,
            carAngle: 0,
            angularVelocity: 0,
            width: carData.width,
            height: carData.height,
            color: carData.color,
            cornerColor: carData.cornerColor || 0x888888
        });
        Object.values(previewObj.corners || {}).forEach(o => this.previewGroup.add(o));
        if (previewObj.carRect) this.previewGroup.add(previewObj.carRect);
        if (previewObj.carWindow) this.previewGroup.add(previewObj.carWindow);
        // Car name
        this.carNameText = this.add.text(centerX, centerY + 60, this.carNames[carKey] || carKey, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
        this.previewGroup.add(this.carNameText);
        // Stats
        this.topSpeedText = this.add.text(centerX, centerY + 100, `Top Speed: ${carData.topSpeed}`, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
        this.angularAccText = this.add.text(centerX, centerY + 130, `Angular Accel: ${carData.angularAcceleration}`, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
        this.previewGroup.add(this.topSpeedText);
        this.previewGroup.add(this.angularAccText);
        // Left/right arrows
        this.leftBtn = this.add.text(centerX - 120, centerY, '<', { fontSize: '48px', color: '#ff0', backgroundColor: '#222', padding: { x: 10, y: 5 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.cycleCar(-1));
        this.rightBtn = this.add.text(centerX + 120, centerY, '>', { fontSize: '48px', color: '#ff0', backgroundColor: '#222', padding: { x: 10, y: 5 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.cycleCar(1));
        this.previewGroup.add(this.leftBtn);
        this.previewGroup.add(this.rightBtn);
        // Select button
        this.selectBtn = this.add.text(centerX - 60, centerY + 180, 'Select', { fontSize: '28px', color: '#0f0', backgroundColor: '#222', padding: { x: 18, y: 8 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                GlobalState.selectedCar = this.carKeys[this.selectedIndex];
                this.scene.start('MainMenu');
            });
        this.previewGroup.add(this.selectBtn);
        // Back button
        this.backBtn = this.add.text(centerX + 60, centerY + 180, 'Back', { fontSize: '28px', color: '#fff', backgroundColor: '#222', padding: { x: 18, y: 8 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
        this.previewGroup.add(this.backBtn);
    }
    cycleCar(dir) {
        this.selectedIndex = (this.selectedIndex + dir + this.carKeys.length) % this.carKeys.length;
        this.drawUI();
    }
}

window.CarSelect = CarSelect;
