function Player2(x, y, world) {
  // store the player position
  this.x = x;
  this.y = y;

  // store a reference to our "world" object - we will ask the world to tell us about
  // tiles that are in our path
  this.world = world;

  // load & store our artwork
  this.artworkLeft = loadImage('tiles/falcon_left.gif');
  this.artworkRight = loadImage('tiles/falcon_right.gif');
  this.artworkUp = loadImage('tiles/falcon_up.gif');
  this.artworkDown = loadImage('tiles/falcon_down.gif');
  
  this.artworkPunchLeft = loadImage('tiles/falcon_punchleft.gif');
  this.artworkPunchRight = loadImage('tiles/falcon_punchright.gif');

  // assume we are pointing to the right
  this.currentImage = this.artworkRight;

  // define our desired movement speed
  this.speed = 3;
  
  // define our falling speed
  this.fallSpeed = 0;
  
  // define our jumping power
  this.jumpPower = 1;
  
  //define our health attribute
  this.health=100;
  
  // display our player
  this.display = function() {
    imageMode(CORNER);
    image(this.currentImage, this.x, this.y);
    //Display health
    fill(0);
    text( "Player Two Health: " + this.health, width-230, 80)
    stroke(255,0,0);
    strokeWeight(10);
    line(width-130,100,width-(this.health+130),100);
    strokeWeight(0)
  }
  
  this.isPunching = function() {
    if(keyIsDown(16)) {
      this.currentImage=this.artworkPunchRight;
    } else if (keyIsDown(191)) {
      this.currentImage=this.artworkPunchLeft;
    }
  }
  
  //Check for hit
  this.checkHit = function(enemy_x, enemy_y) {
    
    if ( dist(this.x, this.y, enemy_x, enemy_y) <= this.currentImage.width) {
      
      if( ( this.x<enemy_x && keyIsDown(81) ) ||  ( this.x>enemy_x && keyIsDown(69) ) ) {
      
      this.health -= 10;
      
      //Set minimum health to 0
      if (this.health <= 0) {
        this.health = 0;
      }
      
      this.bounceBack();
      
      }
      
    }  
    
  }
  
  //Bounce back function after hit
  this.bounceBack = function() {
    
    if(keyIsDown(81)) {
      
      for(var i=0; i<60; i++) {
        // see which tile is to our left
        var tile = world.getTile(this.left[0], this.left[1]);
  
        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.x --;
        }
      }
      
    } else if (keyIsDown(69)){
      
      for(var i=0; i<60; i++) {
        // see which tile is to our right
        var tile = world.getTile(this.right[0], this.right[1]);
  
        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.x ++;
        }
      }

    }
    
  }
  
  // display "sensor" positions
  this.displaySensor = function(direction) {
    fill(255);
    if (direction == "up") {
      ellipse(this.top[0], this.top[1], 20, 20);
    } else if (direction == "down") {
      ellipse(this.bottom[0], this.bottom[1], 20, 20);
    } else if (direction == "right") {
      ellipse(this.right[0], this.right[1], 20, 20);
    } else if (direction == "left") {
      ellipse(this.left[0], this.left[1], 20, 20);
    }
  }

  // set our sensor positions (computed based on the position of the character and the
  // size of our graphic)
  this.refreshSensors = function() {
    this.left = [this.x, this.y + this.currentImage.height / 2];
    this.right = [this.x + this.currentImage.width, this.y + this.currentImage.height / 2];
    this.top = [this.x + this.currentImage.width / 2, this.y];
    this.bottom = [this.x + this.currentImage.width / 2, this.y + this.currentImage.height];
  }

  // move our character
  this.move = function() {
    // refresh our "sensors" - these will be used for movement & collision detection
    this.refreshSensors();
    
    this.isPunching();
    
    // apply gravity to us every frame!
    // get the tile below us
    var belowTile = world.getTile(this.bottom[0], this.bottom[1]);
    
    // is it solid?
    if (!world.isTileSolid(belowTile)) {
      // apply gravity
      this.fallSpeed += world.gravity;
      
      // make sure that gravity doesn't get too out of control
      this.fallSpeed = constrain(this.fallSpeed, 0, world.gravityMax);

      // update position based on fall speed
      this.y += this.fallSpeed;
    }
    // otherwise it is solid - stop falling
    else {
      this.fallSpeed = 0;
    }
    
    // decrease jump power, if necessary
    this.jumpPower -= world.gravity;
    if (this.jumpPower < 0) { 
      this.jumpPower = 0;
    }

    // apply jump power
    this.y -= this.jumpPower;

    // see if one of our movement keys is down -- if so, we should try and move
    // note that this character responds to the following key combinations:
    // WASD
    // wasd
    // The four directional arrows
    if (keyIsDown(LEFT_ARROW)) {

      // see which tile is to our left
      var tile = world.getTile(this.left[0], this.left[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // move
        this.x -= this.speed;
      }

      // change artwork
      this.currentImage = this.artworkLeft;
      //this.displaySensor("left");
    }
    if (keyIsDown(RIGHT_ARROW)) {
      // see which tile is to our right
      var tile = world.getTile(this.right[0], this.right[1]);
      
      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // move
        this.x += this.speed;
      }

      // change artwork
      this.currentImage = this.artworkRight;
      //this.displaySensor("right");
    }
    
    // note that the "up' arrow now controls jumping and does not cause the character to 
    // directly move up
    if (keyIsDown(UP_ARROW)) {
      // see which tile is below us
      var tile = world.getTile(this.top[0], this.top[1]);
      
      // see if the tile below us is solid
      if (world.isTileSolid(belowTile)) {
        // give us some jumping power
        this.jumpPower = 8;
      }

      // is the tile above solid?
      if (world.isTileSolid(tile)) {
        // negate jump power
        this.jumpPower = 0;
      }

      // change artwork
      this.currentImage = this.artworkUp;
      //this.displaySensor("up");
    }       
  }
}