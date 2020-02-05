var express = require('express');
var router = express.Router();
const cors = require ('cors');
const fetch = require("node-fetch");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route('/:city')
.get(function (req, res) {
  const city = req.params.city;
  fetch("http://api.openweathermap.org/data/2.5/weather?q="+ city +",fi&units=metric&id=524901&APPID=6397cafe9e18863c33d3a2949a644b80")
    .then (function(res){
      return res.json()
    }) 
    .then (function(data) {
      let clouds = data.weather[0].main; //clouds
      let temperature = data.main.temp;
      let windspeed = data.wind.speed;
      let cloudall = data.clouds.all;
      let weather = {cloud: clouds, cloudsall: cloudall, temp: temperature, wind: windspeed};
      res.json(weather);
      //res.json(data)
    })
}); 

module.exports = router;
