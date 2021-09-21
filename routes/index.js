var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journeys');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ticketac', errorConnect: req.session.errorConnect, errorInsc: req.session.errorInsc });
});


/* GET page avec nos trajets recherchés */
router.get('/home', async function(req, res, next) {

  if (req.session.user == undefined) {
    res.redirect('/');
  }

  res.render('home', { title: 'Home TicetTac', errorSearch: req.session.errorSearch });
});


/* POST sur la recherche */
router.post('/search', async function(req, res, next) {

  if (req.session.user == undefined) {
    res.redirect('/');
  }

  let villeDepart = req.body.inputFrom;
  let villeArrivee = req.body.inputTo;
  let dateSearch = req.body.inputDate;

  if (villeDepart != '' && villeArrivee != '' && dateSearch != '') {
    req.session.errorSearch = "";

    villeDepart = villeDepart[0].toUpperCase() + villeDepart.toLowerCase().substr(1);
    villeArrivee = villeArrivee[0].toUpperCase() + villeArrivee.toLowerCase().substr(1);

    const convertDate = new Date(dateSearch);
    const journeyList = await journeyModel.find({ departure: villeDepart, arrival: villeArrivee, date: convertDate });
    
    req.session.availableDate = `${convertDate.getDate()}/${convertDate.getMonth()+1}`;

    if (journeyList != undefined) {
      req.session.resultsSearch = journeyList; 
      res.render('tickets', { title: 'Tickets TicetTac', resultsSearch: req.session.resultsSearch, availableDate: req.session.availableDate });
    }
    
  } else {
    req.session.errorSearch = "Vous n'avez pas rempli tous les champs";
    res.redirect('/home');
  }
  
});

/* GET page avec nos trajets recherchés */
router.get('/tickets', function(req, res, next) {

  if (req.session.user == undefined) {
    res.redirect('/');
  }

  res.render('tickets', { title: 'Tickets', resultsSearch: req.session.resultsSearch });
});

module.exports = router;