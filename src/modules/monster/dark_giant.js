var DarkGiant = Monster.extend({
    ctor:function(){
        this._super();
        this.speed = 100;
        getImagesPath(this.imageDownQueue, 0, 13, "res/monster/dark_giant/monster_dark_giant_run_00");
        getImagesPath(this.imageRightQueue, 28, 41, "res/monster/dark_giant/monster_dark_giant_run_00");
    },
});