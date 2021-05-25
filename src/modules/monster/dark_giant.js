var DarkGiant = Monster.extend({
    ctor:function(){
        this._super();
        this.speed = 100;
        this.moveDown = cc.p(0, -this.speed);
        this.moveRight = cc.p(this.speed, 0);
        getImagesPath(this.imageDownQueue, 0, 13, "res/monster/dark_giant/monster_dark_giant_run_00");
        getImagesPath(this.imageRightQueue, 28, 41, "res/monster/dark_giant/monster_dark_giant_run_00");
    },
});