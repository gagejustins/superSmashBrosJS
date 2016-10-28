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

// create an object to hold our "world parameters" - we will send this object into our
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 50,
  tileFolder: 'SmashMapCut',
  numTiles: 241,
  tileMap: [
    [  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [ 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    [ 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,100],
    [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
    [121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140],
    [141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160],
    [161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180],
    [181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200],
    [201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220],
    [221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240]
  ],
  solidTiles: {
    49:true, 50:true, 51:true,52:true,102:true,103:true,104:true,105:true, 116:true, 117:true,
    118:true, 119:true, 169:true, 170:true, 171:true, 172:true, 181:true, 182:true, 183:true,
    184:true, 185:true, 186:true, 187:true, 188:true, 189:true, 190:true, 191:true, 192:true,
    193:true, 194:true, 195:true, 196:true, 197: true, 198:true, 199:true, 200:true, 201:true, 202:true, 203:true, 204:true,
    205:true, 206:true, 207:true, 208:true, 209: true, 210: true, 211: true, 212: true, 213: true, 214: true, 215: true,
    216:true, 217: true, 218: true, 219: true, 220: true
  },
  gravity: 0.1,
  gravityMax: 5
};

// handle the tile loading and creating our player object in preload before the game can start
function preload() {
  theWorld = new SideViewWorld(worldParameters);
  thePlayer1 = new Player1(100, 100, theWorld);
  thePlayer2 = new Player2(300, 300, theWorld);
  theItems = new Item(thePlayer1, thePlayer2, theWorld);
}

function setup() {
  createCanvas(1000,600);
}

function draw() {
  
  theWorld.displayWorld()
  theItems.display();
  thePlayer1.move();
  thePlayer1.display();
  thePlayer2.move();
  thePlayer2.display();
  thePlayer1.checkHit(thePlayer2.x, thePlayer2.y);
  thePlayer2.checkHit(thePlayer1.x, thePlayer1.y);
  
}

