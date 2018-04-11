/*
 * TODO: crear el objeto con width y height en cada new
 */
var CUTTER = function(url) {
    this.url = url;
    this.spriteObject = function(x, y, sx, sy, w, h, repeat) {
        this.style = "position: absolute;";
        this.style += "width: " + w + "px;";
        this.style += "height: " + h + "px;";
        this.style += "left: " + x + "px;";
        this.style += "top: " + y + "px;";
        this.style += "background: url(" + this.url + ") " + sx + "px " + sy + "px;";
        this.style += "background-repeat:" + (repeat) ? "repeat" : "no-repeat";
        var elem = document.createElement("div");
        $(elem).attr("style", this.style);
        document.body.appendChild(elem);
    };
    this.newTree = function(x, y, init) {
        this.spriteObject(x, y, -260, -352, 120, 170, false);
        if(init == false) OBJECT.new(x+40,y+100,20,20,"nature",""); //DONT SAVE ALL BORDER TREE ON OBJECT ARRAYa
    };
    this.newOldTree = function(x, y) {
        this.spriteObject(x, y, -130, -352, 120, 170, false);
    };
    this.newCommonTree = function(x, y) {
        this.spriteObject(x, y, -257, -190, 125, 160, false);
    };
    this.newBigTree = function(x, y) {
        this.spriteObject(x, y, 0, -520, 256, 320, false);
        OBJECT.new(x+30,y+190,118,90,"nature","");
    };
    this.newFungusTree = function(x, y) {
        this.spriteObject(x, y, 0, -1080, 120, 200, false);
    };
    this.newForest = function(x, y) {
        this.spriteObject(x, y, -100, -1670, 155, 220, false);
        OBJECT.new(x-25,y+100,110,100,"nature","");
    };
    this.newCommonForest = function(x, y) {
        this.spriteObject(x, y, -128, -1885, 128, 260, false);
        OBJECT.new(x-35,y+100,130,150,"nature","");
    };
    this.newWaterWell = function(x, y) {
        this.spriteObject(x, y, -128, -2210, 65, 60, false);
        OBJECT.new(x-50,y-30,80,80,"nature","");
    };
    this.newBeam = function(x, y) {
        this.spriteObject(x, y, -65, -2170, 33, 100, false);
        OBJECT.new(x-40,y,60,100,"nature","");
    };
    this.newOldBeam = function(x, y) {
        this.spriteObject(x, y, -96, -2170, 33, 100, false);
    };
    this.newFrontWall = function(x, y) {
        this.spriteObject(x, y, 0, -2528, 193, 65, false);
        OBJECT.new(x-40,y,180,65,"nature","");
    };
    this.newTomb = function(x, y) {
        this.spriteObject(x, y, -194, -2528, 60, 65, false);
        OBJECT.new(x-50,y-30,80,85,"nature","");
    };
    this.newOldTomb = function(x, y) {
        this.spriteObject(x, y, -194, -3520, 60, 100, false);
    };
    this.newCrosses = function(x, y) {
        this.spriteObject(x, y, -194, -3420, 60, 80, false);
    };
    this.newTend = function(x, y) {
        this.spriteObject(x, y, 0, -3635, 155, 175, false);
        OBJECT.new(x-40,y,165,160,"nature","");
    };
    this.newCarTend = function(x, y) {
        this.spriteObject(x, y, 0, -4120, 100, 160, false);
    };
    this.newSign = function(x, y) {
        this.spriteObject(x, y, -100, -4140, 60, 60, false);
        OBJECT.new(x-50,y-35,80,65,"natudre","");
    };
    this.newSignSmall = function(x, y) {
        this.spriteObject(x, y, -155, -4140, 80, 60, false);
      OBJECT.new(x-50,y-35,50,65,"natudre","");
    };
    this.newFoodTable = function(x, y) {
        this.spriteObject(x, y, -95, -4200, 100, 100, false);
    };
    this.newFlower1 = function(x, y) {
        this.spriteObject(x, y, -160, 0, 30, 30, false);
        OBJECT.new(x,y,30,30,"nature","");
    };
    this.newFlower2 = function(x, y) {
        this.spriteObject(x, y, -190, 0, 30, 30, false);
        OBJECT.new(x,y,30,30,"nature","");
    };
    this.newFlower3 = function(x, y) {
        this.spriteObject(x, y, -225, 0, 30, 30, false);
        OBJECT.new(x,y,30,30,"nature","");
    };
    this.newFlower4 = function(x, y) {
        this.spriteObject(x, y, -160, 0, 90, 30, false);
        OBJECT.new(x-40,y,10,10,"nature","");
    };
    this.newFlower5 = function(x, y) {
        this.spriteObject(x, y, 0, -130, 30, 30, false);
        OBJECT.new(x,y,10,10,"nature","");
    };
    this.newFlower6 = function(x, y) {
        this.spriteObject(x, y, -32, -130, 30, 30, false);
      OBJECT.new(x-45,y-40,40,60,"nature","");
    };
    this.newStemVertical = function(x, y) {
        this.spriteObject(x, y, -160, -60, 30, 65, false);
        OBJECT.new(x,y,10,10,"nature","");
    };
    this.newStemHorizontal = function(x, y) {
        this.spriteObject(x, y, -190, -100, 65, 30, false);
    };
    this.newStem1 = function(x, y) {
        this.spriteObject(x, y, -130, 0, 30, 30, false);
    };
    this.newStem2 = function(x, y) {
        this.spriteObject(x, y, -130, -31, 30, 30, false);
    };
    this.newRuins1 = function(x, y) {
        this.spriteObject(x, y, -195, -3290, 60, 100, false);
    };
    this.newRuins2 = function(x, y) {
        this.spriteObject(x, y, 0, -3265, 195, 100, false);
    };
};
