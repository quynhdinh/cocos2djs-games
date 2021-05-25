var ScreenBrick = cc.Layer.extend({
    score: 0,
    BRICKS: 56,
    numberOfBricksLeft: null,
    spacing: 5, // spacing between bricks
    direction: null,
    scoreLabel: null,
    ctor:function() {
        this._super();
        this.screenWidth = cc.winSize.width;
        this.screenHeight = cc.winSize.height;

        this.numberOfBricksLeft = this.BRICKS;
        this.bricks = [];
        this.addBricks();

        this.paddle = new PaddleNode();
        this.paddle.setPosition(cc.winSize.width / 2, 50);
        this.addChild(this.paddle);


        this.ball = new BallNode();
        this.ball.setPosition(this.paddle.getPosition().x, this.paddle.getPosition().y + this.paddle.getContentSize().height + 7);
        this.addChild(this.ball);

        this.scoreLabel = new cc.LabelTTF("Score: 0");
        this.scoreLabel.setPosition(this.screenWidth/ 2, this.screenHeight - 30);
        this.addChild(this.scoreLabel);

        let backButton = gv.commonButton(100, 32, this.screenWidth - 70, 20, "Back");
        this.addChild(backButton);
        backButton.addClickEventListener(this.onBackButton.bind(this));

        this.scheduleUpdate();

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                cc.log("key pressed", this.spacing);
                var paddle = this.paddle;
                if(keyCode == cc.KEY.left){
                    this.direction = -1;
                }
                if(keyCode == cc.KEY.right){
                    this.direction = 1;
                }
            }.bind(this),
            onKeyReleased: function(keyCode, event){
                this.direction = 0;
            }.bind(this),
        }, 2);
    },

    onBackButton: function(sender){
        fr.view(ScreenMenu);
    },

    update: function(dt){
        this.ball.move(dt);
        this.paddle.setPositionX(this.paddle.getPositionX() + this.direction * dt * 400);

        for(var i = 0; i < this.bricks.length; i++){
           //cc.log(JSON.stringify(brick.getBoundingBox()));
            var brick = this.bricks[i];
            if(this.ball.checkCollision(brick.getBoundingBox())){
                this.score++;
                brick.setVisible(false);
                this.numberOfBricksLeft--;
                this.bricks.splice(i, 1);
                this.scoreLabel.setString("Score: " + this.score);
            }
        }
        //cc.log(this.bricks.length);

        var ballRadius = this.ball.getBoundingBox().width / 2;
        //if the ball bounce paddle
        if(this.ball.checkCollision(this.paddle.getBoundingBox())){
            this.ball.setPositionY(this.paddle.getPositionY() + this.paddle.getBoundingBox().height / 2 + ballRadius);
            cc.log("collide paddle");
        }

        if(this.paddle.getPositionX() - this.paddle.getBoundingBox().width / 2 <= 0){
            this.paddle.setPositionX(this.paddle.getBoundingBox().width / 2);
        }
        if(this.paddle.getPositionX() + this.paddle.getBoundingBox().width / 2 >= cc.winSize.width){
            this.paddle.setPositionX(this.screenWidth - this.paddle.getBoundingBox().width / 2);
        }

        //if ball bounce wall
        if(this.ball.getPositionX() + ballRadius > this.screenWidth){
            this.ball.setPositionX(this.screenWidth - ballRadius);
            this.ball.bounceWall();
        }
        if(this.ball.getPositionX() - ballRadius < 0){
            this.ball.setPositionX(this.ball.getBoundingBox().width / 2);
            this.ball.bounceWall();
        }
        //if ball bounce celling
        if(this.ball.getPositionY() + ballRadius > cc.winSize.height){
            this.ball.setPositionY(this.screenHeight - ballRadius);
            this.ball.bounceCeiling();
        }

        if(this.score == this.BRICKS){
            cc.log("Winning");
            LAST_SCORE = this.score;
            fr.view(ScreenGameOver);
        }
        //if ball touches ground
        if(this.ball.getPositionY() < 10){
            cc.log("touches ground");
            LAST_SCORE = this.score;
            fr.view(ScreenGameOver);
        }
    },
    addBricks: function(){
        let tmpBrick = new BrickNode();
        let halfBrickWidth = tmpBrick.getBoundingBox().width / 2;
        let diffXBrick = tmpBrick.getBoundingBox().width + this.spacing;
        let diffYBrick = tmpBrick.getBoundingBox().height  + this.spacing;

        let startX = 81;
        let startY = cc.winSize.height - 80;
        for(let i = 0; i < this.BRICKS; i++){
            let brick = new BrickNode();
            brick.setPosition(startX, startY);
            if(startX + diffXBrick + halfBrickWidth >= this.screenWidth){
                startY -= diffYBrick;
                startX = 20;
            }
            startX += diffXBrick;
            this.bricks.push(brick);
            this.addChild(brick);
        }
    },
});