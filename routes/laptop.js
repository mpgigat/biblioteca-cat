import {Router} from 'express'
import laptopHttp from '../controllers/laptop.js';
import helpersLaptop from '../helpers/db-laptop.js';
import helpersHolder from "../helpers/db-holder.js"
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRol } from '../middlewares/validar_roles.js';
import {check} from 'express-validator';

const router=Router();

router.get('/',[
    validarJWT,
    validarRol('ADMIN'), 
    validarCampos
],laptopHttp.laptopGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById), 
    validarCampos   
],laptopHttp.laptopGetById);

router.get('/holder/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersHolder.existeHolderById), 
    validarCampos   
],laptopHttp.laptopGetHolderById);

router.post('/',[    
    validarJWT,
    check("holder").isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById), 
    check('serial').not().isEmpty(),
    check("serial").custom(helpersLaptop.existeSerial),
    validarCampos       
],    laptopHttp.laptopPost);

     
router.put('/:id',[
    validarJWT,
    validarRol('ADMIN'), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById), 
    check("serial").custom(helpersLaptop.existeSerial),
    validarCampos
],laptopHttp.laptopPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById),
    validarCampos
],laptopHttp.laptopPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById),
    validarCampos
],laptopHttp.laptopPutDeactivate);

router.put('/qrcodetofile/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById),
    validarCampos
],laptopHttp.laptopQRCodeGenerateToFile);

router.put('/qrcodehtml/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById),
    validarCampos
],laptopHttp.laptopQRCodeGenerateHtml);

router.put('/barcodehtml/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersLaptop.existeLaptopById),
    validarCampos
],laptopHttp.prueba);

export default router