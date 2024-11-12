// Importar la libreria para crewar un servidor Web
// const express = require('express');  Common JS

import express from 'express'; // EcmaScript6
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'

// Instanciar nuestra aplicación Web
const app = express();


// Habilitar lectura de los fdtos de formulario
app.use(express.urlencoded({extended: true}))

// Habilita cookie-parser
app.use(cookieParser())

// Habililtar CSURF
app.use(csrf({cookie: true}))

// Conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log('Conexion a la Base de datos correcta')
}catch(error){
    console.log(error);
}

// Configuramos uestro  Servidor Wev
const port = process.env.PORT || 3000;
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
