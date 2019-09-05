import * as MapboxGL from 'mapbox-gl';

const flyToStore = (currentFeature, map) => {
	console.log('map:', this);
	map.flyTo({
		center: currentFeature.geometry.coordinates,
		zoom: 15
	});
};

const createPopUp = (currentFeature, map) => {
	// This will let you use the .remove() function later on
	if (!('remove' in Element.prototype)) {
		Element.prototype.remove = function() {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}

	const popUps = document.getElementsByClassName('mapboxgl-popup');
	// Check if there is already a popup on the map and if so, remove it
	if (popUps[0]) popUps[0].remove();

	new MapboxGL.Popup({ closeOnClick: false })
		.setLngLat(currentFeature.geometry.coordinates)
		.setHTML(
			'<h3>Sweetgreen</h3>' +
				'<h4>' +
				currentFeature.properties.address +
				'</h4>'
		)
		.addTo(map);
};
// export const buildLocationList = (data, map) => {
	
// 	// Iterate through the list of stores
// 	for (let i = 0; i < data.features.length; i++) {
// 		let currentFeature = data.features[i];
// 		// Shorten data.feature.properties to `prop` so we're not
// 		// writing this long form over and over again.
// 		let prop = currentFeature.properties;
// 		// Select the listing container in the HTML and append a div
// 		// with the class 'item' for each store
// 		let listings = document.getElementById('listings');
// 		let listing = listings.appendChild(document.createElement('div'));
// 		listing.className = 'item';
// 		listing.id = 'listing-' + i;

// 		// Create a new link with the class 'title' for each store
// 		// and fill it with the store address
// 		let link = listing.appendChild(document.createElement('a'));
// 		link.href = '#';
// 		link.className = 'title';
// 		link.dataPosition = i;
// 		link.innerHTML = prop.address;

// 		// Create a new div with the class 'details' for each store
// 		// and fill it with the city and phone number
// 		let details = listing.appendChild(document.createElement('div'));
// 		details.innerHTML = prop.city;
// 		if (prop.phone) {
// 			details.innerHTML += ' · ' + prop.phoneFormatted;
// 		}

// 		// Add an event listener for the links in the sidebar listing
// 		link.addEventListener('click', e => {
// 			// Update the currentFeature to the store associated with the clicked link
// 			let clickedListing = data.features[link.dataPosition];
// 			console.log('clickedListing:', clickedListing);
// 			// 1. Fly to the point associated with the clicked link
// 			// flyToStore(clickedListing, map);
// 			// 2. Close all other popups and display popup for clicked store
// 			// createPopUp(clickedListing, map);
// 			// 3. Highlight listing in sidebar (and remove highlight for all other listings)
// 			var activeItem = document.getElementsByClassName('active');
// 			if (activeItem[0]) {
// 				activeItem[0].classList.remove('active');
// 			}
// 			link.parentNode.classList.add('active');
// 		});

		// if(i === 0) {
		// 	if (!map) {
		// 		setTimeout(link.click(), 5000)
		// 	} else {
		// 		link.click();
		// 	}
		// }
// 	}
// };
