/**
* Created by ZHAN on 2016/3/22.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.OwmValve1 = fabric.util.createClass(ActorsBase, {
    // 调节阀
    
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 80,   //used by actors，宽高比为1:1；等比变换
            Width: 80,   //used by actors   
//            ValveState: '中间态',  //默认状态‘中间态’； public enum ValveState {关=0, 关到位=1, 开=2, 开到位=3, 未知(中间态)=4};
//            FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面三行为阀门颜色，根据ValveState值设置
        this.color1 = 'gray';         //开关默认颜色1
        this.color2 = 'white'; //开关默认颜色2
        this.color3 = 'gray';         //开关默认颜色3
        this.ValveState = this.option.ValveState;        //开关状态
        // this.valveState1 = this.option.ValveState1;
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //根据ValveState值设置阀门颜色
    _setcolor: function (value1, value2) {
        switch (value1) {
            case '关':
                //this.color1 = 'gray';          //Magenta
                //this.color2 = 'white';
                this.color3 = '#FF0000';
                break;

            case '关到位':
                //this.color1 = '#8B0000';
                //this.color2 = '#FF0000';
                this.color3 = 'gray';            //darkred #8B0000
                break;

            case '开':
                //this.color1 = 'gray';            // LightGreen   #90EE90
                //this.color2 = 'white';
                this.color3 = '#00FF00';
                break;

            case '开到位':
                //this.color1 = '#006400';            //DarkGreen
                //this.color2 = '#00FF00';
                this.color3 = 'gray';           //lime
                break;

            default:
                //this.color1 = 'gray';
                //this.color2 = 'white';
                this.color3 = 'gray';
                break;
        }
        switch (value2) {
            case '关':
                this.color1 = 'gray';          //Magenta
                this.color2 = 'white';
              //  this.color3 = '#FF0000';
                break;

            case '关到位':
                this.color1 = '#8B0000';
                this.color2 = '#FF0000';
              //  this.color3 = 'gray';            //darkred #8B0000
                break;

            case '开':
                this.color1 = 'gray';            // LightGreen   #90EE90
                this.color2 = 'white';
              //  this.color3 = '#00FF00';
                break;

            case '开到位':
                this.color1 = '#006400';            //DarkGreen
                this.color2 = '#00FF00';
              //  this.color3 = 'gray';           //lime
                break;

            default:
                this.color1 = 'gray';
                this.color2 = 'white';
              //  this.color3 = 'gray';
                break;
        }
        

    },


    //     _setcolor1: function (value) {
    //        switch (value) {
    //            case '关':
    //                this.color3 = '#FF0000'; //red
    //                break;

    //            /* case '关到位':
    //            this.color1 = '#8B0000';
    //            this.color2 = '#FF0000';            //darkred #8B0000
    //            break;*/ 

    //            case '开':
    //                this.color3 = '#00FF00'; //lime
    //                break;

    //            /* case '开到位':
    //            this.color1 = '#006400';            //DarkGreen
    //            this.color2 = '#00FF00';            //lime
    //            break;*/ 

    //            default:
    //                this.color3 = 'gray';
    //                break;
    //        }

    //    },







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
        //两个角对角的三角形
        var pathstring1 = 'M0,' + iheight / 2 + 'L0,' + iheight + 'L' + iwidth + ',' + iheight / 2 + '';
        pathstring1 = pathstring1.concat('L' + iwidth + ',' + iheight + ' L0,' + iheight / 2 + '');
        var path1 = new fabric.Path(pathstring1);
        path1.set({
            left: 0,
            top: 0,
            hasBorders: false,
            strokeWidth: 0.5,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight / 2,
            colorStops: {
                0: this.color1,
                0.5: this.color2,
                1: this.color1

            }
        });
        this.refreshObjs.push(path1);
        this.group.addWithUpdate(path1);
        this._addToShape(path1);

        //中间直线

        var pathstring2 = 'M' + iwidth / 2 + ',' + iheight * 3/8 + 'L' + iwidth / 2 + ',' + iheight *3/4 + ''; //中间的那道粗线
        var path2 = new fabric.Path(pathstring2);
        path2.set({
            hasBorders: false,
            strokeWidth: 1,
            stroke: '#9d9d9d',
            left: 0,
            top:-iheight/8,
            originX: 'center',
            originY: 'top'
        });

        /* path2.setGradient('fill', {中间的粗线不需要渐变，故不需要这一段
        x1: 0,
        y1: 0,
        x2: 0,
        y2: iheight,
        colorStops: {
        0: this.color1,
        0.5: this.color2,
        1: this.color1

        }
        });*/


        this.group.addWithUpdate(path2);
        this._addToShape(path2);


        //上面的矩形
        var pathstring3 = 'M' + iwidth / 8 + ',0 L' + iwidth * 7/8 + ',0 L' + iwidth * 7/8 + ',' + iheight * 3 / 8 + ' L' + iwidth / 8 + ',' + iheight * 3 / 8 + 'L' + iwidth / 8 + ',0';
        var path3 = new fabric.Path(pathstring3);
        path3.set({
            left: 0,
            top: -iheight / 2,
            hasBorders: false,
            stroke: 'black',
            strokeWidth:0.5,
            fill: this.color3,
            originX: 'center',
            originY: 'top'
        });

        this.refreshObjs.push(path3);
        this.group.addWithUpdate(path3);
        this._addToShape(path3);





        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        this._setcolor(this.option.ValveState1, this.option.ValveState2);

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
        var obj1 = this.refreshObjs[1];

        obj1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj1.height,
            fill: this.color3,
             colorStops: {
                0: this.color3,
               
                1: this.color3
            }
        });

        this._renderRefresh();
    },

    toString: function () {
        return ' 调节阀 OwmValvel';
    }
});



