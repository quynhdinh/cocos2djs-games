const LAND = 0;
const TREE = 1;
const ROCK = 2;

var ScreenMonster = cc.Layer.extend({
    score: 0,
    direction: null,
    scoreLabel: null,
    dx: [1, 0, -1, 0],
    dy: [0, 1, 0, -1],
    screenWidth: 539,
    roadMap: null,
    road: null,
    cellSize: 77,

    steps: "",


    ctor:function() {
        this._super();

        this.positions = new Map(); // map (i,j) to real positions
        this.monsters = new Map(); // map (i, j) to a Monster
        this.obstacles = new Map(); // map (i, j) to type of obstacle: 1: TREE, 2: ROCK
        //
        this.baddies = new Array();

        var size = cc.director.getVisibleSize();
        var bg = new cc.Sprite(res.BG);
        bg.setScale(size.width/bg.getContentSize().width, size.height/bg.getContentSize().height);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);
        //
        this.layoutMap();
        this.addRocksAndTrees();
        cc.log(this.positions.get("0,0"));

        this.road = this.findPath(0,0);

        this.screenWidth = cc.winSize.width;
        this.screenHeight = cc.winSize.height;

        this.baddies.push(new Giant());
        this.baddies.push(new DarkGiant());
        this.baddies.push(new Golem());
        this.baddies[0].setPosition(this.positions.get("0,0")[0], this.positions.get("0,0")[1]);
        this.baddies[1].setPosition(this.positions.get("0,0")[0], this.positions.get("0,0")[1]);
        this.baddies[2].setPosition(this.positions.get("0,0")[0], this.positions.get("0,0")[1]);

        this.addChild(this.baddies[0]);
        this.addChild(this.baddies[1]);
        this.addChild(this.baddies[2]);


        let backButton = gv.commonButton(100, 32, this.screenWidth - 70, 20, "Back");
        this.addChild(backButton);
        backButton.addClickEventListener(this.onBackButton.bind(this));
        this.scheduleUpdate();
    },

    layoutMap: function(){
        let tmpCell = new cc.Sprite(res.CELL);
        let width = tmpCell.getBoundingBox().width * 7;
        let halfCellWidth = tmpCell.getBoundingBox().width / 2;
        let diffXCell = tmpCell.getBoundingBox().width;
        let diffYCell = tmpCell.getBoundingBox().height;
        let startX = 135.5 - halfCellWidth;
        let startY = cc.winSize.height - 80;
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 7; j++){
                let cell = new cc.Sprite(res.CELL);
                cell.setPosition(startX, startY);
                this.positions.set([i,j].toString(), [startX,startY]);
                if(startX + diffXCell + halfCellWidth >= cc.winSize.width){
                    startY -= diffXCell;
                    startX = 20;
                }
                startX += diffXCell;
                this.addChild(cell);
            }
        }
    },

    findPath: function(x, y){
        let queue = new Queue();
        let visited = new Array(7);
        for(let i = 0; i < 7; i++){
            visited[i] = Array(7);
        }
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 7; j++){
                visited[i][j] = false;
            }
        }
        visited[0][0] =true;
        queue.enqueue([x, y]);
        let path = new Map();

        while(!queue.isEmpty()){
            let fr = queue.dequeue();
            for(let dir = 0; dir < 4; dir++){
                let x2 = this.dx[dir] + fr[0];
                let y2 = this.dy[dir] + fr[1];
                if(x2 >= 0 && y2 >= 0 && x2 < 7 && y2 < 7 && visited[x2][y2] == false && !this.obstacles.has([x2,y2].toString())) {
                    queue.enqueue([x2, y2]);
                    visited[x2][y2] = true;
                    path.set([x2,y2].toString(), [fr[0],fr[1]].toString());
                }
            }
        }
        let res = new Array();
        let st = "6,6";
        res.push(st);
        while(path.has(st)){
            st = path.get(st);
            res.push(st);
        }
        res.reverse();
        var ans = new Array();
        for(let each of res)
            ans.push([each[0] - '0', each[2] - '0']);
        for(let i = 1; i < ans.length; i++){
            if(ans[i][0] > ans[i - 1][0]){
                this.steps += 'D';
            } else this.steps += 'R';
        }
        //cc.log(this.steps);
        return ans;
    },

    onBackButton: function(sender){
        fr.view(ScreenMenu);
    },

    update: function(dt){
        this.baddies[0].move(dt, this.steps);
        this.baddies[1].move(dt, this.steps);
        this.baddies[2].move(dt, this.steps);
    },



    addRocksAndTrees: function(){
        const numberOfObstacles = 7;
        let posY;
        for(let posX = 0; posX < numberOfObstacles; posX++){
            var obstacleType = getRandomInt(1, 2); // 1, tree, 2: rock
            if(posX == 0){
                posY = getRandomInt(1, 6, -1);
            }
            else if(posX == 6){
                posY = getRandomInt(0, 5, posY);
            } else posY = getRandomInt(0, 6, posY);
            let obstacle;
            if(obstacleType == 1){
                obstacle = new cc.Sprite(res.TREE);
            }
            else obstacle = new cc.Sprite(res.ROCK);
            let realPosition = this.positions.get([posX,posY].toString());
            obstacle.setPosition(realPosition[0], realPosition[1] + 5);
            this.obstacles.set([posX, posY].toString(), obstacleType);
            this.addChild(obstacle);
        }
    },
});