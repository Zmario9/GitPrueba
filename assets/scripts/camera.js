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
