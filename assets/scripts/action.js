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
    this.triggerChall = function(){
        for(var i = 0; i< OBJECT.others.length; i++){
          challenge = OBJECT.others[i];
          if(PLAYER.x >= challenge.x
             && PLAYER.x <= challenge.w
             && PLAYER.y >= challenge.y
             && PLAYER.y <= challenge.h){
             alert(challenge.title);
             break;
          }
        };
    };

    this.init();
};
