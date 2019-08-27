// import React from 'react';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import Navbar from "react-bootstrap/Navbar";

// import stores from '../data';

// const Map = ReactMapboxGl({
// 	accessToken: 'pk.eyJ1Ijoid2VzdG9uYmx1ZWtlZWwiLCJhIjoiY2p6c3Vqenl2MWRxODNubWl0bjVjeWdnYSJ9.oJkJDdOy6VUL2Mf8zY7-AA'
// });


// const mapStyle = {
// 	flex: 1,
// 	height: '100vh'
// };
// class MapContainer extends React.Component { 
	
	//     render() {
		//         return (
			// 			<div id="map" class="map">
			// 				<Navbar fluid class="zip-input"></Navbar>
			// 				<Map
			// 					style='mapbox://styles/mapbox/light-v10'
			// 					containerStyle={mapStyle}
			// 					center={[-77.034084, 38.909671]}
			// 				>
			// 					<Layer
			// 						type="symbol"
			// 						id="marker"
			// 						layout={{ 'icon-image': 'marker-15' }}
			// 					>
			// 						<Feature coordinates={[-77.034084, 38.909671]} />
			// 					</Layer>
			// 				</Map>
			// 			</div>
			// 		);
			//     }
			// }
import React,{ Component } from 'react';
import ReactMapGL from 'react-map-gl';

const TOKEN = 'pk.eyJ1Ijoid2VzdG9uYmx1ZWtlZWwiLCJhIjoiY2p6c3Vqenl2MWRxODNubWl0bjVjeWdnYSJ9.oJkJDdOy6VUL2Mf8zY7-AA'

const isMobile = () => {
	return window.innerWidth < 600 ? true : false;
};

class MapContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isMobile: isMobile(),
			viewport: {
				width: '100%',
				height: isMobile() ? '50vh':'100vh',
				latitude: 37.7577,
				longitude: -122.4376,
				zoom: 8
			}
		};
	}		

	render() {
		return (
			<ReactMapGL
				class='map-element'
				{...this.state.viewport}
				mapboxApiAccessToken={TOKEN}
				onViewportChange={(viewport) => this.setState({ viewport })}
			/>
		);
	}
}

export default MapContainer;