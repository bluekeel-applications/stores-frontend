import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import MapContainer from './Map';
import Listings from './Listings';
import SearchBar from './SearchBar';

import { getStoreList } from '../utils-data';
import { createMap } from '../utils-map';

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
		const stores = await getStoreList(80121)
		this.setState({ stores });

		const map = await createMap(stores)
		this.setState({ map });
	};

	render() {
		const { stores, map } = this.state;

		return (
			<div class="App wrapper">
				<header class="header">
					<Navbar bg="light" variant="light">
						<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					</Navbar>
				</header>
				<article class="main">
					<MapContainer stores={stores} map={map}/>
				</article>
				<aside class="listings">
					<SearchBar />
					<Listings stores={stores} map={map} />
				</aside>
				<footer class="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
