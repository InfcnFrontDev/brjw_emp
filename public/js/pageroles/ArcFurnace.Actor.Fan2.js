/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Fan2 = fabric.util.createClass(ActorsBase, {
    //  风机状态 Fan2
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            FanState:true,
            Height: 64,   //used by actors，宽高比为50:70；等比变换
            Width: 45.7142868   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.str = '运行';            //状态文字 true
        this.textcolor = 'green';      //状态文字颜色  true
        //this.FanState = true;       //运行状态    true;false
        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
        //this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

        //original shape outline
//        var rect0 = new fabric.Rect({
//            left: 0,
//            top: 0,
//            height: iheight,
//            width: iwidth,
//            fill: 'yellow',
//            opacity: 0.3,
//            visible: true,
//            hasBorders: false,
//            originX: 'center',
//            originY: 'center'
//        });
//        this.topgroup.addWithUpdate(rect0);
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            stroke: 'green',
            fill: null,
            opacity: 0.1,             //don't work when added to group
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        // shape body
        var group1 = this.group;
        fabric.Image.fromURL('../Scripts/PageRoles/Resources/fenClose.png',
            function (img) {
                img.set({
                    left: 0,
                    top: -iheight / 2,
                    width: iwidth,
                    height:iheight*3/4,
                    hasBorders: false,
                    originX: 'center',
                    originY: 'top'
                });
                group1.addWithUpdate(img);
                //this.canvas.renderAll();
            });

        //状态文字
        var text1 = new fabric.Text(this.str, {
            left: 0,
            top: iheight / 2,
            hasBorders: false,
            fontSize: 14,
            fontFamily: 'GenericSansSerif',
            fill: this.textcolor,
            originX: 'center',
            originY: 'bottom'
        });
        this.refreshObjs.push(text1);
        this.group.addWithUpdate(text1);


        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //根据运行状态刷新
        this.setOption(options);
        if (this.option.FanState) {
            this.str = '运行';
            this.textcolor = 'green';
        } else {
            this.str = '停止';
            this.textcolor = 'red';            
        }

        var text = this.refreshObjs[0];          //文字
        text.initialize(this.str, { fill: this.textcolor });

        this._renderRefresh();
    },

    toString: function () {
        return ' 风机状态（Fan2）';
    }
});



