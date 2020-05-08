const passport = require('passport');
const { User } = require('./../models/user');

let controller = {};

controller.index = (req, res, next) => {
    res.render('index',{ title: 'Registrate o inicia sesion!'});
};

controller.inicio = function (req, res, next) {
    res.render('inicio', {
        user: req.user
    });
};

controller.RevisarLogin = (req, res, next) => {
    let isLoggedIn = req.user;

    if (isLoggedIn) {
        return next();
    }

    return res.redirect('/login');
};

controller.login = (req, res, next) => {
    return res.render('login');
};

controller.loginPost = (req, res, next) => {
    passport.authenticate('local',(err,user,info) => {
        if (err || !user) {
            return res.render('login',{
                errorMessage: info.message || 'Error al iniciar sesion. Por favor intentelo de nuevo'
            });
        }
        req.login(user,function(err){
            if (err) { return next(err); }
            return res.redirect ('/inicio');
        });
    }) (req, res, next);
};

controller.register = (req, res, next) => {
    return res.render('register');
};

controller.registerPost = (req, res, next) => {
    let usuario = req.body.username;
    let contraseña = req.body.password;
    let confirmarContraseña = req.body.confirmPassword;
    
    if(!usuario ||  usuario === '' || !contraseña || contraseña === '') {
        res.render('register', {
            errorMessage: 'Porfavor introduce un usuario y una contraseña',
            usuario,
            contraseña,
            confirmarContraseña,
        });
    }

    let usuarioACrear = {
        username: usuario,
        password: User.generateHash(contraseña)
    };
    try {
        (async () => {
            let user = await User.create(usuarioACrear);

            req.login(user,function (err){
                if (err) {return next(err);}
                return res.redirect('/inicio');
            });
        })();
    } catch (err) {
        console.error('Error al intentar crear usuario',err);
        res.render('register',{
            errorMessage: 'Ocurrio un error inesperado',
            usuario,
            contraseña,
            confirmarContraseña,
        });
    }
};

controller.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

module.exports = controller;