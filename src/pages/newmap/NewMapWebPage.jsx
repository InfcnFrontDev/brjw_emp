import React from 'react';

/**
 * NewMapWebPage.aspx
 */
export default class NewMapWebPage extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);

		// 初始化状态
		this.state = {
			bmap: null
		}
	}

	/**
	 * 组件渲染之前
	 */
	componentWillMount() {
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		let {page} = this.props,
			mapId = 'map-' + page.PageID;

		let style = {
			'position': 'absolute',
			'left': 0,
			'top': 0,
			'width': page.Width,
			'height': page.Height,
			'border': '1px solid white',
		};

		return (
			<div>
				<div ref="map" id={mapId} style={style}></div>
			</div>
		)

	}

	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.init();
	}

	// 初始化
	init() {
		let {page} = this.props, bmap;

		bmap = new BMap.Map(this.refs.map.id);
		bmap.centerAndZoom(new BMap.Point(page.Center.Lng, page.Center.Lat), page.ZoomLevel);
		bmap.addControl(new BMap.MapTypeControl());
		bmap.enableScrollWheelZoom(true);

		this.setState({bmap});
	}

}
