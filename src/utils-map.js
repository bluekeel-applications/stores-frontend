import mapboxgl from 'mapbox-gl';

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