Ext.define('MyUI.view.SystemMenu', {
	extend: 'Ext.Component',
	xtype: 'systemmenu',

	id: 'systemmenu',
	cls: ['iconfont', 'icon-meun'],

	initComponent: function () {
		var me = this, menu, profileId;

		menu = new Ext.menu.Menu({
			items: [
				{
					text: '个人资料',
					iconCls: 'iconfont icon-yonghu',
					handler: function () {


					}
				},
				{
					text: '退出',
					iconCls: 'iconfont icon-exit',
					handler: function () {


					}
				}
			]
		});

		this.on({
			scope: this,
			click: function (e) {
				menu.showBy(this);
			},
			element: 'el'
		});

		this.callParent();
	}
});
