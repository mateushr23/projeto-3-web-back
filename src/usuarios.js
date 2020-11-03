var express = require('express');
var router = express.Router();
const usuarioDAO = require('../model/usuarioModel');

router.get('/', function(req, res) {
    res.end('USUARIOS');
});

router.post('/login', async (req, res) => {
  var resAutenticado = await usuarioDAO.autenticaUsuario(req.query.email, req.query.senha);
    if(resAutenticado.token != undefined){
        if(resAutenticado.admin){
            res.json({autenticado : true, token : resAutenticado.token, admin : 'admin'});
        }else{
            res.json({autenticado : true, token : resAutenticado.token, admin : 'naoAdmin'});
        }
        
    }else {
        res.json({auth : false, token : null});
    }
});

router.post('/registro', async (req, res) => {
  var existente = await resAutenticado.AutenticaRegistro(req.query.email, req.query.senha);
    if(existente){
      res.json({inserido : false, msg : "Email ja cadastrado"});
    }else {
      res.json({inserido : true, msg : "Usuario cadastrado"});
    }
});


module.exports = router;
