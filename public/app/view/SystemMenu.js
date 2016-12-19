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
					id: 'personal',
					text: '个人设置',
					iconCls: 'iconfont icon-yonghu'
				},
				{
					id: 'logout',
					text: '退出',
					iconCls: 'iconfont icon-exit',
					/*handler:function(){
						location.href="login.html"
					}*/
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
