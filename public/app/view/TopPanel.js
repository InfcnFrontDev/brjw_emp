Ext.define('MyUI.view.TopPanel', {
	extend: 'Ext.Container',
	xtype: 'toppanel',
	id: 'toppanel',
	title: '能源管理平台',
	height: 52,
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	initComponent: function () {
		document.title = this.title;

		this.items = [{
			xtype: 'component',
			id: 'toppanel-logo',
			cls: ['iconfont', 'icon-icon']
		}, {
			xtype: 'component',
			id: 'toppanel-title',
			html: this.title,
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
