const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./../models/user');

passport.use(new LocalStrategy(
    (username,password,callback) => {
        if (!username || username === '' || !password || password === ''){
            return callback(null,false,{ message: 'Usuario o contraseña invalidos'});
        }

        try {
            (async () => {
                let user =  await  User.findOne({
                    where: {
                        username: username
                    }
                });
                if (user === null ) {
                    return callback (null, false, {message: 'Usuario o contraseña invalidos'});
                }

                if( user.RevisarPassword(password)) {
                    return callback (null, user);
                } else {
                    return callback (null ,false,{message: 'Uusario o contraseña invalidos'});
                }
                
            })();
        } catch(err) {
            return callback (err,false,{message: 'Ocurrio un error inesperado'});
        }
    }
));

passport.serializeUser((user, callback) => {
    callback(null,user.id);
});

passport.deserializeUser(function (id,callback){
    try {
        (async () => {
            let user = await User.finBypk(id);
            callback(null, user);
        })();
    } catch(err) {
        callback(err);
    }
});