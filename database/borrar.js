import { dbConnection } from "./config.js";
import Holder  from "../models/holder.js"
import Laptop from "../models/laptop.js"


const conexionBd=async()=>{
    await dbConnection()
}

conexionBd()

//rutas



