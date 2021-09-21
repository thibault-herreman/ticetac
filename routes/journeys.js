var express = require('express');
var router = express.Router();

var userModel = require('../models/users');

/* Voyages sélectionnés  */
router.get('/journeys',  function(req, res, next) {
   
    if (req.session.user == undefined) {
        res.redirect('/');
    }

    tickets = req.session.tickets;

    if (tickets.length == 0) {
        res.redirect('/home');
    }

    res.render('journey', { title: 'Journeys', tickets : req.session.tickets, sessionUser: req.session.user });
});

/* Voyages sélectionnés  */
router.get('/delete', async function(req, res, next) {

    if (req.session.user == undefined) {
        res.redirect('/');
    }
    var i= req.query.id;
    req.session.tickets.splice(i,1);

    res.redirect('/journeys/journeys');
});


/* Enregistrement en base  */
  router.get('/validate', async function(req, res, next) {

    if (req.session.user == undefined) {
        res.redirect('/');
    }

    tickets = req.session.tickets;

    var user = await userModel.findById(req.session.user.id);


    for (var i=0;i<tickets.length;i++) {
        user.journeyId.push(
            tickets[i]._id
        )
    }

    var newUserJourneySave = await user.save();

    req.session.tickets = [];
    res.redirect('/home');

});
  

/* Historic des voyages  */
router.get('/historics', async function(req, res, next) {

    if (req.session.user == undefined) {
        res.redirect('/');
    };

    var historics = await userModel.findById(req.session.user.id).populate('journeyId').exec();

    res.render('historics', { title: 'Historics', sessionUser: req.session.user, historics: historics.journeyId });

});


module.exports = router;




  