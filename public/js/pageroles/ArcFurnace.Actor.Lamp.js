/**
* Created by ZHAN on 2016/3/1.
*/
var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Lamp = fabric.util.createClass(ActorsBase, {
    // 状态指数 Lamp
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为120:120；等比变换
            Width: 64,   //used by actors   
            FillColor: 'lightgray',
            //Color: '#000',
            Color:null,
            Hint: "状态指示",
            TextAlign: 'bottomcenter',
            TextColor: '#000',
            fontFamily: '宋体',
            fontSize: 10*4/3,
            fontWeight:'normal',
            fontStyle: 'normal'
        };
        this.rotatingangle = 0;
        this.anglespan = 25;
        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // 刷新对象
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
       // this.canvas.renderAll();
    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'green',
            opacity: 1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);
        var text = new fabric.Text(this.option.Hint, {
            originX: 'center',
            originY: 'top',
            left: 0,
            top: 0,
            fill: this.option.TextColor,
            fontStyle: this.option.fontStyle,
            fontSize: this.option.fontSize,
            fontWeight: this.option.fontWeight,
            fontFamily: this.option.fontFamily,
            angle: 0,
            selectable: false,
            hasBorders: false
        });
        text.set({top:iheight/2-text.getHeight()});
        this.group.addWithUpdate(text);
        this.refreshObjs.push(text);

        var circle = new fabric.Circle({
            radius: (iheight-text.getHeight())/2,
            fill: this.option.Color,
            strokeWidth: 2, 
            stroke: 'black',
            hasBorders: false,
            left:0,
            top: -iheight / 2,
            originX: 'center',
            originY: 'top'
        }
    );
        this.group.addWithUpdate(circle);
        this.refreshObjs.push(circle);
        
        this._setGroupOptions();
        this._setTopgroupOptions();
        //this.topgroup.setOptions({ left: this.option.X, top: this.option.Y, width: iwidth, height: iheight, hasBorders: false });
        return this.topgroup;
    },

    refresh: function (options) {     //根据运行状态刷新
        this.setOption(options);
        if (options.Hint == '' || options.Hint == null || options.Hint == 'undefined')
            this.option.Hint = '状态指示';
        else {
            this.option.Hint += "";
        }
     //   this._setRefreshOpt();
        //处理斜体，粗体等
        var FSstr = new String(this.option.fontStyle);
        if (FSstr.indexOf('Italic') != -1) {
            this.option.fontStyle = 'italic';
        } else {
            this.option.fontStyle = 'normal';
        }
        if (FSstr.indexOf('Bold') != -1) {
            this.option.fontWeight = 'bold';
        }
        var text = this.refreshObjs[0];
        text.initialize(this.option.Hint,
            {
                left: 0,
                top: 0,
                fill: this.option.TextColor,
                fontStyle: this.option.fontStyle,
                fontSize: this.option.fontSize,
                fontWeight: this.option.fontWeight,
                fontFamily: this.option.fontFamily,
                originX: 'center',
                originY: 'top'
            });//文字
        //text.setText(this.option.Hint);       
        text.set({ top: this.option.Height / 2 - text.getHeight() });

        var circle = this.refreshObjs[1];
        circle.set({
            radius: (this.option.Height - text.getHeight()) / 2,
            fill: this.option.Color,
            hasBorders: false,
            left: 0,
            top:-this.option.Height / 2,
            originX: 'center',
            originY: 'top'
        });

        this._renderRefresh();
    },

    toString: function () {
        return ' 状态指示 Lamp' + this.callSuper('toString');
    }
});



