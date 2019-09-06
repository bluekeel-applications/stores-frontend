import React from 'react';

class Popup extends React.Component {
	onClick = () => {
		const store = this.props.store.properties;
		localStorage.setItem('store-picked', 'true');
		localStorage.setItem('store-id', store.storeId);
		localStorage.setItem('store-name', store.longName);
		localStorage.setItem('store-address', store.address);
		localStorage.setItem('store-phone', store.phoneFormatted);
		console.log('store saved to local storage');
		this.parent.hideStorePicker();
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
