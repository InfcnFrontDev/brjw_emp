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

	refs: [{
		ref: 'topPanel',
		selector: 'toppanel'
	}, {
		ref: 'navPanel',
		selector: 'navpanel'
	}, {
		ref: 'mainPanel',
		selector: 'mainpanel'
	}],

	init: function () {

		this.control({
			'#navpanel': {
				beforeitemappend: function (tree, node, eOpts) {
					if (node.data.leaf) {
						node.data.iconCls = 'iconfont ' + MyUI.iconClsMaps[node.data.iconSkin];
					}
				},
				itemclick: function (tree, record, item, index, e, eOpts) {
					if (record.data.leaf) {
						this.openTreePanel(record.data)
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

		window.openPage = this.openPage;
	},
	openPage: function (data) {
		var mainPanel = Ext.getCmp('mainpanel');
		var tab = mainPanel.queryById(data.id);
		if (!tab) {

			// 类型对应图标
			if (data.type) {
				data.iconCls = 'iconfont ' + MyUI.iconClsMaps[data.type];
			}

			tab = Ext.create('MyUI.view.IframePanel', data);
			mainPanel.add(tab);
		}
		mainPanel.setActiveItem(tab);
	},

	openTreePanel: function (data) {
		this.openPage({
			id: 'tab-' + data.id,
			title: data.name,
			type: data.iconSkin,
			closable: true,
			url: eval('this.' + data.click)
		});
	},
	personal: function () {
		this.openPage({
			id: 'tab-personal',
			title: '个人设置',
			iconCls: 'iconfont icon-yonghu',
			closable: true,
			url: 'personal.html'
		});
	},
	logout: function () {
		location = './login.html';
	},
	beforeRedirect: function (url) {
		// Pages/StageWebPage.aspx?pageid=19508fcc-297a-4cf1-8076-31c2fe3b7379&linkid=7c62e2b2-23ff-4a7e-a8e0-1572f636fee8&title=echarts
		var urls = url.split('?'),
			newurl;
		newurl = urls[0].toLowerCase();
		newurl = newurl.replace('webpage.aspx', '.html');
		newurl = newurl + '?' + urls[1];
		// /pages/stage.html?pageid=19508fcc-297a-4cf1-8076-31c2fe3b7379&linkid=7c62e2b2-23ff-4a7e-a8e0-1572f636fee8&title=echarts
		return newurl;
	}
});
