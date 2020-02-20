var jwt = require('jsonwebtoken');
// const 
var SEED = require('../config/config').SEED;

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};