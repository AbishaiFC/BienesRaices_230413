const express = require('express'); // Importar la libreria para crewar un servidor Web

// Instanciar nuestra aplicación Web
const app = express();

// Configuramos uestro  Servidor Wev
const port = 3000;
app.listen(port, ()=> {
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);

});
app.get("/", function(req, res){
    res.send("Hola mundo desde Node, a traves del Navegador")
})

app.get("/QuienSoy", function(req, res){
    res.json({"estudiante": "Osvaldo Abishai Flores Campos", 
        "grado": "4°", 
        "grupo": "B", 
        "asignatura": "Aplicaciones Web Orientada a Servicios(AWOS)"});
})