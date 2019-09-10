import React from 'react';

class Popup extends React.Component {

	sendMessage = (msg) => {
		const data = JSON.stringify(msg);
		window.top.postMessage(data, '*');
	}

	onClick = () => {
		const store = this.props.store.properties;
		const storeData = {
			'store-picked': true,
			'store-id': store.storeId,
			'store-name': store.longName,
			'store-address': store.address,
			'store-phone': store.phoneFormatted
		}
		this.sendMessage(storeData);
		window.location.href = 'https://buyontrust.com/';
	}
	
	render() {
		const store = this.props.store.properties;
        const addressLower = store.city + ', ' + store.state + ' ' + store.postalCode;
		return (
			<div class="popup-element">
				<h3>
					<b>
						<h4 class="header-subs">The</h4>
						{store.longName}
						<br />
						<h4 class="header-subs">BestBuy</h4>
					</b>
				</h3>
				<h5 class="popup-distance">
					<b><em>{store.distance}</em></b> miles aways
				</h5>
				<h5 class="popup-header-title">Address: </h5>
				<h4>
					{store.address}
					<br />
					{addressLower}
				</h4>
				<button class="popup-button" onClick={this.onClick}>Make this your store!</button>
			</div>
		);
	}
}

export default Popup;
