var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSListBoxActor = fabric.util.createClass(WebActorBase, {
        initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
            this.callSuper('initialize', options);
            this.defaultOptions = {
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
        this.setOption(this.defaultOptions);
        this.setOption(options);
        this.changebounds.setBounds({ left: this.option.X + this.offsetleft, top: this.option.Y + this.offsettop, width: this.option.Width, height: this.option.Height });
        this.rotateStr = "";
        this.transformStr = "";
        this.Textobj = null;
        //this.divid = "";
        //this.inputboxid = "";
        this.createDiv();
        this.createActor();
    },

    createActor: function () {
    
        //创建input控件
        var Otextbox = document.createElement("select");
        Otextbox.id = "textarea" + this.option.X + this.option.Y;
        this.actorid = Otextbox.id;
        //Otextbox.setAttribute("className", "easyui-combobox");
        Otextbox.name = Otextbox.id;
        //Otextbox.className = "easyui-combobox";
        Otextbox.style.width = "100%";
        Otextbox.style.height = "100%";
        e = document.getElementById(this.divid);
        e.appendChild(Otextbox);
        if (this.option.RotateAngle != 0) { //旋转图元div
            this._setRotateStr();
            e.style.transform = this.rotateStr;
        }
    },

    //获取input图元的id和类型
    getInputId: function () {
        var inputobj = {};
        inputobj.id = this.actorid;
        inputobj.type = "textbox";
        return inputobj;
    },

    getInputText: function () {
        //return $("#" + this.inputboxid).val();
        var io = document.getElementById(this.actorid);
        if (io.options.selectedIndex <= 0) {
            return "";
        } else {
            return io.options[io.options.selectedIndex].text;  //获取文本
        }
        //return io.options[io.options.selectedIndex].value;  //获取索引值
    },

    getValue: function () {
        //return $("#" + this.inputboxid).val();
        var io = document.getElementById(this.actorid);
        var intvalue = "";
        for (i = 0; i < io.length; i++) {
            if (io.options[i].selected) {
                //intvalue += io.options[i].value + "'";
                intvalue += io.options[i].value + "`";
            }
        }
        intvalue = intvalue.substr(0, intvalue.length - 1);
        return intvalue;
        //if (io.options.selectedIndex < 0) {
        //    return "";
        //} else {
        //    return io.options[io.options.selectedIndex].value;  //获取文本
        //}


    },

 
    init: function (options) {
        this.setOption(options);
        //this.option.SelectedIndex = this.option.VectorIndex;
        var io = document.getElementById(this.actorid);
        //设置字体等
        this._renderInit(this);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        //io.style.color = this.option.Color;
        //if (this.option.BackColor != "undefined") {
        //    io.style.backgroundColor = this.option.BackColor;
        //}
        if (this.option.MultiSelect) {  //多选选项
            io.multiple = "multiple";
        }
        var items = this.option.DataList;
        var values = this.option.ValueList;
        for (var i = 0; i < items.length; i++) {
            var option = new Option(items[i], i);
            option.value = values[i];
            io.options.add(option);
        }
        io.options.selectedIndex = this.option.SelectedIndex;
        io.size = items.length;
        //if (this.option.ReadOnly) {
        //    //io.readonly = "readonly";
        //    io.disabled = "disabled";
        //}

        //io.innerText = this.option.Text;

    },

     refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
         this.setOption(options);

         this._renderRefresh(options);
    }
})

