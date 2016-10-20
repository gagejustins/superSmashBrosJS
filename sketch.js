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
  thePlayer2 = new Player2(500, 500, theWorld);
}

function setup() {
  createCanvas(1000,600);
}

function draw() {
  theWorld.displayWorld()
  thePlayer1.move();
  thePlayer1.display();
  thePlayer2.move();
  thePlayer2.display();
<<<<<<< HEAD
  thePlayer1.checkHit(thePlayer2.x, thePlayer2.y);
}
=======
  
}
>>>>>>> origin/master
