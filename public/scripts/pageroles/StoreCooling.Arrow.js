/**
* Created by ZHAN on 2016/3/24.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Arrow = fabric.util.createClass(ActorsBase, {
    // 箭头 Arrow
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 42.6666679,   //used by actors，宽高比为6:4；非等比变换
            Width: 64   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.color = 'red';         //箭头颜色
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

        //original shape outline
//                var rect0 = new fabric.Rect({
//                    left: 0,
//                    top: 0,
//                    height: iheight,
//                    width: iwidth,
//                    fill: 'yellow',
//                    opacity: 0.3,
//                    visible: true,
//                    hasBorders: false,
//                    originX: 'center',
//                    originY: 'center'
//                });
//                this.topgroup.addWithUpdate(rect0);
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
        var rect = new fabric.Rect({
            left:-iwidth/4,
            top: 0,
            height: iheight/2,
            width: iwidth/2,
            fill: this.color,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });

        this.refreshObjs.push(rect);
        this.group.addWithUpdate(rect);
        this._addToShape(rect);

        arrow = new fabric.Triangle({
            top: 0,
            left: iheight*3/8,
            width: iheight,
            height: iheight*3/4,
            fill: this.color,
            angle: 90,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.refreshObjs.push(arrow);
        this.group.addWithUpdate(arrow);
        this._addToShape(arrow);

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //无刷新动作
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 箭头 Arrow';
    }
});



