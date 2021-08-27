const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient(process.env.REDIS_PORT);

const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value));
};

const get = async (key) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    try {
        return await getAsync(key);
    }
    catch (err) {
        return err;
    }
};

const del = async (key) => {
    try {
        return await redisClient.del(key);
    }
    catch (err) {
        return err;
    }
}

module.exports = {
    redisClient,
    set,
    get,
    del,
};