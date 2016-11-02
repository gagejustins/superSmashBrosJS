// SPECIAL NOTE: This program uses a number of external JavaScript files to organize some of
// the objects that we need to fully implement a tile-based game.  These JavaScript files
// are referenced in the HTML document.  References to these documents are also included
// as comments within this file.

// our world object - this object handles our tiles, drawing the world and converting screen
// coordinates into game coordinates - see SideViewWorld.js for more information
var theWorld;

// our user controlled character object - see Player.js for more information
var thePlayer1;
var thePlayer2;

var theItems;

var startGame=false;
var inPlay=false;

// create an object to hold our "world parameters" - we will send this object into our
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 50,
  tileFolder: 'tiles',
  numTiles: 49,
  tileMap: [
    [18,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6, 18],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12,  0,  0,  0, 12, 12, 12, 12, 12,  6],
    [6,  12,  0,  0,  0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  0,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12,  0,  0,  0, 12, 12, 12, 12, 12, 12, 12, 12, 12,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  0,  0,  0,  6],
    [6,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  0,  0,  0,  6],
    [18,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6, 18]
  ],
  solidTiles: {0:true, 18:true, 6:true},
  gravity: 0.1,
  gravityMax: 5
};

// handle the tile loading and creating our player object in preload before the game can start
function preload() {
  theWorld = new SideViewWorld(worldParameters);
  thePlayer1 = new Player1(100, 100, theWorld);
  thePlayer2 = new Player2(300, 300, theWorld);
  theItems = new Item(thePlayer1, thePlayer2, theWorld);
  
  theme = loadSound("sound/theme.mp3")
  crowdSound = loadSound("sound/Crowd Cheering.wav")
  itemSound = loadSound("sound/Item Appear.wav")
  jumpSound = loadSound("sound/Jump 2.wav")
  hitSound = loadSound("sound/Moderate Hit.wav")
  whiffSound = loadSound("sound/Moderate Whiff.wav")
  
}

function setup() {
  
  createCanvas(1000,600);
  
  //Play theme
  theme.loop();
}

function draw() {
  
  if(!startGame) {
    background(0);
    textSize(32);
    fill(255);
    textAlign(CENTER);
    text("Welcome to super Smash Bros. We hope you enjoy our game.",width/2,height/2-20);
    text("Click the mouse to begin playing.",width/2,height/2+20);
  }
  else if (startGame && (thePlayer1.health>0 && thePlayer2.health>0)) {
    textAlign(LEFT);
    textSize(12);
    inPlay=true;
    theWorld.displayWorld()
    theItems.display();
    thePlayer1.move();
    thePlayer1.display();
    thePlayer2.move();
    thePlayer2.display();
    thePlayer1.checkHit(thePlayer2.x, thePlayer2.y);
    thePlayer2.checkHit(thePlayer1.x, thePlayer1.y);
  } else if (thePlayer1.health == 0 || thePlayer2.health == 0) {
    inPlay=false;
    background(0);
    textSize(32);
    fill(255);
    textAlign(CENTER);
    text("Game Over!",width/2,height/2-40);
    text("Player 1 Had: " + thePlayer1.health + " ; Player 2 Had: " + thePlayer2.health,width/2,height/2);
    text("Click the mouse to restart the game.",width/2,height/2+40);
  }

}

function mousePressed() {
  if (!inPlay) {
    startGame=true;
    restartGame()
  }
}

function restartGame() {
  thePlayer1.health=100;
  thePlayer1.x=100;
  thePlayer1.y=100;
  thePlayer2.health=100;
  thePlayer2.x=300;
  thePlayer2.y=300;
  theItems.timer=0;
  theItems.offTimer=0;
}

