import express from 'express';
import { loginForm, registerForm, passwordRecoveryForm, registerUser, authenticateUser, confirmAccount } from '../controllers/userController.js';

const router = express.Router();

// GET - Ruta para la búsqueda por ID
router.get("/busquedaPorID/:id", function(req, res){
    res.send(`Se esta solicitando buscar al Usuario con ID: ${req.params.id}`);
}); // 2 Componentes de una petición ruta, función Callback

// POST - Ruta para la creación de un nuevo usuario
router.post("/nuevoUsuario/:name/:email/:password", function(req, res) {
    res.send(`Se ha solicitado la creacion de un nuevo usuario de nombre: ${req.params.name},
    asociado al correo electronico_ ${req.params.email} con la contraseña: ${req.params.password}`);
});

// PUT - Ruta para la actualización total de la información del usuario
router.put("/replaceUserByEmail/:name/:email/:password", function(req, res){
    res.send(`Se ha solicitado el remplazo de toda la informacion del usuario: ${req.params.name},
        con correo ${req.params.email} y contraseña: ${req.params.password}`);
});

// PATCH - Ruta para la actualización parcial (en este caso, la contraseña)
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm", function(req, res){ 
    const { email, newPassword, newPasswordConfirm } = req.params; // Desestructuración de un objeto

    if (newPassword === newPasswordConfirm) {
        res.send(`Se ha solicitado la actualización de la contraseña del usuario con 
            correo: ${email}, se aceptan los cambios ya que la contraseña y confirmación son la misma`);
        console.log(newPassword);
        console.log(newPasswordConfirm);
    } else {
        res.send(`Se ha solicitado la actualización de la contraseña del usuario con correo: ${email}
            con la nueva contraseña ${newPassword}, pero se rechaza el cambio dado que la nueva contraseña y su confirmación
            no coinciden`);
        console.log(newPassword);
        console.log(newPasswordConfirm);
    }
});

// DELETE - Ruta para eliminar un usuario
router.delete("/deleteUser/:email", function(req, res){
    res.send(`Se ha solicitado la eliminación del usuario asociado al correo: ${req.params.email}`);
});

// Rutas para los formularios de login, registro y recuperación de contraseña
router.get('/login', loginForm);
router.post('/login', authenticateUser);
router.get("/createAccount", registerForm);
router.post("/createAccount", registerUser);
router.get("/passswordRecovery", passwordRecoveryForm);
router.get('/confirm/:token', confirmAccount);

export default router;
