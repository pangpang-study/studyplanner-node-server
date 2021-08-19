const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_PORT);

// TODO redis 아직 잘 모르겠음.
const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value));
};

const get = (req, res, next) => {
    let key = req.originalUrl;

    redisClient.get(key, (error, data) => {
        if (error) {
            res.status(400).send({
                success: false,
                code: 400,
                message: error,
            });
        }
        if (data !== null) {
            console.log('data from redis!');
            res.status(200).send({
                success: true,
                code: 200,
                data: JSON.parse(data),
            });
        } else next();
    });
};

module.exports = {
    redisClient,
    set,
    get,
};