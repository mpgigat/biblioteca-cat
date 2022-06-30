import  express from 'express'
import cors from 'cors'
import {dbConnection} from '../database/config.js';
import holder from '../routes/holder.js';
import laptop from '../routes/laptop.js'
import fileUpload from 'express-fileupload'

class Server{
    constructor(){
        this.app=express();
        //this.app.set('view engine', 'jade');
        this.port=process.env.PORT;
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json()); 
        this.app.use(express.static('public'));     
               
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use("/api/holder",    holder);
        this.app.use("/api/laptop",    laptop);
        
    }

    listen(){
        this.app.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export {Server}