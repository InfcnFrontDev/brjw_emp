import loadjs from 'loadjs'

// JS Array 去重复
class JsArray {

	constructor() {
		this.jss = new Array();
	};

	push(js) {
		if (!this.jss.includes(js)) {
			this.jss.push(js);
		}
	}

	array() {
		return this.jss;
	}

}

export default {

	/**
	 * 页面动态加载js
	 * @param jss
	 * @param callback
	 */
	loadJs(jss, callback){
		if (!window.scripts) {
			window.scripts = new JsArray();
		}

		jss.forEach(js => {
			scripts.push(js);
		});

		loadjs(scripts.array(), {success: callback});
	}

}
