// Titta ja Aleksi

var express = require('express');
var router = express.Router();
var fs = require('fs');//
var uuid = require('uuid/v4'); //
tasks = [{ id: 0, task: "koiranulkoilutus" }, { id: 1, task: "kauppareissu" }];
const cors = require ('cors');

// const tasksJSON = require('../tasks.json')
// tasks = tasksJSON

function write() {
  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 1),
  function (err) {
      if (err) throw err;
    });
  }

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
    write();
    res.json(task);
  });

router.route('/:id')
  .get(function (req, res) {
    for (let task of tasks) {
      if (task.id === req.params.id) {
        res.json(task)
        return
      }
    }
    res.status(404)
    res.json({ Viesti: "Taskia ei löydy!" })
  })

  .delete(function (req, res) {
    for (let task of tasks) {
      if (task.id === req.params.id) {
        tasks.splice(task, 1)
        write();
        res.json({ Viesti: "Taski poistettu!" })
        return
      }
    }
    res.status(404)
    res.json({ Viesti: "Virhe! Taskia ei löytynyt" })
  })

  .put(function (req, res) {
    for (let t of tasks) {
      if (t.id === req.params.id) {
        const change = req.body;
        if (change.task) {
          t.task = change.task
          console.log(t.task);
          write();
        }
        res.json({ Viesti: 'Muutettu' });
        return
      }
    }
    res.status(404)
    res.json({ Viesti: "Virhe! Taskia ei löytynyt" })
  });




module.exports = router;
