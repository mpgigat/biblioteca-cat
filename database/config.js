
import mongoose from 'mongoose';
const dbConnection=async()=>{
    try {
        console.log(process.env.MONGODB_CNX);
        
        await mongoose.connect(process.env.MONGODB_CNX)
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos');
    }
}

export  {dbConnection}
