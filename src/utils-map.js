import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';

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

	map.on('click', e => {
		const features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
		if (features.length) {
			const clickedPoint = features[0];
			flyToStore(clickedPoint, map);
			createPopUp(
				<Popup store={clickedPoint} />,
				clickedPoint,
				map
			);
			this.updateStateToCurrentStore(clickedPoint);
		}
	});

	map.on('mousemove', e => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ['locations']
		});
		map.getCanvas().style.cursor = features.length
			? 'pointer'
			: '';
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

