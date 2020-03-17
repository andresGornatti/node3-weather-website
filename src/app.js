const path = require('path');
const express = require('express');
const hbs = require('hbs');
const dotenv = require('dotenv').config();
//if(dotenv.error){console.log(dotenv.error)}

const getGeolocation = require('./actions/getGeolocation');
const getWeather = require('./actions/getWeather');

const sv = express();

// Set tempales and public directory path route
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set Express to serve files
sv.set('view engine', 'hbs');
sv.set('views', viewsPath)
sv.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

sv.get('/', (req,res)=>{
	// res.setHeader('Content-Type','text/html')
	// res.send('<h1>Bienvenido</h1>');
	res.render('index', {
		title: 'Weather App',
		msg: '¡Usá este sitio para obtener el clima!'
	});
})
sv.get('/about', (req,res)=>{
	// res.setHeader('Content-Type','application/json')
	// const about = {
	// 	name: 'Carlos',
	// 	age: 20,
	// 	hobbie: 'Football'
	// }
	// res.send(JSON.stringify(about));
	res.render('about', {
		title: 'About',
		msg: 'about content'
	});
})
sv.get('/help', (req,res)=>{
	// res.setHeader('Content-Type','text/html')
	// res.send('<h2>Weather</h2>');
	res.render('help', {
		title: 'Help',
		helpText: 'Ayudaaaa'
	});
})
sv.get('/help/*', (req,res)=>{
	res.render('404', {
		title: 'Shit!',
		error: 'Error 404: Help article not found'
	});
})
sv.get('/weather', (req,res)=>{
	if(!req.query.location){
		return res.json({
			error: 'Location not provided'
		})
	} 
		const location = req.query.location;
		getGeolocation(location, ({longitude, latitude}={}, placeName,res)=>{
			getWeather(longitude,latitude, (pronostico)=>{
				res.json({
					pronostico,
					location,
					placeName
				});
			}, res);
		}, res);
});
sv.get('*', (req,res)=>{
	res.render('404', {
		title: 'Shit!',
		error: 'Error 404: Page not found'
	});
})

sv.listen(3000 || process.env.PORT, ()=>console.log('Running'))

// command
//  API_WEATHER_KEY=d21c0a9cfe39110646e124c6466b99b8 API_GEO_KEY=pk.eyJ1IjoiYW5kaWNodWxvIiwiYSI6ImNrN3VnbTVoZDBqNDIzZW8zc2YwZXVoMWcifQ.EK7UnDiHhbk3Zi1y_Ur5og node app.js
