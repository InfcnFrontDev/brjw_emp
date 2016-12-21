var Ems = Ems || {};
Ems.DataSourceActor = Ems.DataSourceActor || {};
Ems.DataSourceActor.DSDateTimeActor = fabric.util.createClass(WebActorBase, {
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
            ReadOnly: false,
            Text: "请选择日期",
            backgroundColor: null,
            OnlyDate: true,
            MaxDate: '2016/9/18 10:20:31',
            MinDate: '2013/9/18 10:20:31',
            CurrentDate: '2016/9/18 10:20:31'
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
        //创建webactor控件
        var Oactor = document.createElement("input");
        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.actorid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        Oactor.className = "Wdate";
        Oactor.type = "text";
        //if (true) {
        //    Oactor.value = this.option.CurrentDate.substring(0, 9);
        //} else {
        //    Oactor.value = this.option.CurrentDate;
        //}
        Oactor.value = this.option.CurrentDate;
        //Oactor.src = this.option.PicturePath;
        e = document.getElementById(this.divid);
        e.appendChild(Oactor);

        if (this.option.RotateAngle != 0) { //旋转图元div
            this._setRotateStr();
            e.style.transform = this.rotateStr;
        }
    },

    init: function (options) {
        this.setOption(options);
        //设置字体等
        this._renderInit(this);
        //io.style.fontSize = this.option.fontSize + "px";
        //io.style.fontFamily = this.option.fontFamily;
        //io.style.color = this.option.Color;

        var io = document.getElementById(this.actorid);
        //if (this.option.ReadOnly) {
        //    //io.readonly = "readonly";
        //    io.disabled = "disabled";
        //}
        //单击文本框，调用函数
        var iminDate;
        var imaxDate;
        if (this.option.MaxTime) {
            iminDate = this.option.MinTime;
            imaxDate = this.option.MaxTime;
        } else {
            iminDate = this.option.MinDate;
            imaxDate = this.option.MaxDate;
        }
       
        if (this.option.OnlyDate) {
            var datamaxarr = imaxDate.split(" ");
            var dataminarr = iminDate.split(" ");
            imaxDate = datamaxarr[0];
            iminDate = dataminarr[0];
            io.addEventListener('click', function () {
                WdatePicker({
                    dateFmt: 'yyyy-MM-dd',
                    minDate: iminDate,
                    maxDate: imaxDate,
                    //onpicked: function (dp) {
                    //    var aaa = document.getElementById(this.id);
                    //    evt = document.createEvent("MouseEvents");
                    //    evt.initMouseEvent("onchange", true, true, window,
                    //      0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    //    aaa.dispatchEvent(evt);
                    //}
                    onpicked: function (dp) {
                        evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("onchange", true, true, window,
                          0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        this.dispatchEvent(evt);
                    }

                });
                
            });
            io.value = imaxDate;   //默认显示最大时间
        } else {
            io.addEventListener('click', function () {
                WdatePicker({
                    skin: 'whyGreen', dateFmt: 'yyyy-MM-dd HH:mm:ss',
                    minDate: iminDate,
                    maxDate: imaxDate,
                    onpicked: function (dp) {
                        evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("onchange", true, true, window,
                            0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        this.dispatchEvent(evt);
                    }
                }); 
            });
            io.value = imaxDate;
        }

    },

    onEvent: function (event, func) {
        $("#" + this.actorid).on(event, func);

    },

    getInputText: function () {
        var io = document.getElementById(this.actorid);
        return io.value;
        //return $("#" + this.inputboxid).val();
    },

    getValue:function(){
        var io = document.getElementById(this.actorid);
        return io.value;
    },

    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        this.setOption(options);

        this._renderRefresh(options);
    }
})

