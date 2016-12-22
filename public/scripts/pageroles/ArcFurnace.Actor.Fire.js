/**
* Created by ZHAN on 2016/3/29.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Fire = fabric.util.createClass(ActorsBase, {
    //  火苗（Fire）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为70:83；等比变换
            Width: 53.9759026,  //used by actors   
            Radio: 100
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.Radio = 100;                   //火苗大小 0-100
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

        //original shape outline
//                var rect0 = new fabric.Rect({
//                    left: 0,
//                    top: 0,
//                    height: iheight,
//                    width: iwidth,
//                    fill: 'yellow',
//                    opacity: 0.3,
//                    visible: true,
//                    hasBorders: false,
//                    originX: 'center',
//                    originY: 'center'
//                });
//                this.topgroup.addWithUpdate(rect0);
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            stroke: 'green',
            fill: null,
            opacity: 0.1,             //don't work when added to group
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        // shape body
        var imgarray = this.refreshObjs;
        var group1 = this.group;
        var ca = this.canvas;
        fabric.Image.fromURL('../Scripts/PageRoles/Resources/火苗.png',
            function (img) {
                img.set({
                    left: 0,
                    top: 0,
                    width: typeof(RefleshWidth) == undefined ? iwidth : RefleshWidth,// 处理图像在未装载完成前刷新
                    height: typeof(RefleshHeight) == undefined ? iheight : RefleshWidth,
                    hasBorders: false,
                    originX: 'center',
                    originY: 'center'
                });
                imgarray.push(img);
                group1.addWithUpdate(img);
                ca.renderAll();
            });

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //根据Radio值刷新火苗大小
        options.Radio = options.Radio > 100 ? 100 : options.Radio;
        this.setOption(options);
        var r = this.option.Radio/100;
        var img = this.refreshObjs[0];
        if (typeof (img) != "undefined") {    // 若图像未调入时刷新，会导致错误
            img.set({
                width: this.option.Width * r,
                height: this.option.Height * r
            });
        } else {// 处理图像出现第一次未装载完成前刷新的情况
            RefleshWidth = this.option.Width * r;
            RefleshHeight = this.option.Width * r;
        }

        
        this._renderRefresh();
    },

    toString: function () {
        return ' 火苗（Fire）';
    }
});



