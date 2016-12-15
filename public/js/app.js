Ext.require([
	'Ext.container.Viewport',
	'Ext.layout.container.Border',
	'Ext.tab.Panel',
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
            autoHeight: true, 
            header: false,
            border: false,  	
            html: [
            '<ul class="title-ul">',
            '<li><img src="images/logo.png"></li>',
			'<li><h2>能源管理平台</h2></li>',
            '</ul>'
				
			].join('')
                	
        },{
			region: 'west',
			bodyPadding: 5,
			title: 'Collapse/Width Panel',
			width: 240,
			split: true,
			collapsible: true,
			html: [
				'<ul>',
				'<li>The collapsed state</li>',
				'<li>The width</li>',
				'</ul>'
			].join('')
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

});
