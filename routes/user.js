
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampo
    // validarJWT,
    // esAdminRole,
    // tieneRole
} = require('../middlewares/validar-campos');


const { 
        esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/user');

const router = Router();


router.get('/getAllAccount', usuariosGet );

// router.put('/:id',[
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     check('rol').custom( esRoleValido ), 
//     validarCampos
// ],usuariosPut );

router.post('/createAccount',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es oblitatoria').not().isEmpty(),
    // check('lastName', 'El nombre es obligatorio').not().isEmpty(),
    // check('firstName', 'El firstName es obligatorio').not().isEmpty(),
    // check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    // check('email', 'El correo no es válido').isEmail(),
    // check('email').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom( esRoleValido ), 
    validarCampo
], usuariosPost );

// router.delete('/:id',[
//     validarJWT,
//     // esAdminRole,
//     tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     validarCampos
// ],usuariosDelete );

// router.patch('/', usuariosPatch );


module.exports = router;