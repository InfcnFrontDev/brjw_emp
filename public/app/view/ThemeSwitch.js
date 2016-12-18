Ext.define('MyUI.view.ThemeSwitch', {
	extend: 'Ext.Container',
	xtype: 'themeswitch',
	id: 'themeswitch',
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	items: [
		{
			xtype: 'combo',
			width: 200,
			labelWidth: 50,
			fieldLabel: 'Theme',
			displayField: 'name',
			valueField: 'value',
			queryMode: 'local',
			store: Ext.create('Ext.data.Store', {
				fields: ['value', 'name'],
				data: [
					{value: 'triton', name: 'Triton'},
					{value: 'neptune', name: 'Neptune'},
					{value: 'neptune-touch', name: 'Neptune Touch'},
					{value: 'crisp', name: 'Crisp'},
					{value: 'crisp-touch', name: 'Crisp Touch'},
					{value: 'classic', name: 'Classic'},
					{value: 'gray', name: 'Gray'},
					{value: 'aria', name: 'ARIA'}
				]
			}),
			value: MyUI.theme,
			listeners: {
				select: function (combo) {
					var theme = combo.getValue();
					var queryString = Ext.Object.toQueryString(
						Ext.apply(Ext.Object.fromQueryString(location.search), {theme: theme})
					);
					location.search = queryString;
				}
			}
		}
	]
});
