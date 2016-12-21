/**
 * Created by liuhui 2016/11/4
 */

var StoreCooling = StoreCooling || {};

StoreCooling.Pipe = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY, Diameter) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 10,   //used by actors
            Width: 64,   //used by actors
            Water: '无水',// public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
            FlowDirection: '静止',  // public enum FlowDirection {静止 = 0, 顺流 = 1, 逆流 = 2};
            FillColor: 'black',
            ArrowColor: "SteelBlue",
            Diameter: 10    // should be equal to Height
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY, Diameter);
        this.arrownum = 0; //number of arrows in this pipe
        this.refreshObjs = new Array();//存储大的矩形和顺流方向的箭头
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
        //this.canvas.renderAll();

    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var idiameter = this.option.Diameter;
        var arrowcolor = this.option.ArrowColor;
        // original shape outline
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
        // draw pipe
        var rect1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth,
            height: iheight,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rect1.height,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect1);
        this.refreshObjs.push(rect1);

        var arrowLen = (iheight / 10) * 15;
        var b_len = parseInt(arrowLen / 4);
        var b_higth = iheight * 0.2;
        var f_len = parseInt(arrowLen - b_len);
        var f_height = iheight * 0.8;
        var segmentLength = arrowLen * 2;
        var n = parseInt(iwidth / parseInt(segmentLength));
        this.arrownum = n;

        var dis = (iwidth - arrowLen * n) / (n + 1);
        var arrow;
        if (iwidth > iheight) {
            for (var i = 0; i < n; i++) {//画顺流箭头
                var path = 'M' + ((i + 1) * dis + i * arrowLen) + ',' + iheight * 0.4 + 'L' + ((i + 1) * dis + i * arrowLen + 0.75 * arrowLen) + ',' + iheight * 0.4;
                var path1 = 'L' + ((i + 1) * dis + i * arrowLen + 0.75 * arrowLen) + ',' + iheight * 0.1 + 'L' + ((i + 1) * dis + (i + 1) * arrowLen) + ',' + iheight * 0.5;
                var path2 = 'L' + ((i + 1) * dis + i * arrowLen + 0.75 * arrowLen) + ',' + iheight * 0.9 + 'L' + ((i + 1) * dis + i * arrowLen + 0.75 * arrowLen) + ',' + iheight * 0.6;
                var path3 = 'L' + ((i + 1) * dis + i * arrowLen) + ',' + iheight * 0.6 + 'L' + ((i + 1) * dis + i * arrowLen) + ',' + iheight * 0.4;
                path = path + path1 + path2 + path3;
                arrow = new fabric.Path(path, {
                    left: -iwidth / 2 + arrowLen / 2 + (i + 1) * dis + i * arrowLen,
                    top: 0,
                    fill: this.option.ArrowColor,
                    hasBorders: false,
                    visible: false,
                    angle: 0,
                    originX: 'center',
                    originY: 'center'
                });
                this.group.addWithUpdate(arrow);
                this.refreshObjs.push(arrow);
            }
            if (n == 0) {
                this.arrownum = 1;
                var path = 'M' + iwidth * 0.2 + ',' + iheight * 0.4 + 'L' + iwidth * 0.6 +','+ iheight * 0.4 + 'L' + iwidth * 0.6 + ',' + iheight * 0.15;
                var path1 = 'L' + iwidth * 0.8 + ',' + iheight / 2 + 'L' + iwidth * 0.6 + ',' + iheight * 0.85 + 'L' + iwidth * 0.6 + ',' + iheight * 0.6;
                var path2 = 'L' + iwidth * 0.2 + ',' + iheight * 0.6 + 'L' + iwidth * 0.2 + ',' + iheight * 0.4;
                path = path + path1 + path2;
                arrow = new fabric.Path(path, {
                    left:0,
                    top: 0,
                    fill: this.option.ArrowColor,
                    hasBorders: false,
                    visible: false,
                    angle: 0,
                    originX: 'center',
                    originY: 'center'
                });
                this.group.addWithUpdate(arrow);
                this.refreshObjs.push(arrow);
            }
        }
        this._setGroupOptions();
        this._setTopgroupOptions();
        return this.topgroup;
    },

    refresh: function (options) {
        this.setOption(options);
        if (this.option.Water != '无水') {
            if (this.option.Water == '热水') {
                this.option.FillColor = 'red';
            }
            if (this.option.Water == '冷水') {
                this.option.FillColor = 'blue';
            }
            var obj = this.refreshObjs[0];
            obj.setGradient('fill', {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: this.option.Height,
                colorStops: {
                    0: this.option.FillColor,
                    0.5: 'white',
                    1: this.option.FillColor
                }
            });
            if (this.option.FlowDirection == '顺流') {
                var obj;
                for (var i = 1; i <= this.arrownum; i++) {
                    obj = this.refreshObjs[i];
                    obj.set({
                        visible: true,
                        fill: this.option.ArrowColor,
                        angle: 0,
                    });
                }
            }
            if (this.option.FlowDirection == '逆流') {
                var obj;
                for (var i = 1; i <= this.arrownum; i++) {
                    obj = this.refreshObjs[i];
                    obj.set({
                        visible: true,
                        fill: this.option.ArrowColor,
                        angle: 180,
                    });
                }
            }
        }
        this._renderRefresh();
    },
    toString: function () {
        return 'Pipe';
    }
});



