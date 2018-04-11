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
