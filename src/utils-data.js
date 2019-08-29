import axios from 'axios';

const urlBase = 'https://uqayn5b2kb.execute-api.us-east-1.amazonaws.com/prod/';

export const getStoreList = async zip => {
	try {
		const res = await axios.get(urlBase + zip)
		return {
				type: 'FeatureCollection',
				features: res.data.stores
			}
	} catch (err) {
		console.log('Error:', err);
		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			headers: getResponseHeaders(),
			body: JSON.stringify({
				error: err.name ? err.name : 'Exception',
				message: err.message ? err.message : 'Uknown error'
			})
		};
	}
};

export const getResponseHeaders = () => {
	return {
		'Access-Control-Allow-Origin': '*'
	};
};

