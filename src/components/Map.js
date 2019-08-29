import React,{ Component } from 'react';
import { addMapClicks, loadMap } from '../utils-map';

class MapContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			viewport: {
				width: '100%',
				height: this.isMobile() ? '40vh':'100vh',
			}
		};
	}
	
	componentDidMount = () => {
		let { map, stores } = this.props;
		
		if (map && stores) {
			loadMap(map, stores);
			addMapClicks(map, stores);
		}
	}

	isMobile = () => {
		return window.innerWidth < 600 ? true : false;
	};

	render() {
		const {viewport} = this.state;
		const mapStyle = {
			height: viewport.height,
			width: viewport.width,
			flex: 1
		}

		return (
			<div id="map" class="map" style={mapStyle} />
		);
	}
}

export default MapContainer;