
var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSComboBox = fabric.util.createClass({
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.option = {
            X: 0,
            Y: 0,  //设置canvas初始位置
            Height: 21,
            Width: 64, //设置canvas的尺寸
            RotateAngle: 0,
            fontSize: 10,
            fontFamily: '宋体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            Color: 'black',//默认文字颜色
            Items: [],
            SelectedIndex: -1,
            ReadOnly: false,
            Text: "下拉框",
            TextAlign: "MiddleCenter",
            backgroundColor: null,
            refreshLength: 0
        };
        this.offsetleft = 0;//父页面左上角坐标
        this.offsettop = 0;
        this.changebounds = new ChangeBounds();//外框对象用于缩放和事件响应
        this.setOption(options);
        this.changebounds.setBounds({ left: this.option.X + this.offsetleft, top: this.option.Y + this.offsettop, width: this.option.Width, height: this.option.Height });
        this.rotateStr = "";
        this.transformStr = "";
        this.Textobj = null;
        this.divid = "";
        this.inputboxid = "";
        this.creatObj();
    },

    creatObj: function () {
        //创建承载input控件的div
        var X = this.option.X + "px";
        var Y = this.option.Y + "px";
        var Height = this.option.Height + "px";
        var Width = this.option.Width + "px";
        var Odiv = document.createElement("div");
        //Odiv.style.cssText = "background:#FFF;Text-align:center;line-height:0px";    //创建div的css样式
        Odiv.id = "textbox" + X + Y//创建div的id为box
        document.body.appendChild(Odiv);
        this.divid = Odiv.id;
        var e = document.getElementById(this.divid); //设置div的位置
        e.style.position = "absolute";
        e.style.left = X;
        e.style.top = Y;
        //e.style.width = Width;
        //e.style.height = Height;
        //创建input控件
        var Otextbox = document.createElement("select");
        Otextbox.id = "textarea" + X + Y;
        this.inputboxid = Otextbox.id;
        //Otextbox.setAttribute("className", "easyui-combobox");
        Otextbox.name = Odiv.id;
        Otextbox.className = "easyui-combobox";


        Otextbox.style.width = Width;
        Otextbox.style.height = Height;
        e.appendChild(Otextbox);
        if (this.option.RotateAngle != 0) { //旋转图元div
            this._setRotateStr();
            e.style.transform = this.rotateStr;
        }
    },

    //获取input图元的id和类型
    getInputId: function () {
        var inputobj = {};
        inputobj.id = this.inputboxid;
        inputobj.type = "textbox";
        return inputobj;
    },

    getInputText: function () {
        //return $("#" + this.inputboxid).val();
        var io = document.getElementById(this.inputboxid);
        if (io.options.selectedIndex < 0) {
            return "";
        } else {
            return io.options[io.options.selectedIndex].text;  //获取文本
        }

        //return io.options[io.options.selectedIndex].value;  //获取索引值
    },

    getValue: function () {
        var io = document.getElementById(this.inputboxid);
        if (io.options.selectedIndex < 0) {
            return "";
        } else {
            return io.options[io.options.selectedIndex].value;  //获取文本
        }
    },


    _setRotateStr: function () {
        if (this.option.RotateAngle != 0) {
            this.rotateStr = "rotate(" + this.option.RotateAngle + "deg)";
        }
    },

    _getTrasnsformStr: function (transformax) {  //transformax为移动和缩放变换矩阵
        var ttt = transformax;
        this.transformStr = "translate(" + ttt[4] + "px," + ttt[5] + "px) scale(" + ttt[0] + "," + ttt[3] + ") " + this.rotateStr;
    },

    setOption: function (options) {
        $.extend(this.option, options);
    },

    init: function (options) {
        this.setOption(options);
        //设置字体等
        this._renderInit(this);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        //io.style.color = this.option.Color;
        var io = document.getElementById(this.inputboxid);
        var items = this.option.DataList;
        var values = this.option.ValueList;
        for (var i = 0; i < items.length; i++) {
            var option = new Option(items[i], i);
            option.value = values[i];
            io.options.add(option);
        }
        io.options.selectedIndex = this.option.SelectedIndex;
        //if (this.option.ReadOnly) {
        //    //io.readonly = "readonly";
        //    io.disabled = "disabled";
        //}

        //io.innerText = this.option.Text;

    },

    //事件和事件响应处理（）
    addEventListener: function (event, func) {
        //$("#" + this.divid).on(event, function () {func; });
        $("#" + this.divid).on(event, func);
    },

    containPoint: function (x, y) {
        return this.changebounds.containPoint(x, y);
    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);
        if (typeof (options.TransformMatrix) != "undefined") {
            var divdom = document.getElementById(this.divid);
            this._getTrasnsformStr(_getTransformM(options.TransformMatrix, this.changebounds.ori_bounds));
            divdom.style.transform = this.transformStr;
            //this.changebounds.transBounds(options.TransformMatrix);
        }
    }
})

