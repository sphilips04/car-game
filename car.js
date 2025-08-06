function createCar(config) {
    // Extract config variables
    const {
        scene,
        x = 200,
        y = 200,
        width = 200,
        height = 100,
        color = 0xff0000, // Car body color
        cornerColor = 0x000000, // Corner color
        topSpeed = 3,
        reverseMax = 0.6,
        accelRate = 0.2,
        friction = 0.05,
        angularFriction = 0.001,
        angularAcceleration = 0.03,
        angularVelocity = 0,
        maxAngularSpeed = 0.08
    } = config;

    // State
    let carX = x;
    let carY = y;
    let carAngle = 0;
    let velocity = 0;
    let acceleration = 0;
    let _angularAcceleration = 0;
    let _baseAngularAcceleration = angularAcceleration;
    let _angularVelocity = angularVelocity;

    // Visual objects will be created by the draw function
    let carRect = null;
    let corners = null;

    // Use draw function from config - it should create and manage visual objects
    const drawFunction = config.drawFunction;

    function updateGraphics() {
        if (drawFunction) {
            const result = drawFunction.call(drawFunction, {
                scene,
                carX,
                carY,
                carAngle,
                angularVelocity: _angularVelocity,
                width,
                height,
                color,
                cornerColor
            });
            
            // Update our references to the visual objects
            if (result) {
                carRect = result.carRect;
                corners = result.corners;
            }
        }
    }

    function rotate(direction) {
        // direction: -1 for left, 1 for right, 0 for none
        if (direction === 0) {
            _angularAcceleration = 0;
        } else {
            _angularAcceleration = _baseAngularAcceleration * direction;
        }
    }

    function updatePhysics(forward, backward, multiAngularVelocity = false) {
        // Friction
        let localFriction = friction;
        if (multiAngularVelocity) {
            localFriction *= 1.5;
        }
        // Acceleration
        if (forward) {
            acceleration = accelRate;
        } else if (backward) {
            acceleration = -accelRate;
        } else {
            acceleration = 0;
        }
        // Update velocity
        velocity += acceleration;
        // Friction
        if (!forward && !backward) {
            if (velocity > 0) {
                velocity = Math.max(0, velocity - localFriction);
            } else if (velocity < 0) {
                velocity = Math.min(0, velocity + localFriction);
            }
        }
        // Clamp velocity
        if (velocity > topSpeed) velocity = topSpeed;
        if (velocity < -reverseMax) velocity = -reverseMax;
        // Angular velocity update (drift)
        _angularVelocity += _angularAcceleration;
        // Angular friction
        if (Math.abs(_angularAcceleration) < 0.001) {
            if (_angularVelocity > 0) {
                _angularVelocity = Math.max(0, _angularVelocity - angularFriction);
            } else if (_angularVelocity < 0) {
                _angularVelocity = Math.min(0, _angularVelocity + angularFriction);
            }
        }
        // Clamp angular velocity
        const maxAngVel = multiAngularVelocity ? maxAngularSpeed * 1.5 : maxAngularSpeed;
        if (_angularVelocity > maxAngVel) _angularVelocity = maxAngVel;
        if (_angularVelocity < -maxAngVel) _angularVelocity = -maxAngVel;
        // Update angle
        carAngle += _angularVelocity;
        // Reset angular acceleration for next frame
        _angularAcceleration = 0;
        // Move car
        carX += Math.cos(carAngle) * velocity;
        carY += Math.sin(carAngle) * velocity;

        // Emit drift particles from both back wheels if callback is provided and drifting
        if (multiAngularVelocity && typeof config.driftParticleCallback === 'function') {
            const cx = carX + width / 2;
            const cy = carY + height / 2;
            const hw = width / 2;
            const hh = height / 2;
            // Rear left wheel position (driversideRear)
            const rearLeft = {
                x: cx + Math.cos(carAngle) * (-hw + 7) - Math.sin(carAngle) * hh,
                y: cy + Math.sin(carAngle) * (-hw + 7) + Math.cos(carAngle) * hh
            };
            // Rear right wheel position (passengersideRear)
            const rearRight = {
                x: cx + Math.cos(carAngle) * (-hw + 7) - Math.sin(carAngle) * -hh,
                y: cy + Math.sin(carAngle) * (-hw + 7) + Math.cos(carAngle) * -hh
            };
            config.driftParticleCallback(rearLeft.x, rearLeft.y, carAngle);
            config.driftParticleCallback(rearRight.x, rearRight.y, carAngle);
        }

        updateGraphics();
    }

    // Initialize the graphics
    updateGraphics();

    // Expose API
    return {
        get x() { return carX; },
        get y() { return carY; },
        get angle() { return carAngle; },
        get velocity() { return velocity; },
        get angularVelocity() { return _angularVelocity; },
        rotate,
        updatePhysics,
        updateGraphics,
        get carRect() { return carRect; },
        get corners() { return corners; },
        config: {
            width,
            height,
            color,
            cornerColor,
            topSpeed,
            reverseMax,
            accelRate,
            friction,
            angularFriction,
            angularAcceleration,
            maxAngularSpeed
        }
    };
}
