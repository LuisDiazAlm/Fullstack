var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');

var mdlAuthentication = require('../middlewares/authentication');
// get usuarios
app.get('/', (req, res, next) => {
    var limit = Number(req.query.limit || 50);
    var index = Number(req.query.index || 0) * limit;
    Usuario.find({}, '_id nombre email img role')
        .skip(index)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error cargando usuario',
                    errors: err
                });
            }
            Usuario.count({}, (err, counts) => {
                res.status(200).json({
                    success: true,
                    data: usuarios,
                    total: counts,
                    index: index / (limit == 0 ? 1 : limit),
                    limit: limit
                });
            });
        });
});


// post usuarios
app.post('/', mdlAuthentication.verificaToken, (req, res, next) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        img: body.img,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el usuario',
                errors: err
            });
        }

        res.status(201).json({
            success: true,
            data: { id: usuarioGuardado._id },
            usuariotoken: req.usuario
        });
    });
});


// put usuarios 
app.put('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al buscar al usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                success: false,
                message: 'El usuario con el id:' + id + ' no existe',
                errors: err
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                success: true,
                data: usuarioGuardado
            });
        });
    });
});


// delete user
app.delete('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al borrar el usuario con el id:' + id,
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                success: false,
                message: 'No existe el usuario con el id:' + id,
                errors: err
            });
        }

        res.status(200).json({
            success: true,
            data: usuarioBorrado
        });
    });
});

module.exports = app;