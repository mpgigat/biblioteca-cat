import Laptop from "../models/laptop.js"
import mongoose from "mongoose"

const helpersLaptop = {
    existeLaptopById: async (id) => {
        const existe = await Laptop.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeSerial: async (serial, req) => {
        if (serial) {
            const existe = await Laptop.findOne({ serial })
            if (existe) {
                if (req.req.method === "PUT") {
                    const existeOtro = await Laptop.findOne({id_:req.req.params.id, serial })
                    if (!existeOtro)
                        throw new Error(`Ya existe ese serial en la base de datos!!! ${serial}`)

                } else {
                    throw new Error(`Ya existe ese serial en la base de datos! ${serial}`)
                }
            }
        }
    },

    existeSerialVerifica: async (serial, req) => {
        if (serial) {
            const existe = await Laptop.findOne({ serial })
            if (!existe) {
                
                    throw new Error(`No existe ese serial en la base de datos! ${serial}`)
                
            }
        }
    }
}
   


export default helpersLaptop





