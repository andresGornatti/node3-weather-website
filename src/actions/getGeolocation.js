const fetch = require('node-fetch');

// Using MapBox API
const getGeolocation = (location, callback, res) => {
	const key = process.env.API_GEO_KEY; 
	// /geocoding/v5/{endpoint}/{search_text}.json
	//fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=1&access_token=pk.eyJ1IjoiYW5kaWNodWxvIiwiYSI6ImNrN3VnbTVoZDBqNDIzZW8zc2YwZXVoMWcifQ.EK7UnDiHhbk3Zi1y_Ur5og')
	fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=${key}`)
	.then(response=>response.json())
	.then(data=>{
		if(data.message || data.features.length===0){
			return res.json({error:'Error, no se pudo obtener localización'});
		} else if(data.features.length===1){
			// data -> center: [longitude,latitude]
			//const geoLoc = data.features[0].center;
			const geoLoc = {
				longitude: data.features[0].center[0],
				latitude: data.features[0].center[1]
			}
			const placeName = data.features[0].place_name;
			callback(geoLoc, placeName, res)
		}
	})
	.catch((err,res)=>res.json({error:'No se pudo conectar con el servidor'}))	

}

module.exports = getGeolocation;

