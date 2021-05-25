var SnakeNode = cc.Sprite.extend({
    frontNode: null,
    nextDirection: 0,
    direction: 0,

    ctor: function (frontNode, direction) {
        this._super();
        this.frontNode = frontNode;
        this.direction = direction;
        this.nextDirection = direction;
    },
    onEnter: function () {
        this._super();

        if (this.frontNode == null) {
            // Snake head
            this.setHeadTextTure(this.direction);
        } else {
            // Snake body
            this.setTexture(res.NODE);

            var frontX = this.frontNode.getPositionX();
            var frontY = this.frontNode.getPositionY();
            var frontWidth = this.frontNode.width;
            var frontHeight = this.frontNode.height;
            var width = this.width;
            var height = this.height;

            switch (this.frontNode.direction) {
                case 1: // LEFT
                    this.setPosition(frontX + frontWidth / 2 + width / 2 + 1, frontY);
                    break;
                case 2: // UP
                    this.setPosition(frontX, frontY - frontHeight / 2 - height / 2 - 1);
                    break;
                case 3: // RIGHT
                    this.setPosition(frontX - frontWidth / 2 - width / 2 - 1, frontY);
                    break;
                case 4: // DOWN
                    this.setPosition(frontX, frontY + frontHeight / 2 + height / 2 + 1);
                    break;
            }
        }
    },
    move: function(layer) {
        var dir;
        if(this.frontNode == null)
            dir = this.nextDirection;
        else
            this.nextDirection = dir = this.frontNode.direction;

        // Moving
        switch(dir) {
            case 1: // LEFT
                this.setPosition(this.getPositionX() - Constants.speed, this.getPositionY());
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(-Constants.speed, 0), 0))
                break;
            case 2: // UP
                this.setPosition(this.getPositionX(), this.getPositionY() + Constants.speed);
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(0, Constants.speed), 0))
                break;
            case 3: // RIGHT
                this.setPosition(this.getPositionX() + Constants.speed, this.getPositionY());
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(Constants.speed, 0), 0))
                break;
            case 4: // DOWN
                this.setPosition(this.getPositionX(), this.getPositionY() - Constants.speed);
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(0, -Constants.speed), 0))
                break;
        }

        if(this.frontNode == null) {
            // Update head texture
            this.setHeadTextTure(this.nextDirection);

            // Check invalid move
            var size = cc.director.getVisibleSize();
            if ((this.getPositionX() > size.width - this.width / 2)
                || (this.getPositionX() < this.width / 2)
                || (this.getPositionY() > size.height - this.height / 2)
                || (this.getPositionY() < this.height / 2)) {
                cc.log("game over");
                return false;
            }
            for (var idx in layer.nodes) {
                if (layer.nodes[idx] != this && cc.rectIntersectsRect(this.getBoundingBox(), layer.nodes[idx].getBoundingBox())) {
                    cc.log("game over");
                    return false;
                }
            }

            // Eating
            var bean = layer.bean
            if (bean != null) {
                if (cc.rectIntersectsRect(this.getBoundingBox(), bean.getBoundingBox())) {
                    bean.runAction(
                        cc.sequence(cc.spawn(
                            cc.scaleTo(0.2, 3),
                            cc.fadeOut(0.2)
                        ), cc.callFunc(function (bean) {
                            bean.removeFromParent();
                        }, bean))
                    );

                    layer.bean = null;
                    layer.grow = true;

                    // Update score
                    layer.score.setString("" + (Number(layer.score.getString()) +  1));
                    layer.score.runAction(cc.sequence(cc.scaleTo(0.1, 2), cc.scaleTo(0.1, 0.5), cc.scaleTo(0.1, 1)));
                }
            }
        }

        return true;
    },
    setHeadTextTure: function(dir) {
        switch (dir) {
            case 1:
                this.setTexture(res.HEAD_LEFT);
                break;
            case 2:
                this.setTexture(res.HEAD_UP);
                break;
            case 3:
                this.setTexture(res.HEAD_RIGHT);
                break;
            case 4:
                this.setTexture(res.HEAD_DOWN);
                break;
        }
    }
});