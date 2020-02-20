var express = require('express');
var app = express();
var Hospital = require('../models/hospital');

var mdlAuthentication = require('../middlewares/authentication');
// get hospital
app.get('/', (req, res, next) => {
    var limit = Number(req.query.limit || 50);
    var index = Number(req.query.index || 0) * limit;
    Hospital.find({})
        .skip(index)
        .limit(limit)
        .populate('usuario', 'nombre email').exec((err, hospital) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error cargando hospital',
                    errors: err
                });
            }
            Hospital.count({}, (err, counts) => {
                res.status(200).json({
                    success: true,
                    data: hospital,
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
    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el hospital',
                errors: err
            });
        }

        res.status(201).json({
            success: true,
            data: { id: hospitalGuardado._id },
        });
    });
});



// nombre
// img
// usuario

// put usuarios 
app.put('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al buscar al hospital',
                errors: err
            });
        }
        if (!hospital) {
            return res.status(400).json({
                success: false,
                message: 'El hospital con el id:' + id + ' no existe',
                errors: err
            });
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al actualizar el hospital',
                    errors: err
                });
            }

            res.status(200).json({
                success: true,
                data: hospitalGuardado
            });
        });
    });
});


// delete user
app.delete('/:id', mdlAuthentication.verificaToken, (req, res) => {
    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al borrar el hospital con el id:' + id,
                errors: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                success: false,
                message: 'No existe el hospital con el id:' + id,
                errors: err
            });
        }

        res.status(200).json({
            success: true,
            data: hospitalBorrado
        });
    });
});

module.exports = app;