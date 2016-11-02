function Player1(x, y, world) {
  // store the player position
  this.x = x;
  this.y = y;

  // store a reference to our "world" object - we will ask the world to tell us about
  // tiles that are in our path
  this.world = world;

  this.animationDown = new AnimationSequence('tiles/OrcDown', 6, 5);
  this.animationLeft = new AnimationSequence('tiles/OrcLeft', 6, 8);
  this.animationRight = new AnimationSequence('tiles/OrcRight', 6, 8);
  this.animationUp = new AnimationSequence('tiles/OrcUp', 4, 8);
  this.animationPunchLeft = new AnimationSequence('tiles/punchleft', 6, 8);
  this.animationPunchRight = new AnimationSequence('tiles/punchright', 6, 8);
  
  this.artworkPunchLeft = loadImage('tiles/falcon_punchleft.gif');
  this.artworkPunchRight = loadImage('tiles/falcon_punchright.gif');

  // assume we are pointing to the right
  // this.currentImage = this.artworkDown;
  this.animationCurrent = this.animationDown;

  // define our desired movement speed
  this.speed = 3;
  
  // define our falling speed
  this.fallSpeed = 0;
  
  // define our jumping power
  this.jumpPower = 1;
  
  //define our health attribute
  this.health=100;
  
  //Store whether a hit has registered
  this.beingHit = false;
  
  //Define timer parameters
  this.framesToStayInState = 6;
  this.framesInState = 0;
  
  //Punching
  this.punchingTimer = 0;
  this.maxPunchingTime = 60;
  
  this.starPower=false;
  
  this.starPower=false;
  
  // display our player
  this.display = function() {
    
    imageMode(CORNER);
    // image(this.currentImage, this.x, this.y);
    this.animationCurrent.display(this.x, this.y);
    
    //Display health
    fill(0);
    text( "Player One Health: " + this.health, 70, 80)
    stroke(255,0,0);
    strokeWeight(10);
    line(70,100,this.health+70,100);
    strokeWeight(0)
    
    //Call the punch function if appropriate
    if (keyIsDown(69) && (this.punchingTimer <= 0)) {
      this.PunchingRight = true;
      // this.animationCurrent = this.animationPunchLeft;
      this.isPunchingRight();
    }
    
    else if (keyIsDown(81) && (this.punchingTimer <= 0)) {
      this.PunchingLeft = true;
      // this.animationCurrent = this.animationPunchLeft;
      this.isPunchingLeft();
    }
    
    //Increment the timer variable
    this.framesInState += 1;
    this.punchingTimer -= 1;
  
    //Don't let the timer get negative
    if (this.punchingTimer <= 0) {
      this.punchingTimer = 0;
      thePlayer2.beingHit = false;
    }
    
    //Right after the punch, change variables to false
    if (this.punchingTimer <= (this.maxPunchingTime - 5)) {
      this.PunchingRight = false;
      this.PunchingLeft = false;
    }
  
    //If the timer variable goes past our limit, set it back to zero and reset
    //the character image to down
    if (this.framesInState >= this.framesToStayInState) {
      
      this.currentImage = this.artworkDown;
      this.framesInState = 0;
        
    }
  }
  
  this.isPunchingRight = function() {
      this.currentImage = this.artworkPunchRight;
      // this.animationCurrent = this.animationPunchRight;
      this.punchingTimer = this.maxPunchingTime;
  }
      
  this.isPunchingLeft = function() {
      this.currentImage = this.artworkPunchLeft;
      // this.animationCurrent = this.animationPunchLeft;
      this.punchingTimer = this.maxPunchingTime;
  }
  
  //Check for hit
  this.checkHit = function(enemy_x, enemy_y) {
    
    if (dist(this.x, this.y, enemy_x, enemy_y) <= 50) {

      if (((thePlayer2.PunchingLeft === true && enemy_x>this.x) || (thePlayer2.PunchingRight === true && enemy_x<this.x)) && (this.beingHit === false)) {
      
        this.health -= 10;
      
        this.bounceBack();
      
        //Set minimum health to 0
        if (this.health <= 0) {
          this.health = 0;
        }

        //Set boolean to make sure one hit can't subtract more than 10 health
        this.beingHit = true;
      
        }
      
    }  
    
  }
  
  //Bounce back function after hit
  this.bounceBack = function() {
    
    if(thePlayer2.PunchingLeft === true) {
      
      for(var i=0; i<60; i++) {
        // see which tile is to our left
        var tile = world.getTile(this.left[0], this.left[1]);
  
        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.x --;
        }
      }
      
    } else if (thePlayer2.PunchingRight === true) {
      
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


  // set our sensor positions (computed based on the position of the character and the
  // size of our graphic)
  this.refreshSensors = function() {
    this.left = [this.x, this.y + 60 / 2];
    this.right = [this.x + 60, this.y + 60 / 2];
    this.top = [this.x + 60 / 2, this.y];
    this.bottom = [this.x + 60 / 2, this.y + 60];
  }

  // move our character
  this.move = function() {
    // refresh our "sensors" - these will be used for movement & collision detection
    this.refreshSensors();
    
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
    if (keyIsDown(97) || keyIsDown(65)) {

      // see which tile is to our left
      var tile = world.getTile(this.left[0], this.left[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // move
        this.x -= this.speed;
      }

      // change artwork
      // this.currentImage = this.artworkLeft;
      this.animationCurrent = this.animationLeft;
      //this.displaySensor("left");
    }
    if (keyIsDown(100) || keyIsDown(68)) {
      // see which tile is to our right
      var tile = world.getTile(this.right[0], this.right[1]);
      
      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // move
        this.x += this.speed;
      }

      // change artwork
      // this.currentImage = this.artworkRight;
      this.animationCurrent = this.animationRight;
      //this.displaySensor("right");
    }
    
    // note that the "up' arrow now controls jumping and does not cause the character to 
    // directly move up
    if (keyIsDown(119) || keyIsDown(87)) {
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
      // this.currentImage = this.artworkUp;
      this.animationCurrent = this.animationPunchLeft;
      //this.displaySensor("up");
    }
    
    if(keyIsDown(69)){
      this.animationCurrent = this.animationPunchRight;
    }
    
    if(keyIsDown(81)){
      this.animationCurrent = this.animationPunchLeft;
    }
    
    // else{
    //   this.animationCurrent = this.animationDown;
    // }
    
    
    // if(keyIsDown(81)){
    //   this.animationCurrent = this.animationPunchLeft;
    // }
  }
  
}

function AnimationSequence(folder, numFrames, frameDelay) {
  // store a reference to the folder that holds our artwork files
  this.folder = folder;
  
  // store our frameDelay variable - this variable is used to slow down
  // the animation as necessary
  this.frameDelay = frameDelay;
  this.currentFrameDelay = 0;
  
  // load in all of our artwork into an array
  this.artwork = [];
  for (var i = 0; i < numFrames; i++) {
    var tempFrame = loadImage(folder + "/frame0" + i + ".png");
    this.artwork.push( tempFrame );
  }
  
  // currentFrame keeps track of where we are in our animation cycle
  this.currentFrame = 0;
  
  // display function
  this.display = function(x, y) {
    // draw the current frame of animation
    image( this.artwork[ this.currentFrame ], x, y)

    // move to the next frame of animation if we have fulfilled our "frame delay"
    if (this.currentFrameDelay >= this.frameDelay) {    

      // reset currentFrameDelay
      this.currentFrameDelay = 0;
      
      // advance to the next frame (which may be frame 0 if we reach the end)
      this.currentFrame += 1;
      if (this.currentFrame == this.artwork.length) {
        this.currentFrame = 0;
      }
    }
    
    // otherwise increase frame delay by one
    else {
      this.currentFrameDelay += 1;
    }
  }
}
