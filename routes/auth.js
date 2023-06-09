/*
  Rutas de Usuario / Auth
  host + api/auth
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidadToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [//middlewares para validar los campos del form
      check('name','El nombre es obligatorio').not().isEmpty(),//el nombre es obligatorio y no debe estar vacio
      check('email','El email es obligatorio').isEmail(),
      check('password','El password debe ser de 6 caracteres').isLength({ min:6 }),
      validarCampos
    ] ,
    crearUsuario );

router.post('/',
    [
      check('email','El email es obligatorio').isEmail(),
      check('password','El password debe ser de 6 caracteres').isLength({ min:6 }),
      validarCampos
    ], 
    loginUsuario);

router.get('/renew', validarJWT ,revalidadToken);

module.exports = router;