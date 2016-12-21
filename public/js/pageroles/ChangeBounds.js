/**
* Created by ZHAN on 2016/2/1.
*/


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

    // 点绝对坐标反变换； 输入反变换前点的相对坐标，输出反变换后点的相对坐标。point{x: ,y: }
    getOriPoint: function (point) {
        var cpt = { x: this.ori_bounds.left + this.ori_bounds.width / 2, y: this.ori_bounds.top + this.ori_bounds.height / 2 };
        var antimovemtx = [1 / this.transMatrix[0], 0, 0, 1 / this.transMatrix[3], 0, 0];
        var pt1 = this._rotatingPoint(antimovemtx, point);
        pt1.x = pt1.x - cpt.x;
        pt1.y = pt1.y - cpt.y;
        pt1 = this._rotatingPoint(this._getRotateMtx(-this.angle), pt1);
        pt1.x = pt1.x + cpt.x;
        pt1.y = pt1.y + cpt.y;
        //显示变换后的点。调试用
        var rectn = new fabric.Rect({ left: pt1.x , top: pt1.y , width: 4, height: 4, fill: 'black' });
        canvas.add(rectn);
        return pt1;
    },
    //    reTransPoint: function (point) {
    //        this.transMatrix
    //    },

    // 判断旋转缩放后矩形区域（this.new_bounds）是否包含某点
    containPoint: function (x, y) {
        if (x >= this.new_bounds.left && x <= this.new_bounds.left + this.new_bounds.width && y >= this.new_bounds.top && y <= this.new_bounds.top + this.new_bounds.height)
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
    _rotatingPoint: function (m, p) {
        return { x: m[0] * p.x + m[2] * p.y + m[4], y: m[1] * p.x + m[3] * p.y + m[5] };
    },

    //根据旋转矩阵对bounds进行旋转变换，返回旋转后的bounds，默认以中心点旋转，rotatePoint省略
    _rotatingBounds: function (bounds, matrix, rotatePoint) {
        var x = bounds.left, y = bounds.top, width = bounds.width, height = bounds.height;
        var rp = { x: 0, y: 0 };
        $.extend(rp, rotatePoint);
        //计算bounds的中心点
        var cpt = { x: bounds.left + bounds.width / 2 + rp.x, y: bounds.top + bounds.height / 2 + rp.y };
        //调整旋转中心点

        //计算左上角和右下角点的相对坐标
        var o_rectF = {
            left: bounds.left - cpt.x,
            top: bounds.top - cpt.y,
            right: bounds.left + bounds.width - cpt.x,
            bottom: bounds.top + bounds.height - cpt.y
        };
        //左上角点旋转后的相对坐标
        var lt = this._rotatingPoint(matrix, { x: o_rectF.left, y: o_rectF.top });
        //左下角点旋转后的相对坐标
        var lb = this._rotatingPoint(matrix, { x: o_rectF.left, y: o_rectF.bottom });
        //右上角点旋转后的相对坐标
        var rt = this._rotatingPoint(matrix, { x: o_rectF.right, y: o_rectF.top });
        //右下角点旋转后的相对坐标
        var rb = this._rotatingPoint(matrix, { x: o_rectF.right, y: o_rectF.bottom });
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
