import express, { request } from 'express';
const router = express.Router();

// GET - Se utiliza para ña ñectura de datos e infotmacion del servidor al cliente
// EndPoints - Son las rutas para acceder a laas secciones o funciones de nuestra aplicacion Web
// 2 Componentes de una peticiòn ruta ( donde  voy), FUNCION CALLBACK (QUE hago)
//":" en una ryta definen de manera posicional los parametros de entrada
router.get("/busquedaPorID/:id", function(req, res){
    res.send(`Se esta solicitando buscar al Usuario con ID: ${req.params.id}`)
}) // 2 Componentes de una petecion ruta, funcion Callback

// POST - S e utiliza para el envio de datos e informacion del cliente al servidir
router.post("/nuevoUsuario/:name/:email/:password", function(req, res) {
res.send(`Se ha solicitado la creacion de un nuevo usuario de nombre: ${req.params.name},
    asociado al correo electronico_ ${req.params.email} con la contraseña: ${req.params.password} `)
}
)

//PUT - Se utiliza para la actualizacion total de informacion del cliente al servido

router.put("/replaceUserByEmail/:name/:email/:password", function(a,b){
    b.send(`Se ha solicitado el remplazo de toda la informacion del usuario: ${a.params.name},
        con correo ${a.params.email} y contraseña: ${a.params.password}`)
})

// PATCH - Se utiliza para la aactualizacion paracial
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm", function(a,b){ 
    const{email, newPassword, newPasswordConfirm} = a.params // Desestructuracion de un objeto

    if(newPassword === newPasswordConfirm){
        b.send(`Se ha solicitado la actualizacion de la contraseña del usuario con 
            correo: ${email}, se aceptan los cambios ya que la contraseña y confimarcion son la misma`)
            console.log(newPassword);
            console.log(newPasswordConfirm);
    }else{
        b.send(`Se ha solicitado la actializacion de la contraseña del usuario con corrreo: ${email}
            con la nueva contraseña ${newPassword}, pero se rechaza el cambio ddado que la nueva contraseña y su confirmacion
            no coinciden`)
            console.log(newPassword);
            console.log(newPasswordConfirm);
    }
})

// DELETE
router.delete("/deleteUser/:email", function(req, res){
    res.send(`Se ha solicitado la eliminacion del usuario asociado al correo: ${req.params.email}`)
})

export default router;