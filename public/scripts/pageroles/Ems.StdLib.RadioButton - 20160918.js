﻿var Ems = Ems || {};
Ems.StdLib = Ems.StdLib || {};
Ems.StdLib.RadioButton = fabric.util.createClass({
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.option = {
            X: 0,
            Y: 0,  //设置canvas初始位置
            Height: 19,
            Width: 85, //设置canvas的尺寸
            RotateAngle: 0,
            fontSize: 10,
            fontFamily: '楷体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            GroupName: "group",
            Checked: false,
            Radius:15,
            Color: 'black',//默认文字颜色
            ReadOnly: false,
            Text: "单选按钮",
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
        e.style.width = Width;
        e.style.height = Height;
        //创建input控件
        var Otextbox = document.createElement("input");
        Otextbox.id = "textarea" + X + Y;
        this.inputboxid = Otextbox.id;
        Otextbox.name = Odiv.id;
        Otextbox.type = "radio";
        
        //Otextbox.style.width = Width;
        //Otextbox.style.height = Height;
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
        var io = document.getElementById(this.inputboxid);
        if (io.checked) {
            return io.value;
        } else {
            return null;
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
        var io = document.getElementById(this.inputboxid);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        io.style.width  = this.option.Radius + "px";
        io.style.height = this.option.Radius + "px";
        io.style.color = this.option.Color;
        io.name = this.option.GroupName;
        io.value = this.option.Text;
        io.checked = this.option.Checked;
        //设置单选按钮后的文字
        var textobj = document.createElement("span");
        textobj.innerText = this.option.Text;
        textobj.style.fontSize = this.option.fontSize + "px";
        textobj.style.fontFamily = this.option.fontFamily;
        textobj.style.color = this.option.Color;

        var idiv = document.getElementById(this.divid);
        idiv.appendChild(textobj);

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

