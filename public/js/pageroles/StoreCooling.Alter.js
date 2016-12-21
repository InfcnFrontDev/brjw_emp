/**
 * Created by ZHAN on 2016/1/14.
 */

var StoreCooling = StoreCooling || {};

StoreCooling.Alter = fabric.util.createClass(ActorsBase, {

    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,                    //used by actors
            Width: 64,                     //used by actors
            FillColor: 'cyan',
            Diameter: 10                  // should be equal to Height
        };
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();

    },
    //initialize: function(canvas, options) {
    //    this.callSuper('initialize',canvas);
    //    this.defaultOptions = {         //set special actor's options here
    //        Height:64,                    //used by actors
    //        Width:64,                     //used by actors
    //        FillColor:'cyan',
    //        Diameter:10                  // should be equal to Height
    //    };
    //    this.setOption(this.defaultOptions);
    //    this.setOption(options);
    //    this.topgroup =  this.initializeobjs();
    //    this.canvas.add(this.topgroup);
    //    this.canvas.renderAll();
    //
    //},

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        //original shape outline
        var rect0 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'yellow',
            opacity: 0.5,
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
            stroke: 'green',
            fill: null,
            opacity: 0.1,             //don't work when added to group
            visible: true,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        //draw actor's shape
        var rect1 = new fabric.Rect({ left: 0, top: 0, width: iwidth, height: iheight });
        rect1.set({
            fill: fillcolor,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });

        this.group.addWithUpdate(rect1);
        this._addToShape(rect1);

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {           //  只刷新颜色
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;


        var objpoint = 0;
        objpoint++;                                   //if rectrotate exists ,unnote this
        var obj = this.group.item(objpoint++);
        obj.set({ fill: fillcolor });

        this._renderRefresh();
    },

    toString: function () {
        return 'Alter Actor';
    }
});



