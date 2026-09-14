const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Update camera dimensions
camera.width = canvas.width;
camera.height = canvas.height;

// Factory function to create entities from config
function createEntityFromConfig(configKey) {
    const config = entityConfig[configKey];
    const entity = new Entity(
        config.x,
        config.y,
        config.radius,
        config.color,
        config.acceleration || 0.6,
        config.friction || 0.90,
        config.maxSpeed || 6
    );
    
    if (config.sprite) {
        entity.setSprite(config.sprite);
    }
    
    if (config.maxJumps) {
        entity.maxJumps = config.maxJumps;
    }
    
    return entity;
}

const player = createEntityFromConfig("player");
const tree = createEntityFromConfig("tree");
const coin = createEntityFromConfig("coin");

const worldObjects = [];

function initializeWorld() {
    worldObjects.push(tree);
    worldObjects.push(coin);
    worldObjects.push(player);
}

initializeWorld();
setupInputListeners(player);

function update() {
    handleInput(player, physics, getGravityEnabled());
    updatePhysics(player, physics, getGravityEnabled());
    moveEntities(worldObjects, player);
    resolveCollisions(player, world, getGravityEnabled());
    updateCamera(player, camera, world);
    updateUI();
}

function render() {
    clearScreen(ctx, canvas);
    updatePerspective(worldObjects, world);
    sortEntities(worldObjects);
    drawEntities(ctx, worldObjects, camera, canvas);
    drawWorld(ctx, world, camera, getGravityEnabled());
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();