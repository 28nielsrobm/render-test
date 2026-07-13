function clearScreen(ctx, canvas){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

function updatePerspective(worldObjects, world){

    for(const object of worldObjects){

        object.scale =
            0.6 + (object.y / world.height) * 0.6;

    }

}

function sortEntities(worldObjects){

    worldObjects.sort((a,b)=>a.y-b.y);

}

function drawEntities(ctx, worldObjects, camera, canvas){

    for(const object of worldObjects){

        const screenX = object.x - camera.x;
        const screenY = object.y - camera.y;
        
        // Only draw if on screen
        if(screenX + object.radius > 0 && 
           screenX - object.radius < canvas.width &&
           screenY + object.radius > 0 && 
           screenY - object.radius < canvas.height){
            
            object.drawAtPosition(ctx, screenX, screenY);
        }

    }

}

function drawWorld(ctx, world, camera, gravityEnabled){

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    // Draw floor
    if(gravityEnabled){
        const floorScreenY = world.floor - camera.y;
        ctx.beginPath();
        ctx.moveTo(0 - camera.x, floorScreenY);
        ctx.lineTo(world.width - camera.x, floorScreenY);
        ctx.stroke();
    }
    
    // Draw world boundaries
    ctx.strokeStyle = "darkred";
    ctx.lineWidth = world.wallThickness;
    
    const walls = [
        {x1: 0, y1: 0, x2: world.width, y2: 0}, // top
        {x1: 0, y1: 0, x2: 0, y2: world.height}, // left
        {x1: world.width, y1: 0, x2: world.width, y2: world.height}, // right
        {x1: 0, y1: world.height, x2: world.width, y2: world.height} // bottom
    ];
    
    for(const wall of walls){
        ctx.beginPath();
        ctx.moveTo(wall.x1 - camera.x, wall.y1 - camera.y);
        ctx.lineTo(wall.x2 - camera.x, wall.y2 - camera.y);
        ctx.stroke();
    }

}
