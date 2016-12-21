/**
* Created by zhangjl on 2016/1/25
*/

function BuildChartOption(charttype, opts) {
    var defaultoption = {
        title: {
            text: "标题",
            subtext: ""
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["蒸发量", "降水量"]
        },
        toolbox: {
            show: false
        },
        calculable: true,
        xAxis: [
                    {
                        type: "category",
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
                    {
                        name: "节能量",
                        type: "bar",
                        data: [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20, 6.4, 3.3]
                    },
                    {
                        name: "节省费用",
                        type: "bar",
                        data: [2.6, 5.9, 9, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6, 2.3]
                    }
        ]
    };
    switch (charttype) {
        case "bar":
            return defaultoption;
            break;
        case "funnel":
            return {
                title: {
                    text: '漏斗图(对比)',
                    subtext: '纯属虚构',
                    left: 'left',
                    top: 'bottom'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}"
                },

                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['产品A', '产品B', '产品C', '产品D', '产品E']
                },
                calculable: true,
                series: [
                    {
                        name: '漏斗图',
                        type: 'funnel',
                        data: [
                            { value: 60, name: '产品C' },
                            { value: 30, name: '产品D' },
                            { value: 10, name: '产品E' },
                            { value: 80, name: '产品B' },
                            { value: 100, name: '产品A' }
                        ]
                    }
                ]
            };
            break;
        case "doughnut":
        case "pie":
            return {
                title: {
                    text: "某站点用户访问来源",
                    subtext: "纯属虚构",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
                },
                toolbox: {
                    show: false
                },
                calculable: true,
                series: [
                           {
                               name: "访问来源",
                               type: "pie",
                               radius: "55%",
                               center: ["50%", "60%"],
                               itemStyle: {
                                   normal: {
                                       label: {
                                           show: true,
                                           formatter: "{b}: {c} ({d}%)"
                                       }
                                   }
                               },
                               data: [
                                   {
                                       value: 335,
                                       name: "直接访问"
                                   },
                                   {
                                       value: 310,
                                       name: "邮件营销"
                                   },
                                   {
                                       value: 234,
                                       name: "联盟广告"
                                   },
                                   {
                                       value: 135,
                                       name: "视频广告"
                                   },
                                   {
                                       value: 1548,
                                       name: "搜索引擎"
                                   }
                               ]
                           }
                ]
            };
            break;
        case "line":
        case "spline":
            return {
                title: {
                    text: "未来一周气温变化",
                    subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["最高气温", "最低气温"]
                },
                toolbox: {
                    show: false
                },
                dataZoom:[],
                calculable: true,
                xAxis: [
                           {
                               type: "category",
                               boundaryGap: false,
                               data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                           }
                ],
                yAxis: [
                           {
                               type: "value"
                           }
                ],
                series: [
                           {
                               name: "最高气温",
                               type: "line",
                               data: [11, 11, 15, 13, 12, 13, 10]
                           },
                           {
                               name: "最低气温",
                               type: "line",
                               data: [1, -2, 2, 5, 3, 2, 0]
                           }
                ]
            };
            break;
        case "splinearea":
        case "area":
            return {
                title: {
                    text: "某楼盘销售情况",
                    subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["意向", "预购", "成交"]
                },
                toolbox: {
                    show: false
                },
                calculable: true,
                xAxis: [
                           {
                               type: "category",
                               boundaryGap: false,
                               data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                           }
                ],
                yAxis: [
                           {
                               type: "value"
                           }
                ],
                series: [
                               {
                                   name: "成交",
                                   type: "line",
                                   smooth: true,
                                   itemStyle: {
                                       normal: {
                                           areaStyle: {
                                               type: "default"
                                           }
                                       }
                                   },
                                   data: [10, 12, 21, 54, 260, 830, 710]
                               },
                               {
                                   name: "预购",
                                   type: "line",
                                   smooth: true,
                                   itemStyle: {
                                       normal: {
                                           areaStyle: {
                                               type: "default"
                                           }
                                       }
                                   },
                                   data: [30, 182, 434, 791, 390, 30, 10]
                               },
                               {
                                   name: "意向",
                                   type: "line",
                                   smooth: true,
                                   itemStyle: {
                                       normal: {
                                           areaStyle: {
                                               type: "default"
                                           }
                                       }
                                   },
                                   data: [1320, 1132, 601, 234, 120, 90, 20]
                               }
                ]
            };
            break;
        case "heatmap":
            return buildHeatMapOption(opts);
            break;

    }

}


function buildHeatMapOption(opts) {
    return {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}'
        },
        legend: {
            orient: 'vertical',
            left: 'center',
            top:'middle',
            data: []
        },
        visualMap: {
            min: 0,
            max: 10000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true
        },
        series: [
                    {
                        name: '',
                        type: 'map',
                        roam: true,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        mapType: opts.name,
                        data: []
                    }
        ]
    };


}

function getHeatMapSeries(name) {
    return  {
                    name: '',
                    type: 'map',
                    roam: true,
                    itemStyle: {
                    normal: { label: { show: true } },
                    emphasis: { label: { show: true } }
                },
            mapType: name,
            data: []
        }
        
        ;


}


function getAreaData(dataset, emsindex, itemindex, serieindex) {//dataset数据集ID emsindex-EmsLinkIndex,itemindex- item.Index serieindex
    if (itemindex == 0) {
        return '';
    } else {
        return dataset.get3DData(1 - emsindex, 0)[itemindex - 1][serieindex];
    }
}

function getExcelData(dataset, h, v) {
    var empty = [''];
    var em = [];
    var jsonarray = [
    ];
    jsonarray.push(empty.concat(getFullNameArray(dataset.dimensions[h])));
    for (var i = 0; i < dataset.dimensions[v].length; i++) {
        var ary = new Array(dataset.dimensions[h].length + 1);
        ary[0] = getFullNameArray(dataset.dimensions[v])[i];
        jsonarray.push(ary);
    }
    return jsonarray;

}

function setExcelCellData(value) {

    if (!value) {
        value = '';
    }
    return value;

}
function getExcelCommandData(dataset, v) {

    var jsonarray = [
    ];
    var is_ready = true;
    for (var j = 0; j < dataset.commands.length; j++) {
        var command = dataset.commands[j];
        if (!command.ready) {
            return jsonarray;
        }
    }
    for (var i = 0; i < dataset.dimensions[v].length; i++) {
        jsonarray.push(dataset.getSeries(v, i));
    }
    return jsonarray;

}




function getShortNameArray(data) {
    var shortnamedata = new Array();
    for (var i = 0; i < data.length; i++) {
        shortnamedata.push(data[i].shortName);
    }
    return shortnamedata;
}

function getFullNameArray(data) {
    var fullnamedata = new Array();
    for (var i = 0; i < data.length; i++) {
        fullnamedata.push(data[i].fullName);
    }
    return fullnamedata;
}



function getPieSeriesData(values, names) {

    var jsonarray = [];
    for (var i = 0; i < names.length; i++) {
        var arr =
             {
                 "name": names[i],
                 "value": values[i] == undefined ? GetRandomNum() : values[i]
             }
        jsonarray.push(arr);
    }
    return jsonarray;

}


function getBarChartOption() {

}

function getLegendArray(data, havedata) {
    if (havedata && data!=undefined) {
        var legenddata = new Array();
        for (var i = 0; i < data.length; i++) {
            legenddata.push(data[i].shortName);
        }
        return legenddata;
    } else {
        return [];
    }
}
function sortData(seresdata, sort, option,changeXY) {
    var len = seresdata.length;
    if (changeXY) {
        xArray = option.yAxis[0].data;
        if (option.yAxis.length == 2) {
            xa2 = option.yAxis[1].data;
        }
    } else {
        xArray = option.xAxis[0].data;
        if (option.xAxis.length == 2) {
            xa2 = option.xAxis[1].data;
        }
    }
 
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            var v1 = parseFloat(seresdata[j]);
            var v2 = parseFloat(seresdata[j + 1]);
            if (isNaN(v1)) v1 = 0;
            if (isNaN(v2)) v2 = 0;
            if (sort == 'D' && v1< v2 || sort == 'A' && v1> v2) { // Y轴排序是反着的
                var t = seresdata[j];
                seresdata[j] = seresdata[j + 1];
                seresdata[j + 1] = t;
                t = xArray[j];
                xArray[j] = xArray[j + 1];
                xArray[j + 1] = t;
                var arylen = option.xAxis.length;
                if (changeXY) {
                    arylen = option.yAxis.length;
                } else {
                    arylen = option.xAxis.length;
                }
                if (arylen == 2) {
                    t = xa2[j];
                    xa2[j] = xa2[j + 1];
                    xa2[j + 1] = t;
                }
 
            }
        }
    }
}
function getSeriesArray(data, createData, havedata,sort,option,changeXY) {
    if (havedata) {
        var seresdata = new Array();
        for (var i = 0; i < data.length; i++) {
            seresdata.push(data[i] == undefined ? '' : data[i]);
        }
        if (sort != undefined && sort != '') {
            sortData(seresdata, sort, option, changeXY);
        }
        return seresdata;
    } else {
        return [];
    }
}
function getPieSeriesArray(data, createData, havedata) {
    if (havedata) {
        var seresdata = new Array();
        for (var i = 0; i < data.length; i++) {
            //        if (createData) {
            //            seresdata.push(data[i] == undefined ? GetRandomNum() : data[i]);
            //        } else {
            //            seresdata.push(data[i] == undefined ?'' : data[i]);
            //        }
            seresdata.push(data[i] == undefined ? '0' : data[i]);
        }
        return seresdata;
    } else {
        return [];
    }
}
function GetRandomNum() {
    var Range = 10000 - 1;
    var Rand = Math.random();
    return (1 + Math.round(Rand * Range));
}


function getxAxisArray(data, havedata) {
    if (havedata) {
        var legenddata = new Array();
        for (var i = 0; i < data.length; i++) {
            legenddata.push(data[i].shortName);
        }
        return legenddata;
    } else {
        return [];
    }
}
function getLineChartOption() {

}

function getPieChartOption() {

}


//创建地图Marker
function createMapMarker(markers, mapmarkerComparConditions, map, MarkerConExpressions) {
    var createdMarkers = new Array();    map.clearOverlays();//更新用 先移除之前所有的图钉
    for (var i = 0; i < markers.length; i++) {
        var CompareType = markers[i]["CompareType"];
        var CompareResultValue = MarkerConExpressions[i];//表达式最终的值
        var DefaultColorIndex = markers[i]["DefaultColorIndex"];
        var myIcon = new BMap.Icon("../../Styles/mappin/rp" + DefaultColorIndex + ".png", new BMap.Size(64, 64));
        if (!isNaN(CompareResultValue))//该图钉包含表达式
        {
            if (CompareType == "GreaterThan")//比较方式为大于
            {
                //判断每个图钉的颜色,比较每个图钉的每个比较表达式值与阈值
                for (var j = 0; j < mapmarkerComparConditions[i].length; j++) {
                    if (j == 0) {
                        if (mapmarkerComparConditions[i][j]["value"] < CompareResultValue) {
                            myIcon = new BMap.Icon("../../Styles/mappin/rp" + mapmarkerComparConditions[i][j]["colorIndex"] + ".png", new BMap.Size(64, 64));
                            break;
                        }
                    }
                    if (mapmarkerComparConditions[i][j + 1]["value"] < CompareResultValue <= mapmarkerComparConditions[i][j]["value"]) {
                        myIcon = new BMap.Icon("../../Styles/mappin/rp" + mapmarkerComparConditions[i][j]["colorIndex"] + ".png", new BMap.Size(64, 64));
                        break;
                    }
                }
            }
            else//比较方式为小于
            {
                //判断每个图钉的颜色,比较每个图钉的每个比较表达式值与阈值
                for (var j = 0; j < mapmarkerComparConditions[i].length; j++) {
                    if (j == 0) {
                        if (mapmarkerComparConditions[i][j]["value"] > CompareResultValue) {
                            myIcon = new BMap.Icon("../../Styles/mappin/rp" + mapmarkerComparConditions[i][j]["colorIndex"] + ".png", new BMap.Size(64, 64));
                            break;
                        }
                    }
                    if (mapmarkerComparConditions[i][j + 1]["value"] > CompareResultValue >= mapmarkerComparConditions[i][j]["value"]) {
                        myIcon = new BMap.Icon("../../Styles/mappin/rp" + mapmarkerComparConditions[i][j]["colorIndex"] + ".png", new BMap.Size(64, 64));
                        break;
                    }
                }
            }
            
        }
        //var myIcon = new BMap.Icon("../../Styles/mappin/pin3.png", new BMap.Size(10, 22));
        var marker = new BMap.Marker(new BMap.Point(markers[i].lng, markers[i].lat), { icon: myIcon });  // 创建标注
        var markerDetail = markers[i];
        var label = new BMap.Label(markers[i].name, { offset: new BMap.Size(-20, 20) });
        label.setStyle({ backgroundColor: "#F5DEB3", borderColor: "#808080", padding: '3px' })
        marker.setLabel(label);
        createdMarkers.push(marker);
        map.addOverlay(marker);               // 将标注添加到地图中
        addClickHandler(markerDetail, marker, map);
        //return createdMarkers;
    }
}
function addClickHandler(markerDetail, marker, map) {//处理marker事件
    switch (markerDetail.EventType)
    {
        case "Click":
            //判断动作类型 "ActionType":"Jump" 目前只有跳转一种
            marker.addEventListener("click", function (e) {
                //openInfo(content, e, map) 旧弹出纯文本方式
                var p = e.target;
                var res = p.getPosition();
                layer.open({
                    btn: {},
                    type: 2,
                    id: "1",//控制弹出框数量
                    title: '点击图钉弹出框',
                    shadeClose: true,
                    shade: 0.8,
                    area: [markerDetail.ActionPropty.PageWidth + "px", markerDetail.ActionPropty.PageHeight+"px"],
                    offset: [e.clientX, e.clientY],
                    scrollbar: false,
                    move: false,
                    shade: 0,
                    content: [markerDetail.ActionPropty.LinkPage, 'no']
                        
                });
            });
            break;
        case "Hover":
            break;
            default:
    }
   
}

//layer.open({
//    btn: {},
//    //type: 2,
//    id: "",//控制弹出框数量
//    title: '点击图钉弹出框',
//    shadeClose: true,
//    shade: 0.8,
//    area: ['400px', '210px'],
//    offset: [e.clientX, e.clientY],
//    scrollbar: false,
//    move: false,
//    shade: 0,
//    //content:
//    //    content: "<div >"+
//    //"<table style='width: 340px;text-align: center;'>"+
//    //	"<tr><td style='width: 70%;font-size: 15px;'>2016年11月18日09时</td><td>实时发布</td></tr>"+
//    //	"<tr><td style='width: 70%;font-size: 15px;'>首要污染物：</td><td>PM2.5</td></tr>"+
//    //	"<tr><td style='width: 70%;font-size: 15px;'>空气质量指数(AQI):</td><td style='color: orange;'>219</td></tr>"+
//    //	"<tr><td style='width: 70%;font-size: 15px;'>空气质量状况:</td><td style='color: red;'>重度污染</td></tr>"+
//    //"</table></div>"
//    //content: ["/Pages/HtmlWebPage.aspx?pageid=18d756f8-6979-45de-aa66-05b8a0c08cc5&linkid=78d199e6-5c2d-40bc-9f09-1c9ab37d90cb&title=Html页面弹出框测试", 'no']
//});

function openInfo(content, e, map) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: content["Name"], // 信息窗口标题
        enableMessage: true,//设置允许信息窗发送短息
        message: content["remarks"]
    }
    var infoWindow = new BMap.InfoWindow(content["remarks"], opts);  // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口

    //var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content.remarks, {
    //    title: content.name,      //标题
    //    panel: "panel",         //检索结果面板
    //    enableAutoPan: true,     //自动平移
    //    searchTypes: [

	//			BMAPLIB_TAB_TO_HERE,  //到这里去
	//			BMAPLIB_TAB_FROM_HERE, //从这里出发
    //            BMAPLIB_TAB_SEARCH   //周边检索
    //    ]
    //});

    //searchInfoWindow.open(point);
    // map.openInfoWindow(myinfowindow, point); //开启信息窗口
}
function setExcelData(spread) {
    if (spread != undefined) {
        $("#hfexcelData").val(JSON.stringify(spread.toJSON()));
    }
}