var express = require('express');
var router = express.Router();
var fs = require('fs');//
var uuid = require('uuid/v4'); //
tasks = [{ id: 0, task: "koiranulkoilutus" }, { id: 1, task: "kauppareissu" }];

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

router.route('/')
  .get(function (req, res, next) {
    res.json(tasks);
  })

  .post(function (req, res, next) {
    if (!req.body) throw new Error("Tyhjä syöte");
    const task = req.body;
    console.dir(req.body);
    task.id = uuid();
    tasks.push(task);
    res.json(task);
  });

  router.route('/:id')
  .get(function(req, res){
    for(let task of tasks){
      if(task.id === req.params.id) {
        res.json(task)
        return
      }
    }
    
  })


module.exports = router;
