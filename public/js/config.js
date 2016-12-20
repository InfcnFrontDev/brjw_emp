/**
 * Created by Administrator on 2016-12-19.
 */

var MyUI = MyUI || {};

MyUI.apiPath = 'http://192.168.1.165/';

MyUI.apiUrl = {
	// menuTree: 'data/menu.json'
	menuTree: MyUI.apiPath + 'WebServices/MenuService.ashx?statusCode=ExtTree',
	pageService: MyUI.apiPath + 'WebServices/PageService.ashx'
};
