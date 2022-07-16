const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');
// const Redis = require('../redis/redis')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.servicePath = '/api/service';
        this.categoryPath = '/api/category';
        this.authPath     = '/api/auth';
        //Conectar a base de datos
        this.connectionDB();
        
        //Middleware    
        this.middlewares();
        
        //Rutas de mi aplicación
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    // async configRedis(){
    //     await Redis()
    // }

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
        this.app.use( this.servicePath, require('../routes/service') );
        this.app.use( this.categoryPath, require('../routes/category') );
    }

    listen(){
       

        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;