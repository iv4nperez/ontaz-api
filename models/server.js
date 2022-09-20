const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');
const { startRedis }  = require('../redis/redis')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.servicePath =  '/api/service';
        this.categoryPath = '/api/category';
        this.productPath =  '/api/product';
        this.authPath     = '/api/auth';
        this.userPath     = '/api/user';
        //Conectar a base de datos
        this.connectionDB();
        this.configRedis();
        //Middleware    
        this.middlewares();
        
        //Rutas de mi aplicación
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    async configRedis(){
        await startRedis()
    }

    middlewares(){
        //CORS
        this.app.use( cors() )
        //Lectura y parseo del body
        this.app.use( express.json() );
        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.authPath    , require('../routes/auth') );
        this.app.use( this.servicePath,  require('../routes/service') );
        this.app.use( this.categoryPath, require('../routes/category') );
        this.app.use( this.productPath,  require('../routes/product') );
        this.app.use( this.userPath,     require('../routes/user') );
    }

    listen(){
       

        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;