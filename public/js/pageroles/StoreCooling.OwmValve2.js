/**
* Created by ZHAN on 2016/3/10.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.OwmValve2 = fabric.util.createClass(ActorsBase, {
    // 阀门2  OwmValve2
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 51.2,   //used by actors，宽高比为100:80；等比变换
            Width: 64,   //used by actors   
            DataValue: '中间态',  //默认状态‘中间态’； 枚举类型{‘开’，‘关’，‘开到位’，‘关到位’，‘中间态’}；
            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据DataValue值设置
        this.color1 = 'gray';         //阀门颜色
        this.color2 = null;         //状态矩形颜色
        this.pen2 = null;           //状态矩形边框颜色
        this.dataValue = this.option.DataValue;        //阀门状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    //根据DataValue值设置阀门颜色
    _setcolor: function (value) {
        switch (value) {
            case '关':
                this.color1 = 'red';
                this.color2 = null;
                this.pen2 = null;
                break;

            case '关到位':
                this.color1 = 'gray';
                this.color2 = 'red';
                this.pen2 = 'black';
                break;

            case '开':
                this.color1 = 'lime';
                this.color2 = null;
                this.pen2 = null;
                break;

            case '开到位':
                this.color1 = 'gray';
                this.color2 = 'lime';
                this.pen2 = 'black';
                break;

            default:
                this.color1 = 'gray';
                this.color2 = null;
                break;
        }
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setcolor(this.option.DataValue);

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

        //开关部分
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight / 2,
            width: iwidth * 3 / 5,
            height: iheight * 1 / 4,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 3 / 5,
            y2: 0,
            colorStops: {
                0: this.color1,
                0.5: 'white',
                1: this.color1
            }
        });
        this.refreshObjs.push(rect1);
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //开关状态圆形（3个）
        var circle = new fabric.Circle({
            left: -iwidth / 2 + iwidth * (1 / 20 + 1 / 4),
            top: -iheight / 2 + iheight / 16,
            stroke: 'black',
            hasBorders: false,
            strokeWidth: 0.2,
            fill: this.color1,
            radius: iwidth * 1 / 20,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(circle);
        this.group.addWithUpdate(circle);

        var circle = new fabric.Circle({
            left: -iwidth / 2 + iwidth * (1 / 20 + 9 / 20),
            top: -iheight / 2 + iheight / 16,
            stroke: 'black',
            hasBorders: false,
            strokeWidth: 0.2,
            fill: this.color1,
            radius: iwidth * 1 / 20,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(circle);
        this.group.addWithUpdate(circle);

        var circle = new fabric.Circle({
            left: -iwidth / 2 + iwidth * (1 / 20 + 13 / 20),
            top: -iheight / 2 + iheight / 16,
            stroke: 'black',
            hasBorders: false,
            strokeWidth: 0.2,
            fill: this.color1,
            radius: iwidth * 1 / 20,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(circle);
        this.group.addWithUpdate(circle);

        //开关传动杆
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight / 4,
            width: iwidth * 1 / 5,
            height: iheight * 1 / 8,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth * 1 / 5,
            y2: 0,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //阀体
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 3 / 8,
            width: iwidth * 3 / 5,
            height: iheight * 10 / 16,
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
            y2: iheight * 10 / 16,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //左口
        var rect1 = new fabric.Rect({
            left: -iwidth / 2 + iwidth / 20,
            top: -iheight / 2 + iheight * 3 / 8,
            width: iwidth * 1 / 10,
            height: iheight * 10 / 16,
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
            y2: iheight * 10 / 16,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //左连接管
        var rect1 = new fabric.Rect({
            left: -iwidth / 2 + iwidth * (1 / 20 + 1 / 10),
            top: 0,
            width: iwidth * 1 / 10,
            height: iheight * 6 / 16,
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
            y2: iheight * 6 / 16,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);


        //口
        var rect1 = new fabric.Rect({
            left: -iwidth / 2 + iwidth * (9 / 10 + 1 / 20),
            top: -iheight / 2 + iheight * 3 / 8,
            width: iwidth * 1 / 10,
            height: iheight * 10 / 16,
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
            y2: iheight * 10 / 16,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //右连接管
        var rect1 = new fabric.Rect({
            left: -iwidth / 2 + iwidth * (1 / 20 + 4 / 5),
            top: 0,
            width: iwidth * 1 / 10,
            height: iheight * 6 / 16,
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
            y2: iheight * 6 / 16,
            colorStops: {
                0: 'black',
                0.5: 'white',
                1: 'black'
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //阀体状态
        var rect1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth * 2 / 5,
            height: iheight * 3 / 8,
            strokeWidth: 0.1,
            fill: this.color2,
            hasBorders: false,
            stroke: this.pen2,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(rect1);
        this.group.addWithUpdate(rect1);


        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变指针角度
        this.setOption(options);
        this._setcolor(this.option.ValveState);
        var obj = this.refreshObjs[0];          //阀门矩形颜色
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: this.option.Width * 3 / 5,
            y2: 0,
            colorStops: {
                0: this.color1,
                0.5: 'white',
                1: this.color1
            }
        });
        var obj = this.refreshObjs[1];          //阀门圆形形颜色
        obj.set({
            stroke: 'black',
            fill: this.color1
        });
        var obj = this.refreshObjs[2];          //阀门圆形形颜色
        obj.set({
            stroke: 'black',
            fill: this.color1
        });
        var obj = this.refreshObjs[3];          //阀门圆形形颜色
        obj.set({
            stroke: 'black',
            fill: this.color1
        });

        var obj = this.refreshObjs[4];          //阀体矩形颜色
        obj.set({
            fill: this.color2,
            stroke: this.pen2
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 阀门2  OwmValve2';
    }
});



