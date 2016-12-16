Ext.define('MyUI.store.NavTree', {
	extend: 'Ext.data.TreeStore',
	model: 'MyUI.model.TreeNode',
	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'http://192.168.1.165/WebServices/MenuService.ashx?statusCode=ExtTree'
	},

	root: {
		text: 'Ext JS',
		id: '0',
		expanded: true
	},
	listeners: {
		'nodebeforeexpand': function (node, eOpts) {
			//点击父亲节点的菜单会将节点的id通过ajax请求，将到后台
			//console.log(node);
			this.proxy.extraParams.pid = node.id;
			if (node.data.pid)
				this.proxy.extraParams.parent = node.data.pid;
		}
	}
});
