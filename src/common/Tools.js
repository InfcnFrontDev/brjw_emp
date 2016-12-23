export default {

	// 解析 url search
	getParams: function () {
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
		return params;
	}


}
