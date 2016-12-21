var Ems = Ems || {};
Ems.StdLib = Ems.StdLib || {};
Ems.StdLib.TextBox = fabric.util.createClass(WebActorBase, {
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.callSuper('initialize', options);
        this.defaultOptions = {
            Height: 21,
            Width: 64, //设置canvas的尺寸
            fontSize: 10,
            fontFamily: '楷体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            Color: 'black',//默认文字颜色
            ReadOnly:false,
            Text: "文本框",
            TextAlign: "left",
            backgroundColor: null,
            refreshLength: 0
        };
        this.offsetleft = 0;//父页面左上角坐标
        this.offsettop = 0;
        this.setOption(this.defaultOptions);
        this.setOption(options);
        this.changebounds.setBounds({ left: this.option.X + this.offsetleft, top: this.option.Y + this.offsettop, width: this.option.Width, height: this.option.Height });
        this._setRotateStr();
        this.Textobj = null;
        this.createDiv();
        this.createActor();
    },

    createActor: function () {
        //创建input控件
        var Oactor = document.createElement("textarea");

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

    //获取input图元的id和类型
    getInputId:function(){
        var actorobj = {};
        actorobj.id = this.actorid;
        actorobj.type = "textbox";
        return actorobj;
    },

    getInputText: function () {
        //var io = document.getElementById(this.actorid);
        return $("#" + this.actorid).val();
    },

    init: function (options) {
        this.setOption(options);
        //设置字体等
        var io = document.getElementById(this.actorid);
        io.style.fontSize = this.option.fontSize + "px";
        io.style.fontFamily = this.option.fontFamily;
        io.style.color = this.option.Color;
        io.style.textAlign = this.option.TextAlign;
        if (this.option.ReadOnly) {
            //io.readonly = "readonly";
            io.disabled = "disabled";
        }
        //字符串替换
        var str = "<br\s*\/?>";
        this.option.Text = this.option.Text.replace(new RegExp(str, "g"), "\n");
        io.value = this.option.Text;
        if (this.option.MultiLine) {  //多行；50
            io.setAttribute("rows","50"); 
        }
    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);

        this._renderRefresh(options);
    }
})

