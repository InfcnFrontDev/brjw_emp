import loadjs from 'loadjs'

import ActorTypes from './ActorTypes'

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

	// StagePage
	loadStagePageJs(page, callback){
		let roles = page.Roles,
			jsArray = new JsArray();

		roles.forEach(r => {
			let actorType = r.Actor.ActorType;
			if (ActorTypes.echarts.includes(actorType)) {
				jsArray.push('scripts/EChartsHelper.js');
			} else if (ActorTypes.gauge.includes(actorType)) {
				jsArray.push('scripts/BrGauge.js');
				jsArray.push('scripts/mscorlib.js');
				jsArray.push('scripts/PerfectWidgets.js');
				jsArray.push('scripts/pageroles/GaugeBase.js');
			} else {
				jsArray.push('scripts/pageroles/' + actorType + '.js');
			}
		});

		console.log(jsArray.array());

		loadjs(jsArray.array(), {success: callback});
	}

}
