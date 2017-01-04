import React from 'react';

import PageScript from '../../../common/PageScript'

/**
 * 数据源图元
 */
export default class DataSourceRole extends React.Component {

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

		scripts.push('../scripts/pageroles/' + actorType + '.js');

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
			ra;

		let fn = eval(role.Actor.ActorType);
		ra = new fn({
			X: role.Bounds.X,
			Y: role.Bounds.Y,
			Width: role.Bounds.Width,
			Height: role.Bounds.Height,
			RotateAngle: role.RotateAngle,
			Flip: role.Flip
		});
		ra.init(role.InitOption);
		ra.refresh(role.RefreshOption);

		this.setState({ra});
	}

}




