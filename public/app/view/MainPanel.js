Ext.define('MyUI.view.MainPanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',

	id: 'mainpanel',
	items: [
		{
			xtype: 'iframepanel',
			id: 'tab-home',
			title: '默认主页',
			iconCls: 'iconfont icon-home',
			url: 'home.html'
		}
	]

});

