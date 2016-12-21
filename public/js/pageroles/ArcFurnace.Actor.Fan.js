/**
* Created by ZHAN on 2016/3/25.
*/
//风机,不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Fan = fabric.util.createClass(ActorsBase, {
   
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 51,   //used by actors，宽高比为61:51；等比变换
            Width: 61,      
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
            width:iwidth,
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
        //左边水管
        var pathstring1 = 'M' + 3 / 61 * iwidth + ',' + 2 / 51 * iheight + 'L' + iwidth / 2 + ',' + 2 / 51 * iheight + ' L' + iwidth/2 + ',' + 16 / 51 * iheight + ' L' + 3 / 61 * iwidth + ',' + 16 / 51 * iheight + 'L0,' + 13 / 51 * iheight + 'L0,' + 5 / 51 * iheight + 'L' + 3 / 61 * iwidth + ',' + 2 / 51 * iheight + ' L' + 3 / 61 * iwidth + ',' + 16 / 51 * iheight + '';
        var path1 = new fabric.Path(pathstring1);
        path1.set({
            left: -15.25/61*iwidth,
            top: -21 / 51 * iheight,
            stroke: 'black',
            strokeWidth: 0.2,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 14 / 51 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'
            }
        });


        this.group.addWithUpdate(path1);
        this._addToShape(path1);

    //右边水管
        var pathstring2 = 'M' + 58/ 61 * iwidth + ',' + 22 / 51 * iheight + 'L' +iwidth + ',' + 25 / 51 * iheight + ' L' +iwidth + ',' + 33 / 51 * iheight + ' L' + 58 / 61 * iwidth + ',' + 36 / 51 * iheight + 'L'+iwidth/2+',' + 36 / 51 * iheight + 'L'+iwidth/2+',' + 22 / 51 * iheight + 'L' + 58 / 61 * iwidth + ',' + 22 / 51 * iheight + ' L' + 58 / 61 * iwidth + ',' + 36 / 51 * iheight + '';
        var path2 = new fabric.Path(pathstring2);
        path2.set({
            left:15.25 / 61 * iwidth,
            top: 3.5/ 51 * iwidth,
            stroke: 'black',
            strokeWidth: 0.2,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 14 / 51 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'
            }
        });


        this.group.addWithUpdate(path2);
        this._addToShape(path2);



        //外圆
          var path3 = new fabric.Circle({

            radius: 21.5 / 61*iwidth,
            fill: 'rgb(102,102,108)',
            hasBorders: false,
            left: -1/61*iwidth,
            top: -4 / 51 * iheight,
            originX: 'center',
            originY: 'center'
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);
        //内圆
        var path4 = new fabric.Circle({

            radius: 17.5 / 61 * iwidth,
            fill: 'green',
            hasBorders: false,
            left: -1 / 61 * iwidth,
            top: -4 / 51 * iheight,
            originX: 'center',
            originY: 'center'
        });

        this.group.addWithUpdate(path4);
        this._addToShape(path4);
        //最下面的矩形

        var path5 = new fabric.Rect({
            left: 0,
            top: 0,
            width: 43 / 61 * iwidth,
            height: 8 /51 * iheight,
            hasBorders: false,
            left: -1 / 61 * iwidth,
            top: 21.5 / 51 * iheight,
            originX: 'center',
            originY: 'center'
        });
        path5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 8 / 51 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'
            }
        });


        this.group.addWithUpdate(path5);
        this._addToShape(path5);

      


        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 风机 Equipment_Fan';
    }
});



