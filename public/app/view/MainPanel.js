Ext.define('MyUI.view.MainPanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',

	id: 'mainpanel',
	items: [
		{
			xtype: 'panel',
			title: '默认主页',
			html: '默认主页'
		}
	]

});

