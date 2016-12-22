// 工具函数
{
    // 将Int64转化成Datetime(秒数)
    function longToDatetime(ticks) {
        var date = new Date(1970, 0, 1);
        return new Date(date.getTime() + (ticks * 1000));
    };

    // 将UTF8转化为文本
    function utf8ToText(array) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                           ((char2 & 0x3F) << 6) |
                           ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    };

    // 创建类方法代理
    createDelegate = function (instance, method) {
        return function () {
            return method.apply(instance, arguments);
        }
    };
}

// 各种数据集实现
{
// DataSet基类
var DataSet = wisdata.createClass({
    // 初始化
    initialize: function (className, dataSetID) {
        this.className = className;
        // 数据集ID
        this.dataSetID = dataSetID;
        // 错误信息
        this.errors = new Array();
        // 数据请求命令
        this.commands = new Array();
        // 数据订阅命令
        this.sCommands = new Array();
        // 取消订阅命令
        this.scCommands = new Array();
        this.requireResubscribe = false;
        this.itemsChanged = false;
    },

    // 设置请求命令
    setCommand: function (dimIndex, serverUrl, command, sCommand, scCommand, isRealTime) {
        var commandFrame = textToBin(command);
        this.commands[dimIndex] = { dataSetID: this.dataSetID, index: dimIndex, serverUrl: serverUrl, command: commandFrame, isRealTime: isRealTime, ready: false, requestTime: null };
        if (sCommand !== "") {
            commandFrame = textToBin(sCommand);
            this.sCommands[dimIndex] = { dataSetID: this.dataSetID, index: dimIndex, serverUrl: serverUrl, command: commandFrame, isRealTime: isRealTime, ready: false, requestTime: null };
            commandFrame = textToBin(scCommand);
            this.scCommands[dimIndex] = { dataSetID: this.dataSetID, index: dimIndex, serverUrl: serverUrl, command: commandFrame, isRealTime: isRealTime, ready: false, requestTime: null };
        }
    },


    changeCommandPart: function(dimIndex, partNo, newBuffer) {
        var dataView = new DataView(this.commands[dimIndex].command);
        var segment = DSTools.analyseFrame(dataView, partNo);
        var srcBuffer = new Uint8Array(this.commands[dimIndex].command);
        this.commands[dimIndex].command = DSTools.replaceBuffer(srcBuffer, segment.begin, segment.end, newBuffer);
        this.commands[dimIndex].ready = false;

        if (this.sCommands[dimIndex] ) {
            dataView = new DataView(this.sCommands[dimIndex].command);
            segment = DSTools.analyseFrame(dataView, partNo);
            srcBuffer = new Uint8Array(this.sCommands[dimIndex].command);
            this.sCommands[dimIndex].command = DSTools.replaceBuffer(srcBuffer, segment.begin, segment.end, newBuffer);
            this.sCommands[dimIndex].ready = false;
        }
    },

    changeCommandLink: function( links ) {
        for (var i = 0; i < links.length; i++) {
            var id = links[i].guid;
            var newBuffer = DSTools.createGuidArrayBuffer(id);
            this.changeCommandPart(i, 0, newBuffer);
            this.commands[i].serverUrl = EmsLinks[id];
            if (this.sCommands[i]) {
                this.sCommands[i].serverUrl = EmsLinks[id];
                this.scCommands[i].serverUrl = EmsLinks[id];
            }

            // 如果节点中自带数据项
            if (links[i].dataItems != "") {
                var items = links[i].dataItems;
                if (this.className == "FreeStateDataSet" || this.className == "FreeValueDataSet") return;
                var dataItems;
                if (this.className == "IndicatorDataSet") {
                    dataItems = DSTools.toIndicators(items,",");
                    this.changeCommandIndicator(dataItems);
                }
                else {
                    dataItems = DSTools.toDataItems(items,",");
                    this.changeCommandDataItem(dataItems);
                }
                this.itemsChanged = true;
                this.dimensions[1] = DSTools.buildLabels(dataItems);
                this.decimalPlaces = DSTools.builddecimalPlaces(dataItems);
            }

        }
        this.commands.length = links.length;
        this.sCommands.length = links.length;
        this.scCommands.length = links.length;
        this.dimensions[0] = DSTools.buildLabels(links);
    },

    changeCancelCommand: function( ) {
        for (var i = 0; i < this.scCommands.length; i++) {
            if (this.scCommands[i]) {
                var srcBuffer = new Uint8Array(this.scCommands[i].command);
                var newBuffer = new Uint8Array(this.commands[i].command, 71, 16);  // 查询命令中的link位置
                this.scCommands[i].command = DSTools.replaceBuffer(srcBuffer, 67, 83, newBuffer); // 取消订阅中的link位置
                this.scCommands[i].ready = false;
            }
        }
    },

    changeCommandIndicator: function (items) {
        var newBuffer = DSTools.createIndicatorBuffer(items);
        for (var i = 0; i < this.dimensions[0].length; i ++ )
            this.changeCommandPart(i, 1, newBuffer);
    },

    changeCommandDataItem: function( items ) {
        var newBuffer = DSTools.createDataItemBuffer(items);
        for (var i = 0; i < this.dimensions[0].length; i++)
            this.changeCommandPart(i, 1, newBuffer);
    },

    changeCommandTime: function( periods ) {
        var newBuffer = DSTools.createTimeBuffer(periods, this.className);
        for (var i = 0; i < this.dimensions[0].length; i++)
            this.changeCommandPart(i, 2, newBuffer);
    },

    // 更改请求命令
    changeCommand: function(links, items, periods, autoQuery) {
        if (links) {
            if (this.className == "FreeStateDataSet" || this.className == "FreeValueDataSet") return;
            var linkItems = DSTools.toLinks(links, this.className);
            //var periodItems = DSTools.toPeriods(periods, this.className);
            this.changeCommandLink(linkItems);
            this.requireResubscribe = true;
       }

        if (items) {
            if (this.className == "FreeStateDataSet" || this.className == "FreeValueDataSet") return;
            var dataItems;
            if (this.className == "IndicatorDataSet") {
                dataItems = DSTools.toIndicators(items);
                this.changeCommandIndicator(dataItems);
            } 
            else {
                dataItems = DSTools.toDataItems(items);
                this.changeCommandDataItem(dataItems);
            }
            this.itemsChanged = true;
            this.dimensions[1] = DSTools.buildLabels(dataItems);
            this.decimalPlaces = DSTools.builddecimalPlaces(dataItems);
        }

        if (periods) {
            var periodItems = DSTools.toPeriods(periods, this.className);
            this.itemsChanged = true;
            this.changeCommandTime(periodItems);
            if (this.className == "FreeStateDataSet" || this.className == "FreeValueDataSet") return;
            
            this.dimensions[2] = DSTools.buildLabels(periodItems.periodlist);
        }

        if (autoQuery) this.startQuery();
    },

    // 取消所有的查询和订阅指令
    cancelCommand: function() {
        for (var j = 0; j < this.scCommands.length; j++) {
            var command = this.scCommands[j];
            if (command) sendCommand(command, false);
        }
    },

    startQuery: function () {
        // 取消可能的订阅
        this.cancelCommand();
        // 重新生成新的订阅命令()
        if (this.requireResubscribe) {
            // 重新生成取消订阅命令，准备下一次的取消时使用
            this.changeCancelCommand();
            this.requireResubscribe = false;
        }
        // 重新初始化webSockets
        initWebSockets();
        // 重新查询
        LoadValuesDS(this.dataSetID);
        return;
    },

    // 数据排序
    sortResult: function() {
    },

    // 解析查询结果
    resolveResult: function (dimIndex, dataView, index) {
        this.clear();
        var dataFlag = dataView.getInt8(index, true);
        index ++;

        if (dataFlag & 0x1) index = this.resolveValues(dimIndex, dataView, index);
        if ( dataFlag & 0x2 ) index = this.resolveErrors(dataView, index);
        this.commands[dimIndex].ready = true;

        // 如果需要排序，并且是二维数据，则进行排序
        //this.sortResult();
    },

    // 解析订阅结果
    resolveSubscribeResult: function (dimIndex, dataView, index) {
        this.clear();
        this.resolveSubscribeValues(dimIndex, dataView, index);

        // 如果需要排序
        //this.sortResult();
    },
    // 解析查询值
    resolveValues: function (dimIndex, dataView, index) {
    },
    // 解析订阅值
    resolveSubscribeValues: function (dimIndex, dataView, index) {
    },

    // 将UTF8转化为文本
    binToString: function (dataView, index, length) {
        var buffer =new Uint8Array(dataView.buffer, index, length);
        return utf8ToText(buffer);
    },

    // 清除结果
    clear: function () {
        this.errors.length = 0;
    },

    // 解析错误信息
    resolveErrors: function (dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var error = new Object();
            error.errorType = dataView.getInt32(index, true);
            index += 4; //读取ErrorType   zhangjl
            var length = dataView.getInt16(index, true);
            index += 2;//ErrorMessage 长度
            error.message = this.binToString(dataView, index, length);
            index += length; //ErrorMessage
            length = dataView.getInt16(index, true);
            index += 2;//读取Detail长度
            error.details = this.binToString(dataView, index, length);
            index += length; //ErrorDetail
            this.errors.push(error);
        }

        return index;
    }
});

// 矩阵数据集父类
var MatrixDataSet = wisdata.createClass(DataSet, {
    // 初始化
    initialize: function (className, dataSetID) {
        this.base(className, dataSetID);
        // 记录每一维的长度
        this.dimensions = null;
        // 条形图排序使用
        this.sortDimension = -1; // 排序用的维度 0/1
        this.sortDirection = ''; // 排序方向 A/D
        this.sorted = false;
    },

    // 该方法将被子类覆盖
    getValue: function () {
        return null;
    },

    // 数据排序 
    sortResult: function () {
        if (this.dimensions.length != 3) return;
        if (this.sortDimension < 0 || this.sortDimension > 1) return;
        if (this.sortDirection != 'A' && this.sortDirection != 'D') return;

        var valueArray = this.values;
        var xArray = this.dimensions[this.sortDimension];
        var len = this.values.length;
        if (xArray.length != len) return;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                var v1 = parseFloat(valueArray[j]);
                var v2 = parseFloat(valueArray[j + 1]);
                if (isNaN(v1)) v1 = 0;
                if (isNaN(v2)) v2 = 0;
                if (this.sortDirection == 'D' && v1 < v2 || this.sortDirection == 'A' && v1 > v2){ // Y轴排序是反着的
                    var t = valueArray[j]; valueArray[j] = valueArray[j + 1]; valueArray[j + 1] = t;
                    t = xArray[j]; xArray[j] = xArray[j + 1]; xArray[j + 1] = t;
                }
            }
        }
        this.sorted = true;
    },

    // 获取二维数据集中的一行或一列数据，dimIndex == 0是获取行数据，dimIndex == 1时获取列数据
    getSeries: function (dimIndex, vectorIndex) {
        if (this.dimensions.length != 2)
            return null;
        var i;
        //if (!this.sorted) this.sortResult();
        var series = new Array();
        if (dimIndex == 0) {
            for (i = 0; i < this.dimensions[1].length; i++)
                series.push(this.getValue([vectorIndex, i]));
        }
        else {
            for (i = 0; i < this.dimensions[0].length; i++)
                series.push(this.getValue([i, vectorIndex]));
        }

        return series;
    },
    // 获取三维数据 热力图用
    get3DData: function (dimIndex, vectorIndex) {
        if (this.dimensions.length != 3)
            return null;
        var i;
        var series = new Array();
        if (dimIndex == 0) {
            for (i = 0; i < this.dimensions[1].length; i++)
                series.push(this.get3DValue(vectorIndex, i));
        }
        else {
            for (i = 0; i < this.dimensions[0].length; i++)
                for (j = 0; j < this.dimensions[1].length; j++)
                series.push(this.get3DValue(i,j, vectorIndex));
        }

        return series;
    }
});

// 结果矩阵数据集
var ResultMatrixDataSet = wisdata.createClass(MatrixDataSet, {
    // 初始化
    initialize: function (className, dataSetID, dimensions, realtimeIndex, decimalPlaces, countUnit) {
        this.base(className, dataSetID);
        this.className = className;
        this.dimensions = dimensions;
        this.realtimeIndex = realtimeIndex;
        this.decimalPlaces = decimalPlaces;
        this.CountUnit = countUnit;
    
        // 结果值数组
        this.values = new Array();
        this.prepareValues(this.values, dimensions, 0);
    },

    prepareValues: function (values, dimensions, index) {
        var isLastDimension = index == dimensions.length - 1;
        var n = dimensions[index].length;
        for (var i = 0; i < n; i++) {
            if (isLastDimension)
                values[i] = null;
            else {
                values[i] = new Array();
                this.prepareValues(values[i], dimensions, index + 1);
            }
        }
    },

    // 获取数据
    getValue: function () {
        var value = this.values;
        for (var i =0; i < arguments[0].length && value != null; i++) {///arguments.length=3 ?  从第二个开始取值 zhangjl
            var index = arguments[0][i];
            value = value[index];
        }

        return value;
    },
    // 获取数据
    get3DValue: function () {
        var value = this.values;
        if (value != null) {///arguments.length=3 ?  从第二个开始取值 zhangjl

            value = value[arguments[0]][arguments[1]];
        }

        return value;
    },
    // 设置数据
    setValue: function () {
        var lastIndex = arguments.length - 2;
        var value = arguments[lastIndex + 1];
        var values = this.values;
        for (var i = 0; i < lastIndex && values != null; i++) {
            var index = arguments[i];
            values = values[index];
        }

        if (values != null)
            values[lastIndex] = value;
    },

    // 解析查询结果数据
    resolveValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        var sizes = new Array();
        var length = 8; ///c#Double 8字节 偏移量为8 zhangjl
        for (var i = 0; i < count; i++) {
            var n = dataView.getInt16(index, true);
            index += 2;
            sizes.push(n);
            length *= n;
        }
        if (count == this.dimensions.length - 1)
            this.doResolveValues(dataView, index, this.values[dimIndex],sizes,0, 0);

        return index + length;
    },

    doResolveValues: function (dataView, index, values, sizes, dimIndex, itemIndex) {
        var count = sizes[dimIndex];
        var i;
        if (dimIndex == sizes.length - 1) {
            for (i = 0; i < count; i++) {
                var value = dataView.getFloat64(index, true);
                if (value == Number.NEGATIVE_INFINITY || value == Number.POSITIVE_INFINITY) value = 0;
                if (this.decimalPlaces.length > itemIndex && this.decimalPlaces[itemIndex] >=0 ) value = parseFloat(value.toFixed(this.decimalPlaces[itemIndex]));
                values[i] = value; // null的话，图表会断掉
                index += 8;
            }
        }
        else {
            for (i = 0; i < count; i++) {
                var subValues = values[i];
                if (subValues == null) {
                    subValues = new Array();
                    values[i] = subValues;
                }

                index = this.doResolveValues(dataView, index, subValues, sizes, dimIndex + 1, i);
            }
        }

        return index;
    },
    // 解析订阅结果数据
    resolveSubscribeValues: function (dimIndex, dataView, index) {
        if (this.dimensions.length != 3) return;
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var ind = dataView.getInt32(index, true);
            index += 4;
            var value = dataView.getFloat64(index, true);
            if (value == Number.NEGATIVE_INFINITY || value == Number.POSITIVE_INFINITY) value = 0;
            if (this.decimalPlaces.length > ind && this.decimalPlaces[ind] >=0) value = parseFloat(value.toFixed(this.decimalPlaces[ind]));
            index += 8;
            this.values[0][ind][this.realtimeIndex] = value;
        }

        return index;
    }

});

// 单列抽取数据集集
var ColumnExtractDataSet = wisdata.createClass(MatrixDataSet, {
    // 初始化
    initialize: function (dataSetID, parent, dimIndex, vectorIndex) {
        this.base('ColumnExtractDataSet', dataSetID);
        // 父数据集
        this.parent = parent;
        // 被抽取维度索引
        this.dimIndex = dimIndex;
        // 被抽取向量索引
        this.vectorIndex = vectorIndex;

        // 构建本数据集的各维长度
        this.dimensions = new Array();
        for (var i = 0; i < this.parent.dimensions.length; i++)
            if (i != dimIndex)
                this.dimensions.push(this.parent.dimensions[i]);
    },
    
    //更新Dimensions
    updateDimensions: function (parent, dimIndex, vectorIndex) {
        // 父数据集
        this.parent = parent;
        // 被抽取维度索引
        this.dimIndex = dimIndex;
        // 被抽取向量索引
        this.vectorIndex = vectorIndex;

        // 构建本数据集的各维长度
        this.dimensions = new Array();
        for (var i = 0; i < this.parent.dimensions.length; i++)
            if (i != dimIndex)
                this.dimensions.push(this.parent.dimensions[i]);
    },
    // 获取数据
    getValue: function () {
        // 构建指向父数据集的索引
        var i;
        var indics = new Array();
        for (i = 0; i < this.dimIndex; i++)
            indics.push(arguments[0][i]);
        indics.push(this.vectorIndex);
        for (i = this.dimIndex; i < arguments[0].length; i++)
            indics.push(arguments[0][i]);

        // 从父数据集获取数据
        return this.parent.getValue(indics);
    }
});

// 维度求和数据集集
var DimensionSummaryDataSet = wisdata.createClass(MatrixDataSet, {
    // 初始化
    initialize: function (dataSetID, parent, dimIndex) {
        this.base('DimensionSummaryDataSet', dataSetID);
        // 父数据集
        this.parent = parent;
        // 被累加维度索引
        this.dimIndex = dimIndex;
        this.dimLength = parent.dimensions[dimIndex];

        // 构建本数据集的各维长度
        this.dimensions = new Array();
        for (var i = 0; i < this.parent.dimensions.length; i++)
            if (i != dimIndex)
                this.dimensions.push(this.parent.dimensions[i]);
    },

    // 获取数据
    getValue: function () {
        // 构建指向父数据集的索引
        var i;
        var indics = new Array();
        for (i = 0; i < this.dimIndex; i++)
            indics.push(arguments[i]);
        indics.push(0);
        for (i = this.dimIndex; i < arguments.length; i++)
            indics.push(arguments[i]);

        // 从父数据集获取数据并累加
        var summary = 0;
        for (i = 0; i < this.dimLength; i++) {
            indics[dimIndex] = i;
            var value = this.parent.getValue(indics);
            if (value != null)
                summary += value;
        }

        return summary;
    }
});

// 自由状态数据集
var FreeStateDataSet = wisdata.createClass(DataSet, {
    // 初始化
    initialize: function (dataSetID, size) {
        this.base('FreeStateDataSet', dataSetID);
        // 数值集合
        this.values = new Array(size);
        this.times = new Array(size);
    },

    // 获取数值
    getValue: function (index) {
        if (index < this.values.length) {
            return this.values[index];
        }
        return null;
    },

    getTime: function (index) {
        if (index < this.values.length) {
            return this.times[index];
        }
        return null;
    },

    // 解析查询结果数据
    resolveValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var data = dataView.getFloat64(index, true);
            index += 8;
            if (!data || data === Number.NEGATIVE_INFINITY) data = 0;
            this.values[i] = data;
        }

        return index;
    },

    // 解析订阅结果数据
    resolveSubscribeValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var ind = dataView.getInt32(index, true);
            index += 4;
            var time = dataView.getFloat64(index, true);
            index += 8;
            this.times[ind] = longToDatetime(time);
            var value = dataView.getFloat64(index, true);
            index += 8;
            if (value === Number.NEGATIVE_INFINITY) value = 0;
            this.values[ind] = value;
        }

        return index;
    }
});

// 自由统计数据集
var FreeCountDataSet = wisdata.createClass(DataSet, {
    // 初始化
    initialize: function (dataSetID, size) {
        this.base('FreeCountDataSet', dataSetID);
        // 数值集合
        this.values = new Array(size);
        this.times = new Array(size);
        /*for (var i = 0; i < size; i++)
            this.values.push(null);*/
    },

    // 获取数据值
    getValue: function (index) {
        if (index < this.values.length)
            return this.values[index];
        return null;
    },

    // 解析查询结果数据
    resolveValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        var sizes = new Array();
        var length = 1;
        var i;
        for (i = 0; i < count; i++) {
            var n = dataView.getInt16(index, true);
            index += 2;
            sizes.push(n);
            length *= n;
        }

        if (count !== 1)
            index += length;

        count = sizes[0];
        for (i = 0; i < count; i++) {
            var value = dataView.getFloat64(index, true);
            if (value === Number.NEGATIVE_INFINITY) value = 0;
            this.values[i] = value;
            index += 8;
        }

        return index;
    },

    // 解析订阅结果数据
    resolveSubscribeValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var ind = dataView.getInt32(index, true);
            index += 4;
            var value = dataView.getFloat64(index, true);
            index += 8;
            if (value === Number.NEGATIVE_INFINITY) value = 0;
            this.values[ind] = value;
        }

        return index;
    }
});

// 现场轨迹数据集
var DataCurveDataSet = wisdata.createClass(DataSet, {
    // 初始化
    initialize: function (dataSetID, size, dimensions, decimalPlaces) {
        this.base('DataCurveDataSet', dataSetID);
        this.dimensions = dimensions;
        this.decimalPlaces = decimalPlaces;
        // 数值集合
        this.values = new Array(size);
        this.combinedValues = new Array(size);
        this.isCombined = false;
        for ( i = 0; i < size; i ++ ) {
            this.values[i] = new Array();
            this.combinedValues[i] = new Array();
        }
    },

    /*
    // 把所有数据项的值进行合并
    combine: function() {
        var size = this.values.length;
        var i;

        // 指向各个数组的当前数据项指针
        var currentIndex = new Array(size);
        var isFinished = new Array(size);

        // 初始化
        var currentTime = new Date(2200, 0, 1);
        for (i = 0; i < size; i++) {
            currentIndex[i] = 0;
            isFinished[i] = (this.values[i].length === 0);
            if (!isFinished[i] && currentTime > this.getTime(i, 0)) currentTime = this.getTime(i, 0);
        }
        
        while (true) {
            // 判断是否已经全部结束
            var isAllFinished = true;
            for (i = 0; i < size; i++) {
                if (!isFinished[i]) { isAllFinished = false; break; }
            }
            if (isAllFinished) break;

            // 插入数据
            for (i = 0; i < size; i++) {
                var j = currentIndex[i];
                var time = this.getTime(i, j);
                if (time === currentTime) { // 当前序列为最小值
                    this.combinedValues[i].push({ time: currentTime, value: this.getValueExtend(i, j) });
                    currentIndex[i]++;
                    if (currentIndex[i] >= this.values[i].length) isFinished[i] = true;
                } else if (time < currentTime) {  // 已经到结尾，使用最后一个值
                    this.combinedValues[i].push({ time: currentTime, value: this.getValueExtend(i, j + 1) });
                } else { // 继续使用前一个值
                    this.combinedValues[i].push({ time: currentTime, value: this.getValueExtend(i, j - 1) })
                }
            }

            // 重新计算最小值
            currentTime = new Date(2200, 0, 1);
            for (i = 0; i < size; i++) {
                if (!isFinished[i] && currentTime > this.getTime(i, currentIndex[i])) currentTime = this.getTime(i, currentIndex[i]);
            }
        }
        this.isCombined = true;
    },

    // 获取数据值（扩展）
    getValueExtend: function (dimIndex, index) {
        // 没有数据，返回0
        if (this.values[dimIndex].length == 0) return 0;
        if (index < 0) return this.values[dimIndex][0].value;
        if (index >= this.values[dimIndex].length) return this.values[dimIndex][this.values[dimIndex].length - 1].value;
        return this.values[dimIndex][index].value;
    },
    */

    // 获取数据值
    getValue: function (dimIndex, index) {
        if (dimIndex < this.values.length && index < this.values[dimIndex].length )
            return this.values[dimIndex][index].value;
        return null;
    },

    getTime: function(dimIndex, index) {
        if (dimIndex < this.values.length && index < this.values[dimIndex].length)
            return this.values[dimIndex][index].time;
        return null;
    },

    /*
    // 获取多个数据项序列中的最大时间
    getMaxTime: function () {
        var maxTime = null;
        for (var i = 0; i < this.values.length; i++) {
            if (this.values[i].length === 0) continue;
            var time = this.values[i][this.values[i].length - 1].time;
            if (maxTime == null || maxTime < time) maxTime = time;
        }
        return maxTime;
    },

    // 合并后时间轴
    getTimeSeriesCombined: function () {
        if (!this.isCombined) this.combine();
        if (this.combinedValues[0].length === 0) return [];
        var i;
        var series = new Array();
        for (i = 0; i < this.combinedValues[0].length; i++) {
            series.push(this.combinedValues[0][i].time);
        }
        return series;

    },

    // 合并后的数据轴
    getValueSeriesCombined: function( dimIndex ) {
        if (!this.isCombined) this.combine();
        if (this.combinedValues[dimIndex].length === 0) return [];
        var i;
        var series = new Array();
        for (i = 0; i < this.combinedValues[dimIndex].length; i++) {
            series.push(this.combinedValues[dimIndex][i].value);
        }
        return series;
    },
    */

    // 获取数据轴数据
    getValueSeries: function (dimIndex) {
        var i;
        var series = new Array();
        for (i = 0; i < this.values[dimIndex].length; i++) {
            var time =  this.getTime(dimIndex, i).Format("yyyy-MM-dd hh:mm:ss");
            var value = this.getValue(dimIndex, i);
            if (!value) value = 0;
            series.push({ name: time, value:[ time, value ] } );
        }
        return series;
    },

    // 获取时间轴数据
    getTimeSeries: function (dimIndex) {
        var i;
        var series = new Array();
        for (i = 0; i < this.values[dimIndex].length; i++) {
            series.push(this.getTime(dimIndex, i));
        }
        return series;
    },

    // 解析查询结果数据
    resolveValues: function (dimIndex, dataView, index) {
        // 数据项的个数
        var itemsCount = dataView.getInt16(index, true);
        index += 2;
        for (var item = 0; item < itemsCount; item++) {
            // 此数据项有多少组数据
            var count = dataView.getInt16(index, true);
            index += 2;

            // 清空当前数组，从头开始赋值
            this.values[item] = [];
            for (var i = 0; i < count; i++) {
                // 时间
                var time = dataView.getFloat64(index, true);
                index += 8;
                var rtime = longToDatetime(time);
                var data = dataView.getFloat64(index, true);
                index += 8;

                if (data && data != Number.NEGATIVE_INFINITY && data != Number.POSITIVE_INFINITY) {
                    if (this.decimalPlaces.length > item && this.decimalPlaces[item] >= 0) data = parseFloat(data.toFixed(this.decimalPlaces[item]));
                    this.values[item].push({ value: data, time: rtime });
                }
            }
        }

        return index;
    },

    // 解析订阅结果数据
    resolveSubscribeValues: function (dimIndex, dataView, index) {
        var count = dataView.getInt16(index, true);
        index += 2;
        for (var i = 0; i < count; i++) {
            var ind = dataView.getInt32(index, true);
            index += 4;
            var ltime = dataView.getFloat64(index, true);
            var time = longToDatetime(ltime);
            index += 8;
            var value = dataView.getFloat64(index, true);
            if (value === Number.NEGATIVE_INFINITY ) value = 0;
            if (this.decimalPlaces.length > ind && this.decimalPlaces[ind] >= 0) value = parseFloat(value.toFixed(this.decimalPlaces[ind]));
            index += 8;
            this.values[ind].push({ value: value, time: time });
            if (this.values[ind].length > 5000) this.values[ind].splice(0, 1);
        }
        return index;
    }
});

}

// Warning, Error汇总
{
    var allPageErrors = { warningCount: 0, errorCount: 0, warnings: '【警告信息】', errors: '【错误信息】' };
    function getAllErrors() {
        for (var i = 0; i < dataSets.length; i++) {
            var dataSet = dataSets[i];
            for (var errorIndex in dataSet.errors) {
                var error = dataSet.errors[errorIndex];
                if (error.errorType == 0) {
                    allPageErrors.warningCount++;
                    allPageErrors.warnings += '<br>' + error.message + '(' + dataSet.dataSetID + ')';
                }
                else {
                    allPageErrors.errorCount++;
                    allPageErrors.errors += '<br>' + error.message + '(' + dataSet.dataSetID + ')';
                }
            }
        }
    }
    function SetPageErrorInfo() {
        if ($.changeStatusOk) {
            $.changeStatusOk();

            if (allPageErrors.warningCount > 0) {
                $.changeStatusWarning(allPageErrors.warnings);
            }

            if (allPageErrors.errorCount > 0) {
                $.changeStatusError(allPageErrors.errors);
            }

        }
   
    }
}

// WebSocket
{
    var socketChannels = new Array();
    var pageClosed = false;
    var HeartBeatCommand = textToBin("010100");

    function initWebSockets() {
        for (var i = 0; i < dataSets.length; i++) {
            var dataSet = dataSets[i];
            for (var j = 0; j < dataSet.commands.length; j++) {
                var command = dataSet.commands[j];
                var channel = socketChannels[command.serverUrl];
                if (channel == null) {
                    channel = new SocketChannel(command.serverUrl, command.isRealTime);
                    socketChannels[command.serverUrl] = channel;
                } else if (!channel.connected) {
                    channel.open();
                }
                else if (command.isRealTime)
                    channel.isRealTime = true;
            }
        }
    }

    var HEAD_LENGTH = 3;
    var DATASETID_INDEX = 0;
    var LINK_INDEX_INDEX = 2;
    var EDITOR_INDEX = 4; // 后加版本号4个字节
    var DATA_INDEX = 4;

    var SocketChannel = wisdata.createClass({
        // 初始化
        initialize: function (url, isRealTime) {
            // 待连接WebSocket地址
            this.url = url;
            // 是否为实时请求
            this.isRealTime = isRealTime;
            // 是否处于连接状态
            this.connected = false;
            // 是否就绪：已连接而且已验证
            this.isReady = false;
            // WebSocket通道
            this.channel = null;
            // 请求命令标注列表
            this.requestList = new Array();
            // 错误信息
            this.error = null;
            // 尝试连接次数
            this.tryCount = 0;
            this.open();
        },

        // 打开通道
        open: function () {
            if (!this.connected) {
                this.tryCount++;
                this.channel = new WebSocket(this.url);
                this.channel.binaryType = "arraybuffer";
                this.channel.onopen = createDelegate(this, this.onOpen);
                this.channel.onclose = createDelegate(this, this.onClose);
                this.channel.onmessage = createDelegate(this, this.onMessage);
                this.channel.onerror = createDelegate(this, this.onError);
            }
        },

        onOpen: function (evt) {
            this.connected = true;
            this.error = null;
            this.tryCount = 0;
            this.requestList.length = 0;
        },

        onClose: function (evt) {
            this.connected = false;
        },

        onError: function (evt) {
            this.error = this.url + "连接发生错误。";
            this.channel.close();
            this.open();
        },

        onMessage: function (evt, callback) {
            // 解析数据集和索引
            var dataView = new DataView(evt.data);
            // 功能码，用于区分是查询还是订阅
            var functionCode = dataView.getInt8(1, true);


            dataView = new DataView(evt.data, HEAD_LENGTH);
            var dataSetID = dataView.getInt16(DATASETID_INDEX, true);
            var index = dataView.getInt16(LINK_INDEX_INDEX, true);

            // 定位DataSet
            var dataSet = null;
            for (var i = 0; i < dataSets.length; i++)
                if (dataSets[i].dataSetID == dataSetID) {
                    dataSet = dataSets[i];
                    break;
                }

            if (dataSet != null) {

                if (functionCode < 20) {
                    // 移除命令标记
                    this.removeCommand(dataSetID, index);
                    // 解析查询结果数据
                    dataSet.resolveResult(index, dataView, DATA_INDEX);
                }
                else {
                    // 解析订阅结果数据
                    if ($.changeStatusLoading)
                        $.changeStatusLoading(); // 加载中...
                    dataSet.resolveSubscribeResult(index, dataView, DATA_INDEX + 4);
                    setTimeout(SetPageErrorInfo, 1000); // 订阅不需要错误信息，只需要停止加载标志
                }
                if (typeof updatePage === "function") {
                    updatePage();
                }
                if (typeof setUserData === "function") {
                    setUserData();
                }
            }
        },

        sendCommand: function (command, ifMark) {
            if (this.connected && (this.channel.readyState == WebSocket.OPEN)) {
                this.channel.send(command.command);
                if (ifMark) this.markCommand(command);
            }
        },

        markCommand: function (command) {
            command.requestTime = Date();
            var mark = command.dataSetID.toString() + "." + command.index.toString();
            this.requestList.push(mark);
        },

        removeCommand: function (dataSetID, index) {
            var mark = dataSetID.toString() + "." + index.toString();
            // 移除请求标记
            for (i = 0; i < this.requestList.length; i++)
                if (this.requestList[i] == mark) {
                    this.requestList.splice(i, 1);
                    break;
                }
        },

        isWaitingFor: function (command) {
            var mark = command.dataSetID.toString() + "." + command.index.toString();
            for (i = 0; i < this.requestList.length; i++)
                if (this.requestList[i] == mark)
                    return true;

            return false;
        }
    });

    function sendCommand(command, ifMark) {
        var socketChannel = socketChannels[command.serverUrl];
        socketChannel.sendCommand(command, ifMark);
        command.requestTime = (new Date()).getTime();
    }
}

// 查询、订阅、心跳
{
    var REQUEST_CYCLE = 10; // 动态数据订阅周期(分钟)
    var requestCycle = REQUEST_CYCLE * 60000;
    var pendingDataSet = new Array();

    // 查询某个具体的数据集
    function LoadValuesDS(dataSetID) {
        if ($.changeStatusLoading)
            $.changeStatusLoading();
        var done = true;
        var now = (new Date()).getTime();
        eval("var dataSet=dataSet" + dataSetID);
        for (var j = 0; j < dataSet.commands.length; j++) {
            var command = dataSet.commands[j];
            if (!command.ready) {
                var socketChannel = socketChannels[command.serverUrl];
                if (!socketChannel.isWaitingFor(command)) {
                    sendCommand(command, true);
                }
                done = false;
            }
        }
        // 如果查询已经完成
        if (done) {
            var hasSubscribeCommand = false;
            if (dataSet.sCommands.length > 0) {
                for (j = 0; j < dataSet.sCommands.length; j++) {
                    socketChannels[dataSet.sCommands[j].serverUrl].isRealTime = true;
                }
                hasSubscribeCommand = true;
            }

            // 如果有实时数据集则启动周期订阅函数, 否则关闭所有连接
            if (hasSubscribeCommand) {
                subscribeDS(dataSet);
                // 第一种方式，发送心跳保持连接，两种方式选其一
                // setInterval(heartBeat, 60 * 1000);
                // 第二种方式，循环订阅
                // setInterval(subscribe, requestCycle);
            }

            // 获取所有错误， 根据错误类型显示不同的提示信息
            getAllErrors();
            SetPageErrorInfo();
        }
        else {
            // 0.5秒后重新启动本函数，继续查询是否已经发送完查询命令，或命令已经执行完成
            setTimeout("LoadValuesDS(" + dataSetID + ");", 500);
        }
    }

    // 顺序发送查询命令，等待查询结果， 如果全部查询结果已经返回, 执行周期订阅
    function loadValues() {
        if ($.changeStatusLoading)
            $.changeStatusLoading();
        var done = true;
        var now = (new Date()).getTime();
        for (var i = 0; i < dataSets.length; i++) {
            var dataSet = dataSets[i];
            for (var j = 0; j < dataSet.commands.length; j++) {
                var command = dataSet.commands[j];
                if (!command.ready) {
                    var socketChannel = socketChannels[command.serverUrl];
                    if (!socketChannel.isWaitingFor(command)) {
                        sendCommand(command, true);
                    }
                    done = false;
                }
            }
        }

        // 如果查询已经完成
        if (done) {
            var hasSubscribeCommand = false;
            for (i = 0; i < dataSets.length; i++) {
                dataSet = dataSets[i];
                if (dataSet.sCommands.length > 0) {
                    for (j = 0; j < dataSet.sCommands.length; j++) {
                        socketChannels[dataSet.sCommands[j].serverUrl].isRealTime = true;
                    }
                    hasSubscribeCommand = true;
                }
            }

            // 如果有实时数据集则启动周期订阅函数, 否则关闭所有连接
            if (hasSubscribeCommand) {
                subscribe();
                // 第一种方式，发送心跳保持连接，两种方式选其一
                setInterval(heartBeat, 60 * 1000);
                // 第二种方式，循环订阅
                // setInterval(subscribe, requestCycle);
            }
            // 关闭没有订阅的连接
            for (var url in socketChannels) {
                if (!socketChannels[url].isRealTime) socketChannels[url].channel.close();
            }

            // 获取所有错误， 根据错误类型显示不同的提示信息
            getAllErrors();
            SetPageErrorInfo();
        }
        else {
            // 0.5秒后重新启动本函数，继续查询是否已经发送完查询命令，或命令已经执行完成
            setTimeout(loadValues, 500);
        }
    }

    // 订阅数据集的变化
    function subscribeDS(dataSet) {
        for (var j = 0; j < dataSet.sCommands.length; j++) {
            var command = dataSet.sCommands[j];
            if (command) sendCommand(command, false);
        }
    }

    function subscribe() {
        for (var i = 0; i < dataSets.length; i++) {
            var dataSet = dataSets[i];
            subscribeDS(dataSet);
        }
    }

    // 心跳
    function heartBeat() {
        var resend = false;
        for (var url in socketChannels) {
            var sc = socketChannels[url];
            if (sc.isRealTime) {
                if (sc.channel.readyState == WebSocket.OPEN) {
                    sc.channel.send(HeartBeatCommand);
                } else if (sc.channel.readyState == WebSocket.CLOSED) {
                    sc.open();
                    resend = true;
                }
            }
        }

        if (resend) subscribe();
    }
}

