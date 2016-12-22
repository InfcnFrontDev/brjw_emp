/**
* Created by ZHAN on 2016/3/24.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};

ArcFurnace.Actor.Pipe_Flexible = fabric.util.createClass(ActorsBase, {
    // 裸软铜缆 Pipe_Flexible
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 53.3333321,   //used by actors，宽高比为120:100；非等比变换
            Width: 64   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.color = null;         //铜缆颜色
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    drawCurve: function (ra, rb, direction) {   // direction为弧形方向，true为上弧形，false为下弧形
        var a = ra;
        var b = rb;
        var ox = 0.5 * a;
        var oy = 0.6 * b;
        var pathstring;
        if (direction) {
            pathstring = 'M' + a + ',0C' + a + ',' + (-oy) + ',' + ox + ',' + (-b) + ',0,' + (-b);
            pathstring = pathstring.concat('C' + (-ox) + ',' + (-b) + ',' + (-a) + ',' + (-oy) + ',' + (-a) + ',0');
        } else {
            pathstring = 'M' + (-a) + ',0C' + (-a) + ',' + (oy) + ',' + (-ox) + ',' + (b) + ',' + (0) + ',' + b;
            pathstring = pathstring.concat('C' + (ox) + ',' + (b) + ',' + (a) + ',' + (oy) + ',' + (a) + ',' + 0);
        }
        return pathstring;
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
        var pathstring = this.drawCurve(iwidth / 4, iheight / 2, true);
        var path = new fabric.Path(pathstring);
        path.set({
            left: -iwidth / 2 + iwidth / 4,
            top: -iheight / 2,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path);
        this._addToShape(path);


        var pathstring = this.drawCurve(iwidth / 4, iheight / 2, false);
        var path = new fabric.Path(pathstring);
        path.set({
            left: -iwidth / 2 + iwidth / 4 + iwidth * 5 / 12,
            top: 0,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path);
        this._addToShape(path);

        var pathstring = this.drawCurve(iwidth / 6, iheight / 4, true);
        var path = new fabric.Path(pathstring);
        path.set({
            left: -iwidth / 2 + iwidth / 6 + iwidth / 12,
            top: -iheight / 2 + iheight / 4,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path);
        this._addToShape(path);

        var pathstring = this.drawCurve(iwidth / 6, iheight / 4, false);
        var path = new fabric.Path(pathstring);
        path.set({
            left: iwidth / 6,
            top: 0,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path);
        this._addToShape(path);

        var linepath = "M0,0L" + iwidth / 12 + ",0";
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth/2+iwidth*1/24,
            top: 0,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);
        this._addToShape(line1);

        var linepath = "M0,0L" + iwidth / 12 + ",0";
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth / 2+iwidth*1/24+iwidth*5/6 ,
            top: 0,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'center',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);
        this._addToShape(line1);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //无刷新动作
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 裸软铜缆 Pipe_Flexible';
    }
});



