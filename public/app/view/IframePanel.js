Ext.define('MyUI.view.IframePanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'iframepanel',

	initComponent: function () {
		this.html = '<iframe src="' + this.url + '" width="100%" height="100%" frameborder="0"></iframe>';
		this.callParent();
	}

});
