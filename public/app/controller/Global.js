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
		'SystemMenu@MyUI.view',
		'IframePanel@MyUI.view'
	],

	refs: [
		{
			ref: 'topPanel',
			selector: 'toppanel'
		},
		{
			ref: 'navPanel',
			selector: 'navpanel'
		},
		{
			ref: 'mainPanel',
			selector: 'mainpanel'
		}
	],

	init: function () {
		this.control({
			'#navpanel': {
				itemclick: function (tree, record, item, index, e, eOpts) {

					if (record.data.leaf) {
						this.openTreePanel(record.data)
					} else {
						// 展开节点
					}

				}
			},
			'#personal': {
				'click': this.personal
			},
			'#logout': {
				'click': this.logout
			}
		});
	},
	openIframePanel: function (data) {
		var mainPanel = this.getMainPanel();
		var tab = mainPanel.queryById(data.id);
		if (!tab) {
			tab = Ext.create('MyUI.view.IframePanel', data);
			mainPanel.add(tab);
		}
		mainPanel.setActiveItem(tab);
	},

	openTreePanel: function (data) {
		this.openIframePanel({
			id: 'tab-' + data.id,
			title: data.name,
			iconCls: 'iconfont icon-page',
			closable: true,
			url: 'pages/html.html'
		});
	},
	personal: function () {
		this.openIframePanel({
			id: 'tab-personal',
			title: '个人设置',
			iconCls: 'iconfont icon-yonghu',
			closable: true,
			url: 'pages/personal.html'
		});
	},
	logout: function () {
		console.log('logout');
	}
});
