document.addEventListener('DOMContentLoaded', ()=>{

const askWeather = (e) => {
	if(location){	
	feedbackP.textContent='Loading...';
	const location = input.value;
		fetch(`http://localhost:3000/weather?location=${location}`)
		.then(response=>response.json())
		.then(data=>{
			if(data.error){
			return feedbackP.textContent=data.error;
			}
			const {pronostico,location, placeName} = data; 
			feedbackP.innerHTML=`${placeName}<br>${pronostico}`;
			console.log(placeName);
			console.log(pronostico)
		})
		.catch(err=>console.log('Error al conectar con el servidor.'))
	}
}

const submit = document.getElementById('submit-location');
const input = document.getElementById('input-location');
const feedbackP = document.getElementById('feedback');

submit.addEventListener('click', ()=>askWeather(event));


});