const redis = require('redis');

class Redis {

    constructor (){
        this.redisInstance;
        this.startRedis()
    }

    async startRedis(){

        this.redisInstance = redis.createClient({
            url: "rediss://" + process.env.REDIS_HOSTNAME + ":6380",
            password: process.env.REDIS_PASSWORD,
        })
        await client.connect()

        client.on("error", (error) => {
            console.log("error conexion no establecida: ", error)
        })
        client.on("connect", () => {
            console.log("Redis connected")
        })
    }

}




