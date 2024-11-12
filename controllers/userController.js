import { check, validationResult } from 'express-validator';
import Usuario from "../models/Usuario.js";
import { generarId } from '../helpers/tokens.js';
import { emailRegistro} from '../helpers/emails.js'
import db from '../config/db.js';
import csrf from 'csrf';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        page: "Ingresa a la plataforma"
    });
};

const formularioRegister = (req, res) => {
console.log(req.csrfToken())

    res.render('auth/register', {
        page: "Crea una nueva cuenta....",
        csrfToken : req.csrfToken()
    });
};

// Funcion que comprueba una cuenta
const confirm =  async (req,res) => {
    const{ token } = req.params
    
    console.log(token)

    // Verficar si el token es valido
    const usuario = await Usuario.findOne({where: {token}})

    if(!usuario){
        return res.render('auth/confirmAccount', {
            page: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    // Confirma la Cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    
    res.render('auth/confirmAccount', {
        page: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
    })
}


const formularioPasswordRecovery = (req, res) => {
    res.render('auth/passwordRecovery', {
        page: "Recuperacion de contraseña"
    });
};

const registrar = async (req, res) => {
    // Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede estar vacio').run(req);
    await check('email').isEmail().withMessage('Esto no parece un Email').run(req);
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe de ser al menos 6 caracteres').run(req);
    await check('Repetirpassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no son iguales');
            }
            return true;
        })
        .run(req);

    // Resultados de la validación
    const resultado = validationResult(req);

    // Si hay errores, retornarlos al formulario de registro
    if (!resultado.isEmpty()) {
        return res.render('auth/register', {
            page: "Crea una nueva cuenta....",
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    // Extraer los datos
    const { nombre, email, password } = req.body;

    try {
        // Verificar que el usuario no esté duplicado
        const existeUsuario = await Usuario.findOne({ where: { email } });

        if (existeUsuario) {
            return res.render('auth/register', {
                page: "Crea una nueva cuenta....",
                errores: [{ msg: 'Usuario ya registrado' }],
                usuario: {
                    nombre: req.body.nombre,
                    email: req.body.email
                }
            });
        }

        // Almacenar un nuevo usuario con un token generado
        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            token: generarId()
        });

        // Envia email de confirmacion
        emailRegistro({
          nombre: usuario.nombre,
          email: usuario, email,
          token: usuario.token

        })

        // Mostrar mensaje de confirmacion
        res.render('templates/mensaje',{
            page: 'Cuenta creada correctamennte',
            mensaje: 'Hemos enviado un Email de Confirmacion, presiona en el enlace'
        })
    } catch (error) {
        console.error(error);
        res.render('auth/register', {
            page: "Crea una nueva cuenta....",
            errores: [{ msg: 'Error interno del servidor' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }
};

export { formularioLogin, formularioRegister, confirm, registrar, formularioPasswordRecovery };
