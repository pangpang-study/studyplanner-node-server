const passport = require('passport');
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');

module.exports = () => {
    //jwt(passport);
    local(passport);
}