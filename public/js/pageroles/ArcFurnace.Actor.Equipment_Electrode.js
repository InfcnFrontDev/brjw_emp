/**
* Created by ZHAN on 2016/3/25.
*/
//电极，不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Equipment_Electrode = fabric.util.createClass(ActorsBase, {
   
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height:100,   //used by actors，宽高比为100:100；等比变换
            Width:100,   //used by actors   
//            ValveState: '中间态',  //默认状态‘中间态’； public enum ValveState {关=0, 关到位=1, 开=2, 开到位=3, 未知(中间态)=4};
//            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据ValveState值设置
//    this.color1 = 'gray';         //开关默认颜色1
//    this.color2 = 'white';          //开关默认颜色2
//    this.ValveState = this.option.ValveState;        //开关状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
    //    this.canvas.renderAll();
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
        //最上面部分的导线
        var pathstring = 'M  '+iwidth/2+',' + iheight/5 + 'L' + iwidth/2 + ',0';
        var path1 = new fabric.Path(pathstring);
        path1.set({
            left: 0,
            top: -iheight / 2,
            hasBorders: false,
            strokeWidth: 1,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        this.group.addWithUpdate(path1);
        this._addToShape(path1);

                //中间部分
        var path2 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight/ 5,
            width: iwidth,
            height: iheight/5,
            fill: 'black',
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
      

        this.group.addWithUpdate(path2);
        this._addToShape(path2);





        //        //最下面部分
        var path3 = new fabric.Rect({
            left: 0,
            top: -iheight / 2 + iheight * 2 / 5,
            width: iwidth,
            height: iheight * 3 / 5,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth,
            y2: 0,
            colorStops: {
                0: 'gray',
                0.5:'white',
                1: 'gray'


            }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);





        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);

        this._renderRefresh();
    },

    toString: function () {
        return ' 电极 Equipment_Electrode';
    }
});



