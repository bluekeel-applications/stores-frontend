import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import Mapbox from './Map';

import { getStoreList } from '../utils-data';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			stores: null
		}
	}
	componentDidMount = async () => {
		this.stores = await getStoreList(80121);
		this.setState({ stores: this.stores });
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
					</Navbar>
				</header>
				{stores?<Mapbox stores={stores} /> : 'Please enter zipcode'}
				<footer className="footer">Footer</footer>
			</div>
		);
	}
}

export default App;
