/**
* Created by ZHAN on 2016/3/29.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.FS = fabric.util.createClass(ActorsBase, {
    // 风扇（FS）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为150:150；等比变换
            Width: 64   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.grouprotate = new fabric.Group();
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },


    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

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
        var rect = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'lightSlateGray',
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect);

        // 圆形
        var circle = new fabric.Circle({
            left: 0,
            top: 0,
            hasBorders: false,
            fill: 'tan',
            radius: iwidth * 2 / 5,
            originX: 'center',
            originY: 'center'
        });
        this.grouprotate.addWithUpdate(circle);
        //this.group.addWithUpdate(circle);

        //扇叶
        var pathstring = 'M0,0C' + (iwidth * 4 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 9 / 30) + ',' + (0);
//        pathstring = pathstring.concat('L' + (iwidth * 8 / 30) + ',' + (iheight * 2 / 15));
        pathstring = pathstring.concat('L' + (iwidth * 7 / 30) + ',' + (iheight * 3 / 15));
        pathstring = pathstring.concat('C' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.01) + ',' + (iwidth * 4 / 60) + ',' + (-iheight * 6 / 30 * 0.02) + ',0,0');
        var path = new fabric.Path(pathstring);
        path.set({
            left: 0,
            top: -iheight * 7 / 30 * 0.25,
            hasBorders: false,
            fill: null,
            stroke: 'black',
//            angle:36,
            strokewidth: 1,
            originX: 'left',
            originY: 'top'
        });
        this.grouprotate.addWithUpdate(path);
        //this.group.addWithUpdate(path);

        var pathstring = 'M0,0C' + (iwidth * 4 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 9 / 30) + ',' + (0);
        pathstring = pathstring.concat('L' + (iwidth * 7 / 30) + ',' + (iheight * 3 / 15));
        pathstring = pathstring.concat('C' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.01) + ',' + (iwidth * 4 / 60) + ',' + (-iheight * 6 / 30 * 0.02) + ',0,0');
        var path = new fabric.Path(pathstring);
        path.set({
            left: iwidth * 7 / 30 * 0.2,
            top: -iheight * 7 / 30 * 0.1,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            angle:72,
            strokewidth: 1,
            originX: 'left',
            originY: 'top'
        });
        this.grouprotate.addWithUpdate(path);
        //this.group.addWithUpdate(path);


        var pathstring = 'M0,0C' + (iwidth * 4 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 9 / 30) + ',' + (0);
        pathstring = pathstring.concat('L' + (iwidth * 7 / 30) + ',' + (iheight * 3 / 15));
        pathstring = pathstring.concat('C' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.01) + ',' + (iwidth * 4 / 60) + ',' + (-iheight * 6 / 30 * 0.02) + ',0,0');
        var path = new fabric.Path(pathstring);
        path.set({
            left: iwidth * 7 / 30 * 0.2,
            top: iheight * 7 / 30 * 0.15,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            angle:144,
            strokewidth: 1,
            originX: 'left',
            originY: 'top'
        });
        this.grouprotate.addWithUpdate(path);
        //this.group.addWithUpdate(path);

        var pathstring = 'M0,0C' + (iwidth * 4 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 9 / 30) + ',' + (0);
        pathstring = pathstring.concat('L' + (iwidth * 7 / 30) + ',' + (iheight * 3 / 15));
        pathstring = pathstring.concat('C' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.01) + ',' + (iwidth * 4 / 60) + ',' + (-iheight * 6 / 30 * 0.02) + ',0,0');
        var path = new fabric.Path(pathstring);
        path.set({
            left: -iwidth * 7 / 30 * 0.05,
            top: iheight * 7 / 30 * 0.2,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            angle: 216,
            strokewidth: 1,
            originX: 'left',
            originY: 'top'
        });
        this.grouprotate.addWithUpdate(path);
        //this.group.addWithUpdate(path);

        var pathstring = 'M0,0C' + (iwidth * 4 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.3) + ',' + (iwidth * 9 / 30) + ',' + (0);
        pathstring = pathstring.concat('L' + (iwidth * 7 / 30) + ',' + (iheight * 3 / 15));
        pathstring = pathstring.concat('C' + (iwidth * 10 / 60) + ',' + (-iheight * 7 / 30 * 0.01) + ',' + (iwidth * 4 / 60) + ',' + (-iheight * 6 / 30 * 0.02) + ',0,0');
        var path = new fabric.Path(pathstring);
        path.set({
            left: -iwidth * 7 / 30 * 0.2,
            top: iheight * 7 / 30 * 0,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            angle: 288,
            strokewidth: 1,
            originX: 'left',
            originY: 'top'
        });
        this.grouprotate.addWithUpdate(path);
        //this.group.addWithUpdate(path);
        //设置grouprotate的option
        this.grouprotate.setOptions({
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            flipX: this.option.Flip,                 //对应option中的Flip
            transformMatrix: this._getTransformM(this.option.TransformMatrix),
            angle: this.option.RotateAngle,
            opacity: this.option.Opacity,
            //            selectable:false,
            visible: this.option.Visible,
            enabled: this.option.Enabled
        });
        // 设置缩放图形区域
        //this.changebounds.transBounds(this.option.TransformMatrix);

        this.group.addWithUpdate(this.grouprotate);
        this._setGroupOptions();
        this._setTopgroupOptions();

        //风扇旋转动画
        var mcanvas = this.canvas;
        var mgroup = this.grouprotate;
        (function Animate() {
            mgroup.animate('angle', 360, {
                onChange: mcanvas.renderAll.bind(mcanvas),
                duration: 1000,
                from: 0,
                easing: fabric.util.ease.linear,
                onComplete: function () {
                    //mgroup.setAngle(0);
                    Animate();
                }
            });
        })();


        return this.topgroup;
    },

    refresh: function (options) {     //无刷新动作
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 风扇（FS）';
    }
});



