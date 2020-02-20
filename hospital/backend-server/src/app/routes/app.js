var express = require('express');

var app = express();

// rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Petición realizada correctamente'
    });
});


module.exports = app;