Ext.define('MyUI.view.TopPanel', {
	extend: 'Ext.Container',
	xtype: 'toppanel',
	id: 'toppanel',
	height: 52,
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	initComponent: function () {
		document.title = MyUI.title;

		this.items = [{
			xtype: 'component',
			id: 'toppanel-logo'
		}, {
			xtype: 'component',
			id: 'toppanel-title',
			html: MyUI.title,
			flex: 1
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			items: [
				{
					xtype: 'themeswitch'
				},
				{
					xtype: 'systemmenu',
					margin: '0 15 0 15'
				}
			]
		}];

		this.callParent();
	}
});
