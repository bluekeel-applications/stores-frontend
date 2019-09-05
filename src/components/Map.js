import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Listings from './Listings';
import SearchBar from './SearchBar';

import { token, MY_MAP_STYLE } from '../config.json';


const isMobile = () => {
	return window.innerWidth < 600 ? true : false;
};

const styles = {
	maxWidth: '100vw',
	height: '100vh',
	margin: '5px',
	flex: 1
};


export default class Mapbox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lng: 5,
			lat: 34,
			zoom: 8
		};
	}

	componentDidMount = () => {
		const { stores } = this.props;
		mapboxgl.accessToken = token;
		const firstStore = stores.features[0].geometry.coordinates;

		const { zoom } = this.state;

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: MY_MAP_STYLE,
			center: [0,0],
			zoom
		});

		map.on('move', () => {
			const { lng, lat } = map.getCenter();

			this.setState({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			});
		});

		map.on('load', (e) => {
				// Add the data to the map as a layer
			console.log('adding source to map')
			map.flyTo({
				center: [firstStore[0], firstStore[1]],
				zoom: 7
			});
		
			map.addLayer({
				id: 'locations',
				type: 'symbol',
				source: {
					type: 'geojson',
					data: stores
				},
				layout: {
					'icon-image': 'embassy-15',
					'icon-allow-overlap': true
				}
			});
		});
		
	}

	createPopUp = (currentFeature) => {
		// This will let you use the .remove() function later on
		if (!('remove' in Element.prototype)) {
			Element.prototype.remove = function() {
				if (this.parentNode) {
					this.parentNode.removeChild(this);
				}
			};
		}

		const popUps = document.getElementsByClassName('mapboxgl-popup');
		// Check if there is already a popup on the map and if so, remove it
		if (popUps[0]) popUps[0].remove();

		new mapboxgl.Popup({ closeOnClick: false })
			.setLngLat(currentFeature.geometry.coordinates)
			.setHTML(
				'<h3>Sweetgreen</h3>' +
					'<h4>' +
					currentFeature.properties.address +
					'</h4>'
			)
			.addTo(this.map);
	};

	
	isMobile = () => {
		return window.innerWidth < 600 ? true : false;
	};
	
	render() {
		return (
			<div
				id='map-container'
				style={styles}
				ref={el => (this.mapContainer = el)}
			/>
		);
	}
}
