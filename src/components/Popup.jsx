import React from 'react';

class Popup extends React.Component {
	
	render() {
        const store = this.props.store.properties;
        const addressLower = store.city + ', ' + store.state + ' ' + store.postalCode;
		return (
			<div class="popup-element">
				<h3>
					<b>{store.longName}</b>
					<br />
					<h5 class="popup-distance">{store.distance} miles aways</h5>
				</h3>
				<h5 class="popup-header-title">Address: </h5>
				<h4>
					{store.address}
					<br />
					{addressLower}
				</h4>
				<button class="popup-button">Make this your store!</button>
			</div>
		);
	}
}

export default Popup;
