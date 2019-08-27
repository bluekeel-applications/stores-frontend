import React from 'react';

import './Listings.css';

class Listings extends React.Component {

    render() {
        return (
            <div class='sidebar'>
                <div class='heading'>
                    <h1>Our locations</h1>
                </div>
                <div id='listings' class='listings'></div>
            </div>
        );
    }
}

export default Listings;