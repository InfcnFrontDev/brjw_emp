import React from 'react';

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			map: null
		}
	}

	render() {
		let {page} = this.props;

		let style = {
			'position': 'absolute',
			'left': 0,
			'top': 0,
			'width': 900,
			'height': 600,
			'border-style': 'solid white',
			'border-width': '1px'
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

		map = new BMap.Map(this.refs.map.id);
		map.centerAndZoom(new BMap.Point(116.395645, 39.929986), 15);
		map.addControl(new BMap.MapTypeControl());
		map.enableScrollWheelZoom(true);
	}

}
