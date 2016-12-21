/**
* Created by ZHAN on 2016/3/3.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Err = fabric.util.createClass(ActorsBase, {
    // 错误  Err
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为40:100；等比变换
            Width: 25.6,   //used by actors   
            Min: 0,         //最小值
            Max: 10,         //最大值
            Temperature: 50,  //默认温度
            IsTrue: true,        //报警表达式
            FillColor: 'red'
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
        var fillcolor = this.option.FillColor;  //填充颜色


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

        //感叹号的上半部分
        var ellipse = new fabric.Ellipse({
            left: 0,
            top: -iheight * 1.5 / 10,
            rx: iwidth / 4,
            ry: iheight / 4,
            hasBorders: false,
            stroke: 'black',
            strokewidth: 1,
            fill: fillcolor,
            radius: iwidth / 2,
            originX: 'center',
            originY: 'center'
        });
        this.refreshObjs.push(ellipse);
        this.group.addWithUpdate(ellipse);


        //感叹号的下半部分
        var circlep = new fabric.Circle({
            left: 0,
            top: iheight * 3 / 10,
            hasBorders: false,
            stroke: 'black',
            strokewidth: 1,
            fill: fillcolor,
            radius: iwidth / 4,
            originX: 'center',
            originY: 'center'
        });
        this.refreshObjs.push(circlep);
        this.group.addWithUpdate(circlep);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变指针角度
        this.setOption(options);
        var penColor = 'black';  // 边线颜色
        // 设置显示颜色
        if (this.option.IsTrue && (this.option.Temperature > this.option.Max || this.option.Temperature < this.option.Min)) {
            var obj = this.refreshObjs[0];
            obj.set({ visible: true });
            obj = this.refreshObjs[1];
            obj.set({ visible: true });
        }
        else {
            var obj = this.refreshObjs[0];
            obj.set({ visible: false });
            obj = this.refreshObjs[1];
            obj.set({ visible: false });
        }

        this._renderRefresh();
    },

    toString: function () {
        return ' 错误  Err';
    }
});



