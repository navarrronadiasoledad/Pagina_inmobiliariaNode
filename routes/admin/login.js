var express = require('express');
var usuarioModel = require('../../models/usuarioModels');
var router = express.Router();

/*GET home page */
router.get('/', function(req, res, next){
 res.render('admin/login', {
     layout:'admin/layout'
 });
});

router.get('/logout', function(req,res, next){
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
router.post('/', async (req, res, next) =>{
    try {
        var usuario =req.body.usuario;
        var password = req.body.password;

        var data = await usuarioModel.getUserbyUserNameandPassword(usuario, password);
        if(data !=undefined){
            req.session.id_usuario = data.id_emp;
            req.session.nombre = data.usuario;
            
            res.redirect('/admin/novedad');
        }else{
            res.render('admin/login', {
                layout: 'admin/layout',
                error:true
            });
        }/*arreglar el login no conecta*/

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
