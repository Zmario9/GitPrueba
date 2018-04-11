var CHALLENGES = function() {
    this.createImage = function(x, y, url, link) {
        this.style = "position: absolute;";
        this.style += "left: " + x + "px;";
        this.style += "top: " + y + "px;";
        var elem = document.createElement("img");
        $(elem).attr("style", this.style);
        $(elem).attr("src", url);
        document.body.appendChild(elem);
    };
    this.basics = function() {
        var list = [{
            title: "Old Games",
            url: "https://google.com?q=Old+Games"
        }];
        var i = 200;
        for(r = 0; r < list.length; r++){
            pos = list[r];
            this.createImage(i, 200, "assets/sprites/chall_wolf.gif", pos.title);
            OBJECT.addOther(i - 25, 200 - 55, pos.title, pos.url);
            i += 100;
        }
    };
    this.init = function(){
      this.basics();
      return this;
    };
    this.init();
};
