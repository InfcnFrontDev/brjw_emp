import React from 'react';

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			map: null,
		}
	}

	render() {
		let {page} = this.props;
		let style = {
			'position': 'absolute',
			'left': 0,
			'top': 0,
			'width':page.Width,
			'height':page.Height,
			'border': ' 1px solid white',
		};

		return (
			<div>
				<div ref="map" id="mypage_ctl00" className="allmap" style={style}></div>
			</div>
		)

	}

	componentDidMount() {
		this.initMapPage();
	}

	initMapPage() {
		let {map} = this.state;
		let {page} = this.props;
		console.log(page)
		map = new BMap.Map(this.refs.map.id);
		map.centerAndZoom(new BMap.Point(page.Center.Lng,page.Center.Lat), page.ZoomLevel);
		map.addControl(new BMap.MapTypeControl());
		map.enableScrollWheelZoom(true);
	}

}
