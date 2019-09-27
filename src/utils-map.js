import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';

export const onMapLoad = (map, stores, firstStore) => {
	map.loadImage(
		'https://cdn11.bigcommerce.com/s-90vdngbq7j/product_images/uploaded_images/bb-logo-small.png?t=1568832941&_ga=2.159635390.283135744.1568641630-1600106569.1568150597',
		(error, image) => {
			if (error) throw error;

			map.addImage('BB-logo', image);
			const nav = new mapboxgl.NavigationControl();

			map.addControl(nav, 'top-right');

			map.flyTo({
				center: [firstStore[0], firstStore[1]],
				zoom: 11
			});

			map.addLayer({
				id: 'locations',
				type: 'symbol',
				source: {
					type: 'geojson',
					buffer: 0,
					data: stores
				},
				layout: {
					'icon-image': 'BB-logo',
					'icon-size': 0.35,
					'icon-allow-overlap': true
				}
			});

			map.on('click', e => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: ['locations']
				});
				if (features.length) {
					const clickedPoint = features[0];
					flyToStore(clickedPoint, map);
					createPopUp(
						<Popup store={clickedPoint} />,
						clickedPoint,
						map
					);
				}
			});

			map.on('mousemove', e => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: ['locations']
				});
				map.getCanvas().style.cursor = features.length ? 'pointer' : '';
			});
		}
	);
};

export const flyToStore = (clickedPoint, map) => {
	const coordinates = clickedPoint.geometry.coordinates;
	map.flyTo({
		center: [coordinates[0], coordinates[1]],
		zoom: 11
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

