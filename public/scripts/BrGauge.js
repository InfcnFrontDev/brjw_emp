// 仪表盘基类
var Gauge = wisdata.createClass({
    // 初始化
    initialize: function (info, theme) {
        // 仪表盘ID
        gaugecontainer = document.createElement("div");
        var gaugedom = document.createElement("div");
        gaugedom.setAttribute("id", info.id);
        gaugedom.style.width = info.Width + "px";
        gaugedom.style.height = info.Height + "px";
        gaugecontainer.style.position = 'absolute';
 
        gaugecontainer.style.left = info.X + "px";
        gaugecontainer.style.zIndex = 1;
        gaugecontainer.style.top = info.Y + "px";
        //gaugecontainer.style.border = "1px solid red";//边框，部署时去掉
        gaugecontainer.style.textAlign = 'center';
        gaugecontainer.appendChild(gaugedom);
        //处理水平翻转
        if (info.Flip == "True")
            gaugecontainer.style.transform = "scale(-1,1)";
        if (info.parentid != 'body') {

            document.getElementById(info.parentid).appendChild(gaugecontainer);
        } else {
            document.body.appendChild(gaugecontainer);
        }
        this.gaugeID = info.id;
        this.containerid = info.id;

        //设置旋转图形区域
        if (info.RotateAngle != 0) {//初始化时设置角度
            this.rotateGuages(info.RotateAngle);

        }
        this.info = info;

    },
    rotateGuages: function (angle) {
        var dom = document.getElementById(this.containerid);
        //this.rotateGuages(this.info.RotateAngle);
        if (/msie/.test(navigator.userAgent.toLowerCase())) {

            var d_h = angle * Math.PI / 180;
            var m_c = Math.cos(d_h), m_s = Math.sin(d_h);
            dom.style.cssText = 'filter:progid:DXImageTransform.Microsoft.Matrix(M11=' + m_c + ',M12=' + (-m_s) + ',M21=' + m_s + ',M22=' + m_c + ',SizingMethod="auto expand")';


        } else {
            if (dom.style.webkitTransform !== undefined) {//Chrome Safari
                dom.style['webkitTransform'] = 'rotate(' + angle + 'deg)';
            } else if (dom.style.MozTransform !== undefined) {//Mozilla
                dom.style['MozTransform'] = 'rotate(' + angle + 'deg)';
            } else if (dom.style.OTransform !== undefined) {//Opera
                dom.style['OTransform'] = 'rotate(' + angle + 'deg)';
            } else {
                dom.style['transform'] = 'rotate(' + angle + 'deg)';
            }
        }

    },
    refresh: function (options) {
        if (gaugecontainer & options.Visable == "False")
            gaugecontainer.style.dispaly = "";
    },
    SetAction: function (ActionOptions) {//处理动作

    }


});


var BrGauge = wisdata.createClass(Gauge, {
    // 初始化
    initialize: function (info, theme) {
        this.base(info, theme);


    },
    setOption: function (filename) {
        $.ajax({
            type: "GET",
            url: "../js/Guages/"+filename+".json",
            dataType: "json",
            success: function (data) {
                this.option = data;

                this.widget = new PerfectWidgets.Widget(this.gaugeID, this.option.jsonModel);
            },
            error: function () {
                alert("error");
            }
        });
    },
    setOption: function (option, theme) {
        if (option != undefined) {
            this.option = option;
        }
      
        this.widget = new PerfectWidgets.Widget(this.gaugeID, this.option.jsonModel);
    },
    isArray: function (object) {
        return object && typeof object==='object' &&
                Array == object.constructor;
    },
    setValue: function (values) {//设置值时用,可以设置多个值，值的顺序需要和valueControls对应
        for (var i = 0; i < this.option.valueControls.length ; i++) {///arguments.length=3 ?  从第二个开始取值 zhangjl
            var vc = this.widget.getByName(this.option.valueControls[i]);
            if (this.isArray(values) && values[i] != '') {//空值时不改变value
                vc.setValue(values[i]);
            } else {
                vc.setValue(values);
            }
        }
    }

});
