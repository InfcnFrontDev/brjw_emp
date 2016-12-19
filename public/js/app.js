var Ext = Ext || {};
var MyUI = MyUI || {};

Ext.beforeLoad = function (tags) {
	var query = location.search.substring(1),
		values = {
			'false': false,
			'true': true,
			'null': null
		},
		paramRe = /([^&=]+)(=([^&]*))?/g,
		plusRe = /\+/g,  // Regex for replacing addition symbol with a space
		params = {},
		match, key, val;

	while (match = paramRe.exec(query)) {
		key = decodeURIComponent(match[1].replace(plusRe, ' '));

		if (match[2]) {
			val = decodeURIComponent(match[3].replace(plusRe, ' '));
			if (val in values) {
				val = values[val];
			} else if (!isNaN(+val)) {
				val = +val;
			}
		} else {
			val = true;
		}

		params[key] = val;
	}

	MyUI.theme = params.theme || 'triton';

	document.write('<link rel="stylesheet" href="plugins/extjs/classic/theme-' + MyUI.theme + '/resources/theme-' + MyUI.theme + '-all.css">');
	document.write('<link rel="stylesheet" href="css/theme-' + MyUI.theme + '.css">');

}();

Ext.application({
	name: 'MyUI',

	// automatically create an instance of MyUI.view.Viewport
	autoCreateViewport: true,

	controllers: [
		'Global'
	]
});
