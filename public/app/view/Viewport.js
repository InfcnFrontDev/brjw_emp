Ext.define('MyUI.view.Viewport', {
	extend: 'Ext.container.Viewport',

	layout: 'border',
	items: [{
		region: 'north',
		xtype: 'toppanel'
	}, {
		region: 'west',
		xtype: 'navpanel',
		split: true,
		collapsible: true,
		width: 300,
		minWidth: 150
	}, {
		region: 'center',
		xtype: 'mainpanel'
	}]
});
