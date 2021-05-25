var Giant = Monster.extend({
    ctor:function(){
        this._super();
        this.speed = 200;
        getImagesPath(this.imageDownQueue, 0, 15, "res/monster/giant/monster_giant_run_00");
        getImagesPath(this.imageRightQueue, 32, 47, "res/monster/giant/monster_giant_run_00");
    },
});