Ext.define('MyUI.view.TopPanel', {
	extend: 'Ext.Container',
	xtype: 'toppanel',
	id: 'app-header',
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
			id: 'app-header-logo',
			cls: ['ext', 'ext-sencha']
		}, {
			xtype: 'component',
			id: 'app-header-title',
			html: this.title,
			flex: 1
		}];

		this.callParent();
	}
});
