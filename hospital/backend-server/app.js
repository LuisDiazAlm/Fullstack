// Requieres
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


// Iniciar variables
var app = express();
var cors = require('cors');

// body parser parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
// importar rutas
var appRoutes = require('./src/app/routes/app');
var usuarioRoutes = require('./src/app/routes/usuario');
var loginRoutes = require('./src/app/routes/login');
var hospitalRoutes = require('./src/app/routes/hospital');
var medicoRoutes = require('./src/app/routes/medico');
var busquedaRoutes = require('./src/app/routes/busqueda')
    // coneccion a la base de datos


mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos usar: \x1b[32m%s\x1b[0m', 'online');
});


// Rutas
app.use('/busqueda', busquedaRoutes);
app.use('/medico', medicoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// escuchar peticiones
app.listen(3000, () => {
    console.log('Expres server port 3000 listo para usar: \x1b[32m%s\x1b[0m',
        'online');
});