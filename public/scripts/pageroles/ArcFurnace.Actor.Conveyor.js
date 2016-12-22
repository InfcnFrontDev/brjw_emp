/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Conveyor = fabric.util.createClass(ActorsBase, {
    //  传送带（Conveyor）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 12.8,   //used by actors，宽高比为100:20；等比变换
            Width: 64   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        //        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

        //original shape outline
        //         var rect0 = new fabric.Rect({
        //             left: 0,
        //             top: 0,
        //             height: iheight,
        //             width: iwidth,
        //             fill: 'yellow',
        //             opacity: 0.3,
        //             visible: true,
        //             hasBorders: false,
        //             originX: 'center',
        //             originY: 'center'
        //         });
        //         this.topgroup.addWithUpdate(rect0);
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
        fabric.Image.fromURL('../Scripts/PageRoles/Resources/履带.png',
            function (img) {
                img.set({
                    left: 0,
                    top: 0,
                    width: iwidth,
                    height: iheight,
                    hasBorders: false,
                    originX: 'center',
                    originY: 'center'
                });
                group1.addWithUpdate(img);
            });

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //无刷新
        this.setOption(options);


        this._renderRefresh();
    },

    toString: function () {
        return '  传送带（Conveyor）';
    }
});



