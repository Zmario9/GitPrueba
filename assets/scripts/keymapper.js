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
