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
		
		this.setState({
			lng: firstStore[1],
			lat: firstStore[0]
		});

		const { zoom } = this.state;

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: MY_MAP_STYLE,
			center: [firstStore[0], firstStore[1]],
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
	}

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
