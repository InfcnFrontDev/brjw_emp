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
	listeners: {
		'itemclick': tree_event
	},

	store: {
		type: 'tree',
		model: 'brjwApp.MenuItem',
		proxy: {
			type: 'ajax',
			//url: 'http://192.168.1.165/WebServices/MenuService.ashx?statusCode=ExtTree'
			url: 'data/menu.json'
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
		listeners: {
			'nodebeforeexpand': function (node, eOpts) {
				//点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
				//console.log(node);
				this.proxy.extraParams.pid = node.id;
				if (node.data.pid)
					this.proxy.extraParams.parent = node.data.pid;
			}
		}
	}
});
var tab = Ext.create('Ext.TabPanel', {
	region: 'center',
	deferredRender: false,
	activeTab: 0,
	resizeTabs: true, // turn on tab resizing
	minTabWidth: 115,
	tabWidth: 135,
	enableTabScroll: true
});

function tree_event(node, event) {
	console.log(event.data.id);

};

Ext.define('KitchenSink.view.tree.ReorderController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.tree-reorder',


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
			header: false,
			autoHeight: true,
			border: false,
			margins: '0 0 5 0',
			html: ['<div style="padding:15px;font-size: 20px;background-color: #28384a;border-bottom: 1px solid #0d1218;color:#fff;font-weight: bold;">能源管理平台</div>'].join('')
		}, {
			region: 'west',
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
