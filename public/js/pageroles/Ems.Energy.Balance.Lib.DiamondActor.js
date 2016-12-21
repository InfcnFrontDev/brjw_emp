/**
* Created by liuhui on 2016/11/3.
*/

var Ems = Ems || {};
Ems.Energy = Ems.Energy || {};
Ems.Energy.Balance = Ems.Energy.Balance || {};
Ems.Energy.Balance.Lib = Ems.Energy.Balance.Lib || {};
Ems.Energy.Balance.Lib.DiamondActor = fabric.util.createClass(ActorsBase, {
	//菱形
	initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
		this.callSuper('initialize', canvas);
		this.defaultOptions = {         //set special actor's options here
			Height: 64,   //used by actors，宽高比为2:2；非等比变换
			Width: 128,   //used by actors   
			BackColor: 'white', //默认为白色
			FrameColor: 'black',//默认为黑色
			FrameWidth: 1,//默认边框粗细为1
		    RotateAngle:0,
			Flip:false
		};

		this.setOption(this.defaultOptions);
		this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
		this.refreshObjs = new Array();     // 刷新对象数组
		this.color = 'black';         //状态默认颜色1
		this.topgroup = this.initializeobjs();
		this.canvas.add(this.topgroup);
		//this.canvas.renderAll();
	},


	initializeobjs: function () {
		var iwidth = this.option.Width;
		var iheight = this.option.Height;
		

	
		var str = 'M'+iwidth/2+','+0+'L'+iwidth+','+iheight/2+'L'+iwidth/2+','+iheight+'L'+0+','+iheight/2+'L'+iwidth/2+','+0;
		var diamond = new fabric.Path(str,{
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
				originx: 'center',
				originy: 'center'
		});


		this.refreshObjs.push(diamond);
		this.group.addWithUpdate(diamond);
		this._addToShape(diamond);



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
			stroke: this.option.FrameColor,
			strokeWidth: this.option.FrameWidth
		});
		//this.canvas.add(this.topgroup);
		this._renderRefresh();
	},

	toString: function () {
		return ' 菱形';
	}
});