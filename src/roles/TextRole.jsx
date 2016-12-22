import React from 'react'
import loadjs from 'loadjs'

export default class TextRole extends React.Component {

	render() {
		return null;
	}

	componentDidMount() {
		let me = this;
		this.loadJs(function () {
			me.ready();
		});
	}

	// 加载图元依赖的JS
	loadJs(callback) {
		let {role} = this.props;
		loadjs(['scripts/pageroles/' + role.Actor.ActorType + '.js'], {success: callback});
	}

	ready() {
		this.initStagePage();
	}

	initStagePage() {
		let {role} = this.props,
			fn = eval(role.Actor.ActorType),
			actor = new fn({
				X: role.Bounds.X,
				Y: role.Bounds.Y,
				Width: role.Bounds.Width,
				Height: role.Bounds.Height,
				RotateAngle: role.RotateAngle,
				Flip: role.Flip
			});

		actor.init({
			FrameRate: 10,
			FrameCount: 0,
			FrameIndex: 2,
			BackGroundColor: '#FFE0C0',
			Color: '#32CD32',
			fontFamily: '仿宋',
			fontSize: 17,
			fontStyle: 'Bold, Italic, Underline, Strikeout',
			refreshLength: 0,
			RollingDirection: 'mid_leftward'
		});
	}

}
