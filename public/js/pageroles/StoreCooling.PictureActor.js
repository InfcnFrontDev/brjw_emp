/**
* Created by ZHAN on 2016/9/9.用img 标签实现pictureactor
*/

var StoreCooling = StoreCooling || {};
StoreCooling.PictureActor = fabric.util.createClass(WebActorBase, {
    initialize: function (options) {    //生成对象时传入{X: Y: Width: Height: backgroundColor(RotateAngle: Flip:)}
        this.callSuper('initialize', options);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，
            Width: 64,  //used by actors   
            PicturePath: ""  //图像文件路径+文件名
        };
        this.offsetleft = 0;//父页面左上角坐标
        this.offsettop = 0;
        this.setOption(this.defaultOptions);
        this.setOption(options);
        this.changebounds.setBounds({ left: this.option.X + this.offsetleft, top: this.option.Y + this.offsettop, width: this.option.Width, height: this.option.Height });
        this._setRotateStr();
        this.createDiv();
        this.createActor();
    },

    createActor: function () {
        //创建webactor控件
        var Oactor = document.createElement("img");
        Oactor.id = "webactor" + this.option.X + this.option.Y;
        this.inputboxid = Oactor.id;
        Oactor.style.width = "100%";
        Oactor.style.height = "100%";
        Oactor.src = this.option.PicturePath;
        e = document.getElementById(this.divid);
        e.appendChild(Oactor);

        if (this.option.RotateAngle != 0) { //旋转图元div
            this._setRotateStr();
            e.style.transform = this.rotateStr;
        }
    },

    //获取input图元的id和类型
    //getInputId: function () {
    //    var inputobj = {};
    //    inputobj.id = this.inputboxid;
    //    inputobj.type = "textbox";
    //    return inputobj;
    //},

    //getInputText: function () {
    //    var io = document.getElementById(this.inputboxid);
    //    if (io.checked) {
    //        return io.value;
    //    } else {
    //        return null;
    //    }
    //},



    //init: function (options) {
    //    this.setOption(options);
    //    //设置字体等


    //},


    refresh: function (options) {//缩放在此实现，在ActorBase.js中调用语句：ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        if (typeof (options) != "undefined") {
            this.setOption(options);
            this._renderRefresh(options);
        }
    }
})



