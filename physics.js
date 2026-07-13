function updatePhysics(player, physics, gravityEnabled){

    if(gravityEnabled){

        player.vy += physics.gravity;

        if(player.vy > physics.terminalVelocity){
            player.vy = physics.terminalVelocity;
        }

        // Wall sliding
        if(
            !player.onGround &&
            (player.onLeftWall || player.onRightWall) &&
            player.vy > physics.wallSlideSpeed
        ){

            player.vy = physics.wallSlideSpeed;

        }

    }

    player.vx = Math.max(
        -player.maxSpeed,
        Math.min(player.maxSpeed, player.vx)
    );

    if(!gravityEnabled){

        player.vy = Math.max(
            -player.maxSpeed,
            Math.min(player.maxSpeed, player.vy)
        );

    }

    if(player.onGround){

        player.coyoteTimer = 8;

    }else{

        player.coyoteTimer--;

    }

}

function moveEntities(worldObjects, player){

    for(const object of worldObjects){
        object.update();
    }

    player.vx *= player.friction;

    if(!getGravityEnabled()){
        player.vy *= player.friction;
    }

}

function resolveCollisions(player, world, gravityEnabled){

    player.onGround = false;
    player.onLeftWall = false;
    player.onRightWall = false;
    player.onCeiling = false;

    // Left wall
    if(player.x < player.radius + world.wallThickness){

        player.x = player.radius + world.wallThickness;
        player.vx = 0;
        player.onLeftWall = true;

    }

    // Right wall
    if(player.x > world.width - player.radius - world.wallThickness){

        player.x = world.width - player.radius - world.wallThickness;
        player.vx = 0;
        player.onRightWall = true;

    }

    // Ceiling
    if(player.y < player.radius + world.wallThickness){

        player.y = player.radius + world.wallThickness;
        player.vy = 0;
        player.onCeiling = true;

    }

    if(gravityEnabled){

        const bottom = player.radius * player.scale;

        if(player.y > world.floor - bottom){

            player.y = world.floor - bottom;
            player.vy = 0;
            player.onGround = true;
            player.jumpCount = 0;

        }

    }

}

function updateCamera(player, camera, world){
    const targetX = player.x - camera.width / 2;
    const targetY = player.y - camera.height / 2;
    
    camera.x += (targetX - camera.x) * camera.smoothness;
    camera.y += (targetY - camera.y) * camera.smoothness;
    
    // Clamp camera to world bounds
    camera.x = Math.max(0, Math.min(camera.x, world.width - camera.width));
    camera.y = Math.max(0, Math.min(camera.y, world.height - camera.height));
}

function updateUI(){

    document.getElementById("gravityStatus").textContent =
        "Gravity: " + (getGravityEnabled() ? "ON" : "OFF");

}
