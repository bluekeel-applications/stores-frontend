// import React,{ Component } from 'react';
// import * as MapboxGL from 'mapbox-gl';

import { token } from '../config.json';

// import { addMapClicks, createMap } from '../utils-map';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const isMobile = () => {
	return window.innerWidth < 600 ? true : false;
};

const styles = {
	width: '100%',
	height: isMobile() ? '40vh':'100vh',
	//position: 'absolute'
	flex: 1
};

const Mapbox = () => {
	const [map, setMap] = useState(null);
	const mapContainer = useRef(null);
console.log('this:', mapContainer.current)
	useEffect(() => {
		mapboxgl.accessToken = token;
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/westonbluekeel/cjzvf1cl413ms1cn7yuamnbyn', // stylesheet location
				center: [0, 0],
				zoom: 5
			});

			map.on('load', () => {
				setMap(map);
				map.resize();
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default Mapbox;
// class MapContainer extends Component {

// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			viewport: {
// 				width: '100%',
// 				height: this.isMobile() ? '40vh':'100vh',
// 			},
// 			map: null
// 		};
// 	}
	
// 	component = async () => {
// 		const { stores } = this.props;
// 		MapboxGL.accessToken = token;

// 		const map = await createMap(stores, this.mapContainer);
// 		this.setState({ map });

// 		if (!stores) {
// 			return (
// 				<div id="no-aip-map">
// 					Enter a zipcode
// 				</div>
// 			)
// 		} else {
// 			map.on('load', function(e) {
// 				// Add the data to the map as a layer
// 				console.log('adding source to map')
// 				map.addSource('stores', {
// 					type: 'geojson',
// 					data: stores
// 				});
// 				console.log('adding layer to map');
// 				map.addLayer({
// 					id: 'locations',
// 					type: 'symbol',
// 					source: {
// 						type: 'geojson',
// 						data: 'stores'
// 					},
// 					layout: {
// 						'icon-image': 'embassy-15',
// 						'icon-allow-overlap': true
// 					}
// 				});
// 			});
// 			addMapClicks(map, stores);
// 		}
// 	}

// 	isMobile = () => {
// 		return window.innerWidth < 600 ? true : false;
// 	};

// 	render() {
// 		const {viewport} = this.state;
// 		const mapStyle = {
// 			height: viewport.height,
// 			width: viewport.width,
// 			flex: 1
// 		}

// 		return (
// 			<div
// 				id="map"
// 				class="map"
// 				style={mapStyle}
// 				ref={el => (this.mapContainer = el)}
// 			/>
// 		);
// 	}
// }

// export default MapContainer;