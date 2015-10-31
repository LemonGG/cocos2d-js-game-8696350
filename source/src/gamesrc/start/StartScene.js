/**
 * Created by Leo on 2015/10/24.
 */
var StartScene = lcocos.model.BaseStartScene.extend({
    ctor : function(){
        this._super()

        if(!lc.isDebug){
            ggax()
        }
        var size = cc.winSize

        this.res_bg = res.ss_bg
        this.res_play = res.ss_play
        this.call_play = function(){
            flax.replaceScene("gs");
        }
        this.render()
        return true
    }
})