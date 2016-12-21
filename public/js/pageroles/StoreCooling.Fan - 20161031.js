/**
* Created by ZHAN on 2016/3/1.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Fan = fabric.util.createClass(ActorsBase, {
    // 风扇  Fan
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为120:120；等比变换
            Width: 64,   //used by actors   
            FillColor: 'lightgray'
        };
        this.rotatingangle = 0;
        this.anglespan = 15;
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

        //第1部分	中心圆
        var circle = new fabric.Circle({
            left: 0,
            top: 0,
            radius: iwidth / 6,
            strokeWidth: 0.3,
            fill: fillcolor,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });

        this.group.addWithUpdate(circle);
        //        this._addToShape(circle);

        //第2部分	左上叶片
        var polyPoints = [
           { x: iwidth * 2 / 3, y: iheight * 5 / 12 },
           { x: iwidth, y: iheight * 11 / 24 },
           { x: iwidth, y: iheight * 13 / 24 },
           { x: iwidth * 2 / 3, y: iheight * 7 / 12 }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: -iwidth / 3.5,
            top: -iheight / 6,   //manually adjusted   
            hasBorders: false,
            strokeWidth: 0.3,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top',
            angle: -135,
            selectable: true
        });
        this.group.addWithUpdate(polygon1);

        //第3部分	左右叶片
        var polyPoints = [
           { x: iwidth * 1 / 3, y: iheight * 5 / 12 },
           { x: 0, y: iheight * 11 / 24 },
           { x: 0, y: iheight * 13 / 24 },
           { x: iwidth * 1 / 3, y: iheight * 7 / 12 }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: iwidth / 3.5,
            top: -iwidth / 6,   //manually adjusted   
            hasBorders: false,
            strokeWidth: 0.3,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top',
            angle: 135,
            selectable: true
        });
        this.group.addWithUpdate(polygon1);

        //第4部分	左下叶片
        var polyPoints = [
           { x: iwidth * 7 / 12, y: iheight * 2 / 3 },
           { x: iwidth * 13 / 24, y: iheight },
           { x: iwidth * 11 / 24, y: iheight },
           { x: iwidth * 5 / 12, y: iheight * 2 / 3 }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: -iwidth / 9,
            top: iwidth / 9,   //manually adjusted   
            hasBorders: false,
            strokeWidth: 0.3,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top',
            angle: 45,
            selectable: true
        });
        this.group.addWithUpdate(polygon1);

        //第5部分	右下叶片
        var polyPoints = [
           { x: iwidth * 7 / 12, y: iheight * 2 / 3 },
           { x: iwidth * 13 / 24, y: iheight },
           { x: iwidth * 11 / 24, y: iheight },
           { x: iwidth * 5 / 12, y: iheight * 2 / 3 }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: iwidth / 9,
            top: iwidth / 9,   //manually adjusted   
            hasBorders: false,
            strokeWidth: 0.3,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top',
            angle: -45,
            selectable: true
        });
        this.group.addWithUpdate(polygon1);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新旋转anglespan角度
        this.rotatingangle = this.rotatingangle + this.anglespan;
        this.setOption(options);
        this.option.RotateAngle = this.rotatingangle;
        this._renderRefresh();
    },

    toString: function () {
        return ' 风扇 Fan' + this.callSuper('toString');
    }
});



