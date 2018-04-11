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
    this.addOther = function(x,y,name,value){
       this.others.push({x:x,
                         y:y,
                         w:x+30,
                         h:y+30,
                         title: name,
                         value: value});
    };
    return this;
};
