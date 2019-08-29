import * as MapboxGL from 'mapbox-gl';
import { getResponseHeaders } from './utils-data';
import { token } from './config.json';

export const createMap = async (stores) => {
    try {
        MapboxGL.accessToken = token;
		// This adds the map to your page
		return new MapboxGL.Map({
			// container id specified in the HTML
			container: 'map',
			// style URL
			style: 'mapbox://styles/westonbluekeel/cjzvf1cl413ms1cn7yuamnbyn',
			// initial position in [lon, lat] format
			center: stores.features[0].geometry.coordinates,
			// initial zoom
			zoom: 10
		});
    } catch(err) { 
        console.log('Error:', err);
		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			headers: getResponseHeaders(),
			body: JSON.stringify({
				error: err.name ? err.name : 'Exception',
				message: err.message ? err.message : 'Uknown error'
			})
		};
    }
}

export const flyToStore = (currentFeature, map) => {
	map.flyTo({
		center: currentFeature.geometry.coordinates,
		zoom: 15
	});
};

export const createPopUp = (currentFeature, map) => {
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

	new MapboxGL.Popup({ closeOnClick: false })
		.setLngLat(currentFeature.geometry.coordinates)
		.setHTML(
			'<h3>Sweetgreen</h3>' +
				'<h4>' +
				currentFeature.properties.address +
				'</h4>'
		)
		.addTo(map);
};

export const addMapClicks = (map, stores) => {
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
				if (stores.features[i].properties.address === selectedFeature) {
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
};

export const loadMap = (map, stores) => {
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
};