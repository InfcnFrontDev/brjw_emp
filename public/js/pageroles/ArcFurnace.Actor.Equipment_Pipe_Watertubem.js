/**
* Created by ZHAN on 2016/3/25.
*/
//水冷管，不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Pipe_Watertubem = fabric.util.createClass(ActorsBase, {
    // 开关 Onoff
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64 / 1.15,   //used by actors，宽高比为34:20；等比变换
            Width: 64,   //used by actors   
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
        //画图时分成七部分画
        //最左面第一部分的矩形
        var path1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth / 12,
            height: iheight,
            hasBorders: false,
            stroke: 'black',
            strokeWidth:0.5,
            originX: 'center',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        path1.set({
            left: -iwidth * 11 / 24,
            top:-iheight/2,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path1);
        this._addToShape(path1);
        //第二部分
        var path2 = new fabric.Rect({
            left: iwidth/12,
            top: iheight/5,
            width: iwidth / 15,
            height: iheight * 3 / 5,
            hasBorders: false,
//            stroke: 'black',
//            strokeWidth:0.3,
            originX: 'center',
            originY: 'top'
        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*3/5,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        path2.set({
            left: iwidth *(1/30-5/12),
            top: -iheight / 2*3/5,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path2);
        this._addToShape(path2);

        //第三部分
        var pathstring3 = 'M'+3/20*iwidth+','+iheight/5+' L'+3/20*iwidth+','+4/5*iheight+' L'+iwidth/4+','+9/10*iheight+' L'+iwidth/4+','+iheight/10+' L'+3/20*iwidth+','+iheight/5+' ';
        var path3 = new fabric.Path(pathstring3);
        path3.set({
            left: -iwidth*3/10,
            top: -iheight *8/20,
            hasBorders: false,
//            strokeWidth: 0.3,
//            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*0.8,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);
        //第四部分
        var path4 = new fabric.Rect({
            left: iwidth / 4,
            top: iheight / 10,
            width: iwidth / 2,
            height: iheight * 4 / 5,
            hasBorders: false,
            stroke: 'black',
            strokeWidth:0.6,
            originX: 'center',
            originY: 'top'
        });
        path4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight * 4 / 5,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        path4.set({
            left: 0,
            top: -iheight *2/ 5,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path4);
        this._addToShape(path4);
        //第五部分
        var pathstring5 = 'M' + 3/ 4 * iwidth + ',' + 9/10 * iheight + ' L' + iwidth*17 / 20 + ',' + 4 / 5 * iheight + ' L' + iwidth*17/ 20 + ',' + iheight /5 + ' L' + 3 / 4 * iwidth + ',' + iheight / 10 + ' ';
        var path5 = new fabric.Path(pathstring5);
        path5.set({
            left: iwidth * 3 / 10,
            top: -iheight * 8 / 20,
            hasBorders: false,
            stroke: 'black',
            strokeWidth: 0.8,
            originX: 'center',
            originY: 'top'
        });
        path5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight * 0.8,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        this.group.addWithUpdate(path5);
        this._addToShape(path5);
        //第六部分

        var path6 = new fabric.Rect({
            left: iwidth / 12,
            top: iheight / 5,
            width: iwidth / 15,
            height: iheight * 3 / 5,
            hasBorders: false,
//            stroke: 'black',
//            strokeWidth:0.3,
            originX: 'center',
            originY: 'top'
        });
        path6.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight * 3 / 5,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        path6.set({
            left: iwidth * (-1 / 30 + 5 / 12),
            top: -iheight / 2 * 3 / 5,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path6);
        this._addToShape(path6);
        //第七部分

        var path7 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth / 12,
            height: iheight,
            hasBorders: false,
            stroke: 'black',
            strokeWidth:0.5,
            originX: 'center',
            originY: 'top'
        });
        path7.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight,

            colorStops: {
                0: 'gray',
                0.5: 'white',
                1: 'gray'

            }
        });

        path7.set({
            left: iwidth * 11 / 24,
            top: -iheight / 2,
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path7);
        this._addToShape(path7);


        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 水冷管 Equipment_Pipe_Watertubem';
    }
});



