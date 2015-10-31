/**
 * Created by Leo on 2015/10/24.
 */
var GameScene = cc.Scene.extend({

    bgLayer : null,
    player : null,
    ctor : function(){
        this._super()


        var size = cc.winSize

        var _this = this




        var scene = flax.assetsManager.createDisplay(res.gs_scene,'scene')
        this.addChild(scene)

        this.bgLayer = scene.bgLayer
        this.player = new Player(this.bgLayer.player)

        this.barricade = new Barricade(this.bgLayer.enemyLayer)


        this.showGuide()

        this.gameOver = new OverScene()





        return true
    },


    update : function(dt){
        this.__moveScene()
        this.__checkCollision()

        this.barricade.run(dt)
    },

    __checkCollision : function(){
        var arr = this.barricade.collisions
        var player = this.player.getCollision()
        var item
        for(var i = 0; i < arr.length; i++){
            item = arr[i]
            if(lc.collision.d2d(player,item.collision)){
                i = 100
                this.barricade.dispose()
                this.player.showDie()
               // this.showGameOver()
            }
        }
        arr = this.barricade.pumpkins
        for(var i = arr.length-1; i >= 0; i--){
            item = arr[i]
            if(lc.collision.d2d(player,item)){
                arr.splice(i,1)
                g.local_score+=10
                var point = item.getPosition()
                this.barricade.showBom(point)
                item.removeFromParent(true)
            }
        }


    },

   __moveScene : function(){
       var point = this.player.getWorldPosition()
       if(point.y > 400){
           if(this.bgLayer.y>-398){
               var _y = point.y-400
               this.bgLayer.y -= _y
               //this.bgLayer.enemyLayer.y += _y
           }
       }
   },

    start : function(){


        this.____sl()

    },

    showGuide : function(){
        lcocos.fetchUserData()
        //lcocos.userData.hasGuide = null
        if(lcocos.userData.hasGuide){
           this.start()
            return
        }else{
            lcocos.userData.hasGuide = true
            lcocos.saveUserData()

            this.guide = new Guide()
            this.addChild(this.guide,12)
            this.guide.y = 600
            this.guide.runAction(
                cc.moveBy(0.2,cc.p(0,-600))
            )
        }
    },

    showGameOver : function(){
        if(!lc.isDebug){
            ggay()
        }
        this.unscheduleUpdate()
        this.gameOver.y = 600
        this.addChild(this.gameOver,13)
        this.gameOver.runAction(
            cc.moveBy(0.2,cc.p(0,-600))
        )
        this.gameOver.setLocalScore(g.local_score)
        lcocos.fetchUserData()
        if(!lcocos.userData.score){
            lcocos.userData.score = 0
        }
        if(lcocos.userData.score < g.local_score){
            lcocos.userData.score = g.local_score
        }
        lcocos.saveUserData()
        this.gameOver.setBestScore(lcocos.userData.score)
        //this.player.pause()
        //this.bear.stop()
        //this.stop()
        //this.barricade.stop()

        g.local_score = 0
        //this._m.setString(g.local_score)
        this.____clear()
    },

    ____sl : function(){
        var size = cc.winSize
        if(!this.levelLabel){
            this.levelLabel = new cc.LabelTTF("","Arail",60)
        }
        if(!this.levelLabel.parent){
            this.addChild(this.levelLabel)
        }
        this.levelLabel.visible = true
        this.levelLabel.setPosition(cc.p(size.width/2,size.height-280))
        this.levelLabel.setString("Level : " + g.level)
        this.levelLabel.setColor(cc.color(235,242,9,255))

        this.scheduleOnce(function(){
           this.levelLabel.visible = false
            this.scheduleUpdate()

            var _this = this
            var beganPoint = null
            var listener = lcocos.event.getListener(
                // began handler
                function(touch,event){
                    beganPoint = touch.getLocation()
                    var point = _this.player.getPosition()
                    if(!_this.player.isRunning){
                        if(point.x < 240){
                            _this.player.move('right')
                        }else{
                            _this.player.move('left')
                        }
                    }
                },
                // move handler
                function(touch,event){},
                // ended handler
                function(touch,event){

                }
            )
            cc.eventManager.addListener(listener, this);

        },2)
    },

    ____clear : function(){
        this.barricade.dispose()
    }
})