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
