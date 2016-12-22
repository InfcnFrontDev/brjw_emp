/**
* Created by ZHAN on 2016/3/25.
*/
//终端状态
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.WirelessSessionState = fabric.util.createClass(ActorsBase, {
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 35,
            Width: 36,
       //     ValveState: '中间态',
       //     FillColor: 'gray'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        // 下面几行为默认颜色，根据ValveState值设置
        this.color0 = 'gray';
        this.color1 = 'gray';
        this.color2 = 'gray';
        this.color3 = 'gray';
        this.state = false;    //信号标记符状态字   
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //根据ValveState值设置阀门颜色
    _setcolor: function (value1,value2) {
        switch (value2) {
            case undefined://默认信号强度0
                this.color0 = 'gray';
                this.color1 = 'gray';
                this.color2 = 'gray';
                this.color3 = 'gray';
                break;

            case 0:
                this.color0 = 'gray';
                this.color1 = 'gray';
                this.color2 = 'gray';
                this.color3 = 'gray';
             //   this.state = false;
                break;

            case 1:
                this.color0 = '#00BFFF';          //deepskyblue
                this.color1 = 'gray';
                this.color2 = 'gray';
                this.color3 = 'gray';
              //  this.state = true;
                break;

            case 2:
                this.color0 = '#00BFFF';
                this.color1 = '#00BFFF';
                this.color2 = 'gray';
                this.color3 = 'gray';
             //   this.state = true;
                break;


            case 3:
                this.color0 = '#00BFFF';
                this.color1 = '#00BFFF';
                this.color2 = '#00BFFF';
                this.color3 = 'gray';
             //   this.state = true;
                break;


            case 4:
                this.color0 = '#00BFFF';
                this.color1 = '#00BFFF';
                this.color2 = '#00BFFF';
                this.color3 = '#00BFFF';
             //   this.state = true;
                break;
            default:
                this.color0 = '#00BFFF';
                this.color1 = '#00BFFF';
                this.color2 = '#00BFFF';
                this.color3 = '#00BFFF';
                break;
        }
        this.state = value1;

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


        //信号强度矩形
        var signalSize_Width = 8 / 36 * iwidth;
        var signalSize_Height = 10 / 35 * iheight;
        var spaceWidth = 2 / 35 * iwidth;
        var path = new Array(5);
        for (var i = 0; i < 4; i++) {
            path[i] = new fabric.Rect({
                left: 0,
                top: 0,
                width: signalSize_Width,
                height: signalSize_Height,
                fill: 'gray',
                hasBorders: false,
                left: -iwidth / 2 + signalSize_Width / 2 + signalSize_Width * i + spaceWidth * i,
                top: -iheight / 2 + iheight - signalSize_Height,
                originX: 'center',
                originY: 'top'
            });
            this.refreshObjs.push(path[i]);
            this.group.addWithUpdate(path[i]);
            this._addToShape(path[i]);
            signalSize_Height += 5 / 35 * iheight;
        }

        //画信号标记符

        var signal = new fabric.Circle({

            radius: 8 / 36 * iwidth,
            fill: 'red',
            hasBorders: false,
            visible: !this.state,
            left: -iwidth / 2 + 8 / 35 * iwidth,
            top: -iheight / 2,
            originX: 'center',
            originY: 'top'
        });
        this.refreshObjs.push(signal);
        this.group.addWithUpdate(signal);
        this._addToShape(signal);

        var pathstring = 'M' + 4 / 35 * iwidth + ',' + 4 / 36 * iheight + 'L' + 12 / 35 * iwidth + ',' + 12 / 36 * iheight + ' M' + 12 / 35 * iwidth + ',' + 4 / 36 * iheight + 'L' + 4 / 35 * iwidth + ',' + 12 / 36 * iheight + '';

        var signalpath = new fabric.Path(pathstring);
        signalpath.set({
            left: -9.5 / 35 * iwidth,
            top: -10 / 36 * iwidth,
            stroke: 'black',
            strokeWidth: 1 / 35 * iwidth,
            visible: !this.state,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.refreshObjs.push(signalpath);
        this.group.addWithUpdate(signalpath);
        this._addToShape(signalpath);



        var text = new fabric.Text('G', {
            fontSize: 25,
            fill: '#00BFFF',
            left: -7 / 35 * iwidth,
            top: -6 / 36 * iheight,
            visible: this.state,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });

        this.refreshObjs.push(text);
        this.group.addWithUpdate(text);
        this._addToShape(text);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        this._setcolor(this.option.LoginState, this.option.SignalStrength);

        var obj0 = this.refreshObjs[0];          //开关颜色

        obj0.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj0.height,
            colorStops: {
                0: this.color0,
                1: this.color0
            }
        });
        var obj1 = this.refreshObjs[1];

        obj1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj1.height,
            colorStops: {
                0: this.color1,

                1: this.color1
            }
        });

        var obj2 = this.refreshObjs[2];

        obj2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj2.height,
            colorStops: {
                0: this.color2,

                1: this.color2
            }
        });

        var obj3 = this.refreshObjs[3];

        obj3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: obj3.height,
            colorStops: {
                0: this.color3,

                1: this.color3
            }
        });
        var obj4 = this.refreshObjs[4];
        obj4.set({  
        visible:!this.state
        });

      var obj5 = this.refreshObjs[5];
     obj5.set({
        visible:!this.state
    });

   var obj6 = this.refreshObjs[6];
    obj6.set({
        visible:this.state
    });
        this._renderRefresh();
    },

    toString: function () {
        return ' 终端状态 Equipment_WirelessSessionState';
    }
});





