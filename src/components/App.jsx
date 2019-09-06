import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import Popup from './Popup';

import mapboxgl from 'mapbox-gl';

import { token, MY_MAP_STYLE } from '../config.json';
import { getStoreList } from '../utils-data';

import './App.css';

const styles = {
	maxWidth: '100vw',
	height: '100vh',
	margin: '5px',
	flex: 1
};

class App extends Component {
	constructor(props) {
		super(props);

		this.mapContainer = React.createRef();

		this.state = {
			zip: null,
			stores: null,
			lng: 0,
			lat: 0,
			zoom: 8,
			map: null,
			currentStore: null
		};
	}

	componentDidMount = async () => {
		const stores = await getStoreList(80121);
		this.setState({ stores });

		const firstStore = stores.features[0].geometry.coordinates;
		mapboxgl.accessToken = token;

		if (this.state.stores !== null) {
			this.setState({
				map: new mapboxgl.Map({
					container: this.mapContainer.current,
					style: MY_MAP_STYLE,
					center: [0, 0],
					zoom: this.state.zoom
				})
			});
			const { map } = this.state;

			map.on('move', () => {
				const { lng, lat } = map.getCenter();

				this.setState({
					lng: lng.toFixed(4),
					lat: lat.toFixed(4),
					zoom: map.getZoom().toFixed(2)
				});
			});

			map.on('load', e => {
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
				this.onMapLoad();
			});

			map.on('click', e => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: ['locations']
				});
				if (features.length) {
					const clickedPoint = features[0];
					console.log('clickedPoint:', clickedPoint);
					this.flyToStore(clickedPoint);
					this.createPopUp(
						<Popup store={clickedPoint} />,
						clickedPoint
					);
					this.updateStateToCurrentStore(clickedPoint);
				}
			});

			map.on('mousemove', e => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: ['locations']
				});
				map.getCanvas().style.cursor = features.length ? 'pointer' : '';
			});
		}
	};

	onMapLoad = () => {
		const { map } = this.state;
		const nav = new mapboxgl.NavigationControl();
		map.addControl(nav, 'top-right');
		// this.forceUpdate();
	};

	flyToStore = clickedPoint => {
		const { map } = this.state;
		const coordinates = clickedPoint.geometry.coordinates;

		map.flyTo({
			center: [coordinates[0], coordinates[1]],
			zoom: 14
		});
	};

	createPopUp = (popupJSX, clickedPoint) => {
		const { map } = this.state;
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

	updateStateToCurrentStore = clickedPoint => {
		this.setState({ currentStore: clickedPoint });
	};

	render() {
		const { stores } = this.state;

		return (
			<div className="App wrapper">
				<header className="header">
					<Navbar bg="light" variant="light">
						<img
							src="https://cdn11.bigcommerce.com/s-90vdngbq7j/images/stencil/150x60/buy-on-trust-logo_1563418732__08831.original.png"
							alt="Buy On Trust"
							title="Buy On Trust"
							id="logo-img"
						/>
						<SearchBar />
					</Navbar>
				</header>
				{stores ? (
					<div
						id="map-container"
						style={styles}
						ref={this.mapContainer}
					/>
				) : (
					'Please enter zipcode'
				)}
				<footer className="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
