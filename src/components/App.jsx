import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Input from "./Input";

import mapboxgl from 'mapbox-gl';

import { token, MY_MAP_STYLE } from '../config.json';
import { getStoreList, localDataGet, localDataSet } from '../utils-data';
import { onMapLoad } from '../utils-map';

import './App.css';

const styles = {
	// width: '100vw',
	height: '100vh',
	padding: '1px',
	flex: 1
};

class App extends Component {
	constructor(props) {
		super(props);

		this.mapContainer = React.createRef();
		// local storage call
		const userLocalData = localDataGet();

		this.state = {
			zipCode: userLocalData.zipCode ? userLocalData.zipCode : '',
			stores: [],
			lng: 0,
			lat: 0,
			zoom: 5,
			firstStore: {},
			storePicked: userLocalData.storePicked
		};
	}

	componentDidMount = async () => {
		const zipCode = this.state.zipCode;
		if (zipCode !== '') { 
			const stores = await getStoreList(zipCode);
			if(stores.features) {
				this.setState({
					firstStore: stores.features[0].geometry.coordinates,
					stores
				});
				this.loadMapWithStores(stores);
			}
		};
	}

	loadMapWithStores = (stores) => {
		const {firstStore, lng, lat, zoom} = this.state;
		mapboxgl.accessToken = token;

		if (stores.features.length > 0) {

			const map = new mapboxgl.Map({
				container: this.mapContainer.current,
				style: MY_MAP_STYLE,
				center: [lng, lat],
				zoom
			})

			map.on('move', () => {
				const { lng, lat } = map.getCenter();
				this.setState({
					lng: lng.toFixed(2),
					lat: lat.toFixed(2),
					zoom: map.getZoom().toFixed(2)
				});
			});

			map.on('load', () => {
				onMapLoad(map, stores, firstStore);
			});
		}
	};

	handleZipcodeInputKeyDown = e => {
		// this is called as soon as we get input from the user
		// we don't want to allow them the access to input past 5 digits
		// so we block on keyDown
		// (it never gets to keyUp, which actually updates the state)

		// restrict to 5 digits only
		// but allow backspace and arrow
		var key = e.which ? e.which : e.keyCode;
		if (
			(e.target.value.length >= 5 &&
				key !== 8 &&
				key !== 37 &&
				key !== 38 &&
				key !== 39 &&
				key !== 40) ||
			(key === 18 || key === 189 || key === 229)
		) {
			e.preventDefault();
		}
	};

	handleZipcodeInputKeyUp = e => {
		if(e.target.value.length === 5) {
			this.setState({
				zipCode: e.target.value
			});
			this.handleZipcodeSubmit(e.target.value);
		}
	};

	handleZipcodeInputPaste = e => {
		e.preventDefault();
		// get pasted content
		let pasteText = e.clipboardData.getData("text/plain");
		// only allow integers
		pasteText = pasteText.replace(/[^0-9]/g, "");
		// add to current input value (target)
		let newContent = e.target.value + pasteText;
		// only allow 5 digits total
		newContent = newContent.substring(0, 5);
		// set new value of input
		e.target.value = newContent;
		if (newContent.length === 5) {
			this.setState({
				zipCode: newContent
			});
			this.handleZipcodeSubmit(newContent);
		}
	};

	handleZipcodeSubmit = (zipCode) => {
		if (localDataGet('zipCode') !== zipCode) {
			localDataSet('zipCode', zipCode)
			setTimeout(document.location.reload(), 1000)
		}
	};

	render() {
		const { zipCode, stores } = this.state;

		return (
			<div className='App wrapper'>
				<header className='header'>
					<Navbar bg='light' variant='light'>
						<img
							src='https://cdn11.bigcommerce.com/s-90vdngbq7j/images/stencil/150x60/buy-on-trust-logo_1563418732__08831.original.png'
							alt='Buy On Trust'
							title='Buy On Trust'
							id='logo-img'
						/>
						{/* <div class='Wrapper'> */}
						<Input
							inputmode='numeric'
							onKeyDown={e => this.handleZipcodeInputKeyDown(e)}
							onKeyUp={e => this.handleZipcodeInputKeyUp(e)}
							onPaste={e => this.handleZipcodeInputPaste(e)}
							pattern='\d*'
							placeholder='Search'
							type='text'
							value={zipCode}
						/>
						{/* </div> */}
					</Navbar>
					<div id='header-text-container'>
						<h4 id='header-text'>
							Choose a BestBuy store for your order pickup
							location.
						</h4>
					</div>
				</header>

				{stores.features ? (
					<div
						id='map-container'
						style={styles}
						ref={this.mapContainer}
					/>
				) : (
					<div className='noZip'>Please enter your zipcode</div>
				)}
			</div>
		);
	}
}

export default App;
