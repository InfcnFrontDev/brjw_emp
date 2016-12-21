var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSCheckBox = fabric.util.createClass(WebActorBase, {
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.callSuper('initialize', options);
        this.defaultOptions = {
            Height: 19,
            Width: 85, //设置canvas的尺寸
            fontSize: 9,
            fontFamily: '宋体',  //默认字体；（'Times New Roman'）
            fontStyle: 'normal',//设置是否斜体
            fontWeight: 'normal',
            stroke: null,
            Checked: false,
            BoxSize: 15,
            Color: 'black',//默认文字颜色
            ReadOnly: false,
            Text: "复选框",
            TextAlign: "MiddleCenter",
            backgroundColor: null,
            refreshLength: 0
        };
        this.groupvaluename = "";
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
        var Oactor = document.createElement("input");

        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.actorid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        //Oactor.className = "Wdate";
        Oactor.type = "checkbox";
        e = document.getElementById(this.divid);
        e.appendChild(Oactor);

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
        var io = document.getElementById(this.actorid);
        if (io.checked) {
            return io.value;
        } else {
            return null;
        }
    },

    getValue: function () {
        //var io = document.getElementById(this.actorid);
        //return io.value;
        //console.log(eval(this.groupvaluename));
        return eval(this.groupvaluename);
    },

    setGroupValue: function () {
        if (this.groupvaluename != "") {  //当且仅当this.groupvaluename被赋值时，才执行此操作
            var io = document.getElementById(this.actorid);
            eval("var valuestring = " + this.groupvaluename);
            //var strarr = valuestring.split(",");
            var strarr = valuestring.split("`");
            var idx = valuestring.indexOf(io.value);
            if (idx != -1) {
                if (!io.checked) {  //去掉选项
                    for (var i = 0; i < strarr.length; i++) {
                        if (strarr[i] == io.value || strarr == "") {
                            strarr.splice(i, 1);
                        }
                    }
                    //valuestring.replace(io.value, "");
                    //console.log("\r\nvalue removed:"+io.value);
                }
            } else {
                if (io.checked) { //添加选项
                    strarr.push(io.value);
                    //valuestring = io.value + "," + valuestring;
                    //console.log("\r\nvalue added:" + io.value);
                }
            }
            ////处理“，”
            //valuestring.replace(",,", ",");
            //if (valuestring.substring(0,1) == ",") { //如果第一个字符为“”，删除之
            //    valuestring = valuestring.substring(1, valuestring.length - 1);
            //}
            //if (valuestring.substring(valuestring.length-1, 1) == ",") { //如果最后一个字符为“,”，删除之
            //    valuestring = valuestring.substring(0, valuestring.length - 1);
            //}
            if (strarr[0] == "") {  //去掉数组中第一个空字符串
                strarr.splice(0, 1);
            }
            //valuestring = strarr.join(",");
            valuestring = strarr.join("`");
            eval(this.groupvaluename + "= valuestring");
            //console.log("\r\n----valuestring:----:"+valuestring);
        }
    },

    init: function (options) {
        this.setOption(options);
        //设置字体等
        this._renderInit(this);
        var io = document.getElementById(this.actorid);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        //io.style.margin = 0 + "px";
        io.style.verticalAlign = "middle";
        io.style.width = this.option.BoxSize + "px";
        io.style.height = this.option.BoxSize + "px";
        io.style.color = this.option.Color;

        io.name = this.option.GroupName;
        io.value = this.option.ValueItem;
        //if (this.option.ValueList.length == 0) {
        //    io.value = this.option.DataList[this.option.VectorIndex];
        //} else {
        //    io.value = this.option.ValueList[this.option.VectorIndex];
        //}
        //io.GroupName = this.option.GroupName;
        io.name = this.option.GroupName;
        io.checked = this.option.Checked;
        //设置单选按钮后的文字
        var textobj = document.createElement("span");
        textobj.innerText = this.option.Text;
        textobj.style.height = "100%";
        textobj.style.width = "100%";
        textobj.style.verticalAlign = "middle";
        textobj.style.fontSize = this.option.fontSize + "px";
        textobj.style.fontFamily = this.option.fontFamily;
        textobj.style.color = this.option.Color;
        textobj.style.fontStyle = this.option.fontStyle;
        textobj.style.fontWeight = this.option.fontWeight;
        textobj.style.textDecoration = this.option.textDecoration;
        var aid = this.actorid;
        textobj.addEventListener("click", function () {
            checkboxtoggle(aid);
        });
        var idiv = document.getElementById(this.divid);
        idiv.appendChild(textobj);

    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);
        this.setGroupValue();
        this._renderRefresh(options);
    }
})

function checkboxtoggle(actorid) {
    var io = document.getElementById(actorid);
    io.checked = !io.checked;
}