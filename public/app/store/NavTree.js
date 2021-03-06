Ext.define('MyUI.store.NavTree', {
	extend: 'Ext.data.TreeStore',
	model: 'MyUI.model.TreeNode',
	autoLoad: true,
	flex: 1,
	sortable: true,

	proxy: {
		type: 'ajax',
		url: MyUI.apiUrl.menuTree
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
