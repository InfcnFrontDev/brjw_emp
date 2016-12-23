import React from 'react';

export default class MapPage extends React.Component {
 	static propTypes = {
		page: React.PropTypes.object
	};

	static defaultProps = {
		page: null
	};

	constructor(props) {
		super(props);

		this.state = {
			page:this.props,
			
		}
  	
	}
	componentDidMount() {
		let me = this;

		me.ready();
		
	}

	ready(){
		this.initMapPage()
	}
	// 初始化 fabric.Canvas
	initMapPage() {
		var style={
			position: 'absolute',
			left:'0px',
			top:'0px' ,
			width:this.page.Width,
			Height:this.page.Height,
			border:'1px solid #000'
		}
		/*MarkerConExpressions={} ;
		var oriBounds = {};
		oriBounds.width  = 900;
		oriBounds.height = 600;
		oriBounds.left =0 ;
		oriBounds.top =0 ;
		oricanBounds.push(oriBounds);
		ca.push('Ems.Client.Lib.MapPage');
		cadivid.push('allmap');*/
		/*$('#allmap').css({ 'position': 'absolute','left':'0px','top':'0px' });
		$('#allmap').width(900);
		$('#allmap').height(600);
		$('#allmap').css({'border-style':'solid white','border-width':'1px'});*/
		 map = new BMap.Map("allmap"); 
		map.centerAndZoom(new BMap.Point(116.395645, 39.929986), 15); 
		map.addControl(new BMap.MapTypeControl()); 
		map.enableScrollWheelZoom(true);
	}
	
	render() {
		 

	    return (
				<div id="allmap" style={this.initMapPage.style}></div>
	    )
  }
}
