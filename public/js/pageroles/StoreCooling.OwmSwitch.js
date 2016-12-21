/**
* Created by ZHAN on 2016/3/15.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.OwmSwitch = fabric.util.createClass(ActorsBase, {
    // 开关  OwmSwitch
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为20:30；等比变换
            Width: 42.66667,   //used by actors   
            Value: true,  //默认状态； true  false；
            FillColor: 'lightgray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据DataValue值设置
        this.color = 'lightgreen';         //开关颜色
        this.str = 'ON';                //显示字符串
        this.value = this.option.Value;        //开关状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    //根据DataValue值设置阀门颜色
    _setcolor: function (value) {
        if (value) {
            this.str = 'ON';
            this.color = 'lightgreen';
        }
        else {
            this.str = 'OFF';
            this.color = 'red';
        }

    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setcolor(this.option.Value);

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

        //主体矩形
        var rect1 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //文字矩形
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 1 / 6,
            height: iheight * 1 / 6,
            width: iwidth * 1 / 2,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);

        // 圆形状态
        var circle = new fabric.Circle({
            left: 0,
            top: 0,
            hasBorders: false,
            fill: this.color,
            strokeWidth: 0.3,
            stroke: 'black',
            radius: iwidth * 1 / 4,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(circle);
        this.group.addWithUpdate(circle);

        var text1 = new fabric.Text(this.str, {
            left: 0,
            top: -iheight / 2 + iheight * 5 / 24,
            fontSize: iwidth / 4 * 2 / 3,
            fontFamily: 'Times New Roman',
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(text1);
        this.group.addWithUpdate(text1);


        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变阀门开关颜色
        this.setOption(options);
        this._setcolor(this.option.Value);

        var obj = this.refreshObjs[0];          //阀门颜色
        obj.set({
            fill: this.color
        });
        var obj = this.refreshObjs[1];          //文字
//        obj.initialize(this.str);
        obj.initialize(this.str, { fontSize: this.option.Width / 4 * 2 / 3 });

        this._renderRefresh();
    },

    toString: function () {
        return ' 开关  OwmSwitch';
    }
});



