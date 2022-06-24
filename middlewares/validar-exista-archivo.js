



// const validarExistaArchivo = async(id,req) => {
//       console.log(req.req);
//         if (!req.req.files || Object.keys(req.req.files).length === 0 || !req.req.files.archivo) {
//             throw new Error ("No hay archivos en la peticion")
//            // return res.status(400).json({ msg: "No hay archivos en la peticion" })
//         }
// }

// export default validarExistaArchivo

const validarExistaArchivo =(req,res,next)=>{

    if(!req.files || Object.keys(req.files).length===0 || !req.files.archivo){
        return res.status(400).json({msg:"No hay archivos en la peticion"})
    }
    next();
}

export default validarExistaArchivo