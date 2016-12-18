Ext.define('MyUI.controller.Global', {
	extend: 'Ext.app.Controller',

	stores: [
		'NavTree@MyUI.store'
	],

	models: [
		'TreeNode@MyUI.model'
	],

	views: [
		'TopPanel@MyUI.view',
		'NavPanel@MyUI.view',
		'MainPanel@MyUI.view',
		'ThemeSwitch@MyUI.view',
		'SystemMenu@MyUI.view'
	],

	refs: [
		{
			ref: 'mainPanel',
			selector: 'mainpanel'
		}
	],

	init: function () {
		this.control({
			'viewport > navpanel': {
				itemclick: function (tree, record, item, index, e, eOpts) {

					if (record.data.leaf) {
						this.openPage(record.data)
					} else {
						// 展开节点
					}

				}
			}
		});
	},

	openPage: function (data) {
		var mainPanel = this.getMainPanel();

		console.log(data.name);

		var tab = mainPanel.queryById(data.id);
		if (!tab) {
			var url = 'pages/html.html';
			tab = Ext.create('Ext.Panel', {
				id: data.id,
				title: data.name,
				closable: true,
				iconCls: 'iconfont icon-page',
				html: '<iframe src="' + url + '" width="100%" height="100%" frameborder="0"></iframe>'
			});
			mainPanel.add(tab);
		}
		mainPanel.setActiveItem(tab);

	}
});
