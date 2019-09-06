import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			zipcode: null
		};
	}

	render() {
		return (
			<div class="searchbar-div">
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search by Zipcode"
						className="mr-sm-2"
					/>
					{/* <Button id="searchButton" variant="outline-primary">Search</Button> */}
				</Form>
			</div>
		);
	}
}

export default SearchBar;
