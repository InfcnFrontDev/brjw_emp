/**
* Created by ZHAN on 2016/3/22.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.Onoff = fabric.util.createClass(ActorsBase, {
    // 开关 Onoff
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 37.64706,   //used by actors，宽高比为34:20；等比变换
            Width: 64,   //used by actors   
            ValveState: '中间态',  //默认状态‘中间态’； public enum ValveState 开 = 0, 关 = 1, 开到位 = 2, 关到位 = 3, 中间态 = 4;
            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为开关颜色，根据ValveState值设置
        this.color1 = 'gray';         //开关默认颜色1
        this.color2 = 'white';          //开关默认颜色2
        this.ValveState = this.option.ValveState;        //开关状态
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
     //   this.canvas.renderAll();
    },

    //根据ValveState值设置开关颜色
    _setcolor: function (value) {
        switch (value) {
            case '关':
                this.color1 = '#FF00FF';          //Magenta
                this.color2 = 'white';
                break;

            case '关到位':
                this.color1 = 'red';
                this.color2 = '#FF00FF';            //Magenta
                break;

            case '开':
                this.color1 = '#90EE90';            // LightGreen   #90EE90
                this.color2 = 'white';
                break;

            case '开到位':
                this.color1 = '#006400';            //DarkGreen
                this.color2 = '#90EE90';            //LarkGreen
                break;

            default:
                this.color1 = 'gray';
                this.color2 = 'white';
                break;
        }

    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        this._setcolor(this.option.ValveState);

        //original shape outline
//         var rect0 = new fabric.Rect({
//             left: 0,
//             top: 0,
//             height: iheight,
//             width: iwidth,
//             fill: 'yellow',
//             opacity: 0.3,
//             visible: true,
//             hasBorders: false,
//             originX: 'center',
//             originY: 'center'
//         });
//         this.topgroup.addWithUpdate(rect0);

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

        var pathstring = 'M0,0L0,' + iheight + 'L' + iwidth + ',0';
        pathstring = pathstring.concat('L' + iwidth + ',' + iheight + 'z');
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
            x2: 0,
            y2: iheight,
            colorStops: {
                0: this.color1,
                0.5: this.color2,
                1: this.color1

            }
        });
        this.refreshObjs.push(path);
        this.group.addWithUpdate(path);
        this._addToShape(path);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        this._setcolor(this.option.ValveState);

        var obj = this.refreshObjs[0];          //开关颜色

        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj.height,
            colorStops: {
                0: this.color1,
                0.5: this.color2,
                1: this.color1
            }
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' 开关 Onoff';
    }
});



