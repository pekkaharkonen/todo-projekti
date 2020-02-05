document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    let city = 'helsinki';
    fetch(`/api/weather/${city}`)
        .then(res => res.json())
        .then(data => {
            let d = data;
            let cloud = d.cloud; //esim "Clouds"
            let clouds = d.cloudsall; //pilviprosentti esim 40
            let temperature = Math.round(d.temp); //lämpötila esim 1.17 = 1
            let wind = d.wind; //tuulennopeus esim 5.7

            let print = `Weather now: ${cloud} ${clouds}%, Temperature ${temperature}°C, Wind ${wind} m/s`;

            console.log(print);
            document.getElementById('weather').innerHTML = print;
        }) 
} 