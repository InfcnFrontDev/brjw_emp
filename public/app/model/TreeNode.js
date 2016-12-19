Ext.define('MyUI.model.TreeNode', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.reader.Json'
	],

	fields: [
		'id',
		{
			name: 'text',
			mapping: 'name'
		},
		'pid', 'isParent', 'click', 'iconSkin', 'leaf']

});
