
import {Router} from 'express'
import entryHttp from '../controllers/entry.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import {validarRol} from '../middlewares/validar_roles.js';
import helpersLaptop from '../helpers/db-laptop.js';
import helpersHolder from '../helpers/db-holder.js';
import helpersEntry from '../helpers/db-entry.js';
import holder from '../models/holder.js';


const router=Router();

router.get('/',[
    validarJWT,
    validarRol('ADMIN'), 
    validarCampos   
],entryHttp.entryGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersEntry.existeEntryById), 
    validarCampos   
],entryHttp.entryGetById);

router.get('/historical/holder/:holder',[
    validarJWT,
    check('holder').isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetHistoricalHolder);

router.get('/historical/learner/:learner',[
    validarJWT,
    check('learner').isMongoId(),
    check('learner').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetHistoricalLearner);
   
router.get('/date/:datefilter',[
    validarJWT,
    check('datefilter').isDate(),
    validarCampos   
],entryHttp.entryGetDateFilter);

router.get('/date/:initialdate/:finaldate',[
    validarJWT,
    check('initialdate').isDate(),
    check('finaldate').isDate(),
    validarCampos   
],entryHttp.entryGetDateBetween);

router.get('/date/pendientes/entrega/holder/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetPendientesEntregaHolder);

router.get('/date/pendientes/entrega/place/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetPendientesEntregaPlace);

//###############################3

router.get('/date/pendientes/holder/total/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetPendientesTotalHolder); 

router.get('/date/pendientes/place/total/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],entryHttp.entryGetPendientesTotalHolder); 

router.post('/',[    
    validarJWT,
    validarRol('GUARDA','BIBLIOTECARIA','ADMIN'), 
    check('place').not().isEmpty(),
    check('place').custom(helpersHolder.existeHolderById),
    check('laptop').not().isEmpty(),
    check('laptop').custom(helpersLaptop.existeSerialVerifica), 
    check('holder', 'No es un ID válido').isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById), 
    check('documentlearner').custom(helpersHolder.existeHolderByDocument), 
    validarCampos       
], entryHttp.entryPost   );


router.put('/:id',[    
    validarJWT,
    validarRol('GUARDA','BIBLIOTECARIA','ADMIN'),  
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersEntry.existeEntryById), 
    validarCampos       
], entryHttp.entryPut   );



export default router