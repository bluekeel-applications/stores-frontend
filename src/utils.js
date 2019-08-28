import * as MapboxGL from 'mapbox-gl';
import axios from 'axios';

const urlBase = 'https://uqayn5b2kb.execute-api.us-east-1.amazonaws.com/prod/';

export const getStoreList = async zip => {
	try {
		let stores;
		await axios.get(urlBase + zip).then(res => {
			stores = {
				type: 'FeatureCollection',
				features: res.data.stores
			}
		});
		return stores;
	} catch (err) {
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
};

export const flyToStore = (currentFeature, map) => {
	map.flyTo({
		center: currentFeature.geometry.coordinates,
		zoom: 15
	});
}

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
}

export const getResponseHeaders = () => {
	return {
		'Access-Control-Allow-Origin': '*'
	};
};