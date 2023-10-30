const { sfGuardUser } = require('./config/db.config')
const passport = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcryptjs');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, done) {
        return await sfGuardUser.findOne({ where: { "username": username } })
            .then(user => {
                if (!user) { return done(null, false, { message: 'Username is wrong' }); }
                else {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) { return done(err); }
                        else if (!result) {
                            return done(null, false, { message: 'Incorrect password' });
                        } else {
                            return done(null, user);
                        }
                    })
                }
            }).catch(err => {
                return done(err);
            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.jwt_secret}`
},
    async function (jwtPayload, cb) {
        await sfGuardUser.findOne({ where: { "id": jwtPayload.sub } })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));