var MAP = function() {
    this.init = function() {
        this.nature = new CUTTER("assets/sprites/game.png");
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
