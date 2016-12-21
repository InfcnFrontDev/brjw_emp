/**
* Created by ZHAN on 2016/3/24.
*/

var ArcFurnace = ArcFurnace || {};
ArcFurnace.Actor = ArcFurnace.Actor || {};
ArcFurnace.Actor.RectBackgroundColor = fabric.util.createClass(ActorsBase, {
    // ������ɫ����
    initialize: function (canvas, X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY) {
        this.callSuper('initialize', canvas);
        this.defaultOptions = {         //set special actor's options here
            Height: 64,   //used by actors����߱�Ϊ2:2���ǵȱȱ任
            Width: 128,   //used by actors   
            BackgroundColor: 'black'  //Ĭ��״̬false��true   false;
        };

        this.setOption(this.defaultOptions);
        this.setoption(X, Y, Width, Height, RotateAngle, Flip, centerPX, centerPY);
        this.refreshObjs = new Array();     // ˢ�¶�������
        this.color = 'black';         //״̬Ĭ����ɫ1
        this.topgroup = this.initializeobjs();
        this.canvas.add(this.topgroup);
      //  this.canvas.renderAll();
    },

    //����Valueֵ���÷�����ɫ
    //_setcolor: function (value) {
    //    this.color = value;
    //},

    initializeobjs: function () {
        var iwidth = this.option.Width;
        var iheight = this.option.Height;
        //this._setcolor(this.option.Value);

        var rect0 = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: 'yellow',
            opacity: 0.3,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.topgroup.addWithUpdate(rect0);

        // adjust rotatingpoint
        var rectrotate = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth ,
            fill: 'green',
            opacity: 0.1,
            visible: false,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
        this.group.addWithUpdate(rectrotate);

        var rect = new fabric.Rect({
            left: 0,
            top: 0,
            height: iheight,
            width: iwidth,
            fill: this.option.BackgroundColor,
            hasBorders: false,
            originX: 'center',
            originY: 'center'
        });
 
        this.refreshObjs.push(rect);
        this.group.addWithUpdate(rect);
        this._addToShape(rect);



        this._setGroupOptions();
        this._setTopgroupOptions();

        return this.topgroup;
    },

   refresh: function (options) {     //ÿ��ˢ�¸���ValveState�ı俪����ɫ
        this.setOption(options);
        //this._setcolor(this.option.BackgroundColor);

        var obj = this.refreshObjs[0];          //������ɫ

        obj.set({
            fill: this.option.BackgroundColor
        });
        this._renderRefresh();
    },

    toString: function () {
        return ' ����ɫ����';
    }
});