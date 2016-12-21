/**
* Created by ZHAN on 2016/2/1.
*/

/// ChangeBounds类对bounds和点进行变换和反变换
/// 用于判断鼠标点是否落在图元上
ChangeBounds = fabric.util.createClass({
    initialize: function (ori_bounds) {              //变换前的bounds值({left:  ,top:   ,width:  ,height:  })
        this.ori_bounds = { left: 0, top: 0, width: 0, height: 0 };    //初始bounds和旋转后的bounds
        this.setBounds(ori_bounds);
        this.new_bounds = {};                       //变换后的bounds值
        this.angle = 0;                             //旋转角度,如果为0，则未旋转
        this.rotateMatrix = new Array(6);           //旋转变换矩阵，由_getRotateMtx根据旋转角度设置
        this.transMatrix = new Array(6);            //缩放变换矩阵
    },

    setBounds: function (ori_bounds) {
        $.extend(this.ori_bounds, ori_bounds);
        $.extend(this.new_bounds, ori_bounds);
    },


    //获取旋转后bounds的正矩形边界，同时更新new_bounds和ori_bounds
    rotateBounds: function (angle) {
        this.angle = angle;
        this._getRotateMtx(this.angle);
        this.new_bounds = this._rotatingBounds(this.ori_bounds, this.rotateMatrix);
        this.ori_bounds = this.new_bounds;
        return this.new_bounds;
    },

    //对ori_bounds进行缩放变换,输出new_bounds
    //输入宽度缩放百分比sw，和高度缩放百分比sh。更新new_bounds值，输出缩放后的矩形区域。
    transBounds: function (ori_transformM) {
        this.transMatrix = ori_transformM;
        var bounds = this.ori_bounds;
        var sw = ori_transformM[0];
        var sh = ori_transformM[3];
        var x = bounds.left, y = bounds.top, width = bounds.width, height = bounds.height;
        var o_rectF = {
            left: bounds.left,
            top: bounds.top,
            right: bounds.left + bounds.width,
            bottom: bounds.top + bounds.height
        };
        //左上角点缩放后的坐标
        var lt = { x: o_rectF.left * sw, y: o_rectF.top * sh };
        //左下角点缩放后的坐标
        var lb = { x: o_rectF.left * sw, y: o_rectF.bottom * sh };
        //右上角点缩放后的坐标
        var rt = { x: o_rectF.right * sw, y: o_rectF.top * sh };
        //右下角点缩放后的坐标
        var rb = { x: o_rectF.right * sw, y: o_rectF.bottom * sh };
        //        var newrect = { left: lt.x, top: lt.y, width: rt.x - lt.x, height: lb.y - lt.y };
        this.new_bounds = { left: lt.x, top: lt.y, width: rt.x - lt.x, height: lb.y - lt.y };
        //  var pathstr = 'M' + lt.x + ',' + lt.y + 'L' + rt.x + ',' + rt.y + 'L' + rb.x + ',' + rb.y + 'L' + lb.x + ',' + lb.y + 'Z';
        //  var rectP = new fabric.Path(pathstr);
        //  rectP.set({ fill: 'green' ,opacity:0.4});
        //  canvas.add(rectP);
        return this.new_bounds;
    },

    // 点绝对坐标反变换； 输入反变换前点的绝对坐标，输出反变换后点的绝对坐标。point{x: ,y: }
    getOriPoint: function (point) {
        var cpt = { x: this.ori_bounds.left + this.ori_bounds.width / 2, y: this.ori_bounds.top + this.ori_bounds.height / 2 };  //获取中心点坐标
        var antimovemtx = [1 / this.transMatrix[0], 0, 0, 1 / this.transMatrix[3], 0, 0];  //缩放反变换矩阵
        var pt1 = this._transformMPoint(antimovemtx, point);      //对点进行反缩放变换
        pt1.x = pt1.x - cpt.x;              //获取相对坐标用于反旋转
        pt1.y = pt1.y - cpt.y;
        pt1 = this._transformMPoint(this._getRotateMtx(-this.angle), pt1);   //对点进行反旋转变换
        pt1.x = pt1.x + cpt.x;              //转换为点的绝对坐标
        pt1.y = pt1.y + cpt.y;
        //显示变换后的点。调试用
        //        var rectn = new fabric.Rect({ left: pt1.x, top: pt1.y, width: 4, height: 4, fill: 'black' });
        //        canvas.add(rectn);
        //返回变换后点的绝对坐标
        return pt1;
    },
    //    reTransPoint: function (point) {
    //        this.transMatrix
    //    },

    // 判断旋转缩放后矩形区域（this.new_bounds）是否包含某点
    containPoint: function (x, y) {
        var ileft = this.new_bounds.left ;
        var itop = this.new_bounds.top;
        if (x >= ileft && x <= ileft + this.new_bounds.width && y >= itop && y <= itop + this.new_bounds.height)
            return true;
        else
            return false;
    },

    //根据角度得到旋转变换矩阵
    _getRotateMtx: function (angle) {
        this.rotateMatrix[0] = Math.cos(angle * Math.PI / 180);
        this.rotateMatrix[1] = Math.sin(angle * Math.PI / 180);
        this.rotateMatrix[2] = -Math.sin(angle * Math.PI / 180);
        this.rotateMatrix[3] = Math.cos(angle * Math.PI / 180);
        this.rotateMatrix[4] = 0;
        this.rotateMatrix[5] = 0;
        return this.rotateMatrix;
    },

    //对某一点进行矩阵变换，该点的坐标应该是相对于矩阵旋转中心点的相对坐标。m为变换矩阵，p为变换点{x:  ,y:  }
    _transformMPoint: function (m, p) {
        return { x: m[0] * p.x + m[2] * p.y + m[4], y: m[1] * p.x + m[3] * p.y + m[5] };
    },

    //计算bounds的中心点,返回point对象{x:  ,y:   }
    _getCenterPoint: function (bounds) {
        var x = bounds.left, y = bounds.top, width = bounds.width, height = bounds.height;
        var cpt = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
        return cpt;
    },

    //根据旋转矩阵对bounds进行旋转变换，返回旋转后的bounds，默认以中心点旋转，rotatePoint省略(未实现保留)
    _rotatingBounds: function (bounds, matrix, rotatePoint) {
        //        var x = bounds.left, y = bounds.top, width = bounds.width, height = bounds.height;
        //        var rp = { x: 0, y: 0 };
        //        $.extend(rp, rotatePoint);
        //        var cpt = { x: bounds.left + bounds.width / 2 + rp.x, y: bounds.top + bounds.height / 2 + rp.y };
        //        //计算bounds的中心点
        var cpt = this._getCenterPoint(bounds);
        //调整旋转中心点（未实现保留）

        //计算左上角和右下角点的相对坐标
        var o_rectF = {
            left: bounds.left - cpt.x,
            top: bounds.top - cpt.y,
            right: bounds.left + bounds.width - cpt.x,
            bottom: bounds.top + bounds.height - cpt.y
        };
        //左上角点旋转后的相对坐标
        var lt = this._transformMPoint(matrix, { x: o_rectF.left, y: o_rectF.top });
        //左下角点旋转后的相对坐标
        var lb = this._transformMPoint(matrix, { x: o_rectF.left, y: o_rectF.bottom });
        //右上角点旋转后的相对坐标
        var rt = this._transformMPoint(matrix, { x: o_rectF.right, y: o_rectF.top });
        //右下角点旋转后的相对坐标
        var rb = this._transformMPoint(matrix, { x: o_rectF.right, y: o_rectF.bottom });
        //恢复四个点的真正坐标
        lt.x = lt.x + cpt.x; lt.y = lt.y + cpt.y;
        lb.x = lb.x + cpt.x; lb.y = lb.y + cpt.y;
        rt.x = rt.x + cpt.x; rt.y = rt.y + cpt.y;
        rb.x = rb.x + cpt.x; rb.y = rb.y + cpt.y;
        //计算并返回旋转后的矩形区域
        var minX = Math.min(lt.x, lb.x, rt.x, rb.x);
        var maxX = Math.max(lt.x, lb.x, rt.x, rb.x);
        var minY = Math.min(lt.y, lb.y, rt.y, rb.y);
        var maxY = Math.max(lt.y, lb.y, rt.y, rb.y);
        var newrect = { left: minX, top: minY, width: maxX - minX, height: maxY - minY };
        //         var pathstr = 'M' + lt.x + ',' + lt.y + 'L' + rt.x + ',' + rt.y + 'L' + rb.x + ',' + rb.y + 'L' + lb.x + ',' + lb.y + 'Z';
        //         var rectP = new fabric.Path(pathstr);
        //         rectP.set({ fill: 'green' ,opacity:0.5});
        //         canvas.add(rectP);
        return newrect;
    },

    //获得缩放变换矩阵，以画布左上角为基准，根据变换矩阵自动变换摆放图元。用于旋转后对newbounds进行变换
    //参数为原始缩放变换矩阵，
    getTranformM: function (ori_transformM) {
        var sw = ori_transformM[0];
        var sh = ori_transformM[3];
        var mw = -(((1 - sw) * this.new_bounds.width / 2) + (this.new_bounds.left - 0) * (1 - sw));
        var mh = -(((1 - sh) * this.new_bounds.height / 2) + (this.new_bounds.top - 0) * (1 - sh));
        return ([sw, 0, 0, sh, mw, mh]);
    },


    toString: function () {
        return 'TransBounds';
    }
});
//------------------------------------------------------------------------------------------
//  图元基类
ActorsBase = fabric.util.createClass({
    initialize: function (canvas) {              //所有图元的初始属性设置及初始化操作
        this.option = {
            X: 0,
            Y: 0,
            Flip: false,           //对应group的FlipX
            Visible: true,
            Enabled: true,
            RotateAngle: 0,
            Opacity: 1,
            TransformMatrix: [1, 0, 0, 1, 0, 0]
        };
        this.canvas = canvas;
        this.group = new fabric.Group();
        this.topgroup = new fabric.Group();
        this.changebounds = new ChangeBounds();      //处理旋转和缩放
        this.shapearray = new Array();              //图元形状数组，图元初始化时将影响图元外形的子图元放在该数组中
        //获取图元所在canvas的位移，并设置changebounds中的相应值
        //this.changebounds.offset.left = this.canvas.calcOffset()._offset.left;
        //this.changebounds.offset.top = this.canvas.calcOffset()._offset.top;
        this.offsetleft = this.canvas.calcOffset()._offset.left;
        this.offsettop = this.canvas.calcOffset()._offset.top;
        this.actortype = "fabricActor";
    },

    //根据options更新图元参数：this.option
    setOption: function (options) {
        $.extend(this.option, options);
        //处理字体大小fontSize
        if (this.option.fontSize) {
            this.option.fontSize = this.option.fontSize * 4 / 3;
        }
    },

    init: function (options) {
        this.setOption(options);
    },

    //根据初始化参数更新图元参数：this.option
    setoption: function (X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        var options = this._getOptions(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        $.extend(this.option, options);
        //初始化图形区域,x,y 应该加上canvas的xy偏移值
        this.changebounds.setBounds({ left: X + this.offsetleft, top: Y + this.offsettop, width: Width, height: Height });
        //设置旋转图形区域
        if (this.option.RotateAngle != 0) {
            this.changebounds.rotateBounds(this.option.RotateAngle);
        }
    },

    //
    _addtoGroup: function (obj) {                      //向group中添加子图元
        obj.hasBorders = false;
        this.group.addWithUpdate(obj);
    },

    _setGroupOptions: function () {                    //设置group的属性
        //set group default options
        this.group.setOptions({
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            flipX: this.option.Flip,                 //对应option中的Flip
            transformMatrix: this._getTransformM(this.option.TransformMatrix),
            angle: this.option.RotateAngle,
            opacity: this.option.Opacity,
            //            selectable:false,
            visible: this.option.Visible,
            enabled: this.option.Enabled
        });
        // 设置缩放图形区域
        this.changebounds.transBounds(this.option.TransformMatrix);
    },

    // 设置topgroup属性
    _setTopgroupOptions: function () {
        this.topgroup.add(this.group);
        this.topgroup.setOptions({
            left: this.option.X,
            top: this.option.Y,
            width: this.option.Width,
            height: this.option.Height,
            hasBorders: false,
            selectable: false        // 设置图元是否可以选中和移动
        });
    },

    //  将图元初始化参数赋给option
    _getOptions: function (X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        var option = {
            X: X,
            Y: Y,
            Width: Width,
            Height: Height,
            RotateAngle: RotateAngle,
            Flip: Flip,
            centerPX: centerPX,
            centerPY: centerPY
        }
        return option;
    },

    //处理斜体，粗体等属性的公用函数;设置文字属性
    _setFontStyle:function(option){
        var FSstr = new String(option.fontStyle);
        if (FSstr.indexOf('Italic') != -1) {
            option.fontStyle = 'italic';
        } else {
            option.fontStyle = 'normal';
        }
        if (FSstr.indexOf('Bold') != -1) {
            option.fontWeight = 'bold';
        }
    },


    // 获取缩放变换矩阵，原变换矩阵以图元中心为基准，新的变换矩阵以画布左上角为基准
    //根据变换矩阵计算图元变换的偏移量
    //自动变换摆放图元，以画布左上角为基准
    _getTransformM: function (ori_transformM) {
        var sw = ori_transformM[0];
        var sh = ori_transformM[3];
        var mw = -(((1 - sw) * this.topgroup.width / 2) + (this.topgroup.left - 0) * (1 - sw));
        var mh = -(((1 - sh) * this.topgroup.height / 2) + (this.topgroup.top - 0) * (1 - sh));
        return ([sw, 0, 0, sh, mw, mh]);
    },

    _renderRefresh: function () {                      //完成刷新动作
        this._setGroupOptions();
        //this.canvas.renderAll();
        return this.topgroup;
    },

    //事件和事件响应处理（未使用）
    addEventListener: function (event, func) {
        if (this.option.Enabled) {    //图元可用时响应事件
            this.topgroup.item(0).on(event, func);
        }
    },


    /// 判断屏幕上的某一点是否包括在本图元中
    containPoint: function (x, y) {
        //如果Enabled为false；不响应事件，直接返回false
        if (!this.option.Enabled) {
            return false;
        }

        //下面这行代码按外框矩形选中图元（tablepage和layoutpage中用），如果要根据具体形状选中，注解下面一行
        //return this.changebounds.containPoint(x, y);

        //下面代码根据图元具体形状选中图元，
        if (this.changebounds.containPoint(x, y)) {

            // 如果图元形状数组为空，则bounds的边界即为图元形状，不必对点进行反变换即可判断鼠标点在图元中
            if (this.shapearray.length == 0) {
                //下面6行代码显示点，调试用
                //if (this.changebounds.containPoint(x, y)) {
                //    var cpoint = new fabric.Point(x, y);
                //    cpoint = this.changebounds.getOriPoint(cpoint);  //映射到图元的原始坐标点
                //    var rectn = new fabric.Rect({ left: cpoint.x, top: cpoint.y, width: 2, height: 2, fill: 'black' });
                //    this.canvas.add(rectn);
                //}
                return this.changebounds.containPoint(x, y);    // 根据变形后的区域（new_bounds），判断屏幕上的某一点是否包括在本图元中
            }
                // 如果图元形状数组非空，则将鼠标点的坐标反变换，根据形状数组判断点是否在图元中
            else {
                var cpoint = new fabric.Point(x, y);
                cpoint = this.changebounds.getOriPoint(cpoint);  //鼠标点映射到图元的原始坐标点

                //若图元所在canvas起始点不是（0,0），位移cpoint;added by zhanj on 2016/7/5; 
                cpoint.x = cpoint.x - this.offsetleft;
                cpoint.y = cpoint.y - this.offsettop;

                //若图元已经旋转，则先旋转中心点，再用旋转后的值调整cpoint(能使用，但落点判断不够准确)
                // 若图元中心点非默认点，调整cpoint
                if (this.option.RotateAngle != 0) {
                    var opoint = this.group.getCenterPoint();
                    //                    console.log("----" + opoint.x + "," + opoint.y);
                    opoint = this.changebounds._transformMPoint(this.changebounds._getRotateMtx(this.option.RotateAngle), opoint);
                    //                    console.log("+++++" + opoint.x + "," + opoint.y);
                    cpoint.x = cpoint.x + opoint.x;
                    cpoint.y = cpoint.y + opoint.y;
                }
                // 若图元已经翻转，则映射cpoint到翻转点
                // 获取bounds中心点cpt
                if (this.option.Flip) {
                    var cpt = this.changebounds._getCenterPoint({
                        left: this.topgroup.left, top: this.topgroup.top, width: this.topgroup.width, height: this.topgroup.height
                    });
                    cpoint.x = cpoint.x - 2 * (cpoint.x - cpt.x);
                }

                // 对应每一个形状数组中的子图元，判断其是否包含鼠标落点
                var n = this.shapearray.length;
                for (var i = 0; i < n; i++) {
                    if (this.shapearray[i].containsPoint(cpoint)) {
                        ////下面两行代码显示点，调试用
                        //var rectn = new fabric.Rect({ left: cpoint.x, top: cpoint.y, width: 2, height: 2, fill: 'black' });
                        //this.canvas.add(rectn);
                        return true;
                    }
                }
                return false;
            }
        }
    },

    // 将一个矩形区域添加到图元形状数组（shapearray）中
    /// 每一个影响图元外形的子图元都应调用该函数，
    // adjustxy用于调整图元形状矩形的左上角坐标，有的图元(cross2)的左上角坐标不是option.X,option.Y；无需调整时省略此参数
    // 若中心点和左上角调整，需在图元类最后集中添加子图元，以便正确获得最终图元中心点和左上角坐标
    // _addToShape: function (shapeobj, adjustxy) {
    //        if (typeof adjustxy == 'undefined') { var adjustxy; adjustxy = {x:0,y:0} }
    //        var gl = this.option.X + adjustxy.x;
    //        var gt = this.option.Y + adjustxy.y;
    _addToShape: function (shapeobj) {
        var gl = this.option.X + this.group.getCenterPoint().x;
        var gt = this.option.Y + this.group.getCenterPoint().y;
        var gw = this.option.Width;
        var gh = this.option.Height;
        var shaperect = new fabric.Rect({
            left: shapeobj.getBoundingRect().left - 0.5 + gw / 2 + gl,
            top: shapeobj.getBoundingRect().top - 0.5 + gh / 2 + gt,
            width: shapeobj.getBoundingRect().width - 1,
            height: shapeobj.getBoundingRect().height - 1,
            fill: 'blue',
            opacity: 0.3,
            visible: false           //调试时可设置为‘true’，显示图元初始轮廓
        });
        this.canvas.add(shaperect);
        this.shapearray.push(shaperect);
    },

    // 画变换后的矩形,调试用
    __showNewbounds: function () {
        var pathstr = 'M' + this.changebounds.new_bounds.left + ',' + this.changebounds.new_bounds.top;
        pathstr = pathstr.concat('L   ' + (this.changebounds.new_bounds.left + this.changebounds.new_bounds.width));
        pathstr = pathstr.concat('  ,  ' + this.changebounds.new_bounds.top + '  L   ');
        pathstr = pathstr.concat((this.changebounds.new_bounds.left + this.changebounds.new_bounds.width) + '  ,   ');
        pathstr = pathstr.concat((this.changebounds.new_bounds.top + this.changebounds.new_bounds.height) + '  L   ');
        pathstr = pathstr.concat(this.changebounds.new_bounds.left + '  ,  ' + (this.changebounds.new_bounds.top + this.changebounds.new_bounds.height) + '   Z');
        var rectP = new fabric.Path(pathstr);
        rectP.set({ fill: 'green', opacity: 0.5 });
        canvas.add(rectP);
    },

    toString: function () {
        return 'ActorsBase';
    }
});

//WebActorBase为web控件图元基类
WebActorBase = fabric.util.createClass({
    initialize: function (options) {              //所有图元的初始属性设置及初始化操作
        this.option = {
            X: 0,
            Y: 0,
            Height: 64,
            Width: 64, //设置图元默认的尺寸
            Flip: false,           //web图元水平翻转flip
            Visible: true,
            Enabled: true,
            RotateAngle: 0,
            Opacity: 1,
            TransformMatrix: [1, 0, 0, 1, 0, 0]
        };
        this.offsetleft = 0;//父页面左上角坐标
        this.offsettop = 0;
        this.changebounds = new ChangeBounds();//外框对象用于缩放
        this.setOption(options);
        //this.maincontrol = maincontrol;  //网页页面，添加dom元素用
        this.divid = "";  //承载图元的divid
        this.rotateStr = "";
        this.flipXstr = "";
        this.transformStr = "";
        this.actorid = ""; //图元id
        this.actortype = "webActor";
    },

    //创建承载input控件的div
    createDiv: function () {
        var X = this.option.X + "px";
        var Y = this.option.Y + "px";
        var Height = this.option.Height + "px";
        var Width = this.option.Width + "px";
        var Odiv = document.createElement("div");
        //Odiv.style.cssText = "background:#FFF;Text-align:center;line-height:0px";    //创建div的css样式
        Odiv.id = "webactor" + X + Y//创建div的id为box
        document.body.appendChild(Odiv);
        this.divid = Odiv.id;
        var e = document.getElementById(this.divid); //设置div的位置
        e.style.position = "absolute";
        e.style.left = X;
        e.style.top = Y;
        e.style.width = Width;
        e.style.height = Height;
    },

    //根据options更新图元参数：this.option
    setOption: function (options) {
        $.extend(this.option, options);
    },



    //根据初始化参数更新图元参数：this.option
    setoption: function (X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        var options = this._getOptions(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        $.extend(this.option, options);
        //初始化图形区域,x,y 应该加上canvas的xy偏移值
        this.changebounds.setBounds({ left: X + this.offsetleft, top: Y + this.offsettop, width: Width, height: Height });
        //设置旋转图形区域
        if (this.option.RotateAngle != 0) {
            this.changebounds.rotateBounds(this.option.RotateAngle);
        }
    },

    //处理init中通用操作
    _renderInit:function(i){
        if (i.actorid != "") {
            //整理传入的属性TextColor=Color;BackColor=backgroundColor;  regular == nomal
            var options = {};
            $.extend(options, i.option);
            if (options.TextColor != undefined) {
                i.option.Color = options.TextColor;
            }
            if (options.BackColor != undefined) {
                i.option.backgroundColor = options.BackColor;
            }
            if (options.fontStyle != undefined) {
                if (i.option.fontStyle.indexOf("Italic") != -1) {
                    i.option.fontStyle = "italic";
                } else {
                    i.option.fontStyle = "normal";
                }
                if (options.fontStyle.indexOf("Bold") != -1) {
                    i.option.fontWeight = "bold";
                }
                if (options.fontStyle.indexOf("Underline") != -1) {
                    $.extend(i.option,{textDecoration : 'underline'});
                }
                if (options.fontStyle.indexOf("Strikeout") != -1) {
                    $.extend(i.option, { textDecoration: 'line-through' });
                }
            }

            var io = document.getElementById(i.actorid);
            io.style.fontSize = i.option.fontSize*4/3 + "px";
            io.style.fontFamily = i.option.fontFamily;
            io.style.fontStyle = i.option.fontStyle;
            io.style.color = i.option.Color;
            io.style.backgroundColor = i.option.backgroundColor; //设置actor的背景色
            io.style.fontWeight = i.option.fontWeight;
            io.style.textDecoration = i.option.textDecoration;
            io = document.getElementById(i.divid); //图元背景色设为div的背景色
            io.style.backgroundColor = i.option.backgroundColor;
        }
    },

    //  将图元初始化参数赋给option
    _getOptions: function (X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        var option = {
            X: X,
            Y: Y,
            Width: Width,
            Height: Height,
            RotateAngle: RotateAngle,
            Flip: Flip,
            centerPX: centerPX,
            centerPY: centerPY
        }
        return option;
    },

    _setRotateStr: function () {
        if (this.option.RotateAngle != 0) {
            this.rotateStr = "rotate(" + this.option.RotateAngle + "deg)";
        }
    },

    //_setFlipXStr:function(){
    //    if (!this.option.Flip) {
    //        this.flipXstr = "scale(-1,1)";
    //    }
    //},

    _getTrasnsformStr: function (transformax) {  //transformax为移动和缩放变换矩阵
        var ttt = transformax;
        if (this.option.Flip) {
            this.transformStr = "translate(" + ttt[4] + "px," + ttt[5] + "px) scale(-" + ttt[0] + "," + ttt[3] + ") " + this.rotateStr;
            //this.transformStr = "scale(-1,1)  translate(" + ttt[4] + "px," + ttt[5] + "px) scale(" + ttt[0] + "," + ttt[3] + ") " + this.rotateStr;
        } else {
            this.transformStr = "translate(" + ttt[4] + "px," + ttt[5] + "px) scale(" + ttt[0] + "," + ttt[3] + ") " + this.rotateStr;
        }
    },

    //// 获取缩放变换矩阵，原变换矩阵以图元中心为基准，新的变换矩阵以画布左上角为基准
    ////根据变换矩阵计算图元变换的偏移量
    ////自动变换摆放图元，以画布左上角为基准
    //_getTransformM: function (ori_transformM) {
    //    var sw = ori_transformM[0];
    //    var sh = ori_transformM[3];
    //    var mw = -(((1 - sw) * this.topgroup.width / 2) + (this.topgroup.left - 0) * (1 - sw));
    //    var mh = -(((1 - sh) * this.topgroup.height / 2) + (this.topgroup.top - 0) * (1 - sh));
    //    return ([sw, 0, 0, sh, mw, mh]);
    //},

    _renderRefresh: function (options) {                      //完成刷新动作
        //处理Visible属性
        if (this.option.Visible) {
            $("#" + this.divid).show();
        } else {
            $("#" + this.divid).hide();
        }
        //处理缩放和旋转
        if (typeof (options.TransformMatrix) != "undefined") {
            var divdom = document.getElementById(this.divid);
            this._getTrasnsformStr(_getTransformM(options.TransformMatrix, this.changebounds.ori_bounds));
            divdom.style.transform = this.transformStr;
        } else {
            if (this.option.Flip) {
                var divdom = document.getElementById(this.divid);
                this.transformStr = "scale(-1,1) " + this.rotateStr;
                divdom.style.transform = this.transformStr;
            }
        }
    },

    containPoint: function (x, y) {
        return this.changebounds.containPoint(x, y);
    },
    //事件和事件响应处理（）
    addEventListener: function (event, func) {
        //$("#" + this.divid).on(event,func);
        $("#" + this.actorid).on(event, func);
    },
    
    toString: function () {
        return 'WebActorsBase';
    }
});


// 以下函数用于canvas和canvas中图元缩放，数组ra存放canvas中的图元,使用变量oriCanvasSize
// ca[],ra[],oriCanvasSize为网页上的全局变量
// 获取canvas大小
function getoriCanvasSize(canvas) {
    var oriCanvasSize = {};   //  canvas原始大小
    oriCanvasSize.height = canvas.getHeight();
    oriCanvasSize.width = canvas.getWidth();
    //oriCanvasSize.left = canvas.getBoundingClientRect.left;
    //oriCanvasSize.top = canvas.getBoundingClientRect.top;
    return oriCanvasSize;
}

// 基础函数，用于缩放网页上的div；对原始尺寸opt进行变换，变换矩阵为ori_transformM
function _getTransformM(ori_transformM, opt) {
    var sw = ori_transformM[0];
    var sh = ori_transformM[3];
    var mw = -(((1 - sw) * opt.width / 2) + (opt.left - 0) * (1 - sw));
    var mh = -(((1 - sh) * opt.height / 2) + (opt.top - 0) * (1 - sh));
    return ([sw, 0, 0, sh, mw, mh]);
}
//获得canvas在缩放时的位移
function _getCanPosition(ori_transformM, opt) {
    var sw = ori_transformM[0];
    var sh = ori_transformM[3];
    var mw = -((1 - sw) * opt.left);
    var mh = -((1 - sh) * opt.top);
    return ({ left: mw, top: mh });
}

function _getMatrixStr(matrix) {
    var str = 'matrix(' + matrix[0] + ',' + matrix[1] + ',' + matrix[2] + ',' + matrix[3] + ',' + matrix[4] + ',' + matrix[5] + ')';
    return str;
}
//缩放canvas和图元,sw和sh为缩放比例
function ScaleCanvas(cwidth, cheight) {
    //计算缩放比
    var sw = cwidth / oriPageBounds.width;
    var sh = cheight / oriPageBounds.height;
    ////缩放页面，缩放canvas
    //缩放子页面canvas
    for (var i = 0; i < cadivid.length; i++) {
        //  if (typeof(cadivid[i])== "string") {    //如果是的divid，获取其dom
        var divdom = document.getElementById(cadivid[i]);
        if (typeof (ca[i]) == "object") {  //如果是canvas（其ca[i]是对象）,执行canvas缩放
            divdom = document.getElementById(cadivid[i]).parentElement;  //canvas父节点的div的dom
            ca[i].setDimensions({ width: oricanBounds[i].width * sw, height: oricanBounds[i].height * sh });
            //移动div
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            //刷新canvas
            //eval("c_" + cadivid[i]+".renderAll()");
            //ca[i].renderAll();
            continue;
        }
        var str = new String(ca[i]);
        //for iframe;   iframeDiv
        if (str.indexOf("iframeDiv") != -1) {
            divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            continue;
        }
        //for HTMLpage；
        if (str.indexOf("htmlDiv") != -1) {
            divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            //divdom.style.transform = 'matrix(' + sw + ',' + '0' + ',' + '0' + ',' + sh + ',' + '0' + ',' + '0' + ')';
            continue;
        }


        //for gauge
        if (str.indexOf("Gauge") != -1) {
            divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            continue;
        }
        //for layoutpagediv;(未验证)
        if (str.indexOf("layoutpageDiv") != -1) {  
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            divdom.style.width = (oricanBounds[i].width * sw) + "px";
            divdom.style.height = (oricanBounds[i].height * sh) + "px";
            continue;
        }

        //for mappage
        if (str.indexOf("MapPage") != -1 && str.indexOf("Heat") == -1) {  //地图而不是热力图;缩放其canvas和div
            //divdom = document.getElementById(cadivid[i]);
            //divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            divdom.style.width = (oricanBounds[i].width * sw) + "px";
            divdom.style.height = (oricanBounds[i].height * sh) + "px";
            continue;
        }
        //for excelpage
        if (str.indexOf("ExcelPage") != -1) {  //excel页面;缩放其canvas和div
            //divdom = document.getElementById(cadivid[i]);
            //divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            divdom.style.width = (oricanBounds[i].width * sw) + "px";
            divdom.style.height = (oricanBounds[i].height * sh) + "px";
            excelObj.repaint();  //刷新excel页面
            continue;
        }
        //for echarts
        if (str.indexOf("EChart") != -1) {
            divdom = cadivid[i];   //echart的cadivid[i]为dom对象
            //var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);//缩放其canvas和div
            //divdom.style.left = (oricanBounds[i].left + position.left)+"px";
            //divdom.style.top = (oricanBounds[i].top + position.top)+"px";
            //divdom.style.width = (oricanBounds[i].width * sw) + "px";
            //divdom.style.height = (oricanBounds[i].height * sh) + "px";
            //var echartsobj = echarts.getInstanceByDom(divdom);
            //echartsobj.resize();
            divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            continue;
        }
        //for 热力图;
        if (str.indexOf("Heat") != -1) {
            divdom = cadivid[i];   //heatmap的cadivid[i]为dom对象
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);//缩放其canvas和div
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            divdom.style.width = (oricanBounds[i].width * sw) + "px";
            divdom.style.height = (oricanBounds[i].height * sh) + "px";
            var echartsobj = echarts.getInstanceByDom(divdom);
            echartsobj.resize();
            //divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
            continue;
        }
        //fro word(RichEditPage)
        if (str.indexOf("WordPage") != -1) {
            divdom = document.getElementById(cadivid[i]);
            var position = this._getCanPosition([sw, 0, 0, sh, 0, 0], oricanBounds[i]);//div位置
            divdom.style.left = (oricanBounds[i].left + position.left) + "px";
            divdom.style.top = (oricanBounds[i].top + position.top) + "px";
            //divdom.style.width = (oricanBounds[i].width * sw) + "px";
            //divdom.style.height = (oricanBounds[i].height * sh) + "px";
            var docobjstr = "docobj" + cadivid[i].toString();
            var divdoc = document.getElementById(docobjstr);// doc的object的大小
            divdoc.style.width = (oricanBounds[i].width * sw) + "px";
            divdoc.style.height = (oricanBounds[i].height * sh) + "px";
            //divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], oricanBounds[i]));
        }
    }

    //缩放页面上的divbounds
    if (typeof(divboundsArr) != "undefined") {
        for (var i = 0; i < divboundsArr.length; i++) {
            divboundsArr[i].transBounds([sw, 0, 0, sh, 0, 0]);
        }
    }
    //  对应canvas中的每个图元（数组ra中），缩放
    for (var i = 0; i < ra.length; i++) {
        //if (ra[i].constructor.name == 'ECharts') {  //如果图元为ECharts，忽略；ECharts缩放在子页面缩放中实现
        //        //do nothing
        //}
        //if (ra[i].constructor.name == 'i') {        // 如果图元为Actors(i),执行Actors缩放命令
        if (ra[i].actortype == 'fabricActor'||ra[i].actortype == 'webActor') {        // 如果图元为Actors(i),执行Actors缩放命令
            ra[i].refresh({ TransformMatrix: [sw, 0, 0, sh, 0, 0] });
        }
    }
}

//窗口缩放响应函数; lockW锁定宽高比;ScaleLarger是否页面可以放大超过原始页面
function doResize(ZomModel,LockShape,ScaleLarger) {
    //var browserWidth = $(window).width();
    //var navTabWins = getElementsClass('navTab-panel tabsPageContent layoutBox');
    //var browserHeight;
    //if (typeof (navTabWins[0]) != "undefined") {
    //    var navTabWin = navTabWins[0];  //navTabWin为主页面对象，根据此对象获取网页的高度和宽度
    //  //  navTabWin.style.width = browserWidth;  //设置宽度以便高度值生效
    //    browserHeight = parseInt(navTabWin.style.height);
    //} else {
    //    browserHeight = $(window).height();
    //}
    //console.log("winheight:"+browserHeight);

    var browserWidth;
    var navTabWins = getElementsClass('navTab-panel tabsPageContent layoutBox');//页面高度网页对象
    var wincontainer = parent.document.getElementById('container');//页面宽度网页对象
    var browserHeight;
    if (typeof (navTabWins[0]) != "undefined") {
        var navTabWin = navTabWins[0];  //navTabWin为主页面对象，根据此对象获取网页的高度和宽度
        browserHeight = parseInt(navTabWin.style.height);
        browserWidth = parseInt(wincontainer.style.width);
    } else {
        browserHeight = $(window).height();
        browserWidth = $(window).width();
    }
    //console.log("winheight:"+browserHeight);
    //console.log("winwidth:" + browserWidth);
    var reWidth;
    var reHeight;
    switch(ZomModel)
    {
        case "AutoSize":
            if (LockShape) {
                if (ScaleLarger) {  //页面可以放大超过原始页面
                    reWidth  = browserWidth;
                    reHeight = browserHeight;
                } else {  //页面缩放限制在原始页面之内
                    reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                    reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                }
                var ratio = oriPageBounds.height / oriPageBounds.width;
                if (reHeight < reWidth * ratio)
                    reWidth = reHeight / ratio;
                else
                    reHeight = reWidth * ratio;
            } else {
                if (ScaleLarger) {  //页面可以放大超过原始页面
                    reWidth = browserWidth;
                    reHeight = browserHeight;
                } else {  //页面缩放限制在原始页面之内
                    reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                    reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                }
            }
            break;
        case "AutoHeight":
            if (LockShape) {
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                var ratio = oriPageBounds.height / oriPageBounds.width;
                    reWidth = reHeight / ratio;
            } else {
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                reWidth = oriPageBounds.width;
            }
            break;
        case "AutoWidth":
            if (LockShape) {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                var ratio = oriPageBounds.height / oriPageBounds.width;
                reHeight = reWidth * ratio;
            } else {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                reHeight = oriPageBounds.height;
            }
            break;
        case "Manual":
            reWidth = oriPageBounds.width;
            reHeight = oriPageBounds.height;
            return;  //直接返回，不进行缩放
            break;
    }
    ScaleCanvas(reWidth, reHeight);             //canvas缩放
    //刷新canvas
    for (var i = 0; i < cadivid.length; i++) {
        if (typeof (ca[i]) == "object") {  //如果是canvas（其ca[i]是对象）
            ca[i].renderAll();
        }
    }
}
//根据classname获取元素
function getElementsClass(classnames) {
    var classobj = new Array();//定义数组 
    var classint = 0;//定义数组的下标 
    var tags = parent.document.getElementsByTagName("*");//获取HTML的所有标签 
    for (var i in tags) {//对标签进行遍历 
        if (tags[i].nodeType == 1) {//判断节点类型 
            if (tags[i].getAttribute("class") == classnames)//判断和需要CLASS名字相同的，并组成一个数组 
            {
                classobj[classint] = tags[i];
                classint++;
            }
        }
    }
    return classobj;//返回组成的数组 
}

function doResizeTable(ZomModel, LockShape) {
    var browserWidth = $(window).width();
    var navTabWins = getElementsClass('navTab-panel tabsPageContent layoutBox');
    var browserHeight;
    if (typeof (navTabWins[0]) != "undefined") {
        var navTabWin = navTabWins[0];  //navTabWin为主页面对象，根据此对象获取网页的高度和宽度
        //navTabWin.style.width = browserWidth;  //设置宽度以便高度值生效
        browserHeight = parseInt(navTabWin.style.height);
    } else {
        browserHeight = $(window).height();
    }
    var reWidth;
    var reHeight;
    switch (ZomModel) {
        case "AutoSize":
            if (LockShape) {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                var ratio = oriPageBounds.height / oriPageBounds.width;
                if (reHeight < reWidth * ratio)
                    reWidth = reHeight / ratio;
                else
                    reHeight = reWidth * ratio;
            } else {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
            }
            break;
        case "AutoHeight":
            if (LockShape) {
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                var ratio = oriPageBounds.height / oriPageBounds.width;
                reWidth = reHeight / ratio;
            } else {
                reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
                reWidth = oriPageBounds.width;
            }
            break;
        case "AutoWidth":
            if (LockShape) {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                var ratio = oriPageBounds.height / oriPageBounds.width;
                reHeight = reWidth * ratio;
            } else {
                reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
                reHeight = oriPageBounds.height;
            }
            break;
        case "Manual":
            reWidth = oriPageBounds.width;
            reHeight = oriPageBounds.height;
    }
    //缩放table的div
    for (var i = 0; i < tabledivs.length; i++) {
        var divdom = document.getElementById(tabledivs[i].id);
        var sw = reWidth / oriPageBounds.width;
        var sh = reHeight / oriPageBounds.height;
        divdom.style.transform = this._getMatrixStr(this._getTransformM([sw, 0, 0, sh, 0, 0], tabledivs[i]));
    }
    //缩放表格中的页面
    ScaleCanvas(reWidth, reHeight);
}

// 鼠标单击事件函数
function doClick(evt) {
    evt = evt || window.event;
    var x = 0, y = 0;

    //如果事件对象有pageX属性,对应firefox,opera,chrome,safari浏览器
    if (evt.pageX) {
        x = evt.pageX;
        y = evt.pageY;
    }
        //如果对象有clientX属性,对应IE浏览器
    else if (evt.clientX) {
        var offsetX = 0, offsetY = 0;
        //IE6及其以上版本
        if (document.documentElement.scrollLeft) {
            offsetX = document.documentElement.scrollLeft;
            offsetY = document.documentElement.scrollTop;
        }
            //IE较旧的版本
        else if (document.body) {
            offsetX = document.body.scrollLeft;
            offsetY = document.body.scrollTop;
        }
        x = evt.clientX + offsetX;
        y = evt.clientY + offsetY;
    }

    //下面判断被点击的对象；Actor->热力图区域->热力图->地图区域->地图->矩形区域（页面div）
    // clickObj为存放响应事件的对象数组

    for (var i = 0; i < clickObj.length; i++) {
        if (clickObj[i].type == 'fbactor' || clickObj[i].type == 'textactor') {
        //if (clickObj[i].type == 'fbactor' ) {
            if (clickObj[i].obj.containPoint(x, y)) {
                pageOnActions(clickObj[i].index);
                return;
            }
            continue;
        }
        if (clickObj[i].type == 'divbounds') {
            //获取div对象，并判断其是否包含鼠标点
            //var browserWidth = document.documentElement.clientWidth;
            //var browserHeight = document.documentElement.clientHeight;
            //var reWidth = oriPageBounds.width <= browserWidth ? oriPageBounds.width : browserWidth;
            //var reHeight = oriPageBounds.height <= browserHeight ? oriPageBounds.height : browserHeight;
            //var divdom = document.getElementById(tabledivs[i].id);
            //var divbounds = new ChangeBounds({ left: divdom.clientLeft, top: divdom.clientTop, width: divdom.clientWidth, height: divdom.clientHeight });
            //divbounds.setBounds();
            //var sw = reWidth / oriPageBounds.width;
            //var sh = reHeight / oriPageBounds.height;
            //divbounds.transBounds([sw,0,0,sh,0,0]);
            var divbounds = clickObj[i].obj;
            if (divbounds.containPoint(x, y)) {
                pageOnActions(clickObj[i].index);
                return;
            }
            continue;
        }
    }
}

function doMousemove(ev) { //处理fbactor的mouseover/mouseout事件
    ev = ev || window.event;
    var mousePos = mousePosition(ev);
    for (var i = 0; i < clickObj.length; i++) {
        if (clickObj[i].type == 'divbounds' || clickObj[i].type == 'textactor' || clickObj[i].type == 'webactor') {   //响应事件为子页面或textactor、webactor时，跳过
            continue;
        }
        if (clickObj[i].type == 'fbactor') {
            if (clickObj[i].obj.containPoint(mousePos.x, mousePos.y)) {
                clickObj[i].obj.topgroup.opacity = 0.5;
                clickObj[i].obj.canvas.renderAll();
            } else {
                clickObj[i].obj.topgroup.opacity = 1;
                clickObj[i].obj.canvas.renderAll();
            }
        }
    }
}
// 获取鼠标坐标
function mousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

//HTML页面跳转函数(跳转到内部页面)
function HtmlOnClickJump(url) {
    url = "Pages/" + url;
    if (typeof (parent.window.beforRedirect) != 'undefined') {
        parent.window.beforeRedirect(url); // 
    } else {
        parent.parent.window.beforeRedirect(url);
    };
    return false;
}

//HTML页面跳转函数（跳转到外部页面）
function HtmlOnClickJumpOuterPage(url,title) {
    if (typeof (parent.window.navTab) != 'undefined') {
        parent.window.navTab.openTab("", url, { title: title, fresh: true, external: true }); // iframeSrcStr.ToString());
    } else {
        parent.parent.window.navTab.openTab("", url, { title:title, fresh: true, external: true });
    };
    return false;
}

//HTML页面跳转函数（处理各种类型“jumpblank,jumpframe,jumpself”htmlitem的跳转）
function HtmlJump(jumptype,jumptoouterpage, url, title, targetpageid,parentpageid) {
    switch (jumptype) {
        case "JumpBlank":
            if (jumptoouterpage) { //跳转到外部页面
                HtmlOnClickJumpOuterPage(url, title);
            } else {  //跳转到内部页面
                //url = "Pages/" + url;
                HtmlOnClickJump(url);
            }
            break;
        case "JumpFrame":
            var Oiframe = parent.document.getElementById("mypage_iframe_" + targetpageid);
            Oiframe.src = url;
            break;
        case "JumpSelf":
            if (!jumptoouterpage) { //跳转到内部页面
                url= "Pages/" + url;
            }
            if (typeof (parent.window.navTab) != 'undefined') {
                parent.window.navTab.openTab(parentpageid, url, { title: title, fresh: true, external: true }); // iframeSrcStr.ToString());
            } else {
                parent.parent.window.navTab.openTab(parentpageid, url, { title: title, fresh: true, external: true });
            };
            break;
        default:
            break;
    }
}

//将object的位置（x,y）和大小(根据type得到)传入oriCanBounds数组
function pushOriBounds(type,object,x,y){
    switch (type) {
        case "canvas":
            var canvasName = "c_" + object;
            var canvasactor = document.getElementById(canvasName);
            var oriBounds = {};
            oriBounds.width = getoriCanvasSize(canvasactor).width;
            oriBounds.height = getoriCanvasSize(canvasactor).height;
            oriBounds.left = x;
            oriBounds.top = y;
            oriBounds.ca = canvasactor;
            oriBounds.cadivid = "'"+object+"'";
            break;
        case    "mappage":

            break;
        case    "echart":

            break;
        case    "jason":

            break;
        default:
        
    }
}

function setOriBounds(bounds){
    var oriBounds = {};
    oriBounds.width  = bounds.width;
    oriBounds.height = bounds.height;
    oriBounds.left = bounds.left ;
    oriBounds.top = bounds.top ;
    oricanBounds.push(oriBounds);
}


