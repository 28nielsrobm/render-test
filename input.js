let gravityEnabled = false;
const keys = {};
let jumpPressed = false;

function handleInput(player, physics, gravityEnabled){

    if(gravityEnabled){

        if(keys["a"] || keys["arrowleft"])
            player.vx -= player.acceleration;

        if(keys["d"] || keys["arrowright"])
            player.vx += player.acceleration;

        const jumpNow =
            (keys[" "] || keys["space"]);

        if(jumpNow && !jumpPressed){

            if(
                player.jumpCount < player.maxJumps ||
                player.coyoteTimer > 0
            ){

                player.vy = -physics.jumpPower;
                player.jumpCount++;

            }

            else if(player.onLeftWall){

                player.vx = physics.wallPushPower;
                player.vy = -physics.wallJumpPower;

                player.jumpCount = 1;

            }

            else if(player.onRightWall){

                player.vx = -physics.wallPushPower;
                player.vy = -physics.wallJumpPower;

                player.jumpCount = 1;
                }

            else if(player.onCeiling){

                player.vy = physics.jumpPower;

            }

        }

        jumpPressed = jumpNow;

    }else{

        if(keys["w"] || keys["arrowup"])
            player.vy -= player.acceleration;

        if(keys["s"] || keys["arrowdown"])
            player.vy += player.acceleration;

        if(keys["a"] || keys["arrowleft"])
            player.vx -= player.acceleration;

        if(keys["d"] || keys["arrowright"])
            player.vx += player.acceleration;

    }

}

function setupInputListeners(player) {
    window.addEventListener("keydown", e => {

        keys[e.key.toLowerCase()] = true;

        if(e.key.toLowerCase() === "g"){

            gravityEnabled = !gravityEnabled;

            // Reset movement when switching modes
            player.vx = 0;
            player.vy = 0;

            player.onGround = false;
            player.onLeftWall = false;
            player.onRightWall = false;
            player.onCeiling = false;

            player.jumpCount = 0;
            player.coyoteTimer = 0;
        }

    });

    window.addEventListener("keyup", e=>{
        keys[e.key.toLowerCase()] = false;
    });
}

function getGravityEnabled() {
    return gravityEnabled;
}

function setGravityEnabled(value) {
    gravityEnabled = value;
}
