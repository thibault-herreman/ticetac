var express = require('express');
var router = express.Router();

var userModel = require('../models/users');

const dateFormat = require('../dateformat');
const timeFormat = require('../timeformat');
const cookieParser = require('cookie-parser');


/* Voyages sélectionnés  */
router.get('/journeys',  function(req, res, next) {
   
    if (req.session.user == undefined) {
        res.redirect('/');
    }

    tickets = req.session.tickets;

    if (tickets.length == 0) {
        res.redirect('/home');
    }

    res.render('journey', { title: 'Journeys', tickets : req.session.tickets });
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

    req.session.destroy();
    res.redirect('/');


});
  

/* Historic des voyages  */
router.get('/historics', async function(req, res, next) {

    if (req.session.user == undefined) {
        res.redirect('/');
    };

   console.log('Recherche de historic pour user Id =' + req.session.user.id);

    //var historics = await userjourneyModel.find({userId: req.session.user.id}).sort({date: 1});
    var historics = await userModel.findById(req.session.user.id).populate('journeyId').exec();

    //console.log('historics :',historics );

    res.render('historics', { title: 'Historics', userFirstName: req.session.user.firstname, userName: req.session.user.name, historics: historics.journeyId });

});


module.exports = router;




  