class Entity{

    setSprite(image){

        if(image instanceof Image){

            this.sprite.image = image;
            this.sprite.loaded = true;
            return;

        }

        this.sprite.image = new Image();

        this.sprite.image.onload = () => {
            this.sprite.loaded = true;
        };

        this.sprite.image.onerror = () => {
            console.warn("Couldn't load sprite:", image);
        };

        this.sprite.image.src = image;

    }

    constructor(x, y, radius, color){

        this.x = x;
        this.y = y;

        this.radius = radius;
        this.scale = 1;
		this.width = radius * 2;
		this.height = radius * 2;
		this.rotation = 0;

        this.color = color;

        this.sprite = {
            image: null,
	  		loaded: false
		};
        this.vx = 0;
        this.vy = 0;

        this.onGround = false;
        this.jumpCount = 0;
        this.maxJumps = 2;
        this.onLeftWall = false;
        this.onRightWall = false;
        this.onCeiling = false;
        this.coyoteTimer = 0;

        this.acceleration = 0.6;
        this.friction = 0.90;
        this.maxSpeed = 6;
    }

    draw(ctx){

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius * this.scale,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            3 * this.scale,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "white";
        ctx.fill();

    }

    drawAtPosition(ctx, screenX, screenY){
        if(this.sprite.loaded){

	    ctx.drawImage(
                this.sprite.image,
                screenX - (this.width * this.scale) / 2,
                screenY - (this.height * this.scale) / 2,
                this.width * this.scale,
                this.height * this.scale
            );

            return;
        }
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, 3 * this.scale, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

    }

}
