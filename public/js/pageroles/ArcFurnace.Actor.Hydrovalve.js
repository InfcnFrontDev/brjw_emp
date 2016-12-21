/**
* Created by ZHAN on 2016/3/22.
*/
//水阀
//需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Hydrovalve = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 60,   //used by actors，宽高比为60:60；等比变换
            Width: 60,   //used by actors   
            ValveState: '中间态',  //默认状态‘中间态’； public enum ValveState {关=0, 关到位=1, 开=2, 开到位=3, 未知(中间态)=4};
            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面为阀门颜色，根据ValveState值设置
        this.color1 = 'red';         //开关默认颜色1

        this.ValveState = this.option.ValveState;        //开关状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    //根据ValveState值设置阀门颜色
    _setcolor: function (value) {
        switch (value) {
            case false:
                this.color1 = 'red';          //red

                break;

            /* case '关到位':
            this.color1 = 'red';
            this.color2 = '#FF00FF';            //Magenta
            break;*/ 

            case true:
                this.color1 = 'green';            //green

                break;

            /* case '开到位':
            this.color1 = '#006400';            //DarkGreen
            this.color2 = '#90EE90';            //LarkGreen
            break;*/ 

            default:
                this.color1 = 'red';
                break;
        }

    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setcolor(this.option.ValveState);

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
        //最上面的矩形

        var path1 = new fabric.Rect({
            left: 12 / 60 * iwidth,
            top: 0,
            width: 36 / 60 * iwidth,
            height: 16 / 60 * iheight,
            hasBorders: false,
            fill: this.color1,
            left: 0,
            top: -iheight / 2,
            originX: 'center',
            originY: 'top'

        });
        this.refreshObjs.push(path1);
        this.group.addWithUpdate(path1);
        this._addToShape(path1);
        //中间连接的小管道
        var path2 = new fabric.Rect({

            left: 28 / 60 * iwidth,
            top: 16 / 60 * iheight,
            width: 4 / 60 * iwidth,
            height: 8 / 60 * iheight,
            hasBorders: false,
            fill: 'rgb(20,68,94)',
            left: 0,
            top: -14 / 60 * iheight,
            originX: 'center',
            originY: 'top'

        });
        this.group.addWithUpdate(path2);
        this._addToShape(path2);
        //中间的矩形

        var path3 = new fabric.Rect({
            left: 12 / 60 * iwidth,
            top: 24 / 60 * iheight,
            width: 36 / 60 * iwidth,
            height: 24 / 60 * iheight,
            hasBorders: false,
            stroke: 'black',
            strokeWidth: 0.3,
            left: 0,
            top: -6 / 60 * iheight,
            originX: 'center',
            originY: 'top'
        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 24 / 60 * iheight,
            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'
            }
        });
        this.group.addWithUpdate(path3);
        this._addToShape(path3);

        //两头的水管接口

        var pathstring4 = 'M0,' + 30 / 60 * iheight + ',L0,' + 42 / 60 * iheight + ',L' + 12 / 60 * iwidth + ',' + 48 / 60 * iheight + 'L' + 12 / 60 * iwidth + ',' + 24 / 60 * iheight + 'L0,' + 30 / 60 * iheight + '';
        var path4 = new fabric.Path(pathstring4);
        path4.set({
            left: -2 / 5 * iwidth,
            top: -6 / 60 * iheight,
            hasBorders: false,
            stroke: 'balck',
            strokeWidth: 0.3,
            originX: 'center',
            originY: 'top'
        });
        path4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 24 / 60 * iheight,
            colorStops: {

                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'
            }



        });
        this.group.addWithUpdate(path4);
        this._addToShape(path4);



        var pathstring5 = 'M'+48/60*iheight+',' + 24 / 60 * iheight + ',L'+48/60*iwidth+',' + 48 / 60 * iheight + ',L' + iwidth + ',' + 42 / 60 * iheight + 'L' + iwidth + ',' + 30 / 60 * iheight + 'L'+48/60*iwidth+',' + 24 / 60 * iheight + '';
        var path5 = new fabric.Path(pathstring5);
        path5.set({
            left: 2 / 5 * iwidth,
            top: -6 / 60 * iheight,
            hasBorders: false,
            stroke: 'balck',
            strokeWidth: 0.3,
            originX: 'center',
            originY: 'top'
        });
        path5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 24 / 60 * iheight,
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
        this._setcolor(this.option.SwitchState);

        var obj = this.refreshObjs[0];          //开关颜色

        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj.height,
            colorStops: {
                0: this.color1,

                1: this.color1
            }
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 水阀 Equipment_Hydrovallve';
    }
});



