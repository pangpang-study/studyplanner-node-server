// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const extractJWT = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;
// const User = require('../models/user');
// const redisClient = require('../utils/redis');
//
// module.exports = () => {
//     passport.use(new JwtStrategy({
//         jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),  // Bearer 로 받겠다는 부분
//         secretOrKey: process.env.JWT_SECRET             // Secret Key 로 Token 검사
//     }, async (payload, done) => {
//         try {
//             const user = await User.findOne({where: {email: payload.email}});
//             if (!user) {
//                 return done(null, false, {message: "Invalid Token"});
//             }
//             return done(null, user);
//         }
//         catch (err) {
//             console.log(err);
//             return done(err);
//         }
//     }));
// }