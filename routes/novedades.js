var express = require('express');
var router = express.Router();
var novedadModel = require('../models/novedadModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades 
   if (req.query.q === undefined) {
     novedades = await novedadModel.getNovedad();
   }else{
     novedades = await novedadModel.Buscar(req.query.q);
   }

  res.render('novedades', {
    isNovedades:true,
  novedades,
  is_search: req.query.q !== undefined,
 q:req.query.q
});
});//get novedad
  

module.exports = router;
