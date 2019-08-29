import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
// import * as MapboxGL from 'mapbox-gl';

// import { token } from '../config.json';

import MapContainer from './Map';
import Listings from './Listings';
import SearchBar from './SearchBar';

import { getStoreList } from '../utils-data';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			stores: null
		};
	}

	componentDidMount = async () => {
		this.stores = await getStoreList(80121);
		this.setState({ stores: this.stores });
		// MapboxGL.accessToken = token;

		// const map = new MapboxGL.Map({
		// 	container: this.mapContainer,
		// 	// style URL
		// 	style: 'mapbox://styles/westonbluekeel/cjzvf1cl413ms1cn7yuamnbyn',
		// 	// initial position in [lon, lat] format
		// 	center: this.stores.features[0].geometry.coordinates,
		// 	// initial zoom
		// 	zoom: 10
		// });
		// this.setState({ map: map });
	};

	// componentWillUnmount() {
	// 	this.map.remove();
	// }

	render() {
		let { stores } = this.state;

		return (
			<div class="App wrapper">
				<header class="header">
					<Navbar bg="light" variant="light">
						<img
							src="https://cdn11.bigcommerce.com/s-90vdngbq7j/images/stencil/150x60/buy-on-trust-logo_1563418732__08831.original.png"
							alt="Buy On Trust"
							title="Buy On Trust"
							id="logo-img"
						/>
					</Navbar>
				</header>
				<article class="main">
					<MapContainer
						stores={stores}
					/>
				</article>
				<aside class="listings">
					<SearchBar />
					<Listings stores={stores} />
				</aside>
				<footer class="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
