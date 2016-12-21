/**
 * Created by ZHAN on 2016/1/14.
 */

var StoreCooling = StoreCooling || {};

StoreCooling.Syphon = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY, Diameter) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,                    //used by actors
            Width: 64,                     //used by actors
            Water: '无水',                      // public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
            FlowDirection: 0,            // public enum FlowDirection {静止 = 0, 顺流 = 1, 逆流 = 2};
            FillColor: 'black',
            ArrowColor: "SteelBlue",
            Diameter: 10                  // 
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.option.Diameter = Diameter;            //设置初始直径
        this.harrownum = 0;              //水平管道中的箭头数量
        this.varrownum = 0;             //垂直管道中的箭头数量
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },


    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var idiameter = this.option.Diameter;
        var arrowcolor = this.option.ArrowColor;
        //original shape outline
        //        var rect0 = new fabric.Rect({
        //            left: 0,
        //            top: 0,
        //            height: iheight,
        //            width: iwidth,
        //            fill: 'yellow',
        //            opacity: 0.5,
        //            visible: true,
        //            hasBorders: false,
        //            originX: 'center',
        //            originY: 'center'
        //        });
        //        this.topgroup.addWithUpdate(rect0);
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight - 1,    //if not -1 ,will get some blur
            width: iwidth - 1,
            stroke: 'green',
            fill: null,
            opacity: 0.1,             //opacity don't work when added to group
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

    

        //// 画水平管道；用polygon画在chrome等浏览器上过渡色有问题
        //var polyPoints = [
        //   { x: 0, y: iheight },
        //   { x: idiameter, y: iheight - idiameter },
        //   { x: iwidth, y: iheight - idiameter },
        //   { x: iwidth, y: iheight },
        //   { x: 0, y: iheight }
        //];
        //var polygon1 = new fabric.Polygon(polyPoints, {
        //    left: -iwidth / 2,
        //    top: iheight / 2 - idiameter,   //manually adjusted   
        //    hasBorders: false,
        //    originX: 'left',
        //    originY: 'top'
        //});
        //polygon1.setGradient('fill', {
        //    x1: 0,
        //    y1: 0,
        //    x2: 0,
        //    y2: idiameter,
        //    colorStops: {
        //        0: fillcolor,
        //        0.5: 'white',
        //        1: fillcolor
        //    }
        //});
        //this.group.addWithUpdate(polygon1);
        //this._addToShape(polygon1);

        ////画垂直管道  ；
        //var polyPoints = [
        //   { x: 0, y: 0 },
        //   { x: idiameter, y: 0 },
        //   { x: idiameter, y: iheight - idiameter + 1 },
        //   { x: 0 + 1, y: iheight },
        //   { x: 0, y: iheight },
        ////           { x: 0, y:0}
        //];
        //var polygon1 = new fabric.Polygon(polyPoints, {
        //    left: -iwidth / 2,
        //    top: -iheight / 2,   //manually adjusted   
        //    hasBorders: false,
        //    originX: 'left',
        //    originY: 'top'
        //});
        //polygon1.setGradient('fill', {
        //    x1: 0,
        //    y1: 0,
        //    x2: idiameter,
        //    y2: 0,
        //    colorStops: {
        //        0: fillcolor,
        //        0.5: 'white',
        //        1: fillcolor
        //    }
        //});
        //this.group.addWithUpdate(polygon1);
        //this._addToShape(polygon1);

        //画水平管道;用rect和path画
        var rect1 = new fabric.Rect({ left: 0, top: 0, width: iwidth, height: idiameter });
        rect1.set({
            left: 0,
            top: iheight / 2 - idiameter - 0.5,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: idiameter,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);
        // 画垂直管道
        var pathstring = 'M0,0L' + idiameter + ',0L' + idiameter + ',' + (iheight - idiameter);
        pathstring = pathstring.concat('L0,' + (iheight) + 'z');
        var path1 = new fabric.Path(pathstring);
        path1.set({
            left: -iwidth / 2 - 0.5,              //manually adjusted   about 0.5
            top: -iheight / 2 - 0.5,
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(path1);
        this._addToShape(path1);


        //initialize arrows
        var awidth = idiameter * 3 / 2;       //箭头长度
        var iseg = awidth * 2;
        var b_len = awidth / 4;
        var f_len = awidth - b_len;
        var vn = iheight / iseg - 1;        //垂直箭头数量
        this.varrownum = vn;
        var hn = iwidth / iseg - 1;       //水平箭头数量
        this.harrownum = hn;
        var arrow;
        //vertical arrows
        for (var i = 0; i < vn; i++) {
            arrow = new fabric.Rect({
                left: -iwidth / 2 + idiameter / 1.5,
                top: -iheight / 2 + (i + 0.5) * iseg,
                width: f_len,
                height: idiameter / 4,
                fill: arrowcolor,
                hasBorders: false,
                visible: false,
                angle: 90,
                originX: 'left',
                originY: 'top'
            });
            this.group.addWithUpdate(arrow);
            arrow = new fabric.Triangle({
                left: -iwidth / 2 + idiameter / 16,
                top: -iheight / 2 + (i + 0.5) * iseg - f_len / 2 - b_len / 2 + 0.5,   //manually adjusted +0.5
                width: b_len * 2,
                height: b_len * 2,
                fill: arrowcolor,
                angle: 0,
                hasBorders: false,
                visible: false,
                originX: 'left',
                originY: 'top'
            });
            this.group.addWithUpdate(arrow);
        }
        //horizonal arrows
        for (var i = 0; i < hn; i++) {
            arrow = new fabric.Rect({
                left: (hn / 2 - i) * iseg,
                top: iheight / 2 - idiameter / 1.5 + 0.5,   //manully adjusted +0.5
                width: f_len,
                height: idiameter / 4,
                fill: arrowcolor,
                hasBorders: false,
                visible: false,
                angle: 0,
                originX: 'center',
                originY: 'top'
            });
            this.group.addWithUpdate(arrow);
            arrow = new fabric.Triangle({
                left: (hn / 2 - i) * iseg - f_len - b_len / 2,
                top: iheight / 2 - idiameter / 2 + 0.5,          //manully adjusted +0.5
                width: b_len * 2,
                height: b_len * 2,
                fill: arrowcolor,
                angle: -90,
                hasBorders: false,
                visible: false,
                originX: 'center',
                originY: 'top'
            });
            this.group.addWithUpdate(arrow);
        }
        this._setGroupOptions();
        this._setTopgroupOptions();
        return this.topgroup;
    },

    refresh: function (options) {
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var idiameter = this.option.Diameter;
        var fillcolor = this.option.FillColor;
        var arrowcolor = this.option.ArrowColor;

        switch (this.option.Water) {
            case '热水': fillcolor = 'red';
                break;
            case '冷水': fillcolor = 'blue';
                break;
            default: fillcolor = this.defaultOptions.FillColor;
        }
        var objpoint = 0;
        objpoint++;                                   //if rectrotate doesn't exist ,unnote this
        var obj = this.group.item(objpoint++);
        obj.setGradient('fill', {                           //refresh path1
            x1: 0,
            y1: 0,
            x2: 0,
            y2: idiameter,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        obj = this.group.item(objpoint++);
        obj.setGradient('fill', {                     //refresh path2
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });

        //   refresh arrows
        var vn = this.varrownum;
        var hn = this.harrownum;
        if (this.option.Water != '无水') {
            var awidth = idiameter * 3 / 2;       //箭头长度
            var iseg = awidth * 2;
            var b_len = awidth / 4;
            var f_len = awidth - b_len;
            var arrow;
            switch (this.option.FlowDirection) {
                case '逆流':
                    {
                        for (var i = 0; i < vn; i++) {                     //deal with vertical arrows
                            obj = this.group.item(objpoint++);           //pop each arrow's body
                            obj.set({
                                left: -iwidth / 2 + idiameter / 1.5,
                                top: -iheight / 2 + (i + 0.5) * iseg,
                                width: f_len,
                                height: idiameter / 4,
                                fill: arrowcolor,
                                hasBorders: false,
                                visible: true,
                                angle: 90,
                                originX: 'left',
                                originY: 'top'
                            });
                            arrow = this.group.item(objpoint++);
                            arrow.set({                                       //pop each arrow
                                left: -iwidth / 2 + idiameter / 16,
                                top: -iheight / 2 + (i + 0.5) * iseg - f_len / 2 - b_len / 2 + 0.5,   //manually adjusted +0.5
                                width: b_len * 2,
                                height: b_len * 2,
                                fill: arrowcolor,
                                angle: 0,
                                hasBorders: false,
                                visible: true,
                                originX: 'left',
                                originY: 'top'
                            });
                        }
                        for (var i = 0; i < hn; i++) {
                            obj = this.group.item(objpoint++);
                            obj.set({
                                left: (hn / 2 - i) * iseg,
                                top: iheight / 2 - idiameter / 1.5 + 0.2,   //manully adjusted +0.2
                                width: f_len,
                                height: idiameter / 4,
                                fill: arrowcolor,
                                hasBorders: false,
                                visible: true,
                                angle: 0,
                                originX: 'center',
                                originY: 'top'
                            });
                            arrow = this.group.item(objpoint++);
                            arrow.set({
                                left: (hn / 2 - i) * iseg - f_len - b_len / 2,
                                top: iheight / 2 - idiameter / 2 + 0.2,          //manully adjusted +0.2
                                width: b_len * 2,
                                height: b_len * 2,
                                fill: arrowcolor,
                                angle: -90,
                                hasBorders: false,
                                visible: true,
                                originX: 'center',
                                originY: 'top'
                            });
                        }
                        break;
                    }
                case '顺流':
                    {
                        for (var i = 0; i < vn; i++) {                     //deal with vertical arrows
                            obj = this.group.item(objpoint++);              //pop each arrow's body
                            obj.set({
                                left: -iwidth / 2 + idiameter / 1.5,
                                top: -iheight / 2 + i * iseg + (iheight - iseg * vn) / 2 - 2 * b_len,
                                width: f_len,
                                height: idiameter / 4,
                                fill: arrowcolor,
                                hasBorders: false,
                                visible: true,
                                angle: 90,
                                originX: 'left',
                                originY: 'top'
                            });
                            arrow = this.group.item(objpoint++);
                            arrow.set({                                       //pop each arrow
                                left: -iwidth / 2 + idiameter - idiameter / 16,
                                top: -iheight / 2 + (i + 1) * iseg - b_len,
                                width: b_len * 2,
                                height: b_len * 2,
                                fill: arrowcolor,
                                angle: 180,
                                hasBorders: false,
                                visible: true,
                                originX: 'left',
                                originY: 'top'
                            });
                        }
                        for (var i = 0; i < hn; i++) {                   //deal with horizonal arrows
                            obj = this.group.item(objpoint++);
                            obj.set({
                                left: (hn / 2 - i) * iseg - 2 * b_len,
                                top: iheight / 2 - idiameter / 1.5,
                                width: f_len,
                                height: idiameter / 4,
                                fill: arrowcolor,
                                hasBorders: false,
                                visible: true,
                                angle: 0,
                                originX: 'center',
                                originY: 'top'
                            });
                            arrow = this.group.item(objpoint++);
                            arrow.set({
                                left: (hn / 2 - i) * iseg + f_len / 2 - b_len / 2,
                                top: iheight / 2 - idiameter / 2,
                                width: b_len * 2,
                                height: b_len * 2,
                                fill: arrowcolor,
                                angle: 90,
                                hasBorders: false,
                                visible: true,
                                originX: 'center',
                                originY: 'top'
                            });
                        }
                        break;
                    }
            }
        }
        else {
            for (var i = 0; i < vn; i++) {
                obj = this.group.item(objpoint++);           //pop each arrow's body
                obj.set({
                    visible: false
                });
                arrow = this.group.item(objpoint++);
                arrow.set({     //pop each arrow
                    visible: false
                });
            }
            for (var i = 0; i < hn; i++) {
                obj = this.group.item(objpoint++);           //pop each arrow's body
                obj.set({
                    visible: false
                });
                arrow = this.group.item(objpoint++);
                arrow.set({                                    //pop each arrow
                    visible: false
                });
            }
        }
        this._renderRefresh();
    },

    toString: function () {
        return 'Syphon';
    }
});



