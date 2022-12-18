const  { Router } = require('express');
const { check } = require('express-validator');


const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampo } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
// const { 
//     validarCampo,
//     validarJWT,
//     esAdminRole,
//     tieneRole 
// } = require('../middlewares')
const {

    serviceGet, serviceGetByCategory, servicePost, serviceGetByUID, serviceDelByIdService

} = require('../controllers/service');

const router = Router();

    router.get('/', serviceGet );
    router.get('/:categoryId', serviceGetByCategory)
    router.get('/serviceByUID/:userId', serviceGetByUID )
    router.post('/', servicePost),
    router.delete('/:id', serviceDelByIdService)


module.exports = router;