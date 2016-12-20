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

	iconClsMaps: {
		'StagePage': 'icon-zhuzhuangtutubiao',
		'InputPage': 'icon-edit',
		'TablePage': 'icon-table',
		'MapPage': 'icon-map',
		'RichEditPage': 'icon-edit',
		'HtmlPage': 'icon-html',
		'WordPage': 'icon-word',
		'ExcelPage': 'icon-excel',
		'SlidePage': 'icon-13',
		'LayoutPage': 'icon-13',
		'EnergyBalancePage': 'icon-13'
	},

	init: function () {



		this.control({
			'#navpanel': {
				beforeitemappend: function (tree, node, eOpts) {
					if (node.data.leaf) {
						node.data.iconCls = 'iconfont ' + this.iconClsMaps[node.data.iconSkin];
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
			iconCls: 'iconfont ' + this.iconClsMaps[data.iconSkin],
			closable: true,
			url: eval('this.' + data.click)
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
