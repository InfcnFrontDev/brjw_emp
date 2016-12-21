/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.WireSyphon = fabric.util.createClass(ActorsBase, {
    //   电线拐角（WireSyphon）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY,Diameter) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，
            Width: 64,   //used by actors   
            Diameter: Diameter,
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
        var polyPoints = [
           { x: 0, y: 0 },
           { x: idiameter, y: 0 },
           { x: idiameter, y: iheight - idiameter+1 },
           { x: 0+1 , y: iheight },
           { x: 0 , y: iheight },
//           { x: 0, y:0}
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: -iwidth / 2,
            top: -iheight / 2,   //manually adjusted   
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        polygon1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'
            }
        });
        this.refreshObjs.push(polygon1);
        this.group.addWithUpdate(polygon1);
        this._addToShape(polygon1);

        var polyPoints = [
           { x: 0, y: iheight },
           { x: idiameter, y: iheight-idiameter},
           { x: iwidth, y: iheight - idiameter },
           { x: iwidth, y: iheight },
           { x: 0, y: iheight }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: -iwidth / 2,
            top: iheight/2 -idiameter ,   //manually adjusted   
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        polygon1.setGradient('fill', {
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
        this.refreshObjs.push(polygon1);
        this.group.addWithUpdate(polygon1);
        this._addToShape(polygon1);

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var idiameter = this.option.Diameter;
        var obj = this.refreshObjs[0];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'
            }
        });
        var obj = this.refreshObjs[1];
        obj.setGradient('fill', {
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
        this._renderRefresh();
    },

    toString: function () {
        return ' 电线拐角（Wire）';
    }
});



