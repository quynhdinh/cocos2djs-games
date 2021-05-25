var Monster = cc.Sprite.extend({
    ctor: function(){
        this._super();
        this.speed = 0;
        this.moveDown = cc.p(0, -this.speed);
        this.moveRight = cc.p(this.speed, 0);
        this.dir = null;
        this.positionIndex = 1; // position on string DRDRDR
        this.movedDistance = 0; // the distance have moved
        this.imageDownQueue = new Queue(); // a queue of images when monster is moving down.
        this.imageRightQueue = new Queue(); // a queue of images when monster is moving up.
    },

    move: function(dt, steps){
        if(this.positionIndex == 1){
            this.dir = (steps[0] == "D" ? this.moveDown : this.moveRight);
        }
        if(this.getPositionX() >= cc.winSize.width || this.getPositionY() <= 0){
            this.positionIndex = 1;
            this.movedDistance = 0;
            this.setPosition(97, 570);
            this.dir = (steps[0] == "D" ? this.moveDown : this.moveRight);
        }
        this.movedDistance += this.speed * dt;

        let cellTmp = new cc.Sprite(res.CELL);
        let stepSize = cellTmp.getBoundingBox().width;
        if(this.movedDistance >= stepSize){
            if(steps[this.positionIndex] == "D"){
                this.dir = this.moveDown;
            } else{
                this.dir = this.moveRight;
            }
            this.movedDistance = 0;
            this.positionIndex++;
        }
        this.setPosition(this.getPositionX() + this.dir.x * dt, this.getPositionY() + this.dir.y * dt );
        var front;
        if(this.dir == this.moveDown){
            front = this.imageDownQueue.dequeue();
            this.setTexture(front);
            this.imageDownQueue.enqueue(front);
        } else{
            front = this.imageRightQueue.dequeue();
            this.setTexture(front);
            this.imageRightQueue.enqueue(front);
        }
    }
})