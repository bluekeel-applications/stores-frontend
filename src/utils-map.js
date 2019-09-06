import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

export const onMapLoad = (map, stores, firstStore) => {
	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav, 'top-right');

	map.flyTo({
		center: [firstStore[0], firstStore[1]],
		zoom: 9
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
};

export const flyToStore = (clickedPoint, map) => {
	const coordinates = clickedPoint.geometry.coordinates;
	map.flyTo({
		center: [coordinates[0], coordinates[1]],
		zoom: 13
	});
};

export const createPopUp = (popupJSX, clickedPoint, map) => {
	const coordinates = clickedPoint.geometry.coordinates;
	// This will let you use the .remove() function later on
	if (!('remove' in Element.prototype)) {
		Element.prototype.remove = function() {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}

	// Check if there is already a popup on the map and if so, remove it
	const popUps = document.getElementsByClassName('mapboxgl-popup');
	if (popUps[0]) popUps[0].remove();

	const popUpContainer = document.createElement('div');
	ReactDOM.render(popupJSX, popUpContainer);

	new mapboxgl.Popup({ closeOnClick: false })
		.setDOMContent(popUpContainer)
		.setLngLat(coordinates)
		.addTo(map);
};

