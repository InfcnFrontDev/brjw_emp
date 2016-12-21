/**
* Created by ZHAN on 2016/2/26.
*/

var StoreCooling = StoreCooling || {};
// 冻水机组  Unit
StoreCooling.Unit = fabric.util.createClass(ActorsBase, {
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 52.363636,   //used by actors
            Width: 64,   //used by actors
            //            Water:0,// public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
            //            FlowDirection:0,  // public enum FlowDirection {静止 = 0, 顺流 = 1, 逆流 = 2};
            FillColor: 'green',
 
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },
    // 初始化图元中的各个子图元
    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var iu = iwidth/220;             //长度基本单位,只支持200*180等比缩放

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
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'gray',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        //第1部分	主体矩形
        var rect1 = new fabric.Rect({
            left: 0,
            top: 0,
            width: iu*180,
            height: iu*80,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*80,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        //第2部分  主体矩形左边第1个矩形
       var rect2 = new fabric.Rect({
            left: -iu*95,
            top:  -iu*10,
            width: iu*10,
            height: iu*100,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*100,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect2);
        this._addToShape(rect2);

          //第3部分  主体矩形右边第1个矩形
       var rect3 = new fabric.Rect({
            left: iu*95,
            top:  -iu*10,
            width: iu*10,
            height: iu*100,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*100,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect3);
        this._addToShape(rect3);

      //第4部分  主体矩形右边第2个矩形
       var rect4 = new fabric.Rect({
            left: iu*105,
            top:  iu*10,
            width: iu*10,
            height: iu*60,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect4.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*60,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect4);
        this._addToShape(rect4);

       //第5部分  主体矩形左边第2个矩形
       var rect5 = new fabric.Rect({
            left: -iu*105,
            top:  iu*10,
            width: iu*10,
            height: iu*60,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect5.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*60,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect5);
        this._addToShape(rect5);

        //第6部分  主体矩形上面边粗立柱
       var rect6 = new fabric.Rect({
            left: iu*45,
            top:  -iu*30,
            width: iu*30,
            height: iu*30,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect6.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iu*30,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect6);
        this._addToShape(rect6);

       //第7部分  主体矩形上面边细立柱
       var rect7 = new fabric.Rect({
            left: -iu*35,
            top:  -iu*40,
            width: iu*10,
            height: iu*40,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect7.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: iu*10,
            y2: 0,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect7);
        this._addToShape(rect7);

       //第8部分  粗立柱上矩形
       var rect8 = new fabric.Rect({
            left: iu*45,
            top:  -iu*80,
            width: iu*50,
            height: iu*50,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect8.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*50,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect8);
        this._addToShape(rect8);

       //第9部分  细立柱上矩形
       var rect9 = new fabric.Rect({
            left: -iu*35,
            top:  -iu*70,
            width: iu*50,
            height: iu*30,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect9.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*30,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect9);
        this._addToShape(rect9);

       //第10部分  粗立柱上矩形右矩形
       var rect10 = new fabric.Rect({
            left: iu*75,
            top:  -iu*90,
            width: iu*10,
            height: iu*70,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect10.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*70,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect10);
        this._addToShape(rect10);

           //第11部分  粗立柱上矩形左矩形
       var rect11 = new fabric.Rect({
            left: iu*15,
            top:  -iu*90,
            width: iu*10,
            height: iu*70,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect11.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*70,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect11);
        this._addToShape(rect11);

           //第12部分  细立柱上矩形右矩形
       var rect12 = new fabric.Rect({
            left: -iu*7.5,
            top:  -iu*80,
            width: iu*5,
            height: iu*50,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect12.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*50,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect12);
        this._addToShape(rect12);

        //第13部分  细立柱上矩形左右矩形
       var rect13 = new fabric.Rect({
            left: -iu*57.5,
            top:  -iu*80,
            width: iu*5,
            height: iu*50,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX: 'center',
            originY: 'top'
        });
        rect13.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*50,
            colorStops: {
                0: fillcolor,
                0.5: 'white',
                1: fillcolor
            }
        });
        this.group.addWithUpdate(rect13);
        this._addToShape(rect13);

        //  中间梯形
        var pathstring='M0'+','+iu*20+'L'+ iu*15+',';
        pathstring = pathstring.concat('0L'+iu*15+','+iu*70+'L0,'+iu*50+'z');
        var path14 = new fabric.Path(pathstring);
        path14.set({
            left:iu*2.5,
            top:-iu*90,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX:'center',
            originY:'top'
        });
        path14.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*70,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this.group.addWithUpdate(path14);
        this._addToShape(path14);

           //  左梯形
        var pathstring='M0'+','+iu*2+'L'+ iu*5+',';
        pathstring = pathstring.concat('0L'+iu*5+','+iu*30+'L0,'+iu*28+'z');
        var path15 = new fabric.Path(pathstring);
        path15.set({
            left:-iu*62.5,
            top:-iu*70,
            strokeWidth: 0.1,
            hasBorders: false,
            stroke: fillcolor,
            originX:'center',
            originY:'top'
        });
        path15.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: iu*30,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this.group.addWithUpdate(path15);
        this._addToShape(path15);

        // 右弧形
        var pathstring='M0,0'+'C'+iu*20+',0,';
        pathstring = pathstring.concat(iu*20+','+iu*50+',0,'+iu*50+'z');
        var path16 = new fabric.Path(pathstring);
        path16.set({
            left:iu*87,
            top:-iu*80,
            fill:fillcolor,
            hasBorders:false,
            originX:'center',
            originY:'top'
        });
        this.group.addWithUpdate(path16);
        this._addToShape(path16);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {
        this.setOption(options);
        this._renderRefresh();
    },

    toString: function () {
        return ' 冻水机组(Unit) ' + this.callSuper('toString');
    }
});



