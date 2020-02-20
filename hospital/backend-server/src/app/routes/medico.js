var express = require('express');
var app = express();
var Medico = require('../models/medico');

var mdlAuthentication = require('../middlewares/authentication');

// get hospitales
app.get('/', (req, res, next) => {
    var limit = Number(req.query.limit || 50);
    var index = Number(req.query.index || 0) * limit;
    Medico.find({})
        .skip(index)
        .limit(limit)
        .populate('usuario', 'nombre email')
        .populate('hospital', 'nombre').exec((err, medicos) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error cargando medicos',
                    errors: err
                });
            }
            Medico.count({}, (error, counts) => {
                res.status(200).json({
                    success: true,
                    data: medicos,
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
    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el medico',
                errors: err
            });
        }
        res.status(201).json({
            success: true,
            data: { id: medicoGuardado._id },
            usuariotoken: req.usuario
        });
    });
});

// nombre
// img
// usuario
// hospital


// put usuarios 
app.put('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al buscar al medico',
                errors: err
            });
        }
        if (!medico) {
            return res.status(400).json({
                success: false,
                message: 'El médico con el id:' + id + ' no existe',
                errors: err
            });
        }

        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al actualizar el médico',
                    errors: err
                });
            }

            res.status(200).json({
                success: true,
                data: medicoGuardado
            });
        });
    });
});


// delete user
app.delete('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al borrar el medico con el id:' + id,
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                success: false,
                message: 'No existe el médico con el id:' + id,
                errors: err
            });
        }

        res.status(200).json({
            success: true,
            data: medicoBorrado
        });
    });
});

module.exports = app;