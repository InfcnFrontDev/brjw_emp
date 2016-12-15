
Ext.define('brjwApp.MenuItem', {
	extend: 'Ext.data.TreeModel',
	childType: 'brjwApp.MenuItem',
	fields: [{
		name: 'text',
		mapping: 'name'
	}]
});

Ext.define('KitchenSink.view.tree.Reorder', {
	extend: 'Ext.tree.Panel',
	xtype: 'tree-reorder',
	controller: 'tree-reorder',

	requires: [
		'Ext.data.TreeStore'
	],

	title: 'Files',
	height: 'auto',
	width: 'auto',

	useArrows: true,

	store: {
		type: 'tree',
		model: 'brjwApp.MenuItem',
		proxy: {
			type: 'ajax',
			url: 'http://192.168.1.165/WebServices/MenuService.ashx?statusCode=NaviTree'
		},
		root: {
			text: 'Ext JS',
			id: '0',
			expanded: true
		},
		folderSort: true,
		sorters: [{
			property: 'text',
			direction: 'ASC'
		}],
		listeners : {
			'nodebeforeexpand' : function(node,eOpts){
				//点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
				//console.log(node);
				this.proxy.extraParams.pid = node.id;
				if(node.data.pid)
					this.proxy.extraParams.parent = node.data.pid;
			},
			'nodebeforeappend': function (obj , node , eOpts) {
				console.log(node.data);
				if(node.data.isParent && node.data.isParent == 'false')
					node.data.leaf = true;
			}
		}
	}
});

Ext.define('KitchenSink.view.tree.ReorderController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.tree-reorder',

	onExpandAllClick: function () {
		var view = this.getView(),
			toolbar = view.lookup('tbar');

		view.getEl().mask('Expanding tree...');
		toolbar.disable();

		view.expandAll(function() {
			view.getEl().unmask();
			toolbar.enable();
		});
	},

	onCollapseAllClick: function () {
		var view = this.getView(),
			toolbar = view.lookup('tbar');

		toolbar.disable();

		view.collapseAll(function() {
			toolbar.enable();
		});
	}
});


Ext.require([
	'Ext.container.Viewport',
	'Ext.layout.container.Border',
	'KitchenSink.view.tree.*',
	'Ext.tab.Panel',
	'brjwApp.*',
	'Ext.state.*',
	'Ext.data.*'
]);


Ext.onReady(function () {

	Ext.create('Ext.container.Viewport', {
		layout: {
			type: 'border',
			padding: '0'
		},
		items: [{  
            region: 'north',  
            xtype: "panel",  

            title: "能源管理平台",  
            autoHeight: true,  
            border: false,  
            margins: '0 0 5 0'  ,
            tools: [
                {type: 'menus'}]
        },{
			region: 'west',
			bodyPadding: 5,
			title: 'Collapse/Width Panel',
			width: 240,
			split: true,
			collapsible: true,
			xtype: 'tree-reorder'
		}, {
			region: 'center',
			xtype: 'tabpanel',
			header: false,
			split: true,
			layout: 'fit',
			bodyStyle: 'background:white',
			defaults: {
				padding: 12,
				bodyStyle: 'background:white'
			},

			items: [{
				title: '我的主页',
				html: 'mysimplegrid1',
				closable: true, 
			}, {
				title: '我的主页',
				html: 'mysimplegrid2',
				closable: true, 
			}, {
				title: '我的主页',
				html: 'mysimplegrid3',
				closable: true, 
			}, {
				title: '我的主页',
				html: '<iframe src="http://www.baidu.com/" width="100%" height="100%" frameborder="0">',
				closable: true, 
			}]
		}]
	});
	Ext.create('Ext.tree.Panel', {
		renderTo: document.getElementById("abc"),
		width: 300,
		height: 250,
		root: {
			text: 'Root',
			expanded: true,
			children: [
				{
					text: 'Child 1',
					leaf: true
				},
				{
					text: 'Child 2',
					leaf: true
				},
				{
					text: 'Child 3',
					expanded: true,
					children: [
						{
							text: 'Grandchild',
							leaf: true
						}
					]
				}
			]
		}
	});

});
