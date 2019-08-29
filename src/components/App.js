import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import Mapbox from './Map';
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
					{stores ? <Mapbox stores={stores} /> : <p>Please enter a zipcode</p>}
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
