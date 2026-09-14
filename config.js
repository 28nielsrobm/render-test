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

// Entity defaults and constants
const entityConfig = {
    player: {
        x: 300,
        y: 300,
        radius: 45,
        color: "dodgerblue",
        sprite: "sprites/player1.png",
        acceleration: 0.6,
        friction: 0.90,
        maxSpeed: 6,
        maxJumps: 2,
        coyoteFrames: 8
    },
    tree: {
        x: 800,
        y: 1390,
        radius: 70,
        color: "forestgreen",
        sprite: "sprites/tree1.png"
    },
    coin: {
        x: 1200,
        y: 1400,
        radius: 10,
        color: "gold",
        sprite: "sprites/coin1.png"
    }
};

// Rendering configuration
const renderConfig = {
    perspectiveMinScale: 0.6,    // Minimum scale for distant objects
    perspectiveMaxScale: 1.2,    // Maximum scale for close objects
    clearColor: "white",
    wallStrokeColor: "darkred",
    floorStrokeColor: "black",
    wallStrokeWidth: 3,
    entityDebugDotRadius: 3
};

// Input configuration
const inputConfig = {
    keys: {
        moveLeft: ["a", "arrowleft"],
        moveRight: ["d", "arrowright"],
        moveUp: ["w", "arrowup"],
        moveDown: ["s", "arrowdown"],
        jump: [" ", "space"],
        toggleGravity: "g"
    }
};