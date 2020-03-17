const fetch = require('node-fetch');

// Using DarkSky API
const getWeather = (long,lat,callback,res) => {
	//https://api.darksky.net/forecast/[key]/[latitude],[longitude]
	const key = process.env.API_WEATHER_KEY;
	const latitude = lat;
	const longitude = long;
	const optionalParameters = 'exclude=hourly,flags&lang=es&units=auto';
	fetch(`https://api.darksky.net/forecast/${key}/${latitude},${longitude}?${optionalParameters}`)
	.then(response=>response.json())
	.then(data=>{
	if(data.error){
		return res.json({error:'Error, no se pudo obtener el clima'});
	} else {
		//console.log(data)
		let currently = data.currently; 
		currently.time = new Date();
		let pronostico = `${data.daily.data[0].summary}. Actualmente la temperatura es de ${currently.temperature}ºC y las propabilidades de precipitaciones son del ${currently.precipProbability}%.`
		callback(pronostico);
	}
	})
	.catch((err,res)=>res.json({error:'No se pudo conectar con el servidor'}))
}

module.exports = getWeather;