import mongoose from "mongoose";

const entrySchema=new mongoose.Schema({
    laptop:{type:mongoose.Schema.Types.ObjectId,ref:'Laptop',required:true,    },
    entrytime:{type:Date,default:Date.now   },
    checkout:{type:Date,default:Date.now   },
    type:{type:Number,default:1}   //1:PRESTAMO BIBLIOTECA   2:INGRESO PORTERIA
})

export default mongoose.model("Entry",equipoSchema)