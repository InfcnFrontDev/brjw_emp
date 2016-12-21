var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSRadioButton = fabric.util.createClass(WebActorBase, {
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
            GroupName: "group",
            Checked: false,
            Radius: 15,
            Color: 'black',//默认文字颜色
            ReadOnly: false,
            Text: "单选按钮",
            TextAlign: "MiddleCenter",
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
        var Oactor = document.createElement("input");

        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.actorid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        Oactor.style.verticalAlign = "middle";
        //Oactor.className = "Wdate";
        Oactor.type = "radio";
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

    getValue:function(){
        var io = document.getElementById(this.actorid);
        return io.value;
    },

    init: function (options) {
        this.setOption(options);
        //设置字体等
        this._renderInit(this);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        //io.style.color = this.option.Color;
        var io = document.getElementById(this.actorid);
        io.style.verticalAlign = "middle";
        io.style.width = this.option.Radius + "px";
        io.style.height = this.option.Radius + "px";
        io.name = this.option.GroupName;
        //if (this.option.ValueList.length == 0) {
        //    io.value = this.option.DataList[this.option.VectorIndex];
        //} else {
        //    io.value = this.option.ValueList[this.option.VectorIndex];
        //}
        if (this.option.ValueItem =="''") {
            io.value = this.option.DataItem;
        } else {
            io.value = this.option.ValueItem;
        }
        //io.GroupName = this.option.GroupName;
        io.name = this.option.GroupName;
        //io.value = this.option.Text;
        io.checked = this.option.Checked;
        //设置单选按钮后的文字
        var textobj = document.createElement("span");
        //textobj.innerText = this.option.DataList[0];    // 调试中，支取第一个元素
        textobj.innerText = this.option.Text;
        textobj.style.fontSize = this.option.fontSize + "px";
        textobj.style.fontFamily = this.option.fontFamily;
        textobj.style.color = this.option.Color;
        textobj.style.fontStyle = this.option.fontStyle;
        textobj.style.fontWeight = this.option.fontWeight;
        textobj.style.textDecoration = this.option.textDecoration;
        var aid = this.actorid;
        textobj.addEventListener("click", function () {
            selectiontoggle(aid);
        });
        var idiv = document.getElementById(this.divid);
        idiv.appendChild(textobj);
    },

    //toggle:function(actorid){
    //    var io = document.getElementById(actorid);
    //    io.checked = !io.checked;
    //},

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);

        this._renderRefresh(options);
    }
})

//点击文本修改选项
function selectiontoggle(actorid) {
    var io = document.getElementById(actorid);
    io.checked = !io.checked;
}

