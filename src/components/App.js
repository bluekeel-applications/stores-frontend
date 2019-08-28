import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

import MapContainer from './Map';
import Listings from './Listings';
import * as MapboxGL from 'mapbox-gl';

import { flyToStore, createPopUp, getStoreList } from '../utils';

//import stores from '../data';

import './App.css';
const { token } = require('../config.json');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			stores: null
		};
	}

	componentDidMount = async () => {
		await getStoreList(80121)
		.then(stores => {
			this.setState({ stores });
			MapboxGL.accessToken = token;
			// This adds the map to your page
			const map = new MapboxGL.Map({
				// container id specified in the HTML
				container: 'map',
				// style URL
				style: 'mapbox://styles/westonbluekeel/cjzvf1cl413ms1cn7yuamnbyn',
				// initial position in [lon, lat] format
				center: [-77.034084, 38.909671],
				// initial zoom
				zoom: 14
			});
	
			map.on('load', function(e) {
				// Add the data to the map as a layer
				map.addSource('stores', {
					type: 'geojson',
					data: stores
				});
				map.addLayer({
					id: 'locations',
					type: 'symbol',
					source: {
						type: 'geojson',
						data: 'stores'
					},
					layout: {
						'icon-image': 'embassy-15',
						'icon-allow-overlap': true
					}
				});
			});
	
			// Add an event listener for when a user clicks on the map
			map.on('click', function(e) {
				// Query all the rendered points in the view
				var features = map.queryRenderedFeatures(e.point, {
					layers: ['locations']
				});
				if (features.length) {
					var clickedPoint = features[0];
					// 1. Fly to the point
					flyToStore(clickedPoint, map);
					// 2. Close all other popups and display popup for clicked store
					createPopUp(clickedPoint, map);
					// 3. Highlight listing in sidebar (and remove highlight for all other listings)
					var activeItem = document.getElementsByClassName('active');
					if (activeItem[0]) {
						activeItem[0].classList.remove('active');
					}
					// Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
					var selectedFeature = clickedPoint.properties.address;
					let selectedFeatureIndex;
					for (var i = 0; i < stores.features.length; i++) {
						if (
							stores.features[i].properties.address ===
							selectedFeature
						) {
							selectedFeatureIndex = i;
						}
					}
					// Select the correct list item using the found index and add the active class
					var listing = document.getElementById(
						'listing-' + selectedFeatureIndex
					);
					listing.classList.add('active');
				}
			});
			this.setState({ map });
		})
	};

	render() {
		return (
			<div class="App wrapper">
				<header class="header">
					<Navbar bg="light" variant="light">
						<Navbar.Brand href="#home">Navbar</Navbar.Brand>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="outline-primary">Search</Button>
						</Form>
					</Navbar>
				</header>
				<article class="main">
					<MapContainer />
				</article>
				<aside class="listings">
					<Listings map={this.state.map} />
				</aside>
				<footer class="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
