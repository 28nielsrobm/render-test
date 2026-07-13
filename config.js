// World configuration
const world = {
    width: 2000,
    height: 1500,
    floor: 1500 - 40,
    wallThickness: 20
};

// Camera configuration
const camera = {
    x: 0,
    y: 0,
    smoothness: 0.08,
    width: null, // Set in main engine file after canvas is available
    height: null
};

// Physics constants
const physics = {
    gravity: 0.25,
    terminalVelocity: 12,

    jumpPower: 8,
    wallJumpPower: 8,
    wallPushPower: 6,
    wallSlideSpeed: 2
};
