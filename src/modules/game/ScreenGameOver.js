var ScreenGameOver = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    infoText: null,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();
        var bg = new cc.Sprite(res.BG)
        bg.setScale(size.width/bg.getContentSize().width, size.height/bg.getContentSize().height);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var monsters = new cc.Sprite(res.TEXT);
        monsters.setScale(0.4, 0.4);
        monsters.setPosition(size.width/2, 3*size.height/5 - 50);
        this.addChild(monsters);

        var emotion = ["Wow!", "Amazing!", "Good job!"];
        this.infoText = gv.commonButton()
        var score = new cc.LabelTTF(emotion[Math.floor(Math.random() * 3)] + " Your score is " + LAST_SCORE, "", 30);
        score.setFontFillColor(new cc.Color(0,0,0));
        score.setPosition(size.width/2, 2*size.height/8);
        this.addChild(score);

        var btnNewGame = gv.commonButton(200, 64, size.width/2, size.height/8,"Play Again");
        this.addChild(btnNewGame);
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));

    },
    onEnter:function(){
        this._super();
    },
    onSelectNewGame:function(sender)
    {
        fr.view(ScreenMonster);
    },

});