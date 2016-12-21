/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Boiler = fabric.util.createClass(ActorsBase, {
    //  锅炉（Boiler）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为105:156；等比变换
            Width: 43.0769234   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
//        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
     //   this.canvas.renderAll();
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
        var canobj = this.canvas;
        fabric.Image.fromURL('../Scripts/PageRoles/Resources/锅炉.png',
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
               // canobj.renderAll();
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
        return ' 锅炉（Boiler）';
    }
});



