import express from 'express';
const router = express.Router();

// GET
router.get("/busquedaPorID/:id", function(req, res){
    res.send(`Se esta solicitando buscar al Usuario con ID: ${req.params.id}`)
}) // 2 Componentes de una petecion ruta, funcion Callback

// POST

//PUT

// PATCH


export default router;