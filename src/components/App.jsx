import React, { Component } from 'react';

import { Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import Popup from './Popup';

import mapboxgl from 'mapbox-gl';

import { token, MY_MAP_STYLE } from '../config.json';
import { getStoreList } from '../utils-data';
import {
	onMapLoad,
	flyToStore,
	createPopUp
} from '../utils-map';

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
			firstStore: null,
			currentStore: null,
			storePicked: localStorage.getItem('storePicked')
		};
	}

	componentDidMount = () => {
		if (this.state.storePicked) {
				this.loadMapWithZip();
			} else {
				console.log('need a zipcode');
			}
		}
	
	updateStateToCurrentStore = clickedPoint => {
		this.setState({ currentStore: clickedPoint });
	};

	loadMapWithZip = async () => {
		const stores = await getStoreList(80121);
		this.setState({
			stores,
			firstStore: stores.features[0].geometry.coordinates
		});

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
			const { map, stores, firstStore } = this.state;

			map.on('move', () => {
				const { lng, lat } = map.getCenter();
				this.setState({
					lng: lng.toFixed(2),
					lat: lat.toFixed(2),
					zoom: map.getZoom().toFixed(2)
				});
			});

			map.on('load', e => {
				onMapLoad(map, stores, firstStore);
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
			});
		
		
		}
	};

	render() {
		const { storePicked } = this.state;

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
				{storePicked ? (
					<div
						id="map-container"
						style={styles}
						ref={this.mapContainer}
					/>
				) : (
					<div className="noZip">
						Please enter a zipcode
					</div>

				)}
			</div>
		);
	}
}

export default App;
