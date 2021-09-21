var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var bcryptjs = require("bcryptjs");

// route connexion
router.post('/sign-in', async function(req,res,next) {

  // on purge les les résultats de recherche et les tickets préselectionnés
  req.session.resultsSearch = [];
  req.session.tickets = [];
    
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront1
  });

  if (req.body.emailFromFront1 == '' || req.body.passwordFromFront1 == '') {
    req.session.errorConnect = 'Veuillez remplir tous les champs';
    res.redirect('/');
  } else { 
    if(searchUser!= null && bcryptjs.compareSync(req.body.passwordFromFront1, searchUser.password)){
      req.session.errorConnect = "";

      req.session.user = {
        email: searchUser.emailFromFront1,
        firstname: searchUser.firstname,
        id: searchUser._id,
        name: searchUser.name
      };
      res.redirect('/home');
    } else {
      req.session.errorConnect = "L'email ou le mot de passe n'existe pas";
      res.redirect('/');
    }
  }
  
});

// route inscription
router.post('/sign-up', async function(req,res,next) {

  // on vérifie si ce qu'on renvoie depuis le input emailFromFront2 est vide
  if (req.body.emailFromFront2 == '') {
    req.session.errorInsc = 'Veuillez remplir tous les champs';
    res.redirect('/');
  } else { 
  
    // on purge les les résultats de recherche et les tickets préselectionnés
    req.session.resultsSearch = [];
    req.session.tickets = [];

    // on va chercher le user via emailFromFront2
    var searchUser = await userModel.findOne({
      email: req.body.emailFromFront2
    });
    
    // si emailFromFront2 n'est pas null on enregistre en base 
    if(searchUser == null){
      req.session.errorInsc = '';
      let hash = bcryptjs.hashSync(req.body.passwordFromFront2, 10);

      var newUser = new userModel({
        name: req.body.nameFromFront2,
        firstname: req.body.FirstNameFromFront2,
        email: req.body.emailFromFront2,
        password: hash,
        journeyId: []
      });
      var newUserSave = await newUser.save();

      // puis on enregistre dans l'objet de la variable de session user
      req.session.user = {
        name: newUserSave.name,
        firstname: newUserSave.firstname,
        email: newUserSave.email,
        id: newUserSave._id,
      };
      
      res.redirect('/home')
    } else {
      req.session.errorInsc = 'Cet email est déjà enregistré';
      res.redirect('/');
    }
  } 
})


module.exports = router;