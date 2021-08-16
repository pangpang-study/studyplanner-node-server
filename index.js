const express = require('express');

const app = express();

const mainRouter = require('./routes/main');

const swaggerDoc = require('./swaggerDoc');

swaggerDoc(app);


app.set('port', process.env.PORT || 5000);

app.use('/', mainRouter);

app.use((err, req, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error!');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});