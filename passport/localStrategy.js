const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email: email}});
            if (!user) {
                return done(null, false, {message:"No Such User"});
            }
            const userVerified = await bcrypt.compare(password, user.password);
            if (!userVerified) {
                return done(null, false, {message:"Wrong Password"});
            }
            return done(null, user, {message: 'Logged In Successfully'});
        }
        catch (err) {
            console.log(err);    // only for err
            done(err);
        }
    }))
};