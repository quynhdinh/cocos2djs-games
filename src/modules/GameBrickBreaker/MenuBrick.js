var MenuBrick = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var bg = new cc.Sprite(res.BACK_GROUND);
        bg.setScale(size.width/bg.getContentSize().width, size.height/bg.getContentSize().height);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var snake = new cc.Sprite(res.FRONT_TEXT);
        snake.setScale(0.5, 0.5);
        snake.setPosition(size.width/2, 3*size.height/5);
        this.addChild(snake);
        var btnNewGame = gv.commonButton(200, 64, size.width/2, 2*size.height/10,"Let's Go");
        //var btnNewGame =  cc.Sprite(res.BTN_BRICK);
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));
        this.addChild(btnNewGame);
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));

        var btnBack = gv.commonButton(200, 64, size.width / 2, 2 * size.height / 10 - 80, "Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(function(sender){
            fr.view(MenuMonster);
            }.bind(this));

    },
    onEnter:function(){
        this._super();
    },
    onSelectNewGame:function(sender)
    {
        fr.view(ScreenBrick);
    },

});