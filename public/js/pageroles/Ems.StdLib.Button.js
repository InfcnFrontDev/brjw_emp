var Ems = Ems || {};
Ems.StdLib = Ems.StdLib || {};
Ems.StdLib.Button = fabric.util.createClass(WebActorBase, {
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.callSuper('initialize', options);
        this.defaultOptions = {
            Height: 26,
            Width: 64, //设置actor的尺寸
            fontSize: 10,
            fontFamily: '楷体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            Color: 'black',//默认文字颜色
            Text: "普通按钮",
            TextAlign: "MiddleCenter",
            ButtonColor: null,
            ValueList:[],
            DataList:[],
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
        var Oactor = document.createElement("button");
        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.actorid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        //Oactor.className = "Wdate";
        //Oactor.type = "text";
        //Oactor.value = this.option.CurrentDate;
        //Oactor.src = this.option.PicturePath;
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
        //设置字体等
        var io = document.getElementById(this.actorid);
        io.style.fontSize = this.option.fontSize + "px";
        io.style.fontFamily = this.option.fontFamily;
        io.style.color = this.option.Color;
        io.style.background = this.option.ButtonColor;
        
        io.innerText = this.option.Text;
        if (this.option.MultiLine) {  //多行；50
            io.rows = "50";
        };
        //单击按钮，调用函数
        io.onclick = function () {
            inputAction();
        };
    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);

        this._renderRefresh(options);
    }

    //refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
    //    this.setOption(options);
    //    if (typeof (options.TransformMatrix) != "undefined") {
    //        var divdom = document.getElementById(this.divid);
    //        this._getTrasnsformStr(_getTransformM(options.TransformMatrix, this.changebounds.ori_bounds));
    //        divdom.style.transform = this.transformStr;
    //        //this.changebounds.transBounds(options.TransformMatrix);
    //    }
    //}
})

