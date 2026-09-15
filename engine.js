const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Update camera dimensions
camera.width = canvas.width;
camera.height = canvas.height;

// Factory function to create entities from config
function createEntityFromConfig(config) {
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

const player = new Entity(
    entityConfig.player.x,
    entityConfig.player.y,
    entityConfig.player.radius,
    entityConfig.player.color,
    entityConfig.player.acceleration,
    entityConfig.player.friction,
    entityConfig.player.maxSpeed
);
player.setSprite(entityConfig.player.sprite);
player.maxJumps = entityConfig.player.maxJumps;

const worldObjects = [];

async function initializeWorld() {
    // Load entities from JSON
    try {
        const response = await fetch('entities.json');
        const data = await response.json();
        
        for (const entityData of data.entities) {
            const entity = createEntityFromConfig(entityData);
            worldObjects.push(entity);
        }
    } catch (error) {
        console.error("Failed to load entities from JSON:", error);
    }
    
    // Always add player last so it renders on top
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
    updatePerspective(worldObjects, world);  // This already uses getGravityEnabled() internally now
    sortEntities(worldObjects);
    drawEntities(ctx, worldObjects, camera, canvas);
    drawWorld(ctx, world, camera, getGravityEnabled());
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start game loop after entities are loaded
initializeWorld().then(() => {
    gameLoop();
});
