/**
 * Created by ZHAN on 2016/1/14.
 */

var StoreCooling = StoreCooling || {};

StoreCooling.Cross2 = fabric.util.createClass(ActorsBase, {
//  上字管道  Cross2
    initialize: function(canvas, X,Y,Width,Height,RotateAngle,Flip,centerPX,centerPY,Diameter) {
        this.callSuper('initialize',canvas);
        this.defaultOptions = {         //set special actor's default options here
            Height:32,   //used by actors
            Width:64,   //used by actors
            Water:'无水',// public enum WaterType { 无水 = 0, 热水 = 1, 冷水 = 2 };
            FillColor:'black',
            ArrowColor:"SteelBlue",
            Diameter:10
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.option.Diameter = Diameter;            //设置初始直径
        this.refreshObjs = new Array();          //object' array for refresh
        this.topgroup =  this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },



    initializeobjs:function(){
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var idiameter = this.option.Diameter;
        switch (this.option.Water){
            case '热水': fillcolor="red";
                break;
            case '冷水': fillcolor="blue";
        }

        //draw image here
        // outline control rect; should be invisible
        var rect0 = new fabric.Rect({
            left:0,
            top:0,
            height:iheight,
            width:iwidth,
            fill:'yellow',
            opacity: 0.3,
            visible:false,
            hasBorders:false,
            originX: 'center',
            originY: 'center'
        });
        this.topgroup.addWithUpdate(rect0);

        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left:0,
            top:1,
            height:iheight*2-idiameter-1,
            width:iwidth-1,
            fill:'green',
            opacity:0.1,
            visible:false,
            hasBorders:false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        var rect1 = new fabric.Rect({
            left: 0,
            top:-idiameter/2,
            height:idiameter,
            width:iwidth,
            hasBorders:false,
            originX: 'center',
            originY: 'top'
        });
        rect1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: idiameter,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this.refreshObjs.push(rect1);
        this.group.addWithUpdate(rect1);
                    //  this._addToShape(rect1,{x:0,y:idiameter});

        var pathstring='M0,0L'+ idiameter+',0L'+ idiameter+','+(iheight-idiameter);
        pathstring = pathstring.concat(',L'+(idiameter/2)+','+(iheight-idiameter/2)+',L0,'+(iheight-idiameter)+'z');
        var path1 = new fabric.Path(pathstring);
        path1.set({
            left:0,
            top:-iheight+idiameter/2,   
            hasBorders:false,
            originX:'center',
            originY:'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: idiameter,
            y2: 0,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this.refreshObjs.push(path1);
        this.group.addWithUpdate(path1);
        //  this._addToShape(path1,{x:0,y:idiameter});

        //set group options
        this._setGroupOptions();
        this.group.setOptions({
            left: 0,
            top: (iheight - idiameter) / 2  
        });
        this._setTopgroupOptions();
        // 添加形状子图元，该图元中心点非外形矩形中心点
        this._addToShape(rect1);
        this._addToShape(path1);

        return this.topgroup;

    },

    refresh:function(options){
        this.setOption(options);
        switch (this.option.Water){
            case '热水': fillcolor="red";
                break;
            case '冷水': fillcolor="blue";
                break;
            default :
                fillcolor = 'black';
        }
        var obj = this.refreshObjs[0];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: this.option.Diameter,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        var obj = this.refreshObjs[1];
        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: this.option.Diameter,
            y2: 0,
            colorStops: {
                0:fillcolor,
                0.5: 'white',
                1:fillcolor
            }
        });
        this._setGroupOptions();
        this.group.setOptions({                 //仅用于 Cross2，因其旋转中心点
            left: 0,
            top: (this.option.Height - this.option.Diameter)/2  
        });
      //  this.canvas.renderAll();
        return this.topgroup;
    },

    toString: function() {
        return '上字管道  Cross2';
    }
});



