/**
* Created by ZHAN on 2016/3/25.
*/
//漏斗 不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Funnel = fabric.util.createClass(ActorsBase, {
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height:50,   //used by actors，宽高比为50:50；等比变换
            Width:50,   //used by actors   
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
        //this.canvas.renderAll();
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
            visible:false,
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

        //漏斗部分
        var W=iwidth/50;//计算实际宽度与默认宽度的倍数
        var H=iheight/50;//计算实际高度与默认高度的倍数
        var pathstring = "M"+0*W+","+0*H +"L"+0*W+","+"28*H"+"L"+1*W+","+28*H+"L"+2*W+","+30*H+"L"+3*W+","+31*H+"L"+4*W+","+32*H+"L" +5*W+","+33*H+"L"+6*W+","+34*H+"L"+7*W+","+35*H+"L"+8*W+","+36*H+"L"+9*W+","+37*H+"L"+10*W+","+38*H+"L"+11*W+","+39*H+"L"+11*W+","+50*H+"L"+39*W+","+50*H+"L"+40*W+","+38*H+"L"+41*W+","+37*H+"L"+42*W+","+36*H+"L"+43*W+","+35*H+"L"+44*W+","+34*H+"L"+45*W+","+33*H+"L"+46*W+","+32*H+"L"+47*W+","+31*H+"L"+48*W+","+30*H+"L"+50*W+","+28*H+"L"+50*W+","+0*H+"L"+0*W+","+0*H;
        var path = new fabric.Path(pathstring);
        path.set({
            left: 0,
            top: -iheight / 2,
            hasBorders: false,
            strokeWidth: 0.3,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 50*W,
            y2: 0,

            colorStops: {
                0: 'rgb(102,102,108)',
                0.5: 'rgb(219,202,192)',
                1: 'rgb(102,102,108)'

            }
        });

        this.group.addWithUpdate(path);
        this._addToShape(path);





        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 漏斗 Equipemnt_Funnel';
    }
});



