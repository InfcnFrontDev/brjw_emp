/**
 * Created by ZHAN on 2016/3/1.
 */

var StoreCooling = StoreCooling || {};

StoreCooling.Cross = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY, Diameter) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's default options here
            Height: 64,   //used by actors
            Width: 64,   //used by actors
            Water: '无水', // public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
            FillColor: 'black',
            ArrowColor: "SteelBlue",
            Diameter: 10
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);  //初始化常规参数
        this.option.Diameter = Diameter;            //设置初始直径
        this.refreshObjs = new Array();          //object' array for refresh
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var idiameter = this.option.Diameter;
        switch (this.option.Water) {
            case '热水': fillcolor = "red";
                break;
            case '冷水': fillcolor = "blue";
        }

        //draw image here
        // outline control rect; should be invisible
//        var rect0 = new fabric.Rect({
//            left:0,
//            top:0,
//            height:iheight,
//            width:iwidth,
//            fill:'yellow',
//            opacity: 0.3,
//            visible:true,
//            hasBorders:false,
//            originX: 'center',
//            originY: 'center'
//        });
//        this.topgroup.addWithUpdate(rect0);

        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight-1,
            width: iwidth-1,
            fill: 'green',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        // 画横向管道
        var rect1 = new fabric.Rect({
            left: 0,
            top: -idiameter/2,
            height: idiameter,
            width: iwidth,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: idiameter,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.refreshObjs.push(rect1);
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //画上垂直管道
        var polyPoints = [
           { x: 0, y: 0 },
           { x: idiameter, y: 0 },
           { x: idiameter, y: iheight / 2 - idiameter / 2 },
           { x: idiameter / 2, y: iheight / 2 },
           { x: 0, y: iheight / 2 - idiameter / 2 }
         ];
        var polygon1 = new fabric.Polygon(polyPoints, {
            left: 0,
            top: -iheight / 2 ,   //manually adjusted   
            hasBorders: false,
            originX: 'center',
            originY: 'top'
//            selectable: true
        });
        polygon1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.refreshObjs.push(polygon1);
        this.group.addWithUpdate(polygon1);
        this._addToShape(polygon1);


        //画下垂直管道
        var polyPoints = [
           { x: 0, y: idiameter / 2 },
           { x: idiameter / 2, y: 0 },
           { x: idiameter, y: idiameter / 2 },
           { x: idiameter, y: iheight / 2 },
           { x: 0, y: iheight / 2 }
         ];
        var polygon2 = new fabric.Polygon(polyPoints, {
            left: 0,
            top: 0,   //manually adjusted   about 0.5
            hasBorders: false,
            originX: 'center',
            originY: 'top'
//            selectable: true
        });
        polygon2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.refreshObjs.push(polygon2);
        this.group.addWithUpdate(polygon2);
        this._addToShape(polygon2);

        //set group options
        this._setGroupOptions();
        this._setTopgroupOptions();
        // 添加形状子图元，该图元中心点非外形矩形中心点


        return this.topgroup;

    },

    refresh: function (options) {
        this.setOption(options);
        switch (this.option.Water) {             //设置刷新颜色
            case '热水': fillcolor = "red";
                break;
            case '冷水': fillcolor = "blue";
                break;
            default:
                fillcolor = 'black';
        }
        var obj = this.refreshObjs[0];      //刷新横管道
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: this.option.Diameter,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        obj = this.refreshObjs[1];          // 刷新上垂直管道
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: this.option.Diameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        obj = this.refreshObjs[2];      //刷新下垂直管道
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: this.option.Diameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this._setGroupOptions();
       // this.canvas.renderAll();
        return this.topgroup;
    },

    toString: function () {
        return '十字管道 Cross';
    }
});



