function Queue(){
    var a=[], b=0;
    this.getLength=function(){
        return a.length-b
    };
    this.isEmpty=function(){
        return 0==a.length
    };
    this.enqueue=function(b){
        a.push(b)
    };
    this.dequeue=function(){
        if(0!=a.length){
            var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c
        }
    };
    this.peek=function(){
        return 0<a.length?a[b]:void 0
    }
};


function getImagesPath(queue, from, to, prefix){
    for(var i = from; i <= to; i++){
        var str = prefix + (i < 10 ? "0" : "" ) + i.toString() + ".png";
        queue.enqueue(str);
    }
};

function getRandomInt (min, max, x) {
    let exclusions = [];
    if(x == -1) return Math.floor(Math.random() * (max - min + 1) + min);
    for(let i = -1; i <= 1; i++){
        let x2 = x + i;
        if(x2 >= 0 && x2 < 7)
            exclusions.push(x2)
    }
    let get;
    while(true){
        get = Math.floor(Math.random() * (max - min + 1) + min);
        var ok = true;
        for(let x of exclusions){
            if(x == get){
                ok = false; break;
            }
        }
        if(ok) break;
    }
    return get;
}