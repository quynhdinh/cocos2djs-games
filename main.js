
var gv = gv || {};
var scene;
var DESIGN_RESOLUTION_WIDTH = 1136;
var DESIGN_RESOLUTION_HEIGHT = 640;
cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets(), true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
    cc.loader.resPath = "res";
    cc.LoaderScene.preload(g_resources, function () {
        //hide fps
        cc.director.setDisplayStats(true);
        // Setup the resolution policy and design resolution size
        var frameSize = cc.view.getFrameSize();
        var ratio = frameSize.width/frameSize.height;
        if(ratio < 2){
            cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
        }else{
            cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_WIDTH/2, cc.ResolutionPolicy.SHOW_ALL);
        }

        cc.view.setDesignResolutionSize( 650, 650, cc.ResolutionPolicy.SHOW_ALL);

        cc.view.resizeWithBrowserSize(true);

        var scene = new cc.Scene();
        scene.addChild(new MenuMonster());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }, this);
};

LAST_SCORE = null;

cc.game.run();