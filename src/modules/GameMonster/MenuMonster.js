
var MenuMonster = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var bg = new cc.Sprite(res.BG);
        bg.setScale(size.width/bg.getContentSize().width, size.height/bg.getContentSize().height);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var snake = new cc.Sprite(res.TEXT);
        snake.setScale(0.5, 0.5);
        snake.setPosition(size.width/2, 3*size.height/5);
        this.addChild(snake);
        var btnNewGame = gv.commonButton(200, 64, size.width/4, 2*size.height/10,"Let's Go");

        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));
        this.addChild(btnNewGame);
        var btnBrickGame = gv.commonButton(200, 64, 3 * size.width / 4, 2 * size.height / 10 - 80, "Brick Game");
        this.addChild(btnBrickGame);
        btnBrickGame.addClickEventListener(this.onSelectBtnBrickGame.bind(this));
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));

    },
    onSelectBtnBrickGame:function(sender){
        fr.view(MenuBrick);
    },
    onSelectNewGame:function(sender){
        fr.view(ScreenMonster);
    },

});