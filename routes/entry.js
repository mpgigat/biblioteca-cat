
import {Router} from 'express'
import entryHttp from '../controllers/entry.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import {validarRol} from '../middlewares/validar_roles.js';
import helpersLaptop from '../helpers/db-laptop.js';
import helpersHolder from '../helpers/db-holder.js';
import helpersEntry from '../helpers/db-entry.js';


const router=Router();

router.get('/usuario/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetUsuario );


router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersEntry.existeEntryById), 
    validarCampos   
],entryHttp.entryGetById);
   
router.get('/date/:datefilter',[
    validarJWT,
    check('datefilter').isDate(),
    validarCampos   
],entryHttp.entryGetDateFilter);


router.post('/',[    
    validarJWT,
    validarRol('GUARDA','BIBLIOTECA'), 
    check('laptop', 'No es un ID válido').isMongoId(),
    check('laptop').custom(helpersLaptop.existeLaptopById), 
    check('holder', 'No es un ID válido').isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById), 
    validarCampos       
], entryHttp.entryPost   );





export default router