document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    let city = 'helsinki';
    fetch(`/api/weather/${city}`)
        .then(res => res.json())
        .then(data => {
            let d = data;
            // let cloud = d.cloud; //esim "Clouds"
            // let clouds = d.cloudsall; //pilviprosentti esim 40
            let temperature = Math.round(d.temp); //lämpötila esim 1.17 = 1
            let wind = d.wind; //tuulennopeus esim 5.7
            let i = d.icon; // ikoni
            let icon = `<img src="http://openweathermap.org/img/wn/${i}@2x.png"/>`;

            let print = `${temperature}°C   |   ${wind} m/s`;

            document.getElementById('icon').innerHTML = icon;
            document.getElementById('weather').innerHTML = print;
        }) 
} 