import mongoose from "mongoose";

const holderSchema=new mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String,minlength:8,required:true},
    document:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    rol:{type:String,required:true,default:'APRENDIZ'},//1 APRENDIZ, 2:ADMIN  3:SUPER
    ficha:{type:String},
    photo:{type:String},
    phone:{type:String,required:true},    
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Holder",holderSchema)