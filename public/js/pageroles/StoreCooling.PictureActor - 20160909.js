/**
* Created by ZHAN on 2016/3/29.
*/

var StoreCooling = StoreCooling || {};
StoreCooling.PictureActor = fabric.util.createClass(ActorsBase, {
    //  图片（PictureActor）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY,filepath) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为70:83；等比变换
            Width: 64,  //used by actors   
            PicturePath:""  //not used
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.filepath = filepath;                   //图片路径
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
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
            stroke: 'black',
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
        var tcan = this.canvas;
        fabric.Image.fromURL(this.filepath,
            function (img) {
                img.set({
                    left: 0,
                    top: 0,
                    width: iwidth,
                    height: iheight,
                    hasBorders: false,
                    originX: 'center',
                    originY: 'center'
                });
                imgarray.push(img);
                group1.addWithUpdate(img);
                tcan.renderAll();
            });

        //var img = new fabric.Image();
        //img.set({
        //        left: 0,
        //        top: 0,
        //        width: iwidth,
        //        height: iheight,
        //        hasBorders: false,
        //        originX: 'center',
        //        originY: 'center'
        //});
        //imgarray.push(img);
        //group1.addWithUpdate(img);

        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //无特别刷新动作
        this.setOption(options);
      
        this._renderRefresh();
    },

    toString: function () {
        return '  图片（PictureActor）';
    }
});



