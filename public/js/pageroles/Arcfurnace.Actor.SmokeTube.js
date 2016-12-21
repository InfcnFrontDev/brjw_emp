/**
* Created by ZHAN on 2016/3/25.
*/
//Y型烟管最大直径为10
//不需要刷新
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.SmokeTube = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY, Diameter) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为5:3；等比变换
            Width: 64,   //used by actors   
            Diameter:Diameter,
            WireColor: 'red',
            Visible: true,
            Enabled: true
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },


    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var _diameter = this.option.Diameter;
        var sqrtDiameter = Math.sqrt((_diameter / 2) * (_diameter / 2) * 2); //10/2*10/2/2,再开平方根
        var sqrtLen = Math.sqrt((iwidth-sqrtDiameter)*(iwidth-sqrtDiameter)/2);
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
        

        var path1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: sqrtDiameter,
            height: sqrtLen,
            angle: 45,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });

        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: sqrtDiameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });


        this.group.addWithUpdate(path1);
        this._addToShape(path1);
        this.refreshObjs.push(path1);

        var path2 = new fabric.Rect({
            left: 0,
            top: 0,
            width: sqrtDiameter,
            height: sqrtLen,
            angle: -45,
            hasBorders: false,
            fill: null,
            stroke: 'black',
            originX: 'center',
            originY: 'top'
        });

        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: sqrtDiameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });


        this.group.addWithUpdate(path2);
        this._addToShape(path2);
        this.refreshObjs.push(path2);


        var path3 = new fabric.Polyline([

                { x: iwidth / 2 - _diameter/2, y: iheight / 2 },
                { x: iwidth / 2, y: iheight / 2 + _diameter/2 },
                { x: iwidth / 2 + _diameter/2, y: iheight / 2 },
                { x: iwidth / 2 + _diameter/2, y: _diameter },
                { x: iwidth/2-_diameter/2,y:0}

            ]);
        path3.set({
            left: 0,
            top: -iheight / 2,
            hasBorders: false,
            stroke:null,
            originX: 'center',
            originY: 'top'
        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: _diameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });

        this.group.addWithUpdate(path3);
        this._addToShape(path3);
        this.refreshObjs.push(path3);


        var path4 = new fabric.Polyline([

                { x: iwidth / 2 - _diameter/2, y: 0 },
                { x: iwidth, y:0 },
                { x: iwidth , y: _diameter},
                { x: iwidth / 2 + _diameter/2, y: _diameter }
                

            ]);
        path4.set({
            left: iwidth/4-_diameter/4,
            top: -iheight / 2,
            hasBorders: false,
            stroke: null,
            originX: 'center',
            originY: 'top'
        });
        path4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2:0,
            y2: _diameter,

            colorStops: {
                0: 'black',
                0.5:this.option.WireColor,
                1: 'black'

            }
        });

        this.group.addWithUpdate(path4);
        this._addToShape(path4);
        this.refreshObjs.push(path4);


        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var _diameter = this.option.Diameter;
        var sqrtDiameter = Math.sqrt((_diameter / 2) * (_diameter / 2) * 2); //10/2*10/2/2,再开平方根
        var sqrtLen = Math.sqrt((iwidth - sqrtDiameter) * (iwidth - sqrtDiameter) / 2);
        var obj;
        obj = this.refreshObjs[0];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: sqrtDiameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });

        obj = this.refreshObjs[1];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: sqrtDiameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });
        
        obj = this.refreshObjs[2];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: _diameter,
            y2: 0,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'
            }
        });

        obj = this.refreshObjs[3];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: _diameter,

            colorStops: {
                0: 'black',
                0.5: this.option.WireColor,
                1: 'black'

            }
        });

        this._renderRefresh();
    },

    toString: function () {
        return ' Y型烟管 SmokeTube';
    }
});



