// EmsLinks保存页面上所有节点信息(linkid, serverurl)
// 数据集工具

// 日期时间格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// 将文本化的二进制数转换为ArrayBuffer
function textToBin(text) {
    var data = new ArrayBuffer(text.length / 2);
    var buffer = new Uint8Array(data);
    for (var i = 0; i < data.byteLength; i++) {
        var b = parseInt(text.substr(i * 2, 2), 16);
        buffer[i] = b;
    }

    return data;
};
function binToText(arrayBuffer) {
    var buffer = new Uint8Array(arrayBuffer);
    var str = "";
    for (var i = 0; i < buffer.length; i++) {
        str += (buffer[i] + 4096).toString(16).toUpperCase().substring(2, 4);
    }
    return str;
};

var EmsLinks = new Array();
var MajorFunction = {
    Beat: 1,
    IdentifyUser: 2,
    CancelSubscription: 3,
    QueryIndicCount: 11,
    QueryItemCount: 13,
    QueryItemState: 14,
    QueryItemTrace: 15,
    QueryMinCommand: 10,
    QueryMaxCommand: 19,
    SubscribeIndicCount: 21,
    SubscribeItemCount: 23,
    SubscribeItemState: 24,
    SubscribeMinCommand: 20,
    SubscribeMaxCommand: 29
};
var MinorFunction = {
    None: 0,
    IndicsPeriods: 22,
    IndicPeriods: 12,
    IndicsPeriod: 21,
    IndicPeriod: 11,
    ItemsPeriods: 22,
    ItemPeriods: 12,
    ItemPeriod: 11,
    ItemsPeriod: 21,
    ItemsTimes: 22,
    ItemTimes: 12,
    ItemsTime: 21,
    ItemTime: 11,
    AllDataSets: 0,
    SomeDataSet: 1,
};
var TimeUnit = {
    秒: 0,
    分: 1,
    时: 2,
    班次: 3,
    日: 4,
    周: 5,
    月: 6,
    季: 7,
    年: 8
};

function CountCycle() {
    this.beginTime = "";
    this.length = 0;
    this.unit = 0;
}
function Shift(shiftLength, startPoint, label) {
    this.shiftLength = shiftLength;
    this.startPoint = startPoint;
    this.label = label;
}
function ShiftModel() {
    this.shiftLength = 86400 / 3;
    this.shifts = new Array();
    this.shifts.push(new Shift(shiftLength, 0, "早班"));
    this.shifts.push(new Shift(shiftLength, 28800, "中班"));
    this.shifts.push(new Shift(shiftLength, 57600, "晚班"));
}

// 类（节点、时间段、多时间段、指标、数据项）
function Link() {
    this.guid = "";
    this.label = "";
    this.dataItems = "";
}
function Period() {
    this.beginTime = ""; // 
    this.endTime = "";
    this.label = "";
    this.toString = function () {
        return this.beginTime.Format("yyyy/MM/dd hh:mm:ss") + "." + this.endTime.Format("yyyy/MM/dd hh:mm:ss") + "." + this.label;
    }
}
function FullPeriod() {
    this.isRealTime = false;
    this.timeLength = -1; // short
    this.updateCycle = -1; // short
    this.upperUnit = ""; //int?
    this.modelID = ""; //int?
    this.beginTime = "";
    this.endTime = "";
    this.label = "";
}
function PeriodList() {
    this.countUnit = -1; // int?
    this.queryUnit = -1; // int?
    this.modelID = -1; // int?
    this.periods = new Array();
    this.periodlist = new Array();
    this.shiftModel = null;
    this.getCountCycle = function (index) {
        var cycle = new CountCycle();
        if (this.shiftModel && this.modelID == TimeUnit.班次) {
            cycle.unit = TimeUnit.时;
            cycle.length = this.shiftModel.shiftLength;
            var beginTime = 86400;
            for (var i in this.shiftModel.shifts) {
                var shift = this.shiftModel.shifts[i];
                if (shift.startPoint < beginTime) beginTime = shift.startPoint;
            }
            cycle.beginTime = DSTools.DatetimeToDate(this.periods[index].beginTime) + ' ' + DSTools.SecondsToHMS(beginTime);
            return cycle;
        }
        cycle.beginTime = null;
        cycle.unit = this.countUnit;
        cycle.length = 1;
        return cycle;
    };

    this.buildPriodicPerids = function (index) {
        var cycle = this.getCountCycle(index);
        var period = this.periods[index];
        var beginTime = new Date(period.beginTime);
        var endTime = new Date(period.endTime);
        var year = beginTime.getFullYear();
        var month = beginTime.getMonth();
        var day = beginTime.getDate();
        var hour = beginTime.getHours();
        var minute = beginTime.getMinutes();
        var second = beginTime.getSeconds();

        var eDate = new Date(this.periods[this.periods.length - 1].endTime);
        var sDate = new Date(this.periods[0].beginTime);
        var totalLength = parseInt(eDate.getTime() - sDate.getTime()) / parseInt(1000);
        // 
        switch (cycle.unit) {
            case TimeUnit.秒:
                var format = "mm:ss";
                var time = new Date(year, month, day, hour, minute, second);
                second = second - (second % cycle.length);
                time.setSeconds(second);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    second += cycle.length;
                    eTime = new Date(time);
                    eTime.setSeconds(second);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format) + "--" + eTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.分:
                var format = "hh:mm";
                if (totalLength > 24 * 3600) format = "dd日hh:mm";
                var time = new Date(year, month, day, hour, minute, 0);
                minute = minute - (minute % cycle.length);
                time.setMinutes(minute);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    minute += cycle.length;
                    eTime = new Date(time);
                    eTime.setMinutes(minute);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.时:
                var format = "hh时";
                if (totalLength > 24 * 3600) format = "dd日hh时";
                var time = new Date(year, month, day, hour, 0, 0);
                if (cycle.beginTime == null) {
                    hour = hour - (hour % cycle.length);
                } else { // 班次
                    var begint = new Date(cycle.beginTime);
                    hour = hour - parseInt((time.getTime() - begint.getTime()) / 3600000);
                }
                time.setHours(hour);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    hour += cycle.length;
                    eTime = new Date(time);
                    eTime.setHours(hour);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                } break;
            case TimeUnit.日:
                var format = "dd日";
                var time = new Date(year, month, day, 0, 0, 0);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    day += cycle.length;
                    eTime = new Date(time);
                    eTime.setDate(day);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.周:
                var format = "dd日";
                var time = new Date(year, month, day, 0, 0, 0);
                time.setDate(day - time.getDay());
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    day += cycle.length * 7;
                    eTime = new Date(time);
                    eTime.setDate(day);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format) + "--" + eTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.月:
                var format = "MM月";
                var time = new Date(year, month, 1, 0, 0, 0);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    month += cycle.length;
                    eTime = new Date(time);
                    eTime.setMonth(month);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.季:
                var format = "";
                var month = parseInt(month / 3) * 3;
                var time = new Date(year, month, 1, 0, 0, 0);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    month += cycle.length * 3;
                    eTime = new Date(time);
                    eTime.setMonth(month);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = (parseInt(oldTime.getMonth() / 3)+1) + '季度';
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;
            case TimeUnit.年:
                var format = "yyyy年";
                var time = new Date(year, 1, 1, 0, 0, 0);
                var oldTime = new Date(time);
                var eTime;
                while (oldTime < endTime) {
                    year += cycle.length;
                    eTime = new Date(time);
                    eTime.setYear(year);
                    var pd = new Period();
                    pd.beginTime = oldTime;
                    pd.endTime = eTime;
                    pd.label = oldTime.Format(format);
                    this.periodlist.push(pd);
                    oldTime = eTime;
                }
                break;

        }
        return this.periodlist;
    }

    this.toString = function () {
        var periodstring = "";
        for (var i = 0; i < this.periodlist.length; i++) {
            periodstring += this.periodlist[i].toString() + ",";
        }
        periodstring = periodstring.substr(0, periodstring.length - 1) + "|" + this.countUnit + "|";
        return periodstring;
    };
}
function ExtIndicID() {
    this.indicatorID = ""; //guid
    this.unitID = ""; //guid
    this.extraOperator = "";
    this.decimalPlaces = 0;
    this.label = "";
}
function DataItemID() {
    this.itemType = 0;
    this.itemID = 0;
    this.unitID = ""; //guid
    this.countOperator = "";
    this.extraOperator = "";
    this.decimalPlaces = 0;
    this.label = "";
}

var DSTools = {
    // 日期函数字符串操作
    zFill: function (num, size) {
        var s = "000000000" + num.toFixed(0);
        return s.substr(s.length - size);
    },
    DatetimeToDate: function (sdate) {
        var items = sdate.split(' ');
        return items[0];
    },
    SecondsToHMS: function (sec) {
        var hour = sec / 3600;
        sec = hour % 3600;
        var minute = sec / 60;
        sec = hour % 60;
        return zFill(hour, 2) + ":" + zfill(minute, 2) + ":" + zfill(sec, 2);
    },


    // 字符串转化为类（数组）
    toLinks: function (items, className) {
        var links = new Array();
        if (items == "") return links;
        var linkStr = items.split("`");
        for (var i = 0; i < linkStr.length; i++) {
            var link = new Link();
            var item = linkStr[i].split("|");
            link.guid = item[0];
            if (item.length > 1) link.dataItems = item[1];
            if (item.length > 2) link.label = item[2];

            links.push(link);
        }
        return links;
    },
    toIndicators: function (items, sep) {
        if (sep) {

        } else {
            sep = '`';
        }
        var dataItems = new Array();
        if (items == "") return dataItems;
        var itemStr = items.split(sep);
        for (var i = 0; i < itemStr.length; i++) {
            var indic = new ExtIndicID();
            var item = itemStr[i].split(".");
            if (item[0] != "") dataItem.indicatorID = item[0];
            if (item.length > 1 && item[1] != "") indic.unitID = item[1];
            if (item.length > 2 && item[2] != "") indic.extraOperator = item[2];
            if (item.length > 3 && item[3] != "") indic.decimalPlaces = parseInt(item[3]);
            if (item.length > 4 && item[4] != "") indic.label = item[4];
            dataItems.push(indic);
        }
        return dataItems;
    },
    toDataItems: function (items, sep) {
        if (sep) {

        } else {
            sep = '`';
        }
        var dataItems = new Array();
        if (items == "") return dataItems;
        var itemStr = items.split(sep);
        for (var i = 0; i < itemStr.length; i++) {
            var dataItem = new DataItemID();
            var item = itemStr[i].split(".");
            if (item[0] != "") dataItem.itemType = parseInt(item[0]);
            if (item.length > 1 && item[1] != "") dataItem.itemID = parseInt(item[1]);
            if (item.length > 2 && item[2] != "") dataItem.unitID = item[2];
            if (item.length > 3 && item[3] != "") dataItem.countOperator = item[3];
            if (item.length > 4 && item[4] != "") dataItem.extraOperator = item[4];
            if (item.length > 5 && item[5] != "") dataItem.decimalPlaces = parseInt(item[5] != '' ? item[5] : 0);
            if (item.length > 6 && item[6] != "") dataItem.label = item[6];
            dataItems.push(dataItem);
        }
        return dataItems;
    },
    toPeriods: function (items, className) {
        if (className == "IndicatorDataSet" || className == "DataCountDataSet") {
            var periods = new PeriodList();
            if (items == "") return periods;

            var sitems = items.split("`");
            for (var i = 0; i < sitems.length; i++) {
                var item = sitems[i].split("|");
                if (item.length > 1 && item[1] != "") periods.countUnit = parseInt(item[1]);
                if (item.length > 2 && item[2] != "") periods.ModelID = parseInt(item[2]);
                var pItems = item[0].split(",");

                for (var j = 0; j < pItems.length; j++) {
                    period = this.toPeriods(pItems[j], "FreeValueDataSet");
                    periods.periodlist.push(period);
                }

            }

            return periods;
        }
        if (className == "FreeValueDataSet" || className == "DataCurveDataSet") {
            var period = new Period();
            if (items == "") return period;
            var item = items.split(".");
            period.beginTime = item[0];
            if (item.length > 1 && item[1] != "") period.endTime = item[1];
            if (item.length > 2 && item[2] != "") period.label = item[2];
            return period;
        }
        if (className == "FreeStateDataSet") {
            return new Date(items);
        }
        return null;
    },

    // 替换TypedArray中的一段, src:TypedArray, replace:TypedArray, 返回ArrayBuffer
    replaceBuffer: function (srcBuffer, begin, end, newArrayBuffer) {
        var replaceBuffer = new Uint8Array(newArrayBuffer);
        var newlen = srcBuffer.length - (end - begin) + replaceBuffer.length;
        var dst = new ArrayBuffer(newlen);
        var dstBuffer = new Uint8Array(dst);
        dstBuffer.set(srcBuffer.subarray(0, begin));
        dstBuffer.set(replaceBuffer, begin);
        dstBuffer.set(srcBuffer.subarray(end), begin + replaceBuffer.length);
        return dst;
    },

    // 跳过指定格式
    skipText: function (buffer, index) {
        var len = buffer.getInt16(index, true);
        index += 2;
        index += len;
        return index;
    },
    skipGuid: function (index) {
        return index + 16;
    },
    skipExtIndicID: function (buffer, index) {
        index += 16;
        var bits = buffer.getUint8(index);
        index++;
        if (bits & 2) index = this.skipText(buffer, index);
        if (bits & 4) index = this.skipGuid(index);
        return index;
    },
    skipExtIndicIDs: function (buffer, index) {
        var count = buffer.getInt16(index, true);
        index += 2;
        for (var j = 0; j < count; j++)
            index = this.skipExtIndicID(buffer, index);
        return index;
    },
    skipDataItemID: function (buffer, index) {
        index += 8;
        var bits = buffer.getUint8(index);
        index++;
        if (bits & 1) index = this.skipText(buffer, index);
        if (bits & 2) index = this.skipText(buffer, index);
        if (bits & 4) index = this.skipGuid(index);
        return index;
    },
    skipDataItemIDs: function (buffer, index) {
        var count = buffer.getInt16(index, true);
        index += 2;
        for (var j = 0; j < count; j++)
            index = this.skipDataItemID(buffer, index);
        return index;
    },

    // 写流
    writeTime: function (buffer, index, time) {
        if (time == "")
            buffer.setFloat64(index, Number.NEGATIVE_INFINITY, true);
        else {
            var dt = new Date(time);
            var value = (dt.getTime() + 8 * 3600 * 1000) / 1000.0; // 东八区
            buffer.setFloat64(index, value, true);
        }
        index += 8;
        return index;
    },
    writeGuid: function (buffer, index, guid) {
        var newbuffer = this.createGuidBuffer(guid);
        for (i = 0; i < 16; i++) {
            buffer.setUint8(index, newbuffer[i]);
            index++;
        }
        return index;
    },
    writeText: function (buffer, index, text) {
        buffer.setInt16(index, text.length, true);
        index += 2;
        for (var i = 0; i < text.length; i++) {
            buffer.setUint8(index, text.charCodeAt(i) & 0x7f);
            index++;
        }
        return index;
    },
    writeDataItemID: function (buffer, index, item) {
        buffer.setInt32(index, item.itemType, true);
        index += 4;
        buffer.setInt32(index, item.itemID, true);
        index += 4;
        var bits = 0;
        if (item.countOperator != "") bits |= 1;
        if (item.extraOperator != "") bits |= 2;
        if (item.unitID != "") bits |= 4;
        buffer.setUint8(index, bits);
        index++;
        if (item.countOperator != "") index = this.writeText(buffer, index, item.countOperator);
        if (item.extraOperator != "") index = this.writeText(buffer, index, item.extraOperator);
        if (item.unitID != "") index = this.writeGuid(buffer, index, item.unitID);
        return index;
    },
    writeExtIndicID: function (buffer, index, item) {
        index += this.writeGuid(buffer, index, item.indicatorID);
        var bits = 0;
        if (item.extraOperator != "") bits |= 2;
        if (item.unitID != "") bits |= 4;
        buffer.setUint8(index, bits);
        index++;
        if (bits & 2) index = this.writeText(buffer, index, item.extraOperator);
        if (bits & 4) index = this.writeGuid(buffer, index, item.unitID);
        return index;
    },
    writePeriod: function (buffer, index, item) {
        index = this.writeTime(buffer, index, item.beginTime);
        index = this.writeTime(buffer, index, item.endTime);
        return index;
    },
    writePeriodList: function (buffer, index, item) {
        buffer.setInt32(index, item.countUnit, true);
        index += 4;
        buffer.setInt32(index, item.queryUnit, true);
        index += 4;
        buffer.setInt32(index, item.modelID, true);
        index += 4;
        var count = item.periodlist.length;
        buffer.setInt16(index, count, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            index = this.writePeriod(buffer, index, item.periodlist[i]);
        }
        return index;
    },

    // 获取长度
    getExtIndicIDLength: function (item) {
        var len = 17;
        if (item.extraOperator != "") len += 2 + item.extraOperator.length;
        if (item.unitID != "") len += 16;
        return len;
    },
    getExtIndicIDsLength: function (items) {
        var len = 2;
        for (var i = 0; i < items.length; i++) {
            len += this.getExtIndicIDLength(items[i]);
        }
        return len;
    },
    getDataItemIDLength: function (item) {
        var len = 9;
        if (item.countOperator != "") len += 2 + item.countOperator.length;
        if (item.extraOperator != "") len += 2 + item.extraOperator.length;
        if (item.unitID != "") len += 16;
        return len;
    },
    getDataItemIDsLength: function (items) {
        var len = 2;
        for (var i = 0; i < items.length; i++) {
            len += this.getDataItemIDLength(items[i]);
        }
        return len;
    },
    getTimeLength: function () { return 8; },
    getPeriodLength: function () { return 16; },
    getPeriodListLength: function (items) { return 14 + 16 * items.periodlist.length; },

    // 分析数据帧中各段的位置（节点、数据、时间）， buffer:DataView
    analyseFrame: function (buffer, segIndex) {
        var i = 0, start = 0;
        if (buffer.byteLength < 3) return null;
        var major = buffer.getUint8(1);
        var minor = buffer.getUint8(2);
        // Cancel
        if (major == MajorFunction.CancelSubscription) {
            if (segIndex == 0) return { begin: 67, end: 83 };
            return null;
        }
        // Query
        if (major == MajorFunction.QueryIndicCount && minor == MinorFunction.IndicsPeriods) {
            if (segIndex == 0) return { begin: 71, end: 87 };
            i = 88;
            if (segIndex == 1) start = i;
            i = this.skipExtIndicIDs(buffer, i);
            if (segIndex == 1) return { begin: start, end: i };
            if (segIndex == 2) return { begin: i, end: buffer.byteLength - 1 };
            return null;
        }
        if (major == MajorFunction.QueryItemCount || major == MajorFunction.QueryItemState || major == MajorFunction.QueryItemTrace) {
            if (segIndex == 0) return { begin: 71, end: 87 };
            i = 88;
            if (segIndex == 1) start = i;
            i = this.skipDataItemIDs(buffer, i);
            if (segIndex == 1) return { begin: start, end: i };
            if (segIndex == 2) return { begin: i, end: buffer.byteLength - 1 };
            return null;
        }

        // Subscribe
        if (major == MajorFunction.SubscribeItemState || major == MajorFunction.SubscribeItemCount) {
            if (segIndex == 0) return { begin: 87, end: 103 };
            i = 110;
            if (segIndex == 1) start = i;
            i = this.skipDataItemIDs(buffer, i);
            if (segIndex == 1) return { begin: start, end: i };
            if (segIndex == 2) return { begin: i, end: buffer.byteLength - 1 };
            return null;
        }

        if (major == MajorFunction.SubscribeIndicCount) {
            if (segIndex == 0) return { begin: 87, end: 103 };
            i = 110;
            if (segIndex == 1) start = i;
            i = this.skipExtIndicIDs(buffer, i);
            if (segIndex == 1) return { begin: start, end: i };
            if (segIndex == 2) return { begin: i, end: buffer.byteLength - 1 };
            return null;
        }
        return null;
    },

    // 生成内容
    createGuidBuffer: function (guid) {
        var text = guid.replace(/-/g, "");
        var buffer = new Uint8Array(16);
        //    Guid: 35918bc9-196d-40ea-9779-889d79b753f0
        //    C9 8B 91 35 6D 19 EA 40 97 79 88 9D 79 B7 53 F0
        buffer[0] = parseInt(text.substr(6, 2), 16);
        buffer[1] = parseInt(text.substr(4, 2), 16);
        buffer[2] = parseInt(text.substr(2, 2), 16);
        buffer[3] = parseInt(text.substr(0, 2), 16);

        buffer[4] = parseInt(text.substr(10, 2), 16);
        buffer[5] = parseInt(text.substr(8, 2), 16);

        buffer[6] = parseInt(text.substr(14, 2), 16);
        buffer[7] = parseInt(text.substr(12, 2), 16);

        buffer[8] = parseInt(text.substr(16, 2), 16);
        buffer[9] = parseInt(text.substr(18, 2), 16);
        buffer[10] = parseInt(text.substr(20, 2), 16);
        buffer[11] = parseInt(text.substr(22, 2), 16);
        buffer[12] = parseInt(text.substr(24, 2), 16);
        buffer[13] = parseInt(text.substr(26, 2), 16);
        buffer[14] = parseInt(text.substr(28, 2), 16);
        buffer[15] = parseInt(text.substr(30, 2), 16);

        return buffer;
    },
    createGuidArrayBuffer: function (guid) {
        var arrBuffer = new ArrayBuffer(16);
        var text = guid.replace(/-/g, "");
        var buffer = new Uint8Array(arrBuffer);
        //    Guid: 35918bc9-196d-40ea-9779-889d79b753f0
        //    C9 8B 91 35 6D 19 EA 40 97 79 88 9D 79 B7 53 F0
        buffer[0] = parseInt(text.substr(6, 2), 16);
        buffer[1] = parseInt(text.substr(4, 2), 16);
        buffer[2] = parseInt(text.substr(2, 2), 16);
        buffer[3] = parseInt(text.substr(0, 2), 16);

        buffer[4] = parseInt(text.substr(10, 2), 16);
        buffer[5] = parseInt(text.substr(8, 2), 16);

        buffer[6] = parseInt(text.substr(14, 2), 16);
        buffer[7] = parseInt(text.substr(12, 2), 16);

        buffer[8] = parseInt(text.substr(16, 2), 16);
        buffer[9] = parseInt(text.substr(18, 2), 16);
        buffer[10] = parseInt(text.substr(20, 2), 16);
        buffer[11] = parseInt(text.substr(22, 2), 16);
        buffer[12] = parseInt(text.substr(24, 2), 16);
        buffer[13] = parseInt(text.substr(26, 2), 16);
        buffer[14] = parseInt(text.substr(28, 2), 16);
        buffer[15] = parseInt(text.substr(30, 2), 16);

        return arrBuffer;
    },
    createIndicatorBuffer: function (items) {
        var len = getExtIndicIDSlength(items);
        var arrBuffer = new ArrayBuffer(len);
        var buffer = new DataView(arrBuffer);
        var index = 0;
        buffer.setInt16(index, items.length, true);
        index += 2;

        for (var i = 0; i < items.length; i++) {
            index = this.writeExtIndicID(buffer, index, items[i]);
        }
        return arrBuffer;
    },
    createDataItemBuffer: function (items) {
        var len = this.getDataItemIDsLength(items);
        var arrBuffer = new ArrayBuffer(len);
        var buffer = new DataView(arrBuffer);
        var index = 0;
        buffer.setInt16(index, items.length, true);
        index += 2;

        for (var i = 0; i < items.length; i++) {
            index = this.writeDataItemID(buffer, index, items[i]);
        }
        return arrBuffer;

    },
    createTimeBuffer: function (items, className) {
        if (className == "IndicatorDataSet" || className == "DataCountDataSet") {
            var len = this.getPeriodListLength(items);
            var arrBuffer = new ArrayBuffer(len);
            var buffer = new DataView(arrBuffer);
            this.writePeriodList(buffer, 0, items);
            return arrBuffer;
        }
        if (className == "FreeValueDataSet" || className == "DataCurveDataSet") {
            var len = getPeriodLength();
            var arrBuffer = new ArrayBuffer(len);
            var buffer = new DataView(arrBuffer);
            this.writePeriod(buffer, 0, items);
            return arrBuffer;
        }
        if (className == "FreeStateDataSet") {
            var len = getTimeLength();
            var arrBuffer = new ArrayBuffer(len);
            var buffer = new DataView(arrBuffer);
            this.writeTime(buffer, 0, items);
            return arrBuffer;
        }
        return null;
    },

    // 生成标签
    buildLabels: function (items) {
        var labels = new Array();
        for (var i = 0; i < items.length; i++) {
            var label = items[i].label;
            labels.push({ fullName: label, shortName: label });
        }
        return labels;
    },
    builddecimalPlaces: function (items) {
        var dps = new Array();
        for (var i = 0; i < items.length; i++) {
            var dp = items[i].decimalPlaces;
            dps.push(dp);
        }
        return dps;
    },

    // TODO: 生成命令指标查询，节点统计，轨迹查询
    setFunction: function (header, major, minor) {
        header.setUint8(1, major);
        header.setUint8(2, minor);
    },

    contactBuffer: function (buffer1, buffer2, buffer3, buffer4) {
        var arrBuffer = new ArrayBuffer(buffer1.byteLength + buffer2.byteLength + buffer3.byteLength + buffer4.byteLength);
        var buffer = new Uint8Array(arrBuffer);
        buffer.set(new Uint8Array(buffer1), 0);
        var start = buffer1.byteLength;
        buffer.set(new Uint8Array(buffer2), start);
        start += buffer2.byteLength;
        buffer.set(new Uint8Array(buffer3), start);
        start += buffer3.byteLength;
        buffer.set(new Uint8Array(buffer4), start);
        return arrBuffer;
    },

    formRequestLink: function (dataSetID, index, link, indics, plist) {
        var headerab = textToBin(PackageHeader);
        var header = new DataView(headerab);
        this.setFunction(header, MajorFunction.QueryIndicCount, MinorFunction.IndicsPeriods);
        var ab1 = new ArrayBuffer(21);
        var header1 = new DataView(ab1);
        header1.setInt16(0, dataSetID, true);
        header1.setInt16(2, index, true);
        this.writeGuid(header1, 4, link[0].guid);
        header1.setInt8(20, 2); // GetRemark
        var indicsBuffer = this.createIndicatorBuffer(indics);
        var periodBuffer = this.createTimeBuffer(plist, "IndicatorDataSet");
        return this.contactBuffer(headerab, ab1, indicsBuffer, periodBuffer);
    },
    formRequestCount: function (dataSetID, index, link, items, plist) {
        var headerab = textToBin(PackageHeader);
        var header = new DataView(headerab);
        this.setFunction(header, MajorFunction.QueryItemCount, MinorFunction.ItemsPeriods);
        var ab1 = new ArrayBuffer(21);
        var header1 = new DataView(ab1);
        header1.setInt16(0, dataSetID, true);
        header1.setInt16(2, index, true);
        this.writeGuid(header1, 4, link[0].guid);
        header1.setInt8(20, 2); // GetRemark
        var indicsBuffer = this.createDataItemBuffer(items);
        var periodBuffer = this.createTimeBuffer(plist, "DataCountDataSet");
        return this.contactBuffer(headerab, ab1, indicsBuffer, periodBuffer);
    },
    formRequestTrace: function (dataSetID, index, link, items, period) {
        var headerab = textToBin(PackageHeader);
        var header = new DataView(headerab);
        this.setFunction(header, MajorFunction.QueryItemTrace, MinorFunction.ItemsPeriod);
        var ab1 = new ArrayBuffer(21);
        var header1 = new DataView(ab1);
        header1.setInt16(0, dataSetID, true);
        header1.setInt16(2, index, true);
        this.writeGuid(header1, 4, link[0].guid);
        header1.setInt8(20, 2); // GetRemark
        var indicsBuffer = this.createDataItemBuffer(items);
        var periodBuffer = this.createTimeBuffer(period, "DataCurveDataSet");
        return this.contactBuffer(headerab, ab1, indicsBuffer, periodBuffer);
    },

    fromPeriodList: function (beginDate, endDate, CountUnit) {
        var pl = new PeriodList();
        var period = new Period();
        period.beginTime = beginDate;
        period.endTime = endDate;
        pl.periods.push(period);
        pl.buildPriodicPerids(0);
        return pl;
    },

    formPeriodList: function (beginDate, endDate, CountUnit) {
        var pl = new PeriodList();
        var period = new Period();
        //若没有给初始和结束时间赋值，则赋值当前时间
        var myDate = new Date();
        if (beginDate == undefined) {
            beginDate = myDate.Format("yyyy-MM-dd hh:mm:ss");
        }
        if (endDate == undefined) {
            endDate = myDate.Format("yyyy-MM-dd hh:mm:ss");
        }
        period.beginTime = beginDate;
        period.endTime = endDate;
        pl.periods.push(period);
        pl.countUnit = CountUnit;
        pl.buildPriodicPerids(0);
        return pl.toString();
    }
};

function getCountUnit(UnitString) {
    switch (UnitString) {
        case '秒':
            return 0;
        case '分':
            return 1;
        case '时':
            return 2;
        case '班次':
            return 3;
        case '日':
            return 4;
        case '周':
            return 5;
        case '月':
            return 6;
        case '季':
            return 7;
        case '年':
            return 8;
        default:
            return -1;
    }
}
