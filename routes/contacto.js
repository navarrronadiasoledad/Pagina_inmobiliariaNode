var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
const { route } = require('.');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', { isContacto:true
   });
});
 
router.post('/', async(req,res,next)=>{
var nombre = req.body.nombre;
var email = req.body.email;
var tel = req.body.tel;
var comentarios = req.body.comentarios;

var obj = {
  to:'navarronadiasoledad@gmail.com',
  subject:'contacto desdes la web',
  html: nombre + "se contacto a traves de la web " + email + "<br> ademas hizo un comentario" + comentarios + "el telefono es " + tel
}

var transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT,
  auth:{
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS    
  }
})

 var inf = await transport.sendMail(obj);

  res.render('contacto',{
      message: 'MENSAJE ENVIADO'
  });
})
  
module.exports = router;