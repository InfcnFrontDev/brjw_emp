import React from "react";
import PageScript from "../../../common/PageScript";

/**
 * Canvas图元
 */
export default class CanvasRole extends React.Component {

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
			{role, canvas} = this.props,
			ra;

		let fn = eval(role.Actor.ActorType);
		ra = new fn(canvas, role.Bounds.X, role.Bounds.Y, role.Bounds.Width, role.Bounds.Height, role.RotateAngle, role.Flip, role.Center.X, role.Center.Y, role.Actor.Diameter);
		ra.init(role.InitOption);
		ra.refresh(role.RefreshOption);

		canvas.renderAll();

		this.setState({ra});

		if (role.Actions) {
			this.registerActions(role.Actions);
		}

	}

	registerActions(actions) {
		let me = this;

		// mousemove event
		$(window).on('mousemove', function (ev) {
			me.mousemove(ev);
		});

		// click event
		$(window).on('click', function (ev) {
			me.click(ev, actions[0]);
		});
	}

	mousemove(ev) {
		ev = ev || window.event;

		let {ra}  = this.state,
			mousePos = mousePosition(ev);

		if (ra.containPoint(mousePos.x, mousePos.y)) {
			ra.topgroup.opacity = 0.5;
		} else {
			ra.topgroup.opacity = 1;
		}

		ra.canvas.renderAll();
	}

	click(ev, action) {
		ev = ev || window.event;

		let {ra}  = this.state,
			mousePos = mousePosition(ev);

		if (ra.containPoint(mousePos.x, mousePos.y)) {

			let url = action.PageType.toLowerCase().replace('page', '') + '.html?pageid=' + action.PageID +
				'&linkid=' + action.OwnerID + '&title=' + action.DisplayName;

			if (parent.openPage) {
				parent.openPage({
					id: 'tab-' + action.PageID,
					title: action.DisplayName,
					type: action.PageType,
					closable: true,
					url: 'pages/' + url
				});
			} else {
				location = url;
			}
		}
	}


}




