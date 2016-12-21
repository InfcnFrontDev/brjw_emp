/**
 * Created by ZHAN on 2016/1/28.
 */


ExcelActor = fabric.util.createClass({

    initialize: function (divid, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.option = {
            //X               :0,
            //Y               :0,
            Width: 300,
            Height: 150,
            Visible: true,
            Enabled: true,
            Opacity: 1,
            TransformMatrix: [1, 0, 0, 1, 0, 0]
        };
        var options = this._getOptions(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        $.extend(this.option, options);
        this.spread = new GcSpread.Sheets.Spread(document.getElementById(divid), { sheetCount: 1 });
        this.topgroup = { left: this.option.X, top: this.option.Y, width: this.option.Width, height: this.option.Height };
        //$(divid).css({
        //'transform'     :  matrix(0.866,0.5,0,5,0.866,0,0)
        //});
        //  spreaddiv in charge of sheet's position and size
        this.spreaddiv = document.getElementById(divid);
        this.spreaddiv.style.left = this.option.X + 'px';
        this.spreaddiv.style.top = this.option.Y + 'px';
        this.spreaddiv.style.width = this.option.Width + 'px';
        this.spreaddiv.style.height = this.option.Height + 'px';
        this.spreaddiv.style.display = 'none';                  //invisible
        this.spreaddiv.style.display = 'block';                 //visible
        this.spreaddiv.style.transform = this._getMatrixStr(this.option.TransformMatrix);

        // other properties
        this.spread.tabNavigationVisible(false); // false: hide, true: show
        this.spread.tabStripVisible(false);
        this.spread.newTabVisible(false);
        this.sheet = this.spread.getSheet(0);
        this.sheet.setRowHeaderVisible(false);
        this.sheet.setColumnHeaderVisible(false);
        // Get active sheet in spread instance
        this.activeSheet = this.spread.getActiveSheet();

    },
    //initialize: function(divid,options) {              //所有图元的初始属性设置及初始化操作
    //    this.option = {
    //        //X               :0,
    //        //Y               :0,
    //        Width           :300,
    //        Height          :150,
    //        Visible         :true,
    //        Enabled         :true,
    //        Opacity         :1,
    //        TransformMatrix:[1,0,0,1,0,0]
    //    };
    //    this.setOption(options);
    //    this.spread = new GcSpread.Sheets.Spread(document.getElementById(divid),{sheetCount:1});
    //    this.topgroup = {left:this.option.X,top:this.option.Y,width:this.option.Width,height:this.option.Height};
    //    //$(divid).css({
    //    //'transform'     :  matrix(0.866,0.5,0,5,0.866,0,0)
    //    //});
    //   //  spreaddiv in charge of sheet's position and size
    //    this.spreaddiv           = document.getElementById(divid);
    //    this.spreaddiv.style.left    = this.option.X+'px';
    //    this.spreaddiv.style.top     = this.option.Y+'px';
    //    this.spreaddiv.style.width     = this.option.Width+'px';
    //    this.spreaddiv.style.height     = this.option.Height+'px';
    //    this.spreaddiv.style.display     = 'none';                  //invisible
    //    this.spreaddiv.style.display     = 'block';                 //visible
    //    this.spreaddiv.style.transform = this._getMatrixStr(this.option.TransformMatrix);
    //
    //    // other properties
    //    this.spread.tabNavigationVisible(false); // false: hide, true: show
    //    this.spread.tabStripVisible(false);
    //    this.spread.newTabVisible(false);
    //    this.sheet = this.spread.getSheet(0);
    //    this.sheet.setRowHeaderVisible(false);
    //    this.sheet.setColumnHeaderVisible(false);
    //    // Get active sheet in spread instance
    //    this.activeSheet       = this.spread.getActiveSheet();
    //
    //},

    _getOptions: function (X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        //role.Location.X, role.Location.Y, role.Size.Width, role.Size.Height, RotateAngle, Flip, centerPoint
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

    _getMatrixStr: function (matrix) {
        var str = 'matrix(' + matrix[0] + ',' + matrix[1] + ',' + matrix[2] + ',' + matrix[3] + ',' + matrix[4] + ',' + matrix[5] + ')';
        return str;
    },

    binddata: function (dataset) {                      //can be done by refresh({DataSet:  })
        this.activeSheet.setDataSource(dataset);
    },

    refresh: function (options) {
        this.setOption(options);
        this.spreaddiv.style.transform = this._getMatrixStr(this._getTranformM(this.option.TransformMatrix));
        this.activeSheet.setDataSource(this.option.DataSet);
        if (this.option.Visible)
            this.spreaddiv.style.display = 'block';
        else
            this.spreaddiv.style.display = 'none';

    },

    setOption: function (options) {                    //更新图元参数：this.option
        $.extend(this.option, options);
    },




    _getTranformM: function (ori_transformM) {          //根据变换矩阵自动变换摆放图元，以画布左上角为基准
        var sw = ori_transformM[0];
        var sh = ori_transformM[3];
        var mw = -(((1 - sw) * this.topgroup.width / 2) + (this.topgroup.left - 0) * (1 - sw));
        var mh = -(((1 - sh) * this.topgroup.height / 2) + (this.topgroup.top - 0) * (1 - sh));
        return ([sw, 0, 0, sh, mw, mh]);
    },


    addEventListener: function (event, func) {
        this.topgroup.item(0).on(event, func);
    },

    //refresh:function(options){              //not used in the end
    //    // remove all group objects
    //    //this.group = null;
    //    var obj;
    //    while(this.topgroup.item(0) != null){
    //        obj = this.topgroup.item(0);
    //        this.topgroup.removeWithUpdate(obj);
    //    }
    //    this.group = new fabric.Group();
    //
    //    this.setOption(options);
    //    this.group = this.draw();
    //    this.canvas.renderAll();
    //},

    containPoint: function (x, y) {    //不响应鼠标事件
        return false;
    },

    toString: function () {
        return 'ActorsBase';
    }
});