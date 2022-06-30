
import {Router} from 'express'
import helpersHolder from "../helpers/db-holder.js"
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import {validarRol} from '../middlewares/validar-roles.js';
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';
import holdersHttp from '../controllers/holder.js';

const router=Router();

router.get('/',[
    validarJWT,
    validarRol('ADMIN'), 
    validarCampos   
],holdersHttp.holderGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],holdersHttp.holderGetById);


router.post('/',[    
    //validarJWT,
    //validarRol('ADMIN','SUPER'), 
    check('name', 'El nombre es obligatorio!').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersHolder.existeEmail ),
    check('password', 'Password no es válido').isLength({ min: 8}),
    check("document", "El número de documento es obligatorio!").not().isEmpty(),
    check("document").custom(helpersHolder.existeNumDocumento),
    check("phone", "El número de teléfono es obligatorio!").not().isEmpty(),
    validarCampos       
],    holdersHttp.holderPost);

router.post('/super',[    
    check('rol').custom( helpersHolder.existeAdmin ),   
    check('email', 'El correo no es válido').isEmail(),  
    check('password', 'Password no es válido').isLength({ min: 8}),  
    validarCampos       
],    holdersHttp.holderPostSuper);
     
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    check("document").custom(helpersHolder.existeNumDocumento),
    //check('email').custom( helpersHolder.existeEmail ),
    validarCampos
],holdersHttp.holderPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById),
    validarCampos
],holdersHttp.holderPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById),
    validarCampos
],holdersHttp.holderPutDeactivate);

router.post("/login", [
    check("email","El email es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").not().isEmpty(),
    validarCampos
],   holdersHttp.login);

router.post("/requestpasswordreset", [

    check("email","El email es obligatorio").isEmail(),
    check("email").custom(helpersHolder.verificarEmail),
    validarCampos
],   holdersHttp.requestPasswordReset);

router.post("/passwordreset", [
    validarJWT,
    check("password","La contraseña es obligatoria").not().isEmpty(),
    check('password', 'Password no es válido').isLength({ min: 8}),
    validarCampos
],   holdersHttp.resetPassword);

//  SERVIDOR EXPRESS
router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarExistaArchivo,
    validarCampos
],holdersHttp.cargarArchivo)

router.post('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarExistaArchivo,
    validarCampos
],holdersHttp.cargarArchivoCloud)

router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],holdersHttp.mostrarImagen)

router.get("/uploadcloud/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],holdersHttp.mostrarImagenCloud)

// SERVIDOR CLOUD
router.post('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeholderById), 
    validarExistaArchivo,
    validarCampos
],holdersHttp.cargarArchivoCloud)

router.get("/uploadcloud/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeholderById), 
    validarCampos   
],holdersHttp.mostrarImagenCloud)



export default router