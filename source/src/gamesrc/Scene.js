/**
 * Created by Leo on 2015/10/27.
 */



// ��ʼ -- ��Ϸ�� -- ���� ȫ��������һ���������棬 ��������һ����


var Scene = cc.Scene.extend({

    start : null,
    game : null,

    ctor : function(){
        this._super()

        // game
        this.game = new GameScene()
        this.addChild(this.game)

        // start
        this.start = new StartScene()
        this.addChild(this.start)

        // over
        //var over = new OverScene()
        //this.addChild(over)

        return true
    }
})