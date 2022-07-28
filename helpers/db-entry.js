import Entry from "../models/entry.js"

const helpersEntry={
    existeEntryById : async (id) => {
        const existe = await Entry.findById(id);

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    
   

}
export default helpersEntry





