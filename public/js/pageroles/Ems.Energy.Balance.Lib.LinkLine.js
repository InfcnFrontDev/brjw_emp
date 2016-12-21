/**
* Created by liuhui on 2016/11/3.
*/

var Ems = Ems || {};
Ems.Energy = Ems.Energy || {};
Ems.Energy.Balance = Ems.Energy.Balance || {};
Ems.Energy.Balance.Lib = Ems.Energy.Balance.Lib || {};
Ems.Energy.Balance.Lib.LinkLine = fabric.util.createClass(ActorsBase, {
    //连接线
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,   //used by actors，宽高比为2:2；非等比变换
            Width: 128,   //used by actors   
            StartCap: 'arrow',
            EndCap: 'arrow',
            LineColor: 'black',
            LineThickness: 1,
            LineStyle: '',
            ArrowWidth: 8,
            ArrowHeight: 8,
            Elements: '',
            RotateAngle: 0,
            VertLine: false,
            Visiable: true,
            Enable: true,
            Flip: false
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象数组

        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    initializeobjs :function(){
        return this.topgroup;
    },
    

    init: function (options) {
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var awidth = this.option.ArrowWidth;
        var aheight = this.option.ArrowHeight;
        var lwidth = this.option.LineThickness;
        var array;
        var startArrow=null;
        var endArrow=null;
        var startCapPoints;
        var endCapPoints;
        switch (this.option.LineStyle) {
            case 'dash': array = [7, 2]; break;
            case 'dot': array = [3, 3]; break;
            case 'dashdot': array = [3, 3, 7, 3]; break;
        }
        
        var line = new fabric.Line();
        if (this.option.VertLine == false) {

            switch (this.option.StartCap) {
                case 'arrow':
                    startCapPoints = [
                  { x: -aheight / 2, y: iheight / 2 },
                  { x: aheight / 2, y: (iheight + awidth) / 2 },
                  { x: aheight / 2, y: (iheight - awidth) / 2 }
                    ];
                    break;
                case 'openarrow':
                    startCapPoints = [
                  { x: -aheight / 2, y: iheight / 2 },
                  { x: 0, y: (iheight + awidth) / 2 },
                  { x: aheight / 2, y: (iheight + awidth) / 2 },
                  { x: 0, y: iheight / 2 },
                  { x: aheight / 2, y: (iheight - awidth) / 2 },
                  { x: 0, y: (iheight - awidth) / 2 }
                    ];
                    break;
                case 'stealtharrow':
                    startCapPoints = [
                  { x: -aheight / 2, y: iheight / 2 },
                  { x: aheight / 2, y: (iheight + awidth) / 2 },
                  { x: 0, y: iheight / 2 },
                  { x: aheight / 2, y: (iheight - awidth) / 2 },
                    ];
                    break;
                case 'diamond':
                    startCapPoints = [
                  { x: -aheight / 2, y: iheight / 2 },
                  { x: 0, y: (iheight + awidth) / 2 },
                  { x: aheight / 2, y: iheight / 2 },
                  { x: 0, y: (iheight - awidth) / 2 },
                    ];
                    break;

            }//设置开始箭头

            switch (this.option.EndCap) {
                case 'arrow':
                    endCapPoints = [
                  { x: iwidth + aheight / 2, y: iheight / 2 },
                  { x: iwidth - aheight / 2, y: (iheight + awidth) / 2 },
                  { x: iwidth - aheight / 2, y: (iheight - awidth) / 2 }
                    ];
                    break;
                case 'openarrow':
                    endCapPoints = [
                  { x: iwidth + aheight / 2, y: iheight / 2 },
                  { x: iwidth, y: (iheight + awidth) / 2 },
                  { x: iwidth - aheight / 2, y: (iheight + awidth) / 2 },
                  { x: iwidth, y: iheight / 2 },
                  { x: iwidth - aheight / 2, y: (iheight - awidth) / 2 },
                  { x: iwidth, y: (iheight - awidth) / 2 }
                    ];
                    break;
                case 'stealtharrow':
                    endCapPoints = [
                  { x: iwidth + aheight / 2, y: iheight / 2 },
                  { x: iwidth - aheight / 2, y: (iheight + awidth) / 2 },
                  { x: iwidth, y: iheight / 2 },
                  { x: iwidth - aheight / 2, y: (iheight - awidth) / 2 },
                    ];
                    break;
                case 'diamond':
                    endCapPoints = [
                  { x: iwidth + aheight / 2, y: iheight / 2 },
                  { x: iwidth, y: (iheight + awidth) / 2 },
                  { x: iwidth - aheight / 2, y: iheight / 2 },
                  { x: iwidth, y: (iheight - awidth) / 2 },
                    ];
                    break;
            }//设置结束箭头



            line.set({
                x1: 0,
                y1: iheight/2,
                x2: iwidth,
                y2:iheight/2,
                stroke: this.option.LineColor,
                strokeWidth: lwidth,
                strokeDashArray: array,
                hasBorders: false,
                flipX: this.option.Flip,
                selectable: false,
                // originX: 'center',
                //originY: 'center'
            });
            if (this.option.StartCap == "oval") {
                startArrow = new fabric.Ellipse({
                    top:iheight/2-aheight/2,
                    rx: aheight / 2,
                    ry: awidth / 2,
                    fill: this.option.LineColor,
                    hasBorders: false,
                    flipX: this.option.Flip,
                    selectable: false
                 });
            }
            else if (this.option.StartCap != "none") {
                startArrow = new fabric.Polygon(startCapPoints, {
                    top:iheight/2-aheight/2+lwidth/2,
                    fill: this.option.LineColor,
                    hasBorders: false
                });
            }
            if(startArrow!=null)
            {
                this.refreshObjs.push(startArrow);
                this.group.addWithUpdate(startArrow);
            }




            if (this.option.EndCap == "oval") {
                endArrow = new fabric.Ellipse({
                    left:iwidth,
                    top: iheight / 2 - aheight / 2,
                    rx: aheight / 2,
                    ry: awidth / 2,
                    fill: this.option.LineColor,
                    hasBorders: false,
                    flipX: this.option.Flip,
                    selectable: false
                });
            }
            else if (this.option.EndCap != "none") {
                endArrow = new fabric.Polygon(endCapPoints, {
                    top: iheight / 2 - aheight / 2 + lwidth / 2,
                    fill: this.option.LineColor,
                    hasBorders: false
                });
            }
            if (endArrow != null) {
                this.refreshObjs.push(endArrow);
                this.group.addWithUpdate(endArrow);
            }

        } else {//this.option.VertLine==true
     
            switch (this.option.StartCap) {
                case 'arrow':
                    startCapPoints = [
                  { x: iwidth / 2, y: -aheight / 2 },
                  { x: (iwidth-awidth)/2, y: aheight/2 },
                  { x: (iwidth+awidth) / 2, y: aheight / 2 }
                    ];
                    break;
                case 'openarrow':
                    startCapPoints = [
                  { x: iwidth/2, y: -aheight / 2 },
                  { x: (iwidth-awidth)/2, y: 0 },
                  { x: (iwidth-awidth)/2, y: aheight/2 },
                  { x: iwidth/2, y: 0 },
                  { x: (iwidth+awidth)/2, y: aheight / 2 },
                  { x: (iwidth+awidth)/2, y: 0 }
                    ];
                    break;
                case 'stealtharrow':
                    startCapPoints = [
                  { x:iwidth/2, y: -aheight/2 },
                  { x: (iwidth-awidth) / 2, y: aheight / 2 },
                  { x: iwidth/2, y: 0 },
                  { x: (iwidth+awidth) / 2, y: aheight / 2 },
                    ];
                    break;
                case 'diamond':
                    startCapPoints = [
                  { x: iwidth / 2, y: -aheight/2 },
                  { x: (iwidth-awidth)/2, y: 0 },
                  { x: iwidth / 2, y: aheight / 2 },
                  { x: (iwidth+awidth)/2, y: 0 },
                    ];
                    break;

            }//设置开始箭头

            switch (this.option.EndCap) {
                case 'arrow':
                    endCapPoints = [
                  { x: iwidth / 2, y:iheight +aheight / 2 },
                  { x: (iwidth - awidth) / 2, y: iheight-aheight / 2 },
                  { x: (iwidth + awidth) / 2, y: iheight-aheight / 2 }
                    ];
                    break;
                case 'openarrow':
                    endCapPoints = [
                  { x: iwidth / 2, y: iheight+aheight / 2 },
                  { x: (iwidth - awidth) / 2, y: iheight },
                  { x: (iwidth - awidth) / 2, y: iheight-aheight / 2 },
                  { x: iwidth / 2, y: iheight },
                  { x: (iwidth + awidth) / 2, y: iheight-aheight / 2 },
                  { x: (iwidth + awidth) / 2, y: iheight }
                    ];
                    break;
                case 'stealtharrow':
                    endCapPoints = [
                  { x: iwidth / 2, y: iheight+aheight / 2 },
                  { x: (iwidth - awidth) / 2, y: iheight-aheight / 2 },
                  { x: iwidth / 2, y: iheight },
                  { x: (iwidth + awidth) / 2, y: iheight-aheight / 2 },
                    ];
                    break;
                case 'diamond':
                    endCapPoints = [
                  { x: iwidth / 2, y: iheight+aheight / 2 },
                  { x: (iwidth - awidth) / 2, y: iheight },
                  { x: iwidth / 2, y: iheight-aheight / 2 },
                  { x: (iwidth + awidth) / 2, y: iheight },
                    ];
                    break;
            }//设置结束箭头



            line.set({
                x1: iwidth/2,
                y1: 0,
                x2: iwidth/2,
                y2: iheight,
                stroke: this.option.LineColor,
                strokeWidth: lwidth,
                strokeDashArray: array,
                hasBorders: false,
                flipX: this.option.Flip,
                selectable: false,
                // originX: 'center',
                //originY: 'center'
            });
            if (this.option.StartCap == "oval") {
                startArrow = new fabric.Ellipse({
                   left:(iwidth+awidth)/2,
                    rx: awidth / 2,
                    ry: aheight / 2,
                    fill: this.option.LineColor,
                    hasBorders: false,
                    flipX: this.option.Flip,
                    selectable: false
                });
            }
            else if (this.option.StartCap != "none") {
                startArrow = new fabric.Polygon(startCapPoints, {
                    fill: this.option.LineColor,
                    hasBorders: false
                });
            }
            if (startArrow != null) {
                this.refreshObjs.push(startArrow);
                this.group.addWithUpdate(startArrow);
            }




            if (this.option.EndCap == "oval") {
                endArrow = new fabric.Ellipse({
                    left: iwidth/2,
                    top: iheight  - aheight / 2,
                    rx: awidth / 2,
                    ry: aheight / 2,
                    fill: this.option.LineColor,
                    hasBorders: false,
                    flipX: this.option.Flip,
                    selectable: false
                });
            }
            else if (this.option.EndCap != "none") {
                endArrow = new fabric.Polygon(endCapPoints, {
                    left:iwidth/2-awidth/2,
                    top: iheight-aheight/2,
                    fill: this.option.LineColor,
                    hasBorders: false
                });
            }
            if (endArrow != null) {
                this.refreshObjs.push(endArrow);
                this.group.addWithUpdate(endArrow);
            }


        }
        this.refreshObjs.push(line);
        this.group.addWithUpdate(line);

        this._setGroupOptions();
        this._setTopgroupOptions();
        this.canvas.renderAll();
    },

    refresh: function (options) {
        this.setOption(options);
        for (var num in this.refreshObjs) {
            var obj = this.refreshObjs[num];
            obj.set({
                fill: this.option.LineColor,
            });
        }
        this._renderRefresh();
    },

    toString: function () {
        return ' 连接线';
    }
});