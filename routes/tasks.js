// Titta ja Aleksi

var express = require('express');
var router = express.Router();
var fs = require('fs'); //voidaan kirjoittaa tiedostoon, tasks.json
var uuid = require('uuid/v4'); // automaattinen id:n luonti
const cors = require ('cors'); // voidaan hakea tietoa ulkoisista apeista
tasks = []; //Olemassa olevan tiedon lukeminen arrayhin tasks.json-tiedostosta tapahtuu app.js:stä

//kirjoittaa tasks-arrayn sisällön tasks.json-tiedostoon.
//Funktio kutsutaan, kun tietoa lisätään, poistetaan tai muokataan
function write() {
  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 1),
  function (err) {
      if (err) throw err;
    });
  }

//tiedon hakeminen ja lisääminen, ei id-kohtaista tietoa
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

  //tiedon hakeminen, muokkaaminen ja poistaminen id:n perusteella
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
    let id = 0;
    for (let task of tasks) {
      if (task.id === req.params.id) {
        tasks.splice(tasks.indexOf(task), 1)
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
          t.task = change.task;
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