var express = require('express');
var router = express.Router();
var novedadModel = require('../../models/novedadModel');
/*GET home page */
router.get('/', async function(req, res, next){
    
    var novedad
    if (req.query.q === undefined) {
        novedad = await novedadModel.getNovedad();
    } else {
        novedad = await novedadModel.Buscar(req.query.q);
    }

    res.render('admin/novedad', {
     layout:'admin/layout',
     usuario: req.session.nombre,
    novedad,
    is_search:req.query.q !==undefined,
    q:req.query.q 
    });
});//get novedad

router.get('/agregar', (req, res, next) => {
      
    res.render('admin/agregar', {
     layout:'admin/layout',
     
    });
});//get agregar

router.post('/agregar', async (req, res, next) => {
 try {
     if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo !="") {
         await novedadModel.insertNovedad(req.body)
         res.redirect('/admin/novedad')         
     } else {
         res.render('admin/agregar', {
             layout:'admin/layout',
             error:true,
             message:'Todos los campos son requeridos'
         });
         
     }
 } catch (error) {
     console.log(error)
     res.render('admin/agregar',{
        layout:'admin/layout',
        error:true,
        message:'no se cargo la novedad'
   
     });
 }

});

router.get('/eliminar/:id', async (req,res,next) =>{

    var id = req.params.id;
    await novedadModel.deleteNovedadById(id);
    res.redirect('/admin/novedad')
});

router.get('/modificar/:id', async (req, res, next) =>{
    var id = req.params.id;
    var novedad = await novedadModel.getNovedadByID(id);
    res.render('admin/modificar',{
        layout:'admin/layout',
        novedad
    });
});

router.post('/modificar', async(req,res,next)=>{
    try {
        var obj={
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo
        }
    await novedadModel.modificarNovedadByID(obj, req. body.id);
    res.redirect('/admin/novedad')   

     } catch (error) {
        console.log(error);
        res.render('admin/modificar',{
            layout:'admin/layout',
  error:true,
  message:'no se modifico la novedad'

        });
    }
});
module.exports = router;
