import express from 'express';

const router = express.Router();

router.get("/", function(req, res){
    res.send("Hola mundo desde Node, a traves del Navegador")
})

router.get("/QuienSoy", function(req, res){
    res.json({"estudiante": "Osvaldo Abishai Flores Campos", 
        "grado": "4°", 
        "grupo": "B", 
        "asignatura": "Aplicaciones Web Orientada a Servicios(AWOS)"});
})

export default router; // Esta palabra reservada de JavaScript mre permite exportar los elementos definidos y utilizarlos en otros archivos del mismo sitio.
