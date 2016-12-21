/**
* Created by ZHAN on 2016/3/25.
*/
//电极，不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Electrode = fabric.util.createClass(ActorsBase, {
    
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为34:20；等比变换
            Width: 19.2,   //used by actors   
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
       // this.canvas.renderAll();
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


        //上面的三个矩形部分
        var path1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iwidth,
            height: iheight * 89 / 150,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path1.set({
            left: 0,
            top: -iheight / 2,
            originX: 'center',
            originY: 'top'

        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth,
            y2: 0,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path1);
        this._addToShape(path1);

        var path2 = new fabric.Rect({
            left: 6/45*iwidth,
            top: 89/150*iheight,
            width: 33/45*iwidth,
            height: iheight * 8 / 150,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path2.set({
            left: 0,
            top: iheight *14/ 150,  //14=89-150/2
            originX: 'center',
            originY: 'top'

        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2:iwidth*33/45,
            y2: 0,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path2);
        this._addToShape(path2);

        var path3 = new fabric.Rect({
            left: 12.5/45*iwidth,
            top: 97/150*iheight,
            width: iwidth*20/45,
            height: iheight * 40 / 150,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path3.set({
            left: 0,
            top: iheight *22/ 150,   //22=97-150/2
            originX: 'center',
            originY: 'top'

        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth*20/45,
            y2: 0,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'


            }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);

       //下面的锥形部分
        var pathstring = 'M' + iwidth * 12.5 / 45 + ',' + iheight * 137 / 150 + ' L' + iwidth * 22.5 / 45 + ',' + iheight + 'L' + iwidth * 32.5 / 45 + ',' + iheight*137/150 + 'L' + iwidth * 12.5 / 45 + ',' + iheight * 137 / 150 + '';
        var path4 = new fabric.Path(pathstring);
        path4.set({
            left: 0,
            top: iheight * 62 / 150,
            hasBorders: false,
            strokeWidth: 0.3,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth*20/45,
            y2: 0,

            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'

            }
        });

        this.group.addWithUpdate(path4);
        this._addToShape(path4);





        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 电极 Electrode';
    }
});



