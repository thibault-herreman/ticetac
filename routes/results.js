var express = require('express');
var router = express.Router();


/* route liste des voyages après recherche   */
router.get('/buy', async function(req, res, next) {
    var id = req.query.id;

    if (req.session.tickets == undefined){
      req.session.tickets = [];
    }

    console.log('Id : ' + req.session.resultsSearch[id]._id);

    // on regarde, par l'id qu'on a récupéré et via la méthode findIndex si le trajet exact existe dans 
    // le tableau des tickets selectionnés (req.session.tickets)
    var index = req.session.tickets.findIndex(element => element._id == req.session.resultsSearch[id]._id);
    
    // si ce n'est pas le cas on push dans le tableau req.session.tickets et on créé une clé quantity à 1
    if (index == -1) {
      console.log('Nouveau ')
      req.session.tickets.push(req.session.resultsSearch[id]);
      req.session.tickets[req.session.tickets.length - 1].quantity = 1;
      // console.log('ticket :', req.session.tickets );

    // si c'est le cas on ne push pas dans le tableau req.session.tickets
    // et on augmente la quantity à 1 à l'id récupéré avec la méthode findIndex
    } else {
      console.log('Ajout ')
      req.session.tickets[index].quantity +=1;
    }
   
    // on redirige vers la page des voyages présélectionnés avant achat
    res.redirect('/journeys/journeys')
});

module.exports = router;