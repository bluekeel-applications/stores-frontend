import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NoZip from './NoZip';
import Loading from './Loading';
import Input from './Input';
import mapboxgl from 'mapbox-gl';

import { token, MY_MAP_STYLE } from '../config.json';
import { getStoreList, localDataGet, localDataSet } from '../utils-data';
import { onMapLoad } from '../utils-map';

import './App.css';

const styles = {
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
			lat: 39.7392,
			lng: 104.9903,
			zoom: 0,
			firstStore: {},
			storePicked: userLocalData.storePicked,
			isLoading: true,
		};
	}

	componentDidMount = async () => {
		const zipCode = this.state.zipCode;
		if (zipCode !== '') { 
			const stores = await getStoreList(zipCode);
			
			if(stores.statusCode === 500) {
				console.log('invalid zipcode');
				this.setState({isLoading: false, zipCode: ''});
				const input = document.getElementById('zipInput');
				input.value = '';
				input.focus();
			}
			if(stores.features) {
				this.setState({
					firstStore: stores.features[0].geometry.coordinates,
					stores,
					isLoading: false
				});
				this.loadMapWithStores(stores);
			}
		} else {
			document.getElementById('zipInput').focus();
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
				this.setState({ isLoading: false });
			});
		} else {
			this.setState({ isLoading: false, zipCode: '' });
			document.location.reload();
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
			localDataSet('zipCode', zipCode);
			document.location.reload();
		}
	};

	handleZipcodeInputFocus = (e) => {
		e.target.value = '';
	}

	contentOrLoading = () => {
		return this.state.isLoading ? (
		<Loading>
			<div
				id="map-container"
				style={styles}
				ref={this.mapContainer}
			/>
		</Loading>
		) : (
			<div
				id="map-container"
				style={styles}
				ref={this.mapContainer}
			/>
		)
	};

	topInputOrNot = () => {
		const { zipCode } = this.state;
		return zipCode !== '' ? 
			<Input
				inputmode='numeric'
				onKeyDown={e => this.handleZipcodeInputKeyDown(e)}
				onKeyUp={e => this.handleZipcodeInputKeyUp(e)}
				onPaste={e => this.handleZipcodeInputPaste(e)}
				onFocus={e => this.handleZipcodeInputFocus(e)}
				pattern='\d*'
				placeholder='Search'
				type='text'
				value={zipCode}
			/> : null;
	}

	render() {
		const { zipCode } = this.state;

		return (
			<div className='App wrapper'>
				<header className='header'>
					<Navbar className='header-top-nav' bg='light' variant='light'>
						<img
							src='https://cdn11.bigcommerce.com/s-90vdngbq7j/images/stencil/150x60/buy-on-trust-logo_1563418732__08831.original.png'
							alt='Buy On Trust'
							title='Buy On Trust'
							id='logo-img'
						/>
						{this.topInputOrNot()}
					</Navbar>
					<div id='header-text-container'>
						<h4 id='header-text'>
							<b id='header-title-text'>
								Choose a
								<img
									src='https://cdn11.bigcommerce.com/s-90vdngbq7j/product_images/uploaded_images/best-buy-long.png?t=1563947370&_ga=2.146970548.283135744.1568641630-1600106569.1568150597'
									alt='BestBuyLogo'
									title='BestBuyLogo'
									id='bestbuy-logo'
								/>
								location
							</b>
							<br />for{' '}
							<em>
								<b>fast</b>
							</em>
							, in-store pickup
						</h4>
					</div>
				</header>
				{zipCode ? (
					this.contentOrLoading()
				) : (
					<NoZip 
						inputmode='numeric'
						onKeyDown={e => this.handleZipcodeInputKeyDown(e)}
						onKeyUp={e => this.handleZipcodeInputKeyUp(e)}
						onPaste={e => this.handleZipcodeInputPaste(e)}
						onFocus={e => this.handleZipcodeInputFocus(e)}
						pattern='\d*'
						placeholder='Search'
						type='text'
						value={zipCode}
					/>
				)}
			</div>
		);
	}
}

export default App;
