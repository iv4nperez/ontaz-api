const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/users');



const usuariosGet = async(req = request, res = response) => {

    const { limit = 10, skip = 0 } = req.query;
    const query = { status: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( skip ) )
            .limit(Number( limit ))
    ]);

    res.json({
        skip,
        limit,
        total,
        users: usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { email, password, firstName, lastName, role } = req.body;
    const usuario = new Usuario({  email, password, firstName, lastName, role  });

    const existUser = await Usuario.findOne({ email })

    if(existUser){

        res.json({
            user: null,
            status: "error",
            msg:"El correo " + email + " ya se encuentra registrado."
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        user: usuario,
        status: "success",
        msg: ''
    });
}

// const usuariosPut = async(req, res = response) => {

//     const { id } = req.params;
//     const { _id, password, google, correo, ...resto } = req.body;

//     if ( password ) {
//         // Encriptar la contraseña
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync( password, salt );
//     }

//     const usuario = await Usuario.findByIdAndUpdate( id, resto );

//     res.json(usuario);
// }



const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { status: false } );

    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    // usuariosPut,
    usuariosDelete,
}