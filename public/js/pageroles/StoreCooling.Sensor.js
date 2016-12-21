/**
* Created by ZHAN on 2016/3/1.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Sensor = fabric.util.createClass(ActorsBase, {
    // 传感器  Sensor
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为240:100；等比变换
            Width: 26.666666,   //used by actors   
            FillColor: 'black'
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },
 
    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        //var iunit = iwidth/10;

        //original shape outline
//        var rect0 = new fabric.Rect({
//            left:0,
//            top:0,
//            height:iheight,
//            width:iwidth,
//            fill:'yellow',
//            opacity:0.3,
//            visible:true,
//            hasBorders:false,
//            originX: 'center',
//            originY: 'center'
//        });
//        this.topgroup.addWithUpdate(rect0);

        //draw image here
        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'green',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        //第1部分	主竖管道
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 7 / 24),
            width: iwidth * 1 / 10,
            height: iheight * 17 / 24,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 1 / 10,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //第2部分	主竖管道上1矩形
        var rect2 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 1 / 3),
            width: iwidth * 1 / 5,
            height: iheight * 1 / 24,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 1 / 5,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect2);
        this._addToShape(rect2);

        //第3部分	主竖管道上2矩形
        var rect3 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 95 / 240),
            width: iwidth * 1 / 5,
            height: iheight * 1 / 24,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 1 / 5,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect3);
        this._addToShape(rect3);

        //第4部分	主竖管道上3矩形
        var rect4 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 11 / 24),
            width: iwidth * 1 / 5,
            height: iheight * 1 / 24,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 1 / 5,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect4);
        this._addToShape(rect4);

        //第5部分	横管道
        var rect5 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 1 / 4),
            width: iwidth * 1,
            height: iheight * 1 / 24,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight * 1 / 24,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect5);
        this._addToShape(rect5);

        //第6部分	横矩形
        var rect6 = new fabric.Rect({
            left: 0,
            top: -iheight * (1 / 2 - 5 / 24),
            width: iwidth * 4/5,
            height: iheight * 1 / 12,
            strokeWidth: 0.1,
            fill:'blue',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect6);
        this._addToShape(rect6);

        //第6-7部分	上黑矩形
        var rect67 = new fabric.Rect({
            left: -iwidth * (1 / 2 - 1 / 20 - 9 / 20),
            top: -iheight * (1 / 2-1/24),
            width: iwidth * 5 / 10,
            height: iheight * 1 / 6,
            strokeWidth: 0.1,
            fill: 'black',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect67);
        this._addToShape(rect67);

        //第7部分	左1蓝矩形
        var rect7 = new fabric.Rect({
            left: -iwidth*(1/2-1/20-3/20),
            top: -iheight * (1 / 2 ),
            width: iwidth * 1 / 10,
            height: iheight * 5 / 24,
            strokeWidth: 0.1,
            fill: 'blue',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect7);
        this._addToShape(rect7);

        //第9部分	左2蓝矩形
        var rect9 = new fabric.Rect({
            left: -iwidth * (1 / 2 - 1 / 20 - 7 / 20),
            top: -iheight * (1 / 2),
            width: iwidth * 1 / 10,
            height: iheight * 5 / 24,
            strokeWidth: 0.1,
            fill: 'blue',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect9);
        this._addToShape(rect9);

        //第11部分	左3蓝矩形
        var rect11 = new fabric.Rect({
            left: -iwidth * (1 / 2 - 1 / 20 - 11 / 20),
            top: -iheight * (1 / 2),
            width: iwidth * 1 / 10,
            height: iheight * 5 / 24,
            strokeWidth: 0.1,
            fill: 'blue',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect11);
        this._addToShape(rect11);

        //第13部分	左4蓝矩形
        var rect13 = new fabric.Rect({
            left: -iwidth * (1 / 2 - 1 / 20 - 15 / 20),
            top: -iheight * (1 / 2),
            width: iwidth * 1 / 10,
            height: iheight * 5 / 24,
            strokeWidth: 0.1,
            fill: 'blue',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect13);
        this._addToShape(rect13);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {
        this.setOption(options);
        this._renderRefresh();
    },

    toString: function () {
        return ' 传感器 Sensor' + this.callSuper('toString');
    }
});



