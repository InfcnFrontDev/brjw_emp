import React from 'react'
import loadjs from 'loadjs'
import Tools from '../common/Tools'

export default class CanvasRoles extends React.Component {

	static propTypes = {
		roles: React.PropTypes.array
	};

	static defaultProps = {
		roles: []
	};

	render() {
		return (
			<div>
				<canvas ref="canvas" width="1000" height="500"></canvas>
			</div>
		);
	}

	componentDidMount() {
		let {roles} = this.props;

		let canvas = new fabric.Canvas(this.refs.canvas, {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});
		this.setState({
			canvas: canvas
		});

		// traverse and return role js
		let roleJs = roles.map(r => {
			return 'js/pageroles/' + r.Actor.ActorType + '.js';
		});

		// load js
		loadjs(roleJs, {
			success: function () {
				roles.map(r => {
					let fn = eval(r.Actor.ActorType);
					return new fn(canvas, r.Bounds.X, r.Bounds.Y, r.Bounds.Width, r.Bounds.Height, r.RotateAngle, r.Flip, r.Center.X, r.Center.Y);
				});
			}
		});
	}
}
