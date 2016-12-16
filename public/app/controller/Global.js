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
		'MainPanel@MyUI.view'
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
		var a=true,b=0;
		for(var i=0; i<mainPanel.items.items.length; i++) {
			//console.log(mainPanel.items.items[i].title);
			if (data.name == mainPanel.items.items[i].title) {
				a = false;
				b = i;
			}
		}
		var url = 'http://www.baidu.com/';
		var myPanel = Ext.create('Ext.Panel', {
			title: data.name,
			closable: true,
			html: '<iframe src="' + url + '" width="100%" height="100%" frameborder="0"></iframe>'
		});
		if(a) {
			mainPanel.add(myPanel);
		}
		if(!a){
			mainPanel.setActiveTab(b);
			document.getElementsByTagName('iframe')[0].src="http://www.taobao.com"
		}
		console.log(myPanel);
		mainPanel.setActiveItem(myPanel);



	}
});
