/**
* Created by liuhui on 2016/11/3.
*/

var Ems = Ems || {};
Ems.Energy = Ems.Energy || {};
Ems.Energy.Balance = Ems.Energy.Balance || {};
Ems.Energy.Balance.Lib = Ems.Energy.Balance.Lib || {};
Ems.Energy.Balance.Lib.ParallelogramActor = fabric.util.createClass(ActorsBase, {
	//平行四边形
	initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
		this.callSuper('initialize', canvas);
		this.defaultOptions = {         //set special actor's options here
			Height: 64,   //used by actors，宽高比为2:2；非等比变换
			Width: 128,   //used by actors   
			BackColor: 'white', //默认为白色
			FrameColor: 'black',//默认为黑色
			FrameWidth: 1,//默认边框粗细为1
			Angle: 60,
			RotateAngle:0,
            Filp:false
		};

		this.setOption(this.defaultOptions);
		this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
		this.refreshObjs = new Array();     // 刷新对象数组
		this.color = 'black';         //状态默认颜色1
	    //this.topgroup = this.initializeobjs();
		//this.canvas.renderAll();
	},


	initializeobjs: function () {

		return this.topgroup;
	},

	init:function(options){
	    this.setOption(options);
	    var iwidth = this.option.Width;
	    var iheight = this.option.Height;
	    var str = 'M' + 0 + ',' + iheight + 'L' + (iwidth - iheight / Math.tan(this.option.Angle / 180 * Math.PI)) + ',' + iheight + 'L' + iwidth + ',' + 0 + 'L' + iheight / Math.tan(this.option.Angle / 180 * Math.PI) + ',' + 0 + 'L' + 0 + ',' + iheight;
	    var parallelogram = new fabric.Path(str, {
	        top: 0,
	        left: 0,
	        width: iwidth,
	        height: iheight,
	        fill: this.option.BackColor,
	        stroke: this.option.FrameColor,
	        strokeWidth: this.option.FrameWidth,
	        hasBorders: false,
	        flipX: this.option.Flip,
	        selectable: false,
	        originX: 'center',
	        originY: 'center'
	    });
	    this.refreshObjs.push(parallelogram);
	    this.group.addWithUpdate(parallelogram);

	    this._setGroupOptions();
	    this._setTopgroupOptions();
	    this.canvas.add(this.topgroup);
	    return this.topgroup;
	},
	refresh: function (options) {     //每次刷新根据ValveState改变开关颜色
	    this.setOption(options);
	    var obj = this.refreshObjs[0];
	    obj.set({
	        fill: this.option.BackColor,
	        stroke: this.option.FrameColor,
	        strokeWidth: this.option.FrameWidth,
	    });
	    this._renderRefresh();
	},

	toString: function () {
		return ' 平行四边形';
	}
});