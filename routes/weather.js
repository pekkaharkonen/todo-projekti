var express = require('express');
var router = express.Router();
const cors = require ('cors'); // voidaan hakea tietoa ulkoisista apeista
const fetch = require("node-fetch"); //voidaan käyttää fetchiä
var apicache = require('apicache'); //tiedon varastointia varten
let cache = apicache.middleware; 

//hae säätieto Suomen kaupungin mukaan. Tieto päivitetään 
//openweather-palvelusta 10 minuutin välein serverille
router.route('/:city')
  .get(cache('10 minutes'), function (req, res) {
    const city = req.params.city;
    console.log('suorita');
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},fi&units=metric&id=524901&APPID=6397cafe9e18863c33d3a2949a644b80`)
      .then (function(res){
        return res.json()
      }) 
      .then (function(data) {
        let temperature = data.main.temp;
        let windspeed = data.wind.speed;
        let icon = data.weather[0].icon;
        let weather = {temp: temperature, wind: windspeed, icon: icon};
        res.json(weather);
      })
  }); 

module.exports = router;