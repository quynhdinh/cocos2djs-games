var Giant = Monster.extend({
    ctor:function(){
        this._super();
        this.speed = 200;
        this.moveDown = cc.p(0, -this.speed);
        this.moveRight = cc.p(this.speed, 0);
        getImagesPath(this.imageDownQueue, 0, 15, "res/monster/giant/monster_giant_run_00");
        getImagesPath(this.imageRightQueue, 32, 47, "res/monster/giant/monster_giant_run_00");
    },
});