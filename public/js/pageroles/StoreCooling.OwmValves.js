/**
* Created by ZHAN on 2016/3/15.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.OwmValves = fabric.util.createClass(ActorsBase, {
    // 弯头  OwmValves
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 56.88889,   //used by actors，宽高比为180:160；等比变换
            Width: 64,   //used by actors   
            ValveState: '关',  //默认状态‘关’； 枚举类型{‘开’，‘关’，‘开到位’，‘关到位’，‘中间态’}；
            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据DataValue值设置
        this.color1 = 'blue';         //阀门颜色
        //this.valvestate = this.option.ValveState;        //阀门状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //根据DataValue值设置阀门颜色
    _setcolor: function (value) {
        switch (value) {
            case '中间态':
                this.color1 = 'lightgray';
                break;

            case '关到位':
                this.color1 = 'black';
                break;

            case '开':
                this.color1 = 'red';
                break;

            case '开到位':
                this.color1 = 'green';
                break;

            default:
                this.color1 = 'blue';
                break;
        }
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setcolor(this.option.ValueState);

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

        //下左矩形
        var rect0 = new fabric.Rect({
            left: -iwidth / 2 + iwidth * 1 / 18,
            top: -iheight/2 +iheight*1/4,
            width: iwidth * 1 / 9,
            height: iheight * 3 / 4,
            strokeWidth: 0.3,
            hasBorders: false,
            fill:fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect0);
        this._addToShape(rect0);

        //下中矩形
        var rect1 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 3 / 8,
            width: iwidth * 7 / 9,
            height: iheight * 1 / 2,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //下右矩形
        var rect2 = new fabric.Rect({
            left: -iwidth / 2 + iwidth * 17 / 18,
            top: -iheight / 2 + iheight * 1 / 4,
            width: iwidth * 1 / 9,
            height: iheight * 3 / 4,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect2);
        this._addToShape(rect2);

        //
        var rect3 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 1 / 4,
            width: iwidth * 5 / 9,
            height: iheight * 1 / 4,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect3);
        this._addToShape(rect3);

        //
        var rect4 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 1 / 8,
            width: iwidth * 1 / 9,
            height: iheight * 1 / 8,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: fillcolor,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(rect4);
        this._addToShape(rect4);


        //
        var rect5 = new fabric.Rect({
            left: 0,
            top: -iheight / 2,
            width: iwidth * 10 / 18,
            height: iheight * 1 / 8,
            strokeWidth: 0.3,
            hasBorders: false,
            fill: this.color1,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(rect5);
        this.group.addWithUpdate(rect5);
        this._addToShape(rect5);



        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变阀门开关颜色
        this.setOption(options);
        this._setcolor(this.option.ValveState);

        var obj = this.refreshObjs[0];          //阀门颜色
        obj.set({
            fill: this.color1
        });
       
        this._renderRefresh();
    },

    toString: function () {
        return ' 弯头  OwmValves';
    }
});



