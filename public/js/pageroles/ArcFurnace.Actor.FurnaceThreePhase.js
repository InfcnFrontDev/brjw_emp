/**
* Created by ZHAN on 2016/3/25.
*/
//三相炉变
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.FurnaceThreePhase = fabric.util.createClass(ActorsBase, {
    // 开关 Onoff
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 200,   //used by actors，宽高比为160:200；等比变换
            Width: 160,   //used by actors   
//            ValveState: '中间态',  //默认状态‘中间态’； public enum ValveState {关=0, 关到位=1, 开=2, 开到位=3, 未知(中间态)=4};
//            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据ValveState值设置
//        this.color1 = 'gray';         //开关默认颜色1
//        this.color2 = 'white';          //开关默认颜色2
//        this.ValveState = this.option.ValveState;        //开关状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //根据ValveState值设置阀门颜色
//    _setcolor: function (value) {
//        switch (value) {
//            case '关':
//                this.color1 = '#FF00FF';          //Magenta
//                this.color2 = 'white';
//                break;

//            case '关到位':
//                this.color1 = 'red';
//                this.color2 = '#FF00FF';            //Magenta
//                break;

//            case '开':
//                this.color1 = '#90EE90';            // LightGreen   #90EE90
//                this.color2 = 'white';
//                break;

//            case '开到位':
//                this.color1 = '#006400';            //DarkGreen
//                this.color2 = '#90EE90';            //LarkGreen
//                break;

//            default:
//                this.color1 = 'gray';
//                this.color2 = 'white';
//                break;
//        }

//    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
//        this._setcolor(this.option.ValveState);

        //original shape outline
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


        //上面的部分
        var path1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: 5 / 160 * iwidth,
            height: 50 / 200 * iheight,
            hasBorders: false,
            left: -52.5 / 160 * iwidth,
            top: -90 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 50 / 200 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path1);
        this._addToShape(path1); //上面部分左边的矩形


        var path2 = new fabric.Rect({
            left: 0,
            top: 0,
            width: 100 / 160 * iwidth,
            height: 30 / 200 * iheight,
            hasBorders: false,
            left: 0,
            top: -80 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 30 / 200 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path2);
        this._addToShape(path2); //上面部分的中间那个矩形







        var path3 = new fabric.Rect({
            left: 0,
            top: 0,
            width: 5 / 160 * iwidth,
            height: 50 / 200 * iheight,
            hasBorders: false,
            left: 52.5 / 160 * iwidth,
            top: -90 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 50 / 200 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3); //上面部分右边的矩形


        var path4 = new fabric.Polygon([
        { x: 20 / 160 * iwidth, y: 22 / 200 * iheight },
        { x: 25 / 160 * iwidth, y: 20 / 200 * iheight },
        { x: 25 / 160 * iwidth, y: 50 / 200 * iheight },
        { x: 20 / 160 * iwidth, y: 48 / 200 * iheight }
        ]);
        path4.set({
            left: -57.5 / 160 * iwidth,
            top: -80 / 200 * iheight,
            hasBorders: false,
            strokeWidth: 0.3,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 30 / 200 * iheight,

            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'

            }
        });

        this.group.addWithUpdate(path4);
        this._addToShape(path4); //上面部分左边的那个梯形


        var path5 = new fabric.Polygon([
        { x: 140 / 160 * iwidth, y: 22 / 200 * iheight },
        { x: 135 / 160 * iwidth, y: 20 / 200 * iheight },
        { x: 135 / 160 * iwidth, y: 50 / 200 * iheight },
        { x: 140 / 160 * iwidth, y: 48 / 200 * iheight }
        ]);
        path5.set({
            left: 57.5 / 160 * iwidth,
            top: -80 / 200 * iheight,
            hasBorders: false,
            strokeWidth: 0.3,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 30 / 200 * iheight,

            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'

            }
        });

        this.group.addWithUpdate(path5);
        this._addToShape(path5); //上面部分右边的那个梯形*/


        var path6 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth,
            height: 130 / 200 * iheight,
            hasBorders: false,
            left: 0,
            top: -30 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });
        path6.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 130 / 200 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path6);
        this._addToShape(path6); //最下面的大矩形

        var path7 = new fabric.Polygon([
        { x: 50 / 160 * iwidth, y: 50 / 200 * iheight },
        { x: 50 / 160 * iwidth, y: 180 / 200 * iheight },
        { x: 110 / 160 * iwidth, y: 180 / 200 * iheight },
        { x: 110 / 160 * iwidth, y: 50 / 200 * iheight },
        { x: 100 / 160 * iwidth, y: 50 / 200 * iheight },
        { x: 100 / 160 * iwidth, y: 170 / 200 * iheight },
        { x: 60 / 160 * iwidth, y: 170 / 200 * iheight },
        { x: 60 / 160 * iwidth, y: 50 / 200 * iheight }
        ]);
        path7.set({
            left: 0,
            top: -50 / 200 * iheight,
            hasBorders: false,
            fill: 'rgb(219,202,192)',
            originX: 'center',
            originY: 'top'
        });


        this.group.addWithUpdate(path7);
        this._addToShape(path7);

        var path8 = new fabric.Circle({
            left: 0,
            top: 0,
            radius: 10 / 160 * iwidth * 0.8 * iheight / iwidth,
            startAngle: -Math.PI / 2,
            endAngle: Math.PI / 2,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            fill: null,
            hasBorders: false,
            left: -10/160*iwidth,
            top: 0,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path8);
        this._addToShape(path8);


        var pathstring9 = 'M0,' + 100 / 200 * iheight + ' L' + 70 / 160 * iwidth + ',' + 100 / 200 * iheight + '';
        var path9 = new fabric.Path(pathstring9);
        path9.set({
            hasBorders: false,
            strokeWidth: 5/160*iwidth,
            stroke: 'yellow',
            left: -45 / 160 * iwidth,
            top:0,
            originX: 'center',
            originY: 'top'
        
        });

        this.group.addWithUpdate(path9);
        this._addToShape(path9);



        var pathstring10 = 'M0,' + 100 / 200 * iheight + ' L' + 50 / 160 * iwidth + ',' + 100 / 200 * iheight + '';
        var path10 = new fabric.Path(pathstring10);
        path10.set({
            hasBorders: false,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            left: -35 / 160 * iwidth,
            top: 20/200*iheight,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path10);
        this._addToShape(path10);

        var path11 = new fabric.Circle({
            left: 0,
            top: 0,
            radius: 10 / 160 * iwidth*0.8*iheight/iwidth,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 2,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            fill: null,
            hasBorders: false,
            left: -60 / 160 * iwidth,
            top:  20 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path11);
        this._addToShape(path11);

        var pathstring12 = 'M0,' + 100 / 200 * iheight + ' L' + 50 / 160 * iwidth + ',' + 100 / 200 * iheight + '';
        var path12 = new fabric.Path(pathstring10);
        path12.set({
            hasBorders: false,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            left: -35 / 160 * iwidth,
            top: 40 / 200 * iheight,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path12);
        this._addToShape(path12);


        var path13 = new fabric.Circle({
            left: 0,
            top: 0,
            radius: 10 / 160 * iwidth * 0.8 * iheight / iwidth,
            startAngle: -Math.PI / 2,
            endAngle: Math.PI / 2,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            fill: null,
            hasBorders: false,
            left: -10 / 160 * iwidth,
            top: 40/200*iheight,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path13);
        this._addToShape(path13);


        var pathstring14 = 'M0,' + 100 / 200 * iheight + ' L' + 70 / 160 * iwidth + ',' + 100 / 200 * iheight + '';
        var path14 = new fabric.Path(pathstring9);
        path14.set({
            hasBorders: false,
            strokeWidth: 5 / 160 * iwidth,
            stroke: 'yellow',
            left: -45 / 160 * iwidth,
            top: 60/200*iheight,
            originX: 'center',
            originY: 'top'

        });

        this.group.addWithUpdate(path14);
        this._addToShape(path14);






        //下面的两个梯形部分
        /*  var pathstring = 'M0,' + iheight * 75 / 150 + ' L' + iwidth * 13.5 / 80 + ',' + iheight * 105 / 150 + ' L' + iwidth * 26.5 / 80 + ',' + iheight * 105 / 150 + 'L' + iwidth * 40 / 80 + ',' + iheight * 75 / 150 + ' L 0,' + iheight * 75 / 150 + '';
        var path2 = new fabric.Path(pathstring);
        path2.set({
        left: -iwidth / 4,
        top: 0,
        hasBorders: false,
        strokeWidth: 0.3,
        stroke: 'black',
        originX: 'center',
        originY: 'top'
        });
        path2.setGradient('fill', {
        x1: 0,
        y1: 0,
        x2: iwidth * 40 / 80,
        y2: 0,

        colorStops: {
        0: 'rgb(102,102,108)',
        0.5: 'rgb(219,202,192)',
        1: 'rgb(102,102,108)'

        }
        });

        this.group.addWithUpdate(path2);
        this._addToShape(path2);


        var pathstring = 'M0,' + iheight * 75 / 150 + ' L' + iwidth * 13.5 / 80 + ',' + iheight * 105 / 150 + ' L' + iwidth * 26.5 / 80 + ',' + iheight * 105 / 150 + 'L' + iwidth * 40 / 80 + ',' + iheight * 75 / 150 + ' L 0,' + iheight * 75 / 150 + '';
        var path3 = new fabric.Path(pathstring);
        path3.set({
        left: iwidth / 4,
        top: 0,
        hasBorders: false,
        strokeWidth: 0.3,
        stroke: 'black',
        originX: 'center',
        originY: 'top'
        });
        path3.setGradient('fill', {
        x1: 0,
        y1: 0,
        x2: iwidth * 40 / 80,
        y2: 0,

        colorStops: {
        0: 'rgb(102,102,108)',
        0.5: 'rgb(219,202,192)',
        1: 'rgb(102,102,108)'

        }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);*/



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 三相炉变 FurnaceThreePhase';
    }
});



