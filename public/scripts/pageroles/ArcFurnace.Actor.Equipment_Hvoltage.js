/**
* Created by ZHAN on 2016/3/24.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Equipment_Hvoltage = fabric.util.createClass(ActorsBase, {
    // 炉变（Equipment_Hvoltage）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 39.3846169,   //used by actors，宽高比为130:80；等比变换
            Width: 64   //used by actors   
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
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
            top: -iheight / 20,
            height: iheight + iheight / 20,
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
            top: iheight / 40,
            height: iheight,
            width: iwidth,
            stroke: 'black',
            strokeWidth: 1,
            fill: null,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rect);

        var rect = new fabric.Rect({
            left: -iwidth / 2 + iwidth * 45 / 130,
            top: -iheight / 2 - iheight / 30,
            height: iheight / 20,
            width: iwidth * 5 / 130,
            stroke: 'black',
            strokeWidth: 1,
            fill: null,
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        this.group.addWithUpdate(rect);

        var rect = new fabric.Rect({
            left: -iwidth / 2 + iwidth * 85 / 130,
            top: -iheight / 2 - iheight / 30,
            height: iheight / 20,
            width: iwidth * 5 / 130,
            stroke: 'black',
            strokeWidth: 1,
            fill: null,
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        this.group.addWithUpdate(rect);

        var linepath = "M0,0L0," + iheight * 3 / 20;
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth / 2 + iwidth * 3 / 13,
            top: -iheight / 2 + iheight * 6 / 20,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'left',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);

        var linepath = "M0,0L0," + iheight * 3 / 20;
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth / 2 + iwidth * 8 / 13,
            top: -iheight / 2 + iheight * 6 / 20,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'left',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);

        //电炉丝
        for (var i = 0; i < 5; i++ ) {
            var pathstring = this.drawCurve(iwidth / 26, iheight / 20, false);
            var path = new fabric.Path(pathstring);
            path.set({
                left: -iwidth / 2 + (iwidth * 3 / 13)+i*iwidth/13,
                top: -iheight / 2 + iheight * 6 / 20,
                hasBorders: false,
                fill: this.color,
                stroke: 'black',
                strokewidth: 1,
                originX: 'left',
                originY: 'top'
            });
            this.group.addWithUpdate(path);
        }

        var linepath = "M0,0L0," + iheight * 3 / 20;
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth / 2 + iwidth * 3 / 13,
            top: -iheight / 2 + iheight * 23 / 40,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'left',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);

        var linepath = "M0,0L0," + iheight * 3 / 20;
        var line1 = new fabric.Path(linepath);
        line1.set({
            left: -iwidth / 2 + iwidth * 8 / 13,
            top: -iheight / 2 + iheight * 23 / 40,
            hasBorders: false,
            fill: this.color,
            stroke: 'black',
            strokeWidth: 1,
            originX: 'left',
            originY: 'top'
        })
        this.group.addWithUpdate(line1);

        //电炉丝
        for (var i = 0; i < 5; i++) {
            var pathstring = this.drawCurve(iwidth / 26, iheight / 20, true);
            var path = new fabric.Path(pathstring);
            path.set({
                left: -iwidth / 2 + (iwidth * 3 / 13) + i * iwidth / 13,
                top: -iheight / 2 + iheight * 9 / 13,
                hasBorders: false,
                fill: this.color,
                stroke: 'black',
                strokewidth: 1,
                originX: 'left',
                originY: 'top'
            });
            this.group.addWithUpdate(path);
        }



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //无刷新动作
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 炉变（Equipment_Hvoltage）';
    }
});



