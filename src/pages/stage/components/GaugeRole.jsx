import React from 'react';

import PageScript from '../../../common/PageScript'

/**
 * Gauge图元
 */
export default class GaugeRole extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		return null;
	}

	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.loadJs();
	}

	/**
	 * 加载组件所依赖的脚本
	 */
	loadJs() {
		let me = this,
			{role} = this.props,
			actorType = role.Actor.ActorType,
			scripts = new Array();

		scripts.push('../scripts/BrGauge.js');
		scripts.push('../scripts/mscorlib.js');
		scripts.push('../scripts/PerfectWidgets.js');
		scripts.push('../scripts/pageroles/GaugeBase.js');

		PageScript.loadJs(scripts, function () {
			me.init();
		});

	}

	/**
	 * 初始化
	 */
	init() {
		let me = this,
			{role, pageId} = this.props,
			ra,
			option;

		ra = new BrGauge({
			id: 'brguage-' + role.RoleID,
			X: role.Bounds.X,
			Y: role.Bounds.Y,
			Width: role.Bounds.Width,
			Height: role.Bounds.Height,
			RotateAngle: role.RotateAngle,
			parentid: pageId,
			position: false,
			Flip: 'False'
		});
		if (role.Actor.ActorType === 'Ems.Client.Charts.LinearGaugeActor') {
			option = BuildGaugeOption('LinearHorizontal.Style4', {
				Scale: [{
					Maximum: 500,
					Minimum: 0,
					Major: 6,
					Minor: 4
				}, {Maximum: 50, Minimum: 0, Major: 6, Minor: 4}]
			});
		} else {
			option = BuildGaugeOption('CircularFull.Style18', {Scale: [{Maximum: 100, Minimum: 0}]});
		}

		ra.setOption(option);
		ra.refresh(role.RefreshOption);
		ra.setValue([]);

		this.setState({ra});
	}

}




