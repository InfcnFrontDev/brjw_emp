/**
* Created by ZHAN on 2016/3/8.
*/

var StoreCooling = StoreCooling || {};

StoreCooling.CoolingTower = fabric.util.createClass(ActorsBase, {
    // 冷却塔  CoolingTower
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {          //set special actor's options here
            Height: 64,   //used by actors，宽高比为200:300；等比变换
            Width: 42.66667,   //used by actors   
            //            Min: 0,         //最小值
            //            Max: 1,         //最大值
            CoolingRate: 0.45,  //默认冷热比
            FillColor: 'rgb(180,180,180)'
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.h = 0;     //冷水柱高度
        this.refreshObjs = new Array();     // 刷新对象
        this.pathstrArr = new Array();      //path数组
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //计算冷水柱高度h
    _setH: function () {
        this.h = (this.option.Height - (this.option.Width) / 2) * this.option.CoolingRate;   //冷水柱形高
    },

    initializeobjs: function () {
        this._setH();
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;  //填充颜色
        var diameter = iwidth;
        var td = diameter / 2;
        var height = iheight - td;

        var a = diameter / 2;
        var b = td / 2;
        var ox = 0.5 * a;
        var oy = 0.6 * b;


        //original shape outline
//        var rect0 = new fabric.Rect({
//            left: 0,
//            top: 0,
//            height: iheight,
//            width: iwidth,
//            fill: 'yellow',
//            opacity: 0.3,
//            visible: true,
//            hasBorders: false,
//            originX: 'center',
//            originY: 'center'
//        });
//        this.topgroup.addWithUpdate(rect0);

        //draw image here
        // adjust rotatingpoint
        //var rectrotate = new fabric.Rect({
        //    left: 0,
        //    top: 0,
        //    height: iheight,
        //    width: iwidth,
        //    fill: 'green',
        //    opacity: 0.1,
        //    visible: false,
        //    hasBorders: false,
        //    originX: 'center',
        //    originY: 'center'
        //});
        //this.group.addWithUpdate(rectrotate);

        // 画罐顶

        var pathstring = 'M' + a + ',0C' + a + ',' + (-oy) + ',' + ox + ',' + (-b) + ',0,' + (-b);
        pathstring = pathstring.concat('C' + (-ox) + ',' + (-b) + ',' + (-a) + ',' + (-oy) + ',' + (-a) + ',0');
        pathstring = pathstring.concat('C' + (-a) + ',' + (oy) + ',' + (-ox) + ',' + (b) + ',' + (0) + ',' + b);
        pathstring = pathstring.concat('C' + (ox) + ',' + (b) + ',' + (a) + ',' + (oy) + ',' + (a) + ',' + 0 + 'z');
        var path1 = new fabric.Path(pathstring);
        path1.set({
            left: 0,
            top: -iheight / 2,
            hasBorders: false,
            angle:0,
            originX: 'center',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: td,
            colorStops: {
                0: fillcolor,
                //                0.9: fillcolor,
                1: 'white'
            }
        });
        this.refreshObjs.push(path1);
        this.pathstrArr.push(pathstring);
        this.group.addWithUpdate(path1);


        // 画热水部分
        pathstring = 'M' + (-a) + ',0';
        pathstring = pathstring.concat('C' + (-a) + ',' + (oy) + ',' + (-ox) + ',' + (b) + ',' + (0) + ',' + b);
        pathstring = pathstring.concat('C' + (ox) + ',' + (b) + ',' + (a) + ',' + (oy) + ',' + (a) + ',' + 0);
        pathstring = pathstring.concat('L' + (a) + ',' + (height));
        pathstring = pathstring.concat('C' + (a) + ',' + (oy + height) + ',' + (ox) + ',' + (b + height) + ',' + (0) + ',' + (b + height));
        pathstring = pathstring.concat('C' + (-ox) + ',' + (b + height) + ',' + (-a) + ',' + (oy + height) + ',' + (-a) + ',' + height + 'z');
        var path2 = new fabric.Path(pathstring);
        path2.set({
            left: 0,
            top: -iheight / 2 + b,
            angle:0,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: diameter,
            y2: 0,
            colorStops: {
                0: 'rgb(255, 102, 0)',
                0.5: 'white',
                1: 'rgb(255, 102, 0)'
            }
        });
        this.refreshObjs.push(path2);
        this.pathstrArr.push(pathstring);
        this.group.addWithUpdate(path2);

        // 画冷水部分
        //        var h = height * this.option.CoolingRate;   //冷水柱形高
        //        var top = height / 2 - h;
        var h = this.h;
        pathstring = 'M' + (-a) + ',0';
        pathstring = pathstring.concat('C' + (-a) + ',' + (oy) + ',' + (-ox) + ',' + (b) + ',' + (0) + ',' + b);
        pathstring = pathstring.concat('C' + (ox) + ',' + (b) + ',' + (a) + ',' + (oy) + ',' + (a) + ',' + 0);
        pathstring = pathstring.concat('L' + (a) + ',' + (h));
        pathstring = pathstring.concat('C' + (a) + ',' + (oy + h) + ',' + (ox) + ',' + (b + h) + ',' + (0) + ',' + (b + h));
        pathstring = pathstring.concat('C' + (-ox) + ',' + (b + h) + ',' + (-a) + ',' + (oy + h) + ',' + (-a) + ',' + h + 'z');
        var path3 = new fabric.Path(pathstring);
        //        path3.set({
        //            left: 0,
        //            top: iheight/2,               //top
        //            hasBorders: false,
        //            originX: 'center',
        //            originY: 'bottom'
        //        });
        path3.set({
            left: 0,
            top: iheight / 2 - (h + td / 2),               //top
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path3.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: diameter,
            y2: 0,
            colorStops: {
                0: 'rgb(0, 0, 128)',
                0.5: 'white',
                1: 'rgb(0, 0, 128)'
            }
        });

        this.refreshObjs.push(path3);
        this.group.addWithUpdate(path3);
        path3.setCoords();
        //------------------------------------中心线，调试用
        //        var rect = new fabric.Rect({
        //            left: 0,
        //            top: 0,
        //            height: 2,
        //            width: iwidth,
        //            fill: 'black',
        //            hasBorders: false,
        //            originX: 'center',
        //            originY: 'center'
        //        });
        //        this.group.addWithUpdate(rect);
        //------------------------------------

        this._setGroupOptions();
        this._setTopgroupOptions();
        //        this.topgroup.add(this.group);
        //        this.topgroup.setOptions({left:this.option.X,top:this.option.Y,width:iwidth,height:iheight,hasBorders:false});
        return this.topgroup;
    },

    refresh: function (options) {     //每次刷新改变冷水圆柱体高度
        this.setOption(options);
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        var fillcolor = this.option.FillColor;  //填充颜色
        var diameter = iwidth;
        var td = diameter / 2;
        var height = iheight - td;

        var a = diameter / 2;
        var b = td / 2;
        var ox = 0.5 * a;
        var oy = 0.6 * b;
        //        this._setH();
        //        var h = this.h;
        var h = height * this.option.CoolingRate;   //冷水柱形高
        var top = height / 2 - h;


        // 下面代码不能正常刷新，因为绘制的路径不在其边界矩形中
        //        var obj = this.refreshObjs[0];
        //        obj.initialize(pathstring);
        //        obj.set({
        //            left: 0,
        //            top: iheight / 2 - (h + td / 2),
        //            hasBorders: false,
        //            originX: 'center',
        //            originY: 'top'
        //        });
        //        obj.setCoords();
        //        // 画冷水部分边界矩形，调试用
        //        var br = obj.getBoundingRect();
        //        var rrect = new fabric.Rect({
        //            left: br.left,
        //            top: br.top,
        //            width: br.width,
        //            height: br.height,
        //            fill: null,
        //            stroke: 1,
        //            strokecollor: 'orange',
        //            originX: 'left',
        //            originY: 'top'
        //        });
        //        this.group.addWithUpdate(rrect);

        // 下面代码使用重绘实现刷新
        //翻转数组
        this.refreshObjs = this.refreshObjs.reverse();
        this.pathstrArr  = this.pathstrArr.reverse();

        //重绘path1
        var obj1 = this.refreshObjs.pop();
        this.group.removeWithUpdate(obj1);   //删除group中最后一个添加的item；此处应为冷水部分
        this.canvas.remove(obj1);
        var pathstring1 = this.pathstrArr.pop();

        var path1 = new fabric.Path(pathstring1);
        path1.set({
            left: 0,
            top: -iheight / 2,
            angle:0,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path1.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: td,
            colorStops: {
                0: fillcolor,
                //                0.9: fillcolor,
                1: 'white'
            }
        });
      
        //this.refreshObjs.push(obj1);
        //this.group.addWithUpdate(obj1);

        //重绘path2
        var obj2 = this.refreshObjs.pop();
        this.group.removeWithUpdate(obj2);   //删除group中最后一个添加的item；此处应为冷水部分
        this.canvas.remove(obj2);
        var pathstring2 = this.pathstrArr.pop();
        var path2 = new fabric.Path(pathstring2);
        path2.set({
            left: 0,
            top: -iheight / 2,
            angle:0,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path2.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: td,
            colorStops: {
                0: fillcolor,
                //                0.9: fillcolor,
                1: 'white'
            }
        });
        //this.refreshObjs.push(obj2);
        //this.group.addWithUpdate(obj2);

        //重绘冷水部分
        var obj = this.refreshObjs.pop();
        this.group.removeWithUpdate(obj);   //删除group中最后一个添加的item；此处应为冷水部分
        this.canvas.remove(obj);
        //        obj.remove();
        pathstring = 'M' + (-a) + ',0';
        pathstring = pathstring.concat('C' + (-a) + ',' + (oy) + ',' + (-ox) + ',' + (b) + ',' + (0) + ',' + b);
        pathstring = pathstring.concat('C' + (ox) + ',' + (b) + ',' + (a) + ',' + (oy) + ',' + (a) + ',' + 0);
        pathstring = pathstring.concat('L' + (a) + ',' + (h));
        pathstring = pathstring.concat('C' + (a) + ',' + (oy + h) + ',' + (ox) + ',' + (b + h) + ',' + (0) + ',' + (b + h));
        pathstring = pathstring.concat('C' + (-ox) + ',' + (b + h) + ',' + (-a) + ',' + (oy + h) + ',' + (-a) + ',' + h + 'z');

        var path = new fabric.Path(pathstring, {   //重绘冷水部分
            left: 0,
            top: iheight / 2 - (h + td / 2),
            fill: 'gray',
            opacity: 0.2,
            hasBorders: false,
            originX: 'center',
            originY: 'top'
        });
        path.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: diameter,
            y2: 0,
            colorStops: {
                0: 'rgb(0, 0, 128)',
                0.5: 'white',
                1: 'rgb(0, 0, 128)'
            }
        });
        //推入顶部和热水
        this.refreshObjs.push(path1);
        this.pathstrArr.push(pathstring1);
        this.group.addWithUpdate(path1);
        this.refreshObjs.push(path2);
        this.pathstrArr.push(pathstring2);
        this.group.addWithUpdate(path2);
        //推入冷水部分
        this.refreshObjs.push(path);
        this.group.addWithUpdate(path);
//        console.log(canvas.size()+'  ,'+this.group.size());
        this._renderRefresh();
    },

    toString: function () {
        return ' 冷却塔  CoolingTower';
    }
});



