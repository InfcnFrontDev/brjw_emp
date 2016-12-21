var StoreCooling=StoreCooling || {};
StoreCooling.RiseArrow=fabric.util.createClass(ActorsBase,{
   initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
		//初始化必须要传的参数是前五个
	    //this.canvas=canvas;
	    this.callSuper('initialize', canvas);
	    this.defaultOptions = {
	        Height: 64,
            Width:64,
	    	RotateAngle:RotateAngle,
	    	Flip:Flip,
	    	centerPX:centerPX,
	    	centerPY:centerPY,
	    	IsDropped:true,
	    	UpColor:"#F08080", //lightcoral
	    	DownColor:"#90EE90", //lightgreen
	    	BorderColor:"black",
	    	BorderWidth: 1,
	    	TextColor:"white",
	    	FontSize:10,
	    	FontFamily:"Arial",
	    	Text:"%"
		};
		this.setOption(this.defaultOptions);
		this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
		this.refreshObjs = new Array();     // 刷新对象
        this.left=this.option.X;
        this.top=this.option.Y;
        this.height=this.option.Height;
        this.width=this.option.Width;
		this.topgroup = this.initializeobjs();
		this.canvas.add(this.topgroup);
		//this.canvas.renderAll();
	},

	
    initializeobjs: function ()
    {
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: this.height,
            width: this.width,
            fill: 'yellow',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);
        //添加箭头路径对象
        var pathString = "";
        pathString = "M" + this.width / 2 + "," + (this.height - 1) + "L" + (this.width - 1) + "," + (this.height - 1 - this.height / 4);
        pathString += "L" + (this.width - 1 - this.width / 8) + "," + (this.height - 1 - this.height / 4);
        pathString += "L" + (this.width - 1 - this.width / 8) + "," + 0;
        pathString += "L" + (this.width / 8) + "," + 0;
        pathString += "L" + (this.width / 8) + "," + (this.height - 1 - this.height / 4);
        pathString += "L" + 0 + "," + (this.height - 1 - this.height / 4);
        pathString += "L" + this.width / 2 + "," + (this.height - 1);
        pathString += " z";
        var path = new fabric.Path(pathString, {
            left: 0,
            top: 0,
            fill: this.option.DownColor,
            stroke: this.option.BorderColor,
            opacity: 1,
            strokeWidth: this.option.BorderWidth,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(path);
        this.refreshObjs.push(path);
        //添加text对象
        var text = new fabric.Text(this.option.Text, {
            left: 0,
            top:0,
            fontSize:Math.round(this.width * 3 / 8),
            fontFamily:this.option.FontFamily,
            fill:this.option.TextColor,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        //text.setLeft((this.width - text.getWidth()) / 2);
        //text.setTop((this.height - 1 - this.height / 4 - text.getHeight()) / 2);
        this.refreshObjs.push(text);
        this.group.addWithUpdate(text);

        this._setGroupOptions();
        this._setTopgroupOptions();
        return this.topgroup;
    },

    init:function(options){
        this.setOption(options);
        //设置箭头方向等的pathstring
        var pathString = "";
        var fillcolor = this.option.DownColor;
        switch (this.option.IsDropped) {
            case true:
                pathString = "M" + this.width / 2 + "," + (this.height - 1) + "L" + (this.width - 1) + "," + (this.height - 1 - this.height / 4);
                pathString += "L" + (this.width - 1 - this.width / 8) + "," + (this.height - 1 - this.height / 4);
                pathString += "L" + (this.width - 1 - this.width / 8) + "," + 0;
                pathString += "L" + (this.width / 8) + "," + 0;
                pathString += "L" + (this.width / 8) + "," + (this.height - 1 - this.height / 4);
                pathString += "L" + 0 + "," + (this.height - 1 - this.height / 4);
                pathString += "L" + this.width / 2 + "," + (this.height - 1);
                pathString += " z";
                fillcolor = this.option.DownColor;
                //var path=new fabric.Path(pathString,{
                //	left:this.left,
                //	top:this.top,
                //    fill:this.option.DownColor,
                //    stroke:this.option.BorderColor,
                //    strokeWidth:this.option.BorderWidth,
                //    hasBorders:false,  			
                //});
                //text.setLeft(this.left+(this.width-text.getWidth())/2);
                //text.setTop(this.top+(this.height-1-this.height/4-text.getHeight())/2);
                break;
            case false:
                pathString += "M" + this.width / 2 + "," + 0 + "L" + (this.width - 1) + "," + this.height / 4;
                pathString += "L" + (this.width - 1 - this.width / 8) + "," + this.height / 4;
                pathString += "L" + (this.width - 1 - this.width / 8) + "," + (this.height - 1);
                pathString += "L" + this.width / 8 + "," + (this.height - 1);
                pathString += "L" + this.width / 8 + "," + this.height / 4;
                pathString += "L" + 0 + "," + this.height / 4;
                pathString += "L" + this.width / 2 + "," + 0;
                pathString += " z";
                fillcolor = this.option.UpColor;
        }

        var obj = this.refreshObjs[0];
        obj.initialize(pathString);
        obj.set({
            left: 0,
            top: 0,
            fill: fillcolor,
            opacity: 1,
            stroke: this.option.BorderColor,
            strokeWidth: this.option.BorderWidth,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        //obj.setCoords();
        var text = this.refreshObjs[1];
        text.initialize(this.option.Text, { fill: this.option.TextColor });
    },

	refresh: function (options) {
	    this.setOption(options);
	    //设置箭头方向等的pathstring
	    var pathString = "";
	    var fillcolor = this.option.DownColor;
	    switch(this.option.IsDropped)
	    {
	    	case true:
	        pathString="M"+this.width/2+","+(this.height-1)+"L"+(this.width-1)+","+(this.height-1-this.height/4);
	    	pathString+="L"+(this.width-1-this.width/8)+","+(this.height-1-this.height/4);
	    	pathString+="L"+(this.width-1-this.width/8)+","+0;
	    	pathString+="L"+(this.width/8)+","+0;
	    	pathString+="L"+(this.width/8)+","+(this.height-1-this.height/4);
	    	pathString+="L"+0+","+(this.height-1-this.height/4);
	    	pathString += "L" + this.width / 2 + "," + (this.height - 1);
	    	pathString += " z";
	    	fillcolor = this.option.DownColor;
	    	//var path=new fabric.Path(pathString,{
	    	//	left:this.left,
	    	//	top:this.top,
	    	//    fill:this.option.DownColor,
	    	//    stroke:this.option.BorderColor,
	    	//    strokeWidth:this.option.BorderWidth,
	    	//    hasBorders:false,  			
	    	//});
	    	//text.setLeft(this.left+(this.width-text.getWidth())/2);
	    	//text.setTop(this.top+(this.height-1-this.height/4-text.getHeight())/2);
	    	break;
	    	case false:
	    	pathString+="M"+this.width/2+","+0+"L"+(this.width-1)+","+this.height/4;
	    	pathString+="L"+(this.width-1-this.width/8)+","+this.height/4;
	    	pathString+="L"+(this.width-1-this.width/8)+","+(this.height-1);
	    	pathString+="L"+this.width/8+","+(this.height-1);
	    	pathString+="L"+this.width/8+","+this.height/4;
	    	pathString+="L"+0+","+this.height/4;
	    	pathString += "L" + this.width / 2 + "," + 0;
	    	pathString += " z";
	    	fillcolor = this.option.UpColor;
	    }
	    var obj = this.refreshObjs[0];
	    obj.initialize(pathString);
	    obj.set({
	        left: 0,
	        top: 0,
	        fill: fillcolor,
	        opacity: 1,
	        stroke: this.option.BorderColor,
	        strokeWidth: this.option.BorderWidth,
	        hasBorders: false,
	        originX: 'center',
	        originY: 'center'
	    });
	    var text = this.refreshObjs[1];
	    text.initialize(this.option.Text, { fill: this.option.TextColor });
	   // text.set({ fill: this.option.TextColor });
	    this._renderRefresh();
	},
    toString: function () {
        return ' 箭头（上下）  RiseArrow';
    }

});