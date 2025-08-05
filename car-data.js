// Default car drawing function - creates and manages all visual objects
function drawCarBasic({ scene, carX, carY, carAngle, angularVelocity, width, height, color = 0xff0000, cornerColor = 0x888888 }) {
    // Create visual objects if they don't exist
    if (!this.carRect) {

        this.corners = {
            driversideFront: scene.add.rectangle(0, 0, 10, 5, cornerColor),
            passengersideFront: scene.add.rectangle(0, 0, 10, 5, cornerColor),
            driversideRear: scene.add.rectangle(0, 0, 10, 5, cornerColor),
            passengersideRear: scene.add.rectangle(0, 0, 10, 5, cornerColor)
        };

        this.carRect = scene.add.rectangle(0, 0, width, height, color);
        this.carRect.setOrigin(0.5);
        this.carRect.setDepth(10); // Ensure car body is above particles

        this.carWindow = scene.add.rectangle(0, 0, width/3.5, height-4, 0x8edbec);
        this.carWindow.setOrigin(0.5);
        this.carWindow.setDepth(11); // Window above car body

        // Set origin to center for proper rotation
        Object.values(this.corners).forEach(corner => {
            corner.setOrigin(0.5);
            corner.setDepth(9); // Wheels above particles, below car body/window
        });
    }

    // Update positions
    const cx = carX + width / 2;
    const cy = carY + height / 2;
    const hw = width / 2;
    const hh = height / 2;
    const offsets = {
        driversideFront: { x: -hw + 7, y: -hh },
        passengersideFront: { x: hw - 7, y: -hh },
        driversideRear: { x: -hw + 7, y: hh },
        passengersideRear: { x: hw - 7, y: hh },
    };

    for (const key in offsets) {
        const ox = offsets[key].x;
        const oy = offsets[key].y;
        const rx = Math.cos(carAngle) * ox - Math.sin(carAngle) * oy;
        const ry = Math.sin(carAngle) * ox + Math.cos(carAngle) * oy;
        this.corners[key].x = cx + rx;
        this.corners[key].y = cy + ry;
        this.corners[key].rotation = carAngle + angularVelocity * 8;
    }
    this.carWindow.x = cx + ((Math.cos(carAngle) * (width*1/3 - 3)));
    this.carWindow.y = cy + ((Math.sin(carAngle) * (width*1/3 - 3)));
    this.carWindow.rotation = carAngle;


    this.carRect.x = cx;
    this.carRect.y = cy;
    this.carRect.rotation = carAngle;

    // Return the created objects for the car class to access
    //return {
    //    corners: this.corners,
    //    carRect: this.carRect
    //};
}
// Example car data file
const CAR_DATA = {
    red: {
        color: 0xff0000,
        width: 50,
        height: 25,
        cornerRadius: 10,
        cornerColor: 0x2B2727,
        angularAcceleration: 0.03,
        angularVelocity: 0,
        maxAngularSpeed: 0.04,
        topSpeed: 4,
        reverseMax: 0.6,
        accelRate: 0.2,
        friction: 0.05,
        angularFriction: 0.001,
        drawFunction: drawCarBasic
    },
    green: {
        color: 0x00ff00,
        width: 40,
        height: 35,
        angularAcceleration: 0.01,
        angularVelocity: 0,
        maxAngularSpeed: 0.06,
        topSpeed: 4,
        reverseMax: 0.6,
        accelRate: 0.5,
        friction: 0.03,
        angularFriction: 0.05,
        drawFunction: drawCarBasic
    }
};