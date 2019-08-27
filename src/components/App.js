import React from 'react';

import MapContainer from './Map';
import Listings from './Listings';

import './App.css';

function App() {
  return (
		<div class="App wrapper">
			<header class="header">Header</header>
			<article class="main">
			  <MapContainer />
			</article>
			<aside class="listings">
			  <Listings/>
			</aside>
			<footer class="footer">Footer</footer>
		</div>
  );
}

export default App;
