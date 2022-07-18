const redis = require('redis');

    const redisInstance = redis.createClient(
        6380, process.env.REDIS_HOSTNAME,
        {
            auth_pass: process.env.REDIS_PASSWORD, tls:{ servername: process.env.REDIS_HOSTNAME }
        }
    );
    //
    // const redisInstance = redis.createClient({
    //     host: '127.0.0.1',
    //     port: 6379
    // });
    const startRedis = async () => {
        try {
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
