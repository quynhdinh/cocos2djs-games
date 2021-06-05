var ScreenGameOver = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    infoText: null,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();
        var bg = new cc.Sprite(res.BACK_GROUND)
        bg.setScale(size.width/bg.getContentSize().width, size.height/bg.getContentSize().height);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var snake = new cc.Sprite(res.FRONT_TEXT);
        snake.setScale(0.4, 0.4);
        snake.setPosition(size.width/2, 3*size.height/5 + 100);
        this.addChild(snake);

        var emotion = ["Wow!", "Amazing!", "Good job!"];
        this.infoText = gv.commonButton()
        var score = new cc.LabelTTF(emotion[Math.floor(Math.random() * 3)] + " Your score is " + LAST_SCORE, "", 30);
        score.setFontFillColor(new cc.Color(0,0,0));
        score.setPosition(size.width/2, 3*size.height/8);
        this.addChild(score);

        var btnNewGame = gv.commonButton(200, 64, size.width/2, size.height/4,"Play Again");
        this.addChild(btnNewGame);
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));

    },
    onEnter:function(){
        this._super();
    },
    onSelectNewGame:function(sender)
    {
        fr.view(ScreenBrick);
    },

});