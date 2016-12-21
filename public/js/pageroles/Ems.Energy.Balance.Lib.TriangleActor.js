/**
* Created by liuhui on 2016/11/3.
*/

var Ems = Ems || {};
  Ems.Energy = Ems.Energy || {};
  Ems.Energy.Balance=Ems.Energy.Balance || {};
  Ems.Energy.Balance.Lib=Ems.Energy.Balance.Lib || {};
  Ems.Energy.Balance.Lib.TriangleActor = fabric.util.createClass(ActorsBase, {
    // 矩形
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,   //used by actors，宽高比为2:2；非等比变换
            Width: 128,   //used by actors   
            BackColor: 'white', //默认为白色
			FrameColor:'black',//默认为黑色
			FrameWidth: 1,//默认边框粗细为1
			RotateAngle:0,
            Filp:false
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组
        this.color = 'black';         //状态默认颜色1
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },



    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        //this._setcolor(this.option.Value);

        //var rect0 = new fabric.Rect({
        //    left: 0,
        //    top: 0,
        //    height: iheight,
        //    width: iwidth,
        //    fill: 'yellow',
        //    opacity: 0.3,
        //    visible: false,
        //    hasBorders: false,
        //    originX: 'center',
        //    originY: 'center'
        //});
        //this.topgroup.addWithUpdate(rect0);

        //// adjust rotatingpoint
        //var rectrotate = new fabric.Rect({
        //    left: 0,
        //    top: 0,
        //    height: iheight,
        //    width: iwidth ,
        //    fill: 'green',
        //    opacity: 0.1,
        //    visible: false,
        //    hasBorders: false,
        //    originX: 'center',
        //    originY: 'center'
        //});
        //this.group.addWithUpdate(rectrotate);

      
    	var tgle = new fabric.Triangle({
    		top: 0,
    		left: 0,
    		width: iwidth,
    		height: iheight,
    		fill: this.option.BackColor,
    		stroke:this.option.FrameColor,
     		strokeWidth: this.option.FrameWidth,
    		//angle: this.option.RotateAngle,
    		hasBorders: false,
    		flipX: this.option.Flip,
    	    selectable: false,
    		originX: 'center',
    		originY: 'center'
    	});

          

        this.refreshObjs.push(tgle);
        this.group.addWithUpdate(tgle);
        this._addToShape(tgle);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

   refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
        this.setOption(options);
        //this._setcolor(this.option.BackgroundColor);

        var obj = this.refreshObjs[0];          //开关颜色

        obj.set({
            fill: this.option.BackColor,
			stroke:this.option.FrameColor,
			strokeWidth: this.option.FrameWidth
        });
        this._renderRefresh();
   },


    toString: function () {
        return ' 三角形';
    }
});