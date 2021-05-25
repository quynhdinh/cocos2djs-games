var BrickNode = cc.Sprite.extend({

    ctor: function (){
        this._super();
        this.setTexture(res.BRICK);
    },
});