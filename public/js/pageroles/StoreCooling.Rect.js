/**
* Created by ZHAN on 2016/3/24.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Rect = fabric.util.createClass(ActorsBase, {
    // 状态 Rect
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为2:2；非等比变换
            Width: 64,   //used by actors   
            Value: false  //默认状态false；true   false;
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.color = 'red';         //状态默认颜色1
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    //根据Value值设置阀门颜色
    _setcolor: function (value) {
       this.color = value ? 'green' : 'red';
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
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
// shape body
        var rect = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: this.color,
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
        this._setcolor(this.option.Value);

        var obj = this.refreshObjs[0];          //开关颜色

        obj.set({
           fill:this.color
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 状态 Rect';
    }
});



