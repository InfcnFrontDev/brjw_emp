Ext.define('MyUI.view.NavPanel', {
	extend: 'Ext.tree.Panel',
	xtype: 'navpanel',

	store: 'NavTree',

	id: 'navpanel',
	title: '导航菜单',

	useArrows: true,
	rootVisible: false,
	border: false
});
