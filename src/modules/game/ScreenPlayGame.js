var ScreenPlayGame = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    INIT_LEN: null, // Snake len at start
    nodes: [], // Snake body
    tail: null, // Snake tail
    grow: null, // Flag to increase len
    bean: null, // Food
    score: null,

    ctor:function() {
        this._super();
        this.INIT_LEN = 3,
        this.nodes = [];
        this.tail = null;
        this.grow = false;
        this.bean = null;
        this.score = null;
    },
    onEnter:function(){
        this._super();
        var size = cc.director.getVisibleSize();

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.keypressed
        }, this);

        // Init snake
        var head = new SnakeNode(null, 3);
        head.setPosition(size.width/2, size.height/2);
        this.addChild(head);
        this.nodes.push(head);
        head.setTag(1); // Mark head
        this.tail = head;
        for (var i = 0; i < this.INIT_LEN; i++) {
            var node = new SnakeNode(this.tail, this.tail.direction);
            this.addChild(node);
            this.nodes.push(node);
            this.tail = node;
        }

        this.schedule(this.moveSnake, Constants.frequency);
        this.schedule(this.updateBean);

        // Score
        var scoreName = new cc.LabelTTF("Score", "", 30);
        scoreName.setPosition(scoreName.width / 2 + 10, cc.winSize.height - scoreName.height - 5);
        this.addChild(scoreName);
        this.score = new cc.LabelTTF("0", "", 30);
        this.score.setPosition(scoreName.getPositionX() + scoreName.width / 2 + 20, scoreName.getPositionY());
        this.addChild(this.score);
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
    keypressed: function(keyCode, event) {
        if(keyCode < 37 || keyCode > 40)
            return;
        var head = event.getCurrentTarget().getChildByTag(1);
        // key => keyCode => dir
        // (L - U - R - D) => (37 - 38 - 39 - 40) => (1 - 2 - 3 - 4)
        var dir = keyCode - 36;
        // 1 >< 3, 2 >< 4
        if(dir % 2 != head.nextDirection % 2)
            head.nextDirection = dir;
    },
    moveSnake: function() {
        // Move
        for(var idx in this.nodes) {
            if(!this.nodes[idx].move(this)) {
                this.unschedule(this.moveSnake);
                this.unschedule(this.updateBean());

                LAST_SCORE = this.score.getString();

                // Game over screen
                fr.view(ScreenGameOver, 2);
            }
        }

        // Forward direction
        for(var idx in this.nodes)
            this.nodes[idx].direction = this.nodes[idx].nextDirection;

        if(this.grow) {
            var node = new SnakeNode(this.tail, this.tail.direction);
            this.addChild(node);
            this.nodes.push(node);
            this.tail = node;
            this.grow = false;
        }
    },
    updateBean: function() {
        if(this.bean == null) {
            this.bean = new cc.Sprite(res.BEAN);
            var randomX = Math.random() * (cc.winSize.width - this.bean.width);
            var randomY = Math.random() * (cc.winSize.height - this.bean.height);
            this.bean.setPosition(randomX, randomY);
            this.addChild(this.bean);
        }
    }
});