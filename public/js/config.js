/**
 * Created by Administrator on 2016-12-19.
 */

var MyUI = MyUI || {};

// app title
MyUI.title = '能源管理平台';

// 接口路径
MyUI.apiPath = 'http://192.168.1.165/';

// 接口
MyUI.apiUrl = {
	// 菜单接口
	menuTree: MyUI.apiPath + 'WebServices/MenuService.ashx?statusCode=ExtTree',
	// 页面数据接口
	pageService: MyUI.apiPath + 'WebServices/PageService.ashx'
};

// 页面类型对应的图标
MyUI.iconClsMaps = {
	'StagePage': 'icon-zhuzhuangtutubiao',
	'InputPage': 'icon-edit',
	'TablePage': 'icon-table',
	'MapPage': 'icon-map',
	'HtmlPage': 'icon-html',
	'RichEditPage': 'icon-word',
	'ExcelPage': 'icon-excel',
	'SlidePage': 'icon-celveicon',
	'LayoutPage': 'icon-13',
	'EnergyBalancePage': 'icon-junhengqi',
	'HeatMapPage': 'icon-iconfontrelitu'
};
