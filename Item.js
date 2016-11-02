function Item(player1,player2,world) {
  
  this.x;
  this.y;
  
  this.world=world;
  
  this.player1=player1;
  this.player2=player2;
  
  this.animationHeart = new AnimationSequence('tiles/heart', 17, 8);
  this.animationStar = new AnimationSequence('tiles/star', 16, 8);
  this.animationTomato = new AnimationSequence('tiles/tomato', 1, 8);
  
  // this.currentArtwork;
  
  this.state;
  
  this.timer=0;
  this.offTimer=0;
  
  this.display=function() {
    
    if (this.timer==(60*8)) {
      
      this.state=Math.floor(Math.random()*2);
      
      this.x = random(100,width-100);
      this.y = random(100,height-100);
      
      while(this.world.isTileSolid(this.world.getTile(this.x,this.y))==true) {
        this.x = random(100,width-100);
        this.y = random(100,height-100);
      }
      
      itemSound.play();
      
      this.timer--;
      
    } else if (this.timer>0) {
      
      this.timer--;
    
      if(this.state==2) {
        
        // this.currentArtwork=this.starImage;
         
        imageMode(CENTER);
        this.animationStar.display(this.x, this.y);
        
        if (this.playerOneGrabbed()) {
          
          this.player1.starPower=true;
          
          this.timer=0;
          
        } else if (this.playerTwoGrabbed()) {
          
          this.player2.starPower=true;
          
          this.timer=0;
          
        }
        
      } else if (this.state==1) {
        
        // this.currentArtwork=this.fruitImage;
        
        imageMode(CORNER);
        this.animationTomato.display(this.x, this.y);
        
        if (this.playerOneGrabbed()) {
          
          this.player1.health=min(100,this.player1.health+10);
          
          this.timer=0;
          
        } else if (this.playerTwoGrabbed()) {
          
          this.player2.health=min(100,this.player2.health+10);
          
          this.timer=0;
          
        }
        
      } else if (this.state==0) {
        
        // this.currentArtwork=this.heartImage;
        
        imageMode(CORNER);
        this.animationHeart.display(this.x, this.y);
        
        if (this.playerOneGrabbed()) {
          
          this.player1.health=100;
          
          this.timer=0;
          
        } else if (this.playerTwoGrabbed()) {
          
          this.player2.health=100;
          
          this.timer=0;
          
        }
        
      }
      
    } else {
      
      this.offTimer++;
      
      if(this.offTimer%600==0) {
        
        this.timer=(60*8);
      
      }
      
    }
    
  }
  
  this.playerOneGrabbed = function() {
    
    //player one picks up with the F key
    if (dist(this.x, this.y, this.player1.x, this.player1.y)<=25 && keyIsDown(70)) {
      return true;
    }
    
    return false;
    
  }
  
  this.playerTwoGrabbed = function() {
    
    //player two picks up with the spacebar
    if (dist(this.x, this.y, this.player2.x, this.player2.y)<=25 && keyIsDown(32)) {
      return true;
    }
    
    return false;
    
  }
  
}