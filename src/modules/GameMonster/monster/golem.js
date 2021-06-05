var Golem = Monster.extend({
    ctor:function(){
        this._super();
        this.speed = 70;
        getImagesPath(this.imageDownQueue, 0, 19, "res/monster/golem/monster_golem_run_00");
        getImagesPath(this.imageRightQueue, 40, 59, "res/monster/golem/monster_golem_run_00");
    },
});