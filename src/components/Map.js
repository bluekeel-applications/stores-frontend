import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import stores from '../data';

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1Ijoid2VzdG9uYmx1ZWtlZWwiLCJhIjoiY2p6c3Vqenl2MWRxODNubWl0bjVjeWdnYSJ9.oJkJDdOy6VUL2Mf8zY7-AA'
});

class MapContainer extends React.Component { 

    render() {
        return (
			<div id="map" class="map pad2">
				<Map
					style='mapbox://styles/mapbox/light-v10'
					containerStyle={{ height: '90vh', width: '66vw' }}
					center={[-77.034084, 38.909671]}
				>
					<Layer
						type="symbol"
						id="marker"
						layout={{ 'icon-image': 'marker-15' }}
					>
						<Feature coordinates={[-77.034084, 38.909671]} />
					</Layer>
				</Map>
			</div>
		);
    }
}

export default MapContainer;