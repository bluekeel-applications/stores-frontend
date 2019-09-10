import React from 'react';
import { newCurrentStore } from '../utils-data';

class Popup extends React.Component {

	onSelection = () => {
		const store = this.props.store.properties;
		newCurrentStore(store);
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
					<b>
						<em>{store.distance}</em>
					</b>{' '}
					miles aways
				</h5>
				<h5 class="popup-header-title">Address: </h5>
				<h4>
					{store.address}
					<br />
					{addressLower}
				</h4>
				<button class="popup-button" onClick={this.onSelection}>
					Make this your store!
				</button>
			</div>
		);
	}
}

export default Popup;
