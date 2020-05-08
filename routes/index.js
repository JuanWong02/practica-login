var express = require('express');
var router = express.Router();
const controller = require('./../controllers/index');


router.get('/', controller.index);

router.get('/inicio',controller.RevisarLogin, controller.inicio);

router.get('/login', controller.login);

router.post('/login', controller.loginPost);

router.get('/register', controller.register);

router.post('/register', controller.registerPost);

router.get('/logout', controller.logout);

module.exports = router;
