const validarRol = (...roles) => {
    return (req, res, next) => {

      //  ["APRENDIZ","ADMIN","INSTRUCTOR","ADMINISTRATIVO","PUBLICO","BIBLIOTECA"];

        if (!(roles.includes(req.holder.rol))) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` });
        }



        next();
    }
}



export { validarRol }