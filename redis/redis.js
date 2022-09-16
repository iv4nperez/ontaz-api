const redis = require('redis');

    // //
    // const redisInstance = redis.createClient({
    //     host: '127.0.0.1',
    //     port: 6379
    // });

    const redisInstance = redis.createClient({
        url: "rediss://" + process.env.REDIS_HOSTNAME + ":6380",
        password: process.env.REDIS_PASSWORD,
    });

    const startRedis = async () => {
        try {

            // redisInstance.flushDb( (err, success) => console.log(success))
            await redisInstance.connect()
            console.log('redis running')
        } catch (error) {
            console.log('redis fail...', error)
        }
    }

module.exports = {
    startRedis,
    redisInstance
}
