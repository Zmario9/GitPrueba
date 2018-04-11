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
