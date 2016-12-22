var Ems = Ems || {};
Ems.StdLib = Ems.StdLib || {};
Ems.StdLib.MultilineText = fabric.util.createClass({
	initialize: function(options) { //生成对象时只传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
		this.option = {
			X: 0,
			Y: 0, //设置canvas初始位置
			Height: 24,
			Width: 64, //设置canvas的尺寸
			RollingDirection: 'mid_upward',
			RollingSpeed: "stop",
			RotateAngle: 0,
			fontSize: 10,
			fontFamily: '宋体', //默认字体；（'Times New Roman'）
			fontStyle: 'normal', //设置是否斜体
			fontWeight: 'normal',
			stroke: null,
			Color: 'black', //默认文字颜色
			Text: "滚动文本",
			TextAlign: "middlecenter",
			BackGroundColor: "#FFFFFF", //c/s端白色默认为透明
			refreshLength: 0
		};
		this.offsetleft = 0; //父页面左上角坐标
		this.offsettop = 0;
		this.changebounds = new ChangeBounds(); //外框对象用于缩放和事件响应
		this.setOption(options);
		this.changebounds.setBounds({
			left: this.option.X + this.offsetleft,
			top: this.option.Y + this.offsettop,
			width: this.option.Width,
			height: this.option.Height
		});
		this.Textobj = null;
		this.rollingRate = 1.5;
		this.canvas = null;
		this.divid = "";
		// this.creatDiv();由于要改背景色，所以把调用放到init里面
		this.flipstring = "";
	},

	//初始化时传入{Text:  Text: text, refreshLength: , fontSize: , rollingdirection:'stop',fontStyle…}
	init: function(options) {

		this.setOption(options);
		this.creatDiv();
		//字符串替换
		var str = "<br\s*\/?>";
		this.option.Text = this.option.Text.replace(new RegExp(str, "g"), "\n");

		//根据是否多行决定默认滚动方式；by zhanj 
		if(this.option.Text.indexOf("\n") >= 0) {
			this.option.RollingDirection = "mid_upward";
		} else {
			this.option.RollingDirection = "mid_leftward";
		}
		//若参数中设置了滚动方式，则按参数给定方式滚动
		if(typeof(options.RollingDirection) != "undefined") {
			this.option.RollingDirection = options.RollingDirection;
		}

		this.Text = this.option.Text;
		var refreshArray = new Array(this.option.refreshLength);
		this.setRollingSpeed();
		if(this.option.fontStyle == "Regular") {
			this.option.fontStyle = "Normal";
		}
		this.scroll();
	},

	setOption: function(options) {
		$.extend(this.option, options);
	},

	setRollingSpeed: function() {
		switch(this.option.RollingSpeed) {
			case "average":
				this.rollingRate = 1.5;
				break;
			case "slow":
				this.rollingRate = 2;
				break;
			case "slower":
				this.rollingRate = 3;
				break;
			case "fast":
				this.rollingRate = 0.5;
				break;
			case "faster":
				this.rollingRate = 0.2;
				break;
			default:
				this.rollingRate = 1.5;
				break;
		}
	},

	creatDiv: function() {
		var X = this.option.X + "px";
		var Y = this.option.Y + "px";
		var Height = this.option.Height + "px";
		var Width = this.option.Width + "px";
		var Odiv = document.createElement("div");
		var Ocanvas = document.createElement("canvas"); //创建一个canvas     
		Odiv.style.cssText = "Text-align:center;line-height:0px"; //创建div的css样式
		Ocanvas.id = "can" + X + Y;
		this.canvasId = Ocanvas.id; //创建canvas的id为can
		Odiv.id = "box" + X + Y //创建div的id为box
		this.divid = Odiv.id;
		Odiv.appendChild(Ocanvas); //在div内创建一个canvas 
		document.body.appendChild(Odiv); //在body内创建一个canvas   
		var e = document.getElementById(Odiv.id); //设置div的位置
		e.style.position = "absolute";
		e.style.left = X;
		e.style.top = Y;
		e.style.width = Width;
		e.style.height = Height;
		this.canvas = null;
		if(this.option.BackGroundColor != "#FFFFFF") {
			this.canvas = new fabric.Canvas(this.canvasId, {
				selectable: false,
				backgroundColor: this.option.BackGroundColor,
				width: this.option.Width,
				height: this.option.Height
			});
		} else {
			this.canvas = new fabric.Canvas(this.canvasId, {
				selectable: false,
				width: this.option.Width,
				height: this.option.Height
			});
		}
	},

	//把多行文字的string的行给倒过来
	FlipString: function(Text) {
		var stringLength = Text.length;
		var lines = 1;
		for(var i = 0; i < stringLength; ++i) //数有几行
		{
			if(Text[i] == '\n')
				++lines;
		}
		++lines; //assume最后一行没有'\n'
		var backwardStrings = new Array(lines);
		backwardString = Text.split("\n");
		var flipped = "";
		for(var i = lines - 2; i > -1; i--) {
			flipped = flipped + backwardString[i] + "\n";
		}
		return flipped;
	},
	setLocation: function() {
		var stringHeight = this.Textobj.getHeight();
		var Height = this.canvas.getHeight();
		var stringWidth = this.Textobj.getWidth();
		var Width = this.canvas.getWidth();
		switch(this.option.TextAlign) {
			case 'topleft':
				this.Textobj.setLeft(0);
				this.Textobj.setTop(0);
				break;
			case 'topcenter':
				this.Textobj.setLeft((Width - stringWidth) / 2);
				this.Textobj.setTop(0);
				break;
			case 'topright':
				this.Textobj.setLeft(Width - stringWidth);
				this.Textobj.setTop(0);
				break;
			case 'middleleft':
				this.Textobj.setLeft(0);
				this.Textobj.setTop((Height - stringHeight) / 2);
				break;
			case 'middlecenter':
				this.Textobj.setLeft((Width - stringWidth) / 2);
				this.Textobj.setTop((Height - stringHeight) / 2);
				break;
			case 'middleright':
				this.Textobj.setLeft(Width - stringWidth);
				this.Textobj.setTop((Height - stringHeight) / 2);
				break;
			case 'bottomleft':
				this.Textobj.setLeft(0);
				this.Textobj.setTop(Height - stringHeight);
				break;
			case 'bottomcenter':
				this.Textobj.setLeft((Width - stringWidth) / 2);
				this.Textobj.setTop(Height - stringHeight);
				break;
			case 'bottomright':
				this.Textobj.setLeft(Width - stringWidth);
				this.Textobj.setTop(Height - stringHeight);
		}
	},
	scroll: function() {
		if(this.option.RollingSpeed == "stop") { //停止时让字符串居左居中
			this.Textobj = new fabric.Text(this.option.Text, {
				fill: this.option.Color,
				fontStyle: this.option.fontStyle,
				fontSize: this.option.fontSize,
				fontWeight: this.option.fontWeight,
				fontFamily: this.option.fontFamily,
				angle: 0,
				selectable: false,
				hasBorders: false
			});
			/*var stringHeight = this.Textobj.getHeight();
			var Height = this.canvas.getHeight();
			this.Textobj.setLeft(0);
			this.Textobj.setTop((Height - stringHeight) / 2);*/
			this.setLocation();
			this.canvas.add(this.Textobj);
		} //字幕运动时效果
		else {
			this.flipstring = this.FlipString(this.option.Text);
			this.Textobj = new fabric.Text(this.option.Text, {
				fill: this.option.Color,
				fontStyle: this.option.fontStyle,
				fontSize: this.option.fontSize,
				fontWeight: this.option.fontWeight,
				fontFamily: this.option.fontFamily,
				angle: 0,
				selectable: false,
				hasBorders: false
			});
			var stringHeight = this.Textobj.getHeight();
			var stringWidth = this.Textobj.getWidth();
			var Height = this.canvas.getHeight();
			var Width = this.canvas.getWidth();
			switch(this.option.RollingDirection) {
				case "mid_upward":
				case "left_upward":
				case "right_upward":
					var rollingSpeed = (stringHeight + Height) * 60 * this.rollingRate;
					this.Textobj.setLeft(0);
					this.Textobj.setTop(Height);
					this.canvas.add(this.Textobj);
					var to = this.Textobj;
					var flcanvas = this.canvas;
					(function Animate() {
						to.animate('top', -stringHeight, {
							duration: rollingSpeed,
							onChange: flcanvas.renderAll.bind(flcanvas),
							easing: fabric.util.ease.easeInSine,
							//easing: null,
							onComplete: function() {
								to.setTop(Height);
								Animate();
							}
						});
					})();
					break;
				case "mid_downward":
				case "left_downward":
				case "right_downward":
					var rollingSpeed = (stringHeight + Height) * 60 * this.rollingRate;
					this.Textobj.setLeft(0);
					this.Textobj.setTop(-stringHeight);
					this.canvas.add(this.Textobj);
					var to = this.Textobj;
					var flcanvas = this.canvas;
					(function Animate() {
						to.animate('top', Height, {
							duration: rollingSpeed,
							onChange: flcanvas.renderAll.bind(flcanvas),
							easing: fabric.util.ease.easeInSine,
							onComplete: function() {
								to.setTop(-stringHeight);
								flcanvas.renderAll();
								Animate();
							}
						});
					})();
					break;
				case "mid_leftward":
				case "top_leftward":
				case "bottom_leftward":
					var rollingSpeed = (stringWidth + Width) * 60 * this.rollingRate;
					this.Textobj.setLeft(Width);
					this.Textobj.setTop((Height - stringHeight) / 2);
					this.canvas.add(this.Textobj);
					var to = this.Textobj;
					var flcanvas = this.canvas;
					(function Animate() {
						to.animate('left', -stringWidth, {
							duration: rollingSpeed,
							onChange: flcanvas.renderAll.bind(flcanvas),
							easing: fabric.util.ease.easeInSine,
							onComplete: function() {
								to.setLeft(Width);
								Animate();
							}
						});
					})();
					break;
				default:
					break;
			}
		}
	},

	containPoint: function(x, y) {
		return this.changebounds.containPoint(x, y);
	},

	refresh: function(refreshOption) { //数据改变时刷新
		this.Textobj.set({
			fill: this.option.Color,
			fontStyle: this.option.fontStyle,
			fontSize: this.option.fontSize,
			fontWeight: this.option.fontWeight,
			fontFamily: this.option.fontFamily,
			angle: 0,
			selectable: false,
			hasBorders: false
		});
		if(typeof(refreshOption) == "undefined") {
			return;
		}
		if(typeof(refreshOption.Parameters) != "undefined" && this.option.refreshLength > 0) {
			refreshArray = refreshOption.Parameters;
			var replacestr = "";
			if(this.option.RollingDirection == "mid_downward" || this.option.RollingDirection == "right_downward" || this.option.RollingDirection == "left_downward") {
				replacestr = this.flipstring;
			} else
				replacestr = this.option.Text;

			for(var i = 0; i < this.option.refreshLength; i++) {
				var str = "\\{" + i + "\\}";
				var str1 = "{" + i + ":" + "[f|F]" + "\\d" + "}";
				replacestr = replacestr.replace(new RegExp(str, "g"), refreshArray[i]);
				var regExp = new RegExp(str1);
				var data = new String(regExp.exec(replacestr));
				if(data != "null") {
					var num = parseInt(data[data.length - 2]);
					var replaceData = refreshArray[i].toFixed(num);
					if(replaceData != "undefined") {
						replacestr = replacestr.replace(new RegExp(str1, "g"), replaceData);
					}
				}
			}
			this.Textobj.setText(replacestr);
			this.canvas.renderAll();
		}
		if(typeof(refreshOption.TransformMatrix) != "undefined") {
			var divdom = document.getElementById(this.divid);
			divdom.style.transform = _getMatrixStr(_getTransformM(refreshOption.TransformMatrix, this.changebounds.ori_bounds));
			this.changebounds.transBounds(refreshOption.TransformMatrix);
		}
	},

	toString: function() {
		return "MultilineText";
	}
})