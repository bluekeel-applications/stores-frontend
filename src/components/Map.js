import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { token, MY_MAP_STYLE } from '../config.json';

import MapboxMap, { Marker } from 'react-mapbox-wrapper';

const isMobile = () => {
	return window.innerWidth < 600 ? true : false;
};

const styles = {
	width: '100%',
	height: isMobile() ? '40vh':'100vh',
	flex: 1
};


export default class Mapbox extends Component {

	onMapLoad = (map) => {
		this.map = map;
		const nav = new mapboxgl.NavigationControl();
		map.addControl(nav, 'top-left');
		this.forceUpdate();
	}

	render() {
		let markers = [];
		const { stores } = this.props;
		const firstStore = stores.features[0];

		const DEFAULT_COORDINATES = {
			lat: firstStore.geometry.coordinates[1],
			lng: firstStore.geometry.coordinates[0]
		};

		if (this.map && stores.features.length > 0) {
			
			for(let i=0; i < stores.features.length; i++) {
				let store = stores.features[i];
				let popup = <div>{store.properties.longName}</div>;
				let coordinates = { 
					lat: store.geometry.coordinates[1],
					lng: store.geometry.coordinates[0]
				};
				let marker = (
					<Marker
						key={store.properties.storeId}
						coordinates={coordinates}
						map={this.map}
						popup={popup}
						popupAnchor="bottom"
						popupOnOver
						popupOffset={20}
					>
						<span
							role="img"
							aria-label="Emoji Marker"
							style={{ fontSize: '50px' }}
						>
							🏢
						</span>
					</Marker>
				);
				markers.push(marker);
			}
		}

		return (
			<div style={styles}>
				<MapboxMap
					accessToken={token}
					coordinates={DEFAULT_COORDINATES}
					mapboxStyle={MY_MAP_STYLE}
					className="map-container"
					onLoad={this.onMapLoad}
				>
					{markers}
				</MapboxMap>
			</div>
		);
	}
}

Mapbox.displayName = 'CustomMarker';
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