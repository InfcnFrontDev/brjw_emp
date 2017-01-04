import React from 'react'

// Commons
import ActorTypes from '../../common/ActorTypes'

// Roles
import EChartsRole from './components/EChartsRole'
import CanvasRole from './components/CanvasRole'
import GaugeRole from './components/GaugeRole'
import DataSourceRole from './components/DataSourceRole'
import TextRole from './components/TextRole'
import WebRole from  './components/WebRole'


/**
 * StageWebPage.aspx
 */
export default class StageWebPage extends React.Component {

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
		let {page} = this.props,
			pageId = 'stagepage-' + page.PageID,
			canvasId = 'canvas-' + page.PageID;

		let page_props = {},
			canvas_props = {
				width: page.Size.Width,
				height: page.Size.Height
			};

		let roles = page.Roles.map(role => {
			let actorType = role.Actor.ActorType,
				{canvas} = this.state;

			if (ActorTypes.echarts.includes(actorType)) {
				return <EChartsRole key={role.RoleID} pageId={pageId} role={role}/>;
			} else if (ActorTypes.gauge.includes(actorType)) {
				return <GaugeRole key={role.RoleID} pageId={pageId} role={role}/>;
			} else if (ActorTypes.dataSource.includes(actorType)) {
				return <DataSourceRole key={role.RoleID} pageId={pageId} role={role}/>;
			} else if (ActorTypes.text.includes(actorType)) {
				return <TextRole key={role.RoleID} pageId={pageId} role={role}/>;
			} else if (ActorTypes.web.includes(actorType)) {
				return <WebRole key={role.RoleID} pageId={pageId} role={role}/>;
			} else {
				return <CanvasRole key={role.RoleID} pageId={pageId} role={role} canvas={canvas}/>;
			}
		});


		return (
			<div ref="page" id={pageId} {...page_props}>
				<canvas ref="canvas" id={canvasId} {...canvas_props}></canvas>
				{roles}
			</div>
		)
	}

	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		let me = this,
			canvas;

		// 初始化 Canvas
		canvas = new fabric.Canvas(this.refs.canvas.id, {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});

		this.setState({canvas});

	}

}




