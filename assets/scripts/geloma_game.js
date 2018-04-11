var ACTION = function() {

    this.init = function(){
      this.keymap = [{
            keyCode: 87,
            action: this.walk_up
        }, {
            keyCode: 65,
            action: this.walk_left
        }, {
            keyCode: 83,
            action: this.walk_down
        }, {
            keyCode: 68,
            action: this.walk_right
        }, {
            keyCode: 90,
            action: this.triggerChall
        }, {
           keyCode: 88,
           action: this.triggerFocus
        }];
       return this;
    };

    this.canMove = function(eX, eY){
      var can = true;
      if(eX >= 9
         && eX <= WORLD.width - 100
         && eY >= 120
         && eY <= WORLD.height - 70){
         OBJECT.list.forEach(function(i){
           if(eX > i.ix
              && eX <i.fx
              && eY > i.iy
              && eY < i.fy){
              can = false;
           }
         });
      }else{
         can = false;
      }
      return can;
    };

    this.mapper = function(keyCode){
       this.keymap.forEach(function(i){
          if(i.keyCode == keyCode) i.action();
       });
    };
    this.walk_up = function() {
        var expectedX = PLAYER.x;
        var expectedY = PLAYER.y - PLAYER.PIX_MOV;
        if(ACTION.canMove(expectedX,expectedY)){
           PLAYER.move_up();
           CAMERA.verticalFocus(PLAYER);
        }
    };
    this.walk_down = function() {
        var expectedX = PLAYER.x;
        var expectedY = PLAYER.y + PLAYER.PIX_MOV;
        if(ACTION.canMove(expectedX,expectedY)){
           PLAYER.move_down();
           CAMERA.verticalFocus(PLAYER);
        }
    };
    this.walk_left = function() {
        var expectedX = PLAYER.x - PLAYER.PIX_MOV;
        var expectedY = PLAYER.y;
        if(ACTION.canMove(expectedX,expectedY)){
           PLAYER.move_left();
           CAMERA.horizontalFocus(PLAYER);
        }
    };
    this.walk_right = function() {
        var expectedX = PLAYER.x + PLAYER.PIX_MOV;
        var expectedY = PLAYER.y;
        if(ACTION.canMove(expectedX,expectedY)){
           PLAYER.move_right();
           CAMERA.horizontalFocus(PLAYER);
        }
    };
    this.triggerFocus = function(){
        window.scrollTo(PLAYER.x, PLAYER.y);
    };
    this.triggerChall = function(){
        exist = null;
        for(var i = 0; i< OBJECT.others.length; i++){
          challenge = OBJECT.others[i];
          if(PLAYER.x >= challenge.x
             && PLAYER.x <= challenge.w
             && PLAYER.y >= challenge.y
             && PLAYER.y <= challenge.h){
             exist = challenge;
             break;
          }
        };
        if(exist != null) {
            $.ajax({
                method: "GET",
                url: exist.value,
            }).done(function(resp){
                if(resp.indexOf("SOLVED!") != -1){
                    var question = confirm(exist.title+" ALREADY solved, go there?");
                    if(question) window.open(exist.value, '_blank').focus();
                }else{
                    var question = confirm(exist.title+" NOT solved, go there?");
                    if(question) window.open(exist.value, '_blank').focus();
                }
            });
            console.log(exist);
        }
    };

    this.init();
};

var CAMERA = function(PLAYER) {
    this.init = function(PLAYER) {
        this.x = PLAYER.x;
        this.y = PLAYER.y;
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
        this.screenHeight = window.innerHeight / 2;
        return this;
    };
    this.horizontalFocus = function(PLAYER) {
        if (PLAYER.x > this.screenWidth) {
            this.x = PLAYER.x - this.screenWidth;
            window.scrollTo(this.x, this.y);
        }
    };
    this.verticalFocus = function(PLAYER) {
        if (PLAYER.y > this.screenHeight) {
            this.y = PLAYER.y - this.screenHeight;
            window.scrollTo(this.x, this.y);
        }
    };
    this.init(PLAYER);
};

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

var GAME = function(){

  this.start = function(){
     OBJECT = new OBJECT();
     WORLD = new WORLD(1900,1300);
     MAP = new MAP();
     PLAYER = new PLAYER(10,120);
     WORLD.paint(PLAYER);
     CAMERA = new CAMERA(PLAYER);
     ACTION = new ACTION();
     CHALLENGES = new CHALLENGES();
     KEYMAPPER = new KEYMAPPER();
  };

};
$(document).ready(function(){
  (new GAME()).start();
});

var KEYMAPPER = function() {
    this.runAction = function(e) {
        console.log(e.keyCode);
        e = e || window.event;
        ACTION.mapper(e.keyCode);
        WORLD.paint(PLAYER);
        PLAYER.debug();
    };
    this.init = function() {
        document.onkeydown = this.runAction;
    };
    this.init();
};

var MAP = function() {
    this.init = function() {
        this.nature = new CUTTER("assets/game/sprites/game.png");
        this.up_tree_set();
        this.left_tree_set();
        this.cementary();
        this.some_trees();
        this.forest_set();
        this.bigTree_set();
        this.ruins();
        this.camp_set();
        this.right_tree_set();
        this.down_tree_set();
        return this;
    };
    this.cementary = function(){
      for(j = 270; j <= 600; j= j+150){
        for(i = 130; i<=1000; i=i+80){
          this.nature.newFrontWall(i,j-20);
          this.nature.newTomb(i,j);
        }
      }
    };
    this.some_trees = function(){
      this.nature.newTree(1000,500);
      this.nature.newTree(1000,320);
      this.nature.newTree(1000,170);
      this.nature.newBeam(400,650);
      this.nature.newBeam(600,650);
      this.nature.newBeam(750,750);
      this.nature.newBeam(250,750);
      this.nature.newBeam(750,850);
      this.nature.newBeam(250,850);
      this.nature.newBeam(750,950);
      this.nature.newBeam(250,950);
      this.nature.newBeam(750,1050);
      this.nature.newBeam(250,1050);
      this.nature.newBeam(400,1050);
      this.nature.newBeam(600,1050);
    };

    this.up_tree_set = function() {
        for (i = 0; i < 1000; i++) {
            if (i * 70 >= WORLD.width - 240) break;
            this.nature.newTree(i * 80, -30, true);
        }
    };
    this.down_tree_set = function() {
        for (i = 0; i < 1000; i++) {
            if (i * 70 >= WORLD.width - 240) break;
            this.nature.newTree(i * 80, 1150, true);
        }
    };
    this.right_tree_set = function() {
        for (i = 0; i < 1000; i++) {
            if (i * 70 >= WORLD.height - 300) break;
            this.nature.newTree(1820, i * 70, true);
        }
    };
    this.left_tree_set = function() {
        for (i = 2; i < 1000; i++) {
            if (i * 70 >= WORLD.height - 140) break;
            this.nature.newTree(1, i * 70, true);
        }
    };
    this.flower_set = function(x,y,lx,ly) {
        for (i = 0; i < lx; i=i+40) {
          for (j = 0; j < ly; j=j+40) {
            this.nature.newFlower6(x+i,y+j);
          }
        }
    };

    this.forest_set = function(){
      this.nature.newForest(1350,200);
      this.nature.newCommonForest(1450,200);
      this.nature.newForest(1580,10);
      this.nature.newCommonForest(1680,40);
    };
    this.ruins = function(){
      this.nature.newForest(1750,250);
      this.nature.newFrontWall(1270,400);
      this.nature.newFrontWall(1460,400);
      this.nature.newFrontWall(1550,400);
      for(j = 430; j <= 700; j = j+100){
        for(i = 1270; i <= 1790; i = i+70){
            if(j == 530
               || j == 630){
              if(i > 1270 + 70*4) break;
              this.nature.newTomb(i,j);
            }else{
              this.nature.newTomb(i,j);
            }
        }
      }
      this.nature.newOldTree(1750,450);
      this.nature.newOldTree(1750,550);
      this.nature.newOldTree(1750,650);
      this.nature.newFrontWall(1460,700);
      this.nature.newFrontWall(1650,700);
      this.nature.newFrontWall(1270,700);
    };

    this.camp_set = function(){
       this.nature.newForest(1210,710);
       this.nature.newForest(1380,710);
       this.nature.newForest(1550,710);
       this.nature.newForest(1720,710);
       this.nature.newTend(1210,860);
       this.nature.newTend(1380,860);
       this.nature.newTend(1550,860);
       this.nature.newTend(1720,860);
       this.nature.newSign(1160,985);
       this.nature.newWaterWell(1700,1060);
       this.nature.newWaterWell(1700,1100);
       this.nature.newWaterWell(1770,1060);
       this.nature.newWaterWell(1770,1100);
    };
    this.bigTree_set = function(){
      this.nature.newBigTree(100,500);
      /*for(i = 200; i <= 800 ; i = i +200){
        this.nature.newBigTree(i,600);
      }*/
      this.nature.newBigTree(800,700);
      this.nature.newBigTree(800,850);
    };
    this.init();
};

var OBJECT = function(x, y, w, h, type, value) {
    this.list = [];
    this.others = [];
    this.new = function(x, y, w, h, type, value) {
        this.list.push({ix: x, //fix -40 to canvas width
                        iy: y, //fix -40 to canvas height
                        fx: x + w, //fix -40 to canvas width
                        fy: y + h, //fix -40 to canvas height
                        c: type,
                        value: value});
    };
    this.addOther = function(x,y,name,value,id){
       this.others.push({x:x,
                         y:y,
                         w:x+50,
                         h:y+50,
                         title: name,
                         value: value, 
                         id: id});
    };
    return this;
};

var PLAYER = function(x, y) {
    this.init = function(x, y) {
        //AXIS VARS
        this.x = x, this.y = y;
        //DIRECTION VARS
        this.up = 0, this.down = 0;
        this.left = 0, this.right = 0;
        this.last_move = "";
        //MOVEMENT RESTRICTIONS
        this.PIX_MOV = 10;
        //SPRITE RESTRICTIONS
        this.WID_SPR = 50, this.HEI_SPR = 60;
        this.FRAME_H = 32, this.SPRITE = $("#spr-player")[0];
        return this;
    };
    this.move_up = function() {
        this.up++;
        this.up %= 3;
        this.left = 0, this.down = 0, this.right = 0;
        this.y -= this.PIX_MOV;
        this.last_move = "u";
    };
    this.move_left = function() {
        this.left++;
        this.left %= 3;
        this.up = 0, this.down = 0, this.right = 0;
        this.x -= this.PIX_MOV;
        this.last_move = "l";
    };
    this.move_down = function() {
        this.down++;
        this.down %= 3;
        this.up = 0, this.left = 0, this.right = 0;
        this.y += this.PIX_MOV;
        this.last_move = "d";
    };
    this.move_right = function() {
        this.right++;
        this.right %= 3;
        this.up = 0, this.left = 0, this.down = 0;
        this.x += this.PIX_MOV;
        this.last_move = "r";
    };
    this.frame = function() {
        switch (this.last_move) {
            case "u":
                return {
                    sx: this.FRAME_H * this.up,
                    sy: 96
                }
            case "l":
                return {
                    sx: this.FRAME_H * this.left,
                    sy: 32
                }
            case "d":
                return {
                    sx: this.FRAME_H * this.down,
                    sy: 0
                }
            case "r":
                return {
                    sx: this.FRAME_H * this.right,
                    sy: 64
                }
            default:
                return {
                    sx: this.FRAME_H * this.down,
                    sy: 0
                }
        }
    };
    this.debug = function() {
        console.log("WORLD POSITION: (" + this.x + "," + this.y + ")");
    }
    this.init(x, y);
}

var WORLD = function(width, height) {
    this.init = function(width, height) {
        this.terrain = $("#game-world")[0].getContext('2d');
        $("#game-world").attr("width", width);
        $("#game-world").attr("height", height);
        this.width = width;
        this.height = height;
        this.background = $("#background")[0];
        this.pointer = {
            x: 0,
            y: 0
        };
        return this;
    };
    this.clear = function() {
        this.terrain.clearRect(0, 0, this.width, this.height);
    };
    this.paintPlayer = function(player) {
        this.terrain.drawImage(player.SPRITE, player.frame().sx, player.frame().sy, player.FRAME_H,
            player.FRAME_H, player.x, player.y, player.WID_SPR, player.HEI_SPR);
    };
    this.paint = function(PLAYER) {
        this.clear();
        this.paintPlayer(PLAYER);
    };
    this.init(width, height);
};

var CHALLENGES = function() {
    this.createImage = function(x, y, url, link, id) {
        this.style = "position: absolute;";
        this.style += "left: " + x + "px;";
        this.style += "top: " + y + "px;";
        var elem = document.createElement("img");
        $(elem).attr("style", this.style);
        $(elem).attr("src", url);
        $(elem).attr("id",id);
        document.body.appendChild(elem);
    };
    this.basic = function() {
        var list = [{
            title: "Basic1",
            url: "Challenges/Basic/3aa9892632",
            id: 1
        }, {
            title: "Basic2",
            url: "Challenges/Basic/a490daff04",
            id: 2
        }, {
            title: "Basic3",
            url: "Challenges/Basic/c5e779f102",
            id: 3
        }, {
            title: "Basic4",
            url: "Challenges/Basic/e36b7ff197",
            id: 4
        }, {
            title: "Basic5",
            url: "Challenges/Basic/5910e7ed8e",
            id: 5
        }, {
            title: "Basic6",
            url: "Challenges/Basic/76630fbc09",
            id: 6
        }, {
            title: "Basic7",
            url: "Challenges/Basic/5748db0405",
            id: 7
        }, {
            title: "Basic8",
            url: "Challenges/Basic/b5961b4554",
            id: 8
        }, {
            title: "Basic9",
            url: "Challenges/Basic/84dd4afd6c",
            id: 9
        }];
        var i = 150;
        for(var r = 0; r < list.length; r++){
            pos = list[r];
            this.createImage(i, 150, "assets/game/sprites/chall_bee.gif", pos.title, pos.id);
            OBJECT.addOther(i - 25, 150, pos.title, pos.url, pos.id);
            i += 100;
        }
    };
    this.captcha = function(){
        var list = [{
            title: "Captcha 1",
            url: "Challenges/Captcha/d6c19a9b72",
            id: 10
        }, {
            title: "Capcha 2",
            url : "Challenges/Captcha/60e9d06ada",
            id: 11
        }, {
            title: "Capcha 3",
            url : "Challenges/Captcha/e1211e428f",
            id: 12
        }];
        var pos = list[0], x = 1530, y = 150;
        this.createImage(x, y, "assets/game/sprites/chall_duck.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[1], x = 1690, y = 790;
        this.createImage(x, y, "assets/game/sprites/chall_duck.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[2], x = 250, y = 690;
        this.createImage(x, y, "assets/game/sprites/chall_duck.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
    };
    this.realistic = function(){
        var list = [{
            title: "Realistic1",
            url: "Challenges/Realistic/e4633b53f9",
            id: 20
        }, {
            title: "Realistic2",
            url: "Challenges/Realistic/feb8ea9cc",
            id: 21
        }, {
            title: "Realistic3",
            url: "Challenges/Realistic/25988e973e",
            id: 22
        }, {
            title: "Realistic4",
            url: "Challenges/Realistic/b35a0cd8b5",
            id: 23
        }, {
            title: "Realistic5",
            url: "Challenges/Realistic/216cb95883",
            id: 24
        }, {
            title: "Realistic6",
            url: "Challenges/Realistic/e6713fbffd",
            id: 25
        }, {
            title: "Realistic7",
            url: "Challenges/Realistic/ed69e2a909",
            id: 26
        }];
        var pos = list[0], x = 450, y = 810;
        this.createImage(x, y, "assets/game/sprites/arrow.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[1], x = 450, y = 860;
        this.createImage(x, y, "assets/game/sprites/arrow.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[2], x = 450, y = 930;
        this.createImage(x, y, "assets/game/sprites/arrow.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[3], x = 450, y = 980;
        this.createImage(x, y, "assets/game/sprites/arrow.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[4], x = 300, y = 850;
        this.createImage(x, y, "assets/game/sprites/chall_dragon.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[5], x = 300, y = 970;
        this.createImage(x, y, "assets/game/sprites/chall_dragon.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
        var pos = list[6], x = 120, y = 1050;
        this.createImage(x, y, "assets/game/sprites/chall_god.gif", pos.title, pos.id);
        OBJECT.addOther(x+20, y-10, pos.title, pos.url, pos.id);
    };
    this.reversing = function(){
        var list = [{
            title: "Reversing1",
            url: "Challenges/Reversing/dd2421869a",
            id: 110
        }, {
            title: "Reversing2",
            url: "Challenges/Reversing/f81cf8552b",
            id: 111
        }, {
            title: "Reversing3",
            url: "Challenges/Reversing/29e2d547d5",
            id: 112
        }, {
            title: "Reversing4",
            url: "Challenges/Reversing/86973d9e26",
            id: 113
        }, {
            title: "Reversing5",
            url: "Challenges/Reversing/3edefa2d0d",
            id: 114
        }, {
            title: "Reversing6",
            url: "Challenges/Reversing/947523c723",
            id: 115
        }];
        var pos = list[0], x = 1700, y = 500;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+5, y+10, pos.title, pos.url , pos.id);
        var pos = list[1], x = 1700, y = 570;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+10, y-10, pos.title, pos.url , pos.id);
        var pos = list[2], x = 1700, y = 630;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+10, y-10, pos.title, pos.url , pos.id);
        var pos = list[3], x = 1610, y = 500;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+10, y-10, pos.title, pos.url , pos.id);
        var pos = list[4], x = 1610, y = 570;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+10, y-10, pos.title, pos.url , pos.id);
        var pos = list[5], x = 1610, y = 630;
        this.createImage(x, y, "assets/game/sprites/chall_rever.gif", pos.title , pos.id);
        OBJECT.addOther(x+10, y-10, pos.title, pos.url , pos.id);
    };
    
    this.trivia = function(){
        var list = [{
            title: "Trivia 1",
            url: "Challenges/Trivia/f829c7b550",
            id: 140
        }, {
            title: "Trivia 2",
            url : "Challenges/Trivia/7e5501bbc4",
            id: 141
        }, {
            title: "trivia 3",
            url : "Challenges/Trivia/b3197a0222",
            id: 142
        },{
            title: "trivia 4",
            url : "Challenges/Trivia/be485f8a60",
            id: 143
        },{
            title: "trivia 5",
            url : "Challenges/Trivia/ec012a708b",
            id: 144
        },{
            title: "trivia 6",
            url : "Challenges/Trivia/9d595444e1",
            id: 145
        },{
            title: "trivia 7",
            url : "Challenges/Trivia/45dbbc820c",
            id: 146
        }];
        var pos = list[0], x = 1590, y = 350;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title  , pos.id);
        OBJECT.addOther(x , y , pos.title, pos.url, pos.id);
        var pos = list[1], x = 950, y = 1060;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[2], x = 1690, y = 340;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[3], x = 1340, y = 120;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[4], x = 1330, y = 180;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[5], x = 1580, y = 270;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
        var pos = list[6], x = 1630, y = 210;
        this.createImage(x, y, "assets/game/sprites/chall_wolf.gif", pos.title, pos.id);
        OBJECT.addOther(x - 25, y - 35, pos.title, pos.url, pos.id);
    };


    this.crypto = function() {
        var list = [{
            title: "crypto 1",
            url: "Challenges/Cryptography/7775b3b973",
            id: 20
        }, {
            title: "crypto 2",
            url: "Challenges/Cryptography/cbd7c0602c",
            id: 21
        }, {
            title: "crypto 3",
            url: "Challenges/Cryptography/e5cd762a89",
            id: 22
        }, {
            title: "crypto 4",
            url: "Challenges/Cryptography/1f4adcabc0",
            id: 23
        }, {
            title: "crypto 5",
            url: "Challenges/Cryptography/b13338add0",
            id: 24
        }, {
            title: "crypto 6",
            url: "Challenges/Cryptography/55c4eed196",
            id: 25
        }, {
            title: "crypto 7",
            url: "Challenges/Cryptography/062f5ec90a",
            id: 26
        }, {
            title: "crypto 8",
            url: "Challenges/Cryptography/4c8549c7f1",
            id: 27
        }, {
            title: "crypto 9",
            url: "Challenges/Cryptography/ec7ff827de",
            id: 28
        },{
            title: "crypto 10",
            url: "Challenges/Cryptography/9dd93a976f",
            id: 29
        },{
            title: "crypto 11",
            url: "Challenges/Cryptography/2adz3sf23",
            id: 30
        }];
        var i = 120;
        for(var r = 0; r < list.length; r++){
            pos = list[r];
            this.createImage(i, 460, "assets/game/sprites/chall_demon.gif", pos.title, pos.id);
            OBJECT.addOther(i - 25, 460, pos.title, pos.url, pos.id);
            i += 80;
        }
    };

this.recon = function() {
        var list = [{
            title: "Recon 1",
            url: "Challenges/Recon/5aa2c83b82",
            id: 90
        }, {
            title: "Recon 2",
            url: "Challenges/Recon/3811541f9d",
            id: 91
        }, {
            title: "Recon 3",
            url: "Challenges/Recon/7179ad9265",
            id: 92
        }, {
            title: "Recon 4",
            url: "Challenges/Recon/f100b4df19",
            id: 93
        }, {
            title: "Recon 5",
            url: "Challenges/Recon/69317dd56e",
            id: 94
        }, {
            title: "Recon 6",
            url: "Challenges/Recon/6bb532ea85",
            id: 95
        }, {
            title: "Recon 7",
            url: "Challenges/Recon/dd70dc5838",
            id: 96
        }, {
            title: "Recon 8",
            url: "Challenges/Recon/716e5c0673",
            id: 97
        }, {
            title: "Recon 9",
            url: "Challenges/Recon/675a85fc0b",
            id: 98
        },{
            title: "Recon 10",
            url: "Challenges/Recon/8c4e90cc5c",
            id: 99
        },{
            title: "Recon 11",
            url: "Challenges/Recon/a4b2c6df4d",
            id: 100
        }];
        var i = 140;
        for(var r = 0; r < list.length; r++){
            pos = list[r];
            this.createImage(i, 320, "assets/game/sprites/chall_milla.gif", pos.title, pos.id);
            OBJECT.addOther(i - 25, 320, pos.title, pos.url,pos.id);
            i += 80;
        }
    };

    this.init = function(){
      this.basic();
      this.captcha();
      this.realistic();
      this.reversing();
      this.trivia();
      this.crypto();
      this.recon();
      return this;
    };
    this.init();
};

function deleter(){
	$.get("Game/get_solved",function(data){
		if(data != ""){
			try{
				str = data.split(",");
				str.forEach(function(i,e){
					$("#"+i).remove();
				});
			}catch(e){
				console.log(e);
			}
		}
	});
}
$(document).ready(function(){
	deleter();
	setInterval('deleter()',3000);
});
