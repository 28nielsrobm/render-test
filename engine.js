const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Update camera dimensions
camera.width = canvas.width;
camera.height = canvas.height;

const player = new Entity(
    300,
    300,
    45,
    "dodgerblue"
);
player.setSprite("sprites/player1.png");

const tree = new Entity(
    800,
    1390,
    70,
    "forestgreen"
);
tree.setSprite("sprites/tree1.png");

const coin = new Entity(
    1200,
    1400,
    10,
    "gold"
);
coin.setSprite("sprites/coin1.png");

const worldObjects = [];

function initializeWorld() {
    worldObjects.push(tree);
    worldObjects.push(coin);
    worldObjects.push(player); 
}

initializeWorld();
setupInputListeners(player);

function update(){

    handleInput(player, physics, getGravityEnabled());
    updatePhysics(player, physics, getGravityEnabled());
    moveEntities(worldObjects, player);
    resolveCollisions(player, world, getGravityEnabled());
    updateCamera(player, camera, world);
    updateUI();

}

function render(){

    clearScreen(ctx, canvas);
    updatePerspective(worldObjects, world);
    sortEntities(worldObjects);
    drawEntities(ctx, worldObjects, camera, canvas);
    drawWorld(ctx, world, camera, getGravityEnabled());

}

function gameLoop(){

    update();
    render();

    requestAnimationFrame(gameLoop);

}

gameLoop();
