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
      res.json(data);
    })
}); 

module.exports = router;
