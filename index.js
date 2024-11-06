// Importar la libreria para crewar un servidor Web
// const express = require('express');  Common JS

import express from 'express'; // EcmaScript6
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Instanciar nuestra aplicación Web
const app = express();

// Configuramos uestro  Servidor Wev
const port = 3000;
app.listen(port, ()=> {
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);

});

//  Definir la carpeta pública de recursos estaticos (Assets)
app.use(express.static('public'));

// Routing - Enrutamiento

app.use('/', generalRoutes);
app.use('/auth', userRoutes);
// Probamos las rutas para poder presentae mensajes al usuario a traves del navegador 

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')
