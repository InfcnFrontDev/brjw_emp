/**
* Created by ZHAN on 2016/3/8.
*/

var StoreCooling = StoreCooling || {};
// 板式换热器  InterChanger
StoreCooling.InterChanger = fabric.util.createClass(ActorsBase, {
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 32,   //used by actors
            Width: 64,   //used by actors
            FillColor: 'gray',
 
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
//        this.refreshObjs = new Array();     // 刷新对象
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
     //   this.canvas.renderAll();
    },
    // 初始化图元中的各个子图元
    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var iu = iwidth/100;             //长度基本单位,只支持100*200等比缩放

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
            fill: 'gray',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        // 左边上管口
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*1/20,
            top: -iheight/2+iheight/10,
            width: iwidth*1/10,
            height: iheight*1/5,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*1/5,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        // 左边下管口
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*1/20,
            top: -iheight/2+iheight*7/10,
            width: iwidth*1/10,
            height: iheight*1/5,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*1/5,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        // 左档板
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/20+1/10),
            top: -iheight/2,
            width: iwidth*1/10,
            height: iheight,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        // 中间主体
				//主体底色
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(6/20+1/5),
            top: -iheight/2+iheight*1/20,
            width: iwidth*3/5,
            height: iheight*9/10,
            strokeWidth: 0.1,
            fill:'rgb(244,244,244)',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
                //主体上横板
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight/2+iheight*1/20,
            width: iwidth*3/5,
            height: iheight*1/40,
            strokeWidth: 0.1,
            fill:'black',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);
              //主体下横板
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(6/20+1/5),
            top: -iheight/2+iheight*37/40,
            width: iwidth*3/5,
            height: iheight*1/40,
            strokeWidth: 0.1,
            fill:'black',
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
        // 主体身
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+5/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+7/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+9/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+11/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+13/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/40+15/20),
            top: 0,
            width: iwidth*1/20,
            height: iheight*17/20,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        // 右挡板
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*(1/20+8/10),
            top: -iheight/2,
            width: iwidth*1/10,
            height: iheight,
            strokeWidth: 0.1,
            fill:fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);
        // 右边上管口
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*19/20,
            top: -iheight/2+iheight/10,
            width: iwidth*1/10,
            height: iheight*1/5,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*1/5,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        // 右边下管口
        var rect1 = new fabric.Rect({
            left: -iwidth/2+iwidth*19/20,
            top: -iheight/2+iheight*7/10,
            width: iwidth*1/10,
            height: iheight*1/5,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*1/5,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);


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
        return ' 板式换热器  InterChanger ' + this.callSuper('toString');
    }
});



