import mongoose from "mongoose";


const entrySchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true,    },
    holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true,    },
    laptop:{type:mongoose.Schema.Types.ObjectId,ref:'Laptop',required:true,    },    
    documentlearner:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'    },
    entrytime:{type:Date,default:Date.now  },
    checkout:{type:Date   },
})

export default mongoose.model("Entry",entrySchema)