document.addEventListener('DOMContentLoaded', getWeather);

//Haetaan serveriltä (/api/weather/:city) säätiedot. 
//Funktio suoritetaan 5 minuutin välein, jolloin tieto päivittyy sivulle
function getWeather() {
    let city = 'helsinki';
    fetch(`/api/weather/${city}`)
        .then(res => res.json())
        .then(data => {
            let temperature = Math.round(data.temp); //lämpötila esim 1.17 = 1
            let wind = data.wind; //tuulennopeus esim 6.3
            let i = data.icon; // ikoni
            let icon = `<img src="http://openweathermap.org/img/wn/${i}@2x.png"/>`;
            let print = `${temperature}°C   |   ${wind} m/s`;

            document.getElementById('icon').innerHTML = icon;
            document.getElementById('weather').innerHTML = print;
            setTimeout('getWeather()',300000); //sää päivitetään sivulle 5 min välein
        }) 
} 