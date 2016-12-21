
var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSGroupBoxActor = fabric.util.createClass(WebActorBase, {
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.callSuper('initialize', options);
        this.defaultOptions = {
            Height: 32,
            Width: 64, //设置actor的尺寸
            fontSize: 10,
            fontFamily: '宋体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            TextColor: 'black',//默认文字颜色
            Text: "分组框",
            TextAlign: "MiddleCenter",
            //ButtonColor: null,
            ValueList: [],
            DataList: [],
            refreshLength: 0
        };
        this.offsetleft = 0;//父页面左上角坐标
        this.offsettop = 0;
        this.setOption(this.defaultOptions);
        this.setOption(options);
        this.changebounds.setBounds({ left: this.option.X + this.offsetleft, top: this.option.Y + this.offsettop, width: this.option.Width, height: this.option.Height });
        this._setRotateStr();
        this.Textobj = null;
        //this.inputboxid = "";
        this.createDiv();
        this.createActor();
        //this.creatObj();
    },

    createActor: function () {
        //创建input控件
        var Oactor = document.createElement("fieldset");
        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.actorid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        Oactor.style.margin = "0px";
        Oactor.style.padding = "0px";
        e = document.getElementById(this.divid);
        e.appendChild(Oactor);

        if (this.option.RotateAngle != 0) { //旋转图元div
            this._setRotateStr();
            e.style.transform = this.rotateStr;
        }

    },


    getInputText: function () {
        //var io = document.getElementById(this.inputboxid);
        //return $("#" + this.inputboxid).val();
        return $("#" + this.actorid).val();
    },


    init: function (options) {
        this.setOption(options);
        if (this.option.fontStyle == "Regular") {
            this.option.fontStyle = "normal";
        }
        if (this.option.BackColor != "undefined") {
            this.option.backgroundColor = this.option.BackColor;
        }
        //设置字体等
        var Otext = document.createElement("legend");
        
        Otext.style.fontSize = this.option.fontSize + "px";
        Otext.style.fontStyle = this.option.fontStyle;
        Otext.style.fontFamily = this.option.fontFamily;
        Otext.style.color = this.option.TextColor;
        Otext.style.background = this.option.ButtonColor;
        Otext.innerText = this.option.Text;

        var io = document.getElementById(this.actorid);
        io.style.backgroundColor = this.option.backgroundColor;
        io.appendChild(Otext);
    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);

        this._renderRefresh(options);
    }
})




//var Ems = Ems || {};
//Ems.DataSourceActor = Ems.DataSourceActor || {};
//Ems.DataSourceActor.DSGroupBoxActor = fabric.util.createClass(ActorsBase, {
//    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
//    this.callSuper('initialize', canvas);
//    this.defaultOptions = {          //set special actor's options here
//        Height: 42.6666679,   //used by actors，宽高比为6:4；非等比变换
//        Text:"分组框",  //默认分组框名称
//        Width: 64,   //used by actors   
//        TextColor: '#000',
//        fontFamily: '宋体',
//        fontSize: 9,
//        fontWeight: 'normal',
//        fontStyle: 'normal',
//        ValueList: [],
//        DataList: []
//};

//this.setOption(this.defaultOptions);
//this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
//this.refreshObjs = new Array();     // 刷新对象数组
//this.color = 'red';         //箭头颜色
//this.topgroup = this.initializeobjs();
//this.canvas.add(this.topgroup);
//this.canvas.renderAll();
//},

//initializeobjs: function () {
//    var iwidth = this.option.Width;
//    var iheight = this.option.Height;

//    //original shape outline
//                    //var rect0 = new fabric.Rect({
//                    //    left: 0,
//                    //    top: 0,
//                    //    height: iheight,
//                    //    width: iwidth,
//                    //    fill: 'yellow',
//                    //    opacity: 0.3,
//                    //    visible: true,
//                    //    hasBorders: false,
//                    //    originX: 'center',
//                    //    originY: 'center'
//                    //});
//                    //this.topgroup.addWithUpdate(rect0);
//    var rectrotate = new fabric.Rect({
//        left: 0,
//        top: 0,
//        height: iheight,
//        width: iwidth,
//        stroke: 'green',
//        fill: null,
//        opacity: 0.1,             //don't work when added to group
//        visible: false,
//        hasBorders: false,
//        originX: 'center',
//        originY: 'center'
//    });
//    this.group.addWithUpdate(rectrotate);

//    // shape body
//    var rect = new fabric.Rect({
//        left:0,
//        top: 5,
//        height: iheight-10,
//        width: iwidth,
//        fill: null,
//        stroke: 'gray',
//        hasBorders: false,
//        originX: 'center',
//        originY: 'center'
//    });
//    this.refreshObjs.push(rect);
//    this.group.addWithUpdate(rect);
//    this._setGroupOptions();
//    this._setTopgroupOptions();

//    return this.topgroup;
//},
//init: function (options) {
//    this.setOption(options);
//    if (this.option.fontStyle == "Regular") {
//        this.option.fontStyle = "normal";
//    }
//    var iwidth = this.option.Width;
//    var iheight = this.option.Height;
    
//    // 文字背景矩形
//    var rectt = new fabric.Rect({
//        left: 0,
//        top: 0,
//        height: iheight,
//        width: iwidth,
//        fill: "white",
//        //stroke: 'black',
//        hasBorders: false,
//        originX: 'center',
//        originY: 'center'
//    });


//    var text = new fabric.Text(this.option.Text, {
//        originX: 'center',
//        originY: 'center',
//        left: -iwidth/2,
//        top: -iheight/2,
//        fill: this.option.TextColor,
//        fontStyle: this.option.fontStyle,
//        fontSize: this.option.fontSize,
//        fontWeight: this.option.fontWeight,
//        fontFamily: this.option.fontFamily,
//        angle: 0,
//        selectable: false,
//        hasBorders: false
//    });
//    rectt.set({
//        top: -iheight / 2 + text.getHeight() / 4,
//        left: -iwidth / 2 + text.getWidth() / 2 + 10,
//        width: text.getWidth(),
//        height:text.getHeight()
//    });
//    text.set({
//        top: -iheight / 2 + text.getHeight() / 2,
//        left: -iwidth / 2 + text.getWidth() / 2 + 10
//    });
//    this.refreshObjs.push(rectt);
//    this.group.addWithUpdate(rectt);
//    this.group.addWithUpdate(text);
//    this.refreshObjs.push(text);
//},
//refresh: function (options) {     //无刷新动作
//    this.setOption(options);

//    this._renderRefresh();
//},

//toString: function () {
//    return ' DSGroupBoxActor';
//}
//});