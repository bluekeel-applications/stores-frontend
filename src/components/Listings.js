import React from 'react';
import { buildLocationList } from '../utils-list';

import './Listings.css';

class Listings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			zipcode: null
		}
	}

	render() {
		const { stores, map } = this.props;
		
		return (
			<div class="sidebar">
				<div class="heading">
					<h1>Our locations</h1>
					{stores?buildLocationList(stores, map):'Please enter your zipcode.'}
				</div>
				<div id="listings" class="listings" />
			</div>
		);
	}
}

export default Listings;