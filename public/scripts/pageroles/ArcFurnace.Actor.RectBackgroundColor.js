/**
* Created by ZHAN on 2016/3/24.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.RectBackgroundColor = fabric.util.createClass(ActorsBase, {
    // 背景颜色矩形
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,   //used by actors，宽高比为2:2；非等比变换
            Width: 128,   //used by actors   
            BackgroundColor: 'black'  //默认状态false；true   false;
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.color = 'black';         //状态默认颜色1
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //根据Value值设置阀门颜色
    //_setcolor: function (value) {
    //    this.color = value;
    //},

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        //this._setcolor(this.option.Value);

        var rect0 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'yellow',
            opacity: 0.3,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.topgroup.addWithUpdate(rect0);

        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth ,
            fill: 'green',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        var rect = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: this.option.BackgroundColor,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
 
        this.refreshObjs.push(rect);
        this.group.addWithUpdate(rect);
        this._addToShape(rect);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

   refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        //this._setcolor(this.option.BackgroundColor);

        var obj = this.refreshObjs[0];          //开关颜色

        obj.set({
            fill: this.option.BackgroundColor
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 背景色矩形';
    }
});