/**
* Created by ZHAN on 2016/3/31.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.Compensator = fabric.util.createClass(ActorsBase, {
    //   补偿器（Compensator）
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 32,   //used by actors，宽高比为40:20；等比变换
            Width: 64,     //used by actors   
            fontSize: 10,
            fontFamily: '宋体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            TextColor: 'black',
            fontWeight: 'normal',
            ShieldReason: 0,
            CompensatorState: 0
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.TextColor = this.option.TextColor;     //文字颜色
        this.TextFont = this.option.fontFamily;        //文字字体
        this.ShieldReason = 0;         //   "回路异常状态" 0-13
        this.hint = '';            //故障文字，在this.shieldDescript中选择或空
        this.shieldDescript = new Array(
                "通讯正常",
                "主接触器通讯故障",
                "主接触器状态故障",
                "主接触器反馈通讯故障",
                "主接触器反馈状态故障",
                "辅接触器通讯故障",
                "辅接触器状态故障",
                "辅接触器反馈通讯故障",
                "辅接触器反馈状态故障",
                "断路器通讯故障",
                "断路器状态故障",
                "主接触器干扰",
                "辅助接触器干扰",
                "未定义"
            );
        this.color = 'white';   //矩形颜色
        this.CompensatorState = 0;  // "补偿回路状态"  0-4
        this.compLineStatusColors = new Array(         //补偿回路状态颜色
                'white',
        //投入状态颜色
                'green',
        //切除状态颜色
               'blue',
        //系统屏蔽
               'red',
        //手动屏蔽
               'white'
           );


        //        this.FanState = true;       //运行状态    true;false
        this.refreshObjs = new Array();     // 刷新对象数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
        //this.canvas.renderAll();
    },

    _setRefreshOpt: function () {
        this.CompensatorState = this.option.CompensatorState;
        this.ShieldReason = this.option.ShieldReason;
        //设置显示文字
        this.hint = (this.ShieldReason > 0 && this.ShieldReason < this.shieldDescript.length)
                           ? this.shieldDescript[this.ShieldReason] : "";
        //设置状态矩形颜色
        this.color = this.CompensatorState < this.compLineStatusColors.length
                       ? this.compLineStatusColors[this.CompensatorState] : 'green';

    },

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;

        //original shape outline
        //        var rect0 = new fabric.Rect({
        //            left: 0,
        //            top: 0,
        //            height: iheight,
        //            width: iwidth,
        //            fill: 'yellow',
        //            opacity: 0.3,
        //            visible: true,
        //            hasBorders: false,
        //            originX: 'center',
        //            originY: 'center'
        //        });
        //        this.topgroup.addWithUpdate(rect0);
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            stroke: 'green',
            fill: null,
            opacity: 0.1,             //don't work when added to group
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        // shape body
        var rect = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            stroke: 'black',
            strokeWidth: 2,
            fill: this.color,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.refreshObjs.push(rect);
        this.group.addWithUpdate(rect);

        //状态文字
        var text1 = new fabric.Text(this.hint, {
            left: -iwidth/2+2,
            top: -iheight / 2+2,
            fontSize: 9,
            fontFamily: '宋体',
            fill: this.TextColor,
            originX: 'left',
            originY: 'top'
        });
        this.refreshObjs.push(text1);
        this.group.addWithUpdate(text1);


        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

    refresh: function (options) {     //根据运行状态刷新
        this.setOption(options);
        this._setRefreshOpt();
        ////处理斜体，粗体等
        //this._setFontStyle(this.option);

        var FSstr = new String(this.option.fontStyle);
        if (FSstr.indexOf('Italic') != -1) {
            this.option.fontStyle = 'italic';
        } else {
            this.option.fontStyle = 'normal';
        }
        if (FSstr.indexOf('Bold') != -1) {
            this.option.fontWeight = 'bold';
        }

        var obj = this.refreshObjs[0];  //矩形
        obj.set({
            fill: this.color,
        });
        var text = this.refreshObjs[1];          //文字
        text.initialize(this.hint,
            {
                fill: this.option.TextColor,
                fontStyle: this.option.fontStyle,
                fontSize: this.option.fontSize,
                fontWeight: this.option.fontWeight,
                fontFamily: this.option.fontFamily
            });

        this._renderRefresh();
    },

    toString: function () {
        return ' 补偿器（Compensator）';
    }
});



