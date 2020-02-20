var express = require('express');

var app = express();
var Hospital = require('../models/hospital');
var Usuario = require('../models/usuario');
var Medico = require('../models/medico');

// rutas
app.get('/todos/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([buscarHospitales(busqueda, regex), buscarMedicos(busqueda, regex), buscarUsuarios(busqueda, regex)])
        .then(respuestas => {
            res.status(200).json({
                success: true,
                hospital: respuestas[0],
                medico: respuestas[1],
                usuario: respuestas[2]
            });
        });

    function buscarHospitales(busqueda, regex) {
        return new Promise((resolve, reject) => {
            Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre email')
                .exec((err, hospital) => {
                    if (err) {
                        reject('Error al cargar hospitales')
                    } else {
                        resolve(hospital);
                    }
                });
        });
    }

    function buscarMedicos(busqueda, regex) {
        return new Promise((resolve, reject) => {
            Medico.find({ nombre: regex })
                .populate('usuario', 'nombre email')
                .populate('hospital')
                .exec((err, medico) => {
                    if (err) {
                        reject('Error al cargar médicos')
                    } else {
                        resolve(medico);
                    }
                });
        });
    }

    function buscarUsuarios(busqueda, regex) {
        return new Promise((resolve, reject) => {
            Usuario.find({}, 'nombre email rol img').or([{ 'nombre': regex, 'email': regex }]).exec((err, usuario) => {
                if (err) {
                    reject('Error al cargar el usuario ' + err);
                } else {
                    resolve(usuario);
                }
            });
        });
    }
});

module.exports = app;