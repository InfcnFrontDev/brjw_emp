/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Wire = fabric.util.createClass(ActorsBase, {
    //   电线（Wire）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 6.4,   //used by actors，
            Width: 64,   //used by actors   
            Diameter: 10,
            WireColor: 'red'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var idiameter = this.option.Diameter;
        //original shape outline
        var rect0 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'yellow',
            opacity: 0.3,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.topgroup.addWithUpdate(rect0);
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
            left: 0,
            top: -iheight / 2,
            height: idiameter,
            width: iwidth,
            //            stroke: 'green',
            fill: null,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        rect.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: idiameter,
            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'
            }
        });
        this.refreshObjs.push(rect);
        this.group.addWithUpdate(rect);
        this._addToShape(rect);

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //
        this.setOption(options);
        var rect = this.refreshObjs[0];
        rect.setHeight(this.option.Diameter);
        rect.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: this.option.Diameter,
            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'
            }
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 电线（Wire）';
    }
});



