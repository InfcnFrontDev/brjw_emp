/**
* Created by ZHAN on 2016/3/3.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Transducer = fabric.util.createClass(ActorsBase, {
    // 变频器  Transducer
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 53.3333321,   //used by actors，宽高比为300:250；等比变换
            Width: 64,   //used by actors   
            Zero: 0,         //零度
            Full: 100,      //满度
            DataValue: 50,  //默认显示值
            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象
        //        this._setdataValue(this.option.DdtaValue);
        this.pieRect = {};
        this.dataValue = this.option.DataValue;        //显示值
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    _setdataValue: function (value) {
        if (value > this.option.Full) {
            this.dataValue = this.option.Full;
            return;
        }
        if (value < this.option.Zero) {
            this.dataValue = this.option.Zero;
            return;
        }
        if (this.dataValue != value) {
            this.dataValue = value;
        }
    },

    _getPosition: function (pieRect) {     // rect{X:   ,Y:  ,Width:  ,Heigh:  }
        var data = this.dataValue - this.option.Zero;
        var maxData = this.option.Full - this.option.Zero;
        var s = data / maxData;

        var radius = pieRect.Width / 2 + 2;  //bounds.Width*16/20/2;
        var centerPoint = { X: pieRect.X + pieRect.Width / 2, Y: pieRect.Y + pieRect.Height / 2 };

        var x = centerPoint.X - radius * Math.cos(Math.PI * s);
        var y = centerPoint.Y - radius * Math.sin(Math.PI * s);
        return { X: x, Y: y };
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setdataValue(this.option.DataValue);
        this.pieRect = {
            X: -this.option.Width / 2 + this.option.Width / 10,
            Y: -this.option.Height / 2 + this.option.Height * 3 / 15,
            Width: this.option.Width * 16 / 20,
            Height: this.option.Width * 16 / 20
        };
        //var iunit = iwidth/10;

        //original shape outline
        //var rect0 = new fabric.Rect({
        //    left: 0,
        //    top: 0,
        //    height: iheight,
        //    width: iwidth,
        //    fill: 'yellow',
        //    opacity: 0.3,
        //    visible: true,
        //    hasBorders: false,
        //    originX: 'center',
        //    originY: 'center'
        //});
        //this.topgroup.addWithUpdate(rect0);

        //draw image here
        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight * 2,
            width: iwidth,
            fill: 'green',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        //第1部分	仪表面板底盘
        var rect1 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: fillcolor,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);



        //第2部分	表盘
        var rect2 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight * 13 / 15,
            width: iwidth * 18 / 20,
            fill: 'gainsboro',
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect2);

        //第3部分 扇形表面
        var circle = new fabric.Circle({
            left: 0,
            top: iheight * 3 / 15,
            stroke: 'black',
            hasBorders: false,
            strokeWidth: 0.8,
            fill: 'white',
            startAngle: -Math.PI,
            endAngle: 0,
            radius: iwidth * 8 / 20,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(circle);


        //指针
        var startP = { X: 0, Y: iheight * 3 / 15 };
        var endP = this._getPosition(this.pieRect);
        var line = new fabric.Line([startP.X, startP.Y, endP.X, endP.Y], {
            //           fill: 'blue',
            stroke: 'blue',
            hasBorders: false,
            strokeWidth: 1,
            selectable: false
        });
        this.refreshObjs.push(line);
        this.group.addWithUpdate(line);

        // 指针原点
        var circlep = new fabric.Circle({
            left: 0,
            top: iheight * 3 / 15,
            hasBorders: false,
            fill: 'red',
            radius: 4,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(circlep);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变指针角度
        this.setOption(options);

        this._setdataValue(this.option.DataValue);
        var obj = this.refreshObjs[0];      //刷新指针
        var startP = { X: 0, Y: this.option.Height * 3 / 15 };
        var endP = this._getPosition(this.pieRect);
        obj.set({ 'x1': startP.X, 'y1': startP.Y });
        obj.set({ 'x2': endP.X, 'y2': endP.Y });

        this._renderRefresh();
    },

    toString: function () {
        return ' 变频器  Transducer';
    }
});



