const validarRol = (...roles) => {
    return (req, res, next) => {

        //  ["APRENDIZ","ADMIN","INSTRUCTOR","ADMINISTRATIVO","PUBLICO","BIBLIOTECA"];

        if (!(roles.includes(req.holder.rol))) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` });
        }
        next();
    }
}

const validarRolExiste = async (rol, req) => {
    const arrayRoles = ['ADMIN', 'PORTERIA','APRENDIZ', 'PUBLICO', 'INSTRUCTOR', 'GUARDA', 'BIBLIOTECA', 'BIBLIOTECARIA', 'ADMINISTRATIVO'];

    if (!(arrayRoles.includes(rol))) {
        return res.status(401).json({ msg: `El rol no existe` });
    }

}


export { validarRol, validarRolExiste }