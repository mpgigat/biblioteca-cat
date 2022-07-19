import mongoose from "mongoose";


const entrySchema=new mongoose.Schema({
    laptop:{type:mongoose.Schema.Types.ObjectId,ref:'Laptop',required:true,    },
    holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true,    },
    entrytime:{type:Date,default:Date.now  },

   
    checkout:{type:Date   },

})

export default mongoose.model("Entry",entrySchema)