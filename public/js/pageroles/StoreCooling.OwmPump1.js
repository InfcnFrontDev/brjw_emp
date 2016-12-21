/**
 * Created by ZHAN on 2016/1/14.
 */

var StoreCooling = StoreCooling || {};

StoreCooling.OwmPump1 = fabric.util.createClass(ActorsBase, {
// 左右管道的泵  OwmPump1
    initialize: function(canvas, X,Y,Width,Height,RotateAngle,Flip,centerPX,centerPY) {
        this.callSuper('initialize',canvas);
        this.defaultOptions = {         //set special actor's options here
            Height:64,   //used by actors
            Width:64,   //used by actors
//            Water:0,// public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
//            FlowDirection:0,  // public enum FlowDirection {静止 = 0, 顺流 = 1, 逆流 = 2};
            FillColor:'black',
            ArrowColor:"SteelBlue",
            IsOpen:false,
            Diameter:10    // should be equal to Height
        };
        this.setOption(this.defaultOptions);
        this.setoption(X,Y,Width,Height,RotateAngle,Flip,centerPX,centerPY);
        this.refreshObjs = new Array();
        this.topgroup =  this.initializeobjs();
        this.canvas.add(this.topgroup);
     //   this.canvas.renderAll();
    },
    //initialize: function(canvas, options) {
    //    this.callSuper('initialize',canvas);
    //    this.defaultOptions = {         //set special actor's options here
    //        Height:64,   //used by actors
    //        Width:64,   //used by actors
    //        Water:0,// public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
    //        FlowDirection:0,  // public enum FlowDirection {静止 = 0, 顺流 = 1, 逆流 = 2};
    //        FillColor:'black',
    //        ArrowColor:"SteelBlue",
    //        OpenState:1,
    //        Diameter:10    // should be equal to Height
    //    };
    //    this.setOption(this.defaultOptions);
    //    this.setOption(options);
    //    this.refreshObjs = new Array();
    //    this.topgroup =  this.initializeobjs();
    //    this.canvas.add(this.topgroup);
    //    this.canvas.renderAll();
    //},

    _getLightColor:function(openstate){
        var lightcolor;
        switch (openstate){
            case false: lightcolor="red";
                break;
            case true: lightcolor="lime";
        }
        return lightcolor;
    },

    initializeobjs:function(){
        var iwidth      = this.option.Width;
        var iheight     = this.option.Height;
        var fillcolor   = this.option.FillColor;
        var iunit       = iwidth/10;
        var iopenstate  = this.option.IsOpen; // 开关状态： 关为false，开为true
        var lightcolor  = this._getLightColor(iopenstate);

        //original shape outline
        //var rect0 = new fabric.Rect({
        //    left:0,
        //    top:0,
        //    height:iheight,
        //    width:iwidth,
        //    fill:'yellow',
        //    opacity:0.3,
        //    visible:true,
        //    hasBorders:false,
        //    originX: 'center',
        //    originY: 'center'
        //});
        //this.topgroup.addWithUpdate(rect0);

        //draw image here
        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left:0,
            top:0,
            height:iheight,
            width:iwidth,
            fill:'yellow',
            opacity:0.1,
            visible:false,
            hasBorders:false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        //第一部分	左管口
        var rect1 = new fabric.Rect({
            left: 0-iwidth/2,
            top: iheight*3/20-iheight/2,     //manually adjusted:-1
            width: iwidth*2/20,
            height: iheight*6/20,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*6/20,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect1);
        this._addToShape(rect1);

        //第二部分  左管道
        var rect2 = new fabric.Rect({
            left: iwidth/10-iwidth/2,
            top: iheight/5-iheight/2,   //manually adjusted:-1
            width: iwidth/2-2,              //manually adjusted:-2
            height: iheight/5,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight/5,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect2);
        this._addToShape(rect2);
        //////第三部分  大底盘
        var rect3 = new fabric.Rect({
            left: iwidth*3/20-iwidth/2,
            top: iheight*9/10-iheight/2,
            width: iwidth*15/20,
            height: iheight/10,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth*15/20,
            y2: 0,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect3);
        this._addToShape(rect3);
        ////第四部分  底盘支撑柱
        var rect4 = new fabric.Rect({
            left: iwidth*6/20-iwidth/2,
            top: iheight*13/20-iheight/2,
            width: iwidth*8/20,
            height: iheight/4,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iwidth*8/20,
            y2: 0,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect4);
        this._addToShape(rect4);
        ////第五部分  泵身
        //var circle = new fabric.Circle({
        //    left:iwidth*4/20-iwidth/2,
        //    top: iheight/5-iheight/2,
        //    radius: iwidth*6/20,
        //    fill: 'gray',
        //    originX: 'left',
        //    originY: 'top'
        //});
        //this._addtoGroup(circle);
        //this._addToShape(circle);

        var ellipse = new fabric.Ellipse({
            left: iwidth * 4 / 20 - iwidth / 2,
            top: iheight / 5 - iheight / 2,
            rx: iwidth * 6 / 20,
            ry: iheight * 6 / 20,
            fill: 'gray',
            hasBorders: false,
            originX: 'left',
            originY: 'top'
        });
        this.group.addWithUpdate(ellipse);
        this._addToShape(ellipse);


        ////新加部分 中间状态背景
        var rect5 = new fabric.Rect({
            left: iwidth*6/20-iwidth/2,
            top: iheight*7/20-iheight/2,
            width: iwidth*8/20,
            height: iheight*6/20,
            originX: 'left',
            originY: 'top'
        });
        rect5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*6/20,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect5);
        ////第六部分  状态显示部分
        var rect6 = new fabric.Rect({
            left: iwidth*7/20-iwidth/2,
            top: iheight*8/20-iheight/2,
            width: iwidth*6/20,
            height: iheight*4/20,
            strokeWidth: 0.1,
            stroke: 'black',
            fill:lightcolor,
            originX: 'left',
            originY: 'top'
        });
        this.refreshObjs.push(rect6);              // push in object for refresh
        this._addtoGroup(rect6);
        ////第七部分  右管道
        var rect7 = new fabric.Rect({
            left: iwidth*14/20-iwidth/2,
            top: iheight*2/5-iheight/2+1,            //manually adjusted:+1
            width: iwidth*4/20,
            height: iheight/5,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect7.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight/5,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect7);
        this._addToShape(rect7);
        ////第八部分  右管口
        var rect8 = new fabric.Rect({
            left: iwidth*18/20-iwidth/2,
            top: iheight*7/20-iheight/2+1,           //manually adjusted:+1
            width: iwidth*2/20,
            height: iheight*6/20,
            strokeWidth: 0.1,
            stroke: 'black',
            originX: 'left',
            originY: 'top'
        });
        rect8.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iheight*6/20,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._addtoGroup(rect8);
        this._addToShape(rect8);
        //set group options
        this._setGroupOptions();
        this._setTopgroupOptions();
//        this.topgroup.add(this.group);
//        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh:function(options){
        this.setOption(options);
        var lightcolor = this._getLightColor(this.option.IsOpen);
        var obj = this.refreshObjs[0];
        obj.set({
            fill:lightcolor
        });
        this._renderRefresh();
    },

    toString: function() {
        return  ' OwmPump1'+this.callSuper('toString') ;
    }
});



