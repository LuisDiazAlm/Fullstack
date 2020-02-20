var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var app = express();
var Usuario = require('../models/usuario');

// cosnt
var SEDD = require('../config/config').SEED;

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al buscar el usuario',
                errors: error
            });
        }
        if (!usuario) {
            return res.status(400).json({
                success: false,
                message: 'No existe el usuario con el email: ' + body.email,
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                success: false,
                message: 'No existe el usuario con el - password ',
                errors: err
            });
        }

        // crear un token
        usuario.password = ':)';
        var token = jwt.sign({ usuario: usuario }, SEDD, { expiresIn: 14400 }); // 4 horas
        res.status(200).json({
            success: true,
            token: token,
            usuario: usuario,
        });
    });
});

module.exports = app;