var BallNode = cc.Sprite.extend({
    //speed: 5,
    ctor: function (){
        this._super();
        this.vector = cc.p(200, 300);
        this.setTexture(res.BALL);
    },


    RectCircleColliding: function(circle,rect){ // circle(x, y, r), rect(x, y, w, h)
        var distX = Math.abs(circle.x - rect.x-rect.width/2);
        var distY = Math.abs(circle.y - rect.y-rect.height/2);

        if (distX > (rect.width/2 + circle.r)) { return false; }
        if (distY > (rect.height/2 + circle.r)) { return false; }

        if (distX <= (rect.width/2)) { return [true, 0]; }
        if (distY <= (rect.height/2)) { return [true, 1]; }

        var dx=distX-rect.width/2;
        var dy=distY-rect.height/2;
        return [(dx*dx+dy*dy<=(circle.r*circle.r)), 2];
    },

    checkCollision: function (rect){
        var isCollision = false;
        var circle = {
            x: this.getPositionX(),
            y: this.getPositionY(),
            r: this.getBoundingBox().width / 2,
        }
        var res = this.RectCircleColliding(circle, rect);
        var isCollision = res[0];
        var type = res[1]; // type 0, collide a horizontal edges, 1: collide a vertical edge, 2: collide a vertice of the rect
        if(isCollision){
            var newVector;
            if(type == 0){
                newVector = cc.p(this.vector.x, -this.vector.y);
            } else if(type == 1){
                newVector = cc.p(-this.vector.x, this.vector.y);
            } else{
                newVector = cc.p(-this.vector.x, -this.vector.y);
            }
            this.vector = newVector;
        }
        return isCollision;
    },

    bounceWall: function(){
        cc.log("bounce wall");
        this.vector = cc.p(-this.vector.x, this.vector.y);
    },
    bounceCeiling: function(){
        cc.log("bounce ceiling")
        this.vector = cc.p(this.vector.x, -this.vector.y);
    },

    move: function(dt){
        this.setPosition(this.getPositionX() + this.vector.x * dt, this.getPositionY() + this.vector.y * dt);
    },

});