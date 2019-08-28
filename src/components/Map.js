import React,{ Component } from 'react';

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