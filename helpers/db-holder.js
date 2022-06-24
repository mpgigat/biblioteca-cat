import Holder from "../models/holder.js"
import mongoose from "mongoose"

const helpersHolder={
    existeHolderById : async (id) => {
        const existe = await Holder.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail :() => {
        return async (req, res, next) => {
            const existe = await Holder.findOne({ email: req.body.email });
            if (req.method === "PUT") {
                if (existe && existe._id != req.params.id) {
                    return res.status(401).json({ msg: `El email ya está registrado` });
                    //throw new Error(`El email ya está registrado`)
                }
            } else {
                if (existe) {
                    return res.status(401).json({ msg: `El email ya está registrado` });
                    //throw new Error(`El email ya está registrado`)
                }
            }
            next();
        }
    },

    verificarEmail :() => {
        return async (req, res, next) => {
            const existe = await Holder.findOne({ email: req.body.email });
           
            if (!existe) {
                return res.status(401).json({ msg: `El email no está registrado` });
            }

            next();
        }
    },

    existeAdmin: async (rol, req) => {
        const existe = await Holder.findOne({ rol: "ADMIN" })    
    
        if (existe)
            throw new Error(`Ya existe ese email en la base de datos! ${email}`)
    },

    existeNumDocumento: async (document, req) => {
        if (document) {            
            const existe = await Holder.findOne({ document,email:req.req.holder.email })

            if (req.req.method === "PUT") {         
    
                if (existe && existe._id.toString() !== req.req.holder._id.toString())
                    throw new Error(`Ya existe ese documento en la base de datos!!! ${document}`)

                // if (existe && existe._id.toString() === req.req.holder._id.toString())
                //     throw new Error(`Usuario no tiene permisos para realizar este cambio`)
              
            } else{                
                if (existe)
                    throw new Error(`Ya existe ese documento en la base de datos! ${document}`)
            }
        }
    },
   

}
export default helpersHolder





