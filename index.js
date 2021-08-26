const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');

const swaggerDoc = require('./swaggerDoc');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const v1Router = require('./routes/api/v1');

dotenv.config();

const app = express();

passportConfig();
app.set('port', process.env.PORT || 5000);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
swaggerDoc(app);

app.use(morgan('dev'));     // create logs
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
// }));
app.use(passport.initialize());     // req 객체에 passport 설정을 심는다.
// app.use(passport.session());        // req.session 객체에 passport 정보를 저장. -> session 보다 뒤에 있어야함.

app.use('/api/v1', v1Router);

app.use((err, req, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error!');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});

module.exports = app;