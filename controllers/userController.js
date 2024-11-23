import { check, validationResult } from 'express-validator';
import Usuario from "../models/Usuario.js";
import { generarId } from '../helpers/tokens.js';
import { emailRegistro} from '../helpers/emails.js'

// Funciones de controlador
const loginForm = (req, res) => {
    res.render('auth/login', {
        page: "Iniciar Sesión"
    });
};

const registerForm = (req, res) => {
    console.log(req.csrfToken());

    res.render('auth/register', {
        page: "Crear una nueva cuenta",
        csrfToken : req.csrfToken()
    });
};

const authenticateUser = async (req, res) => {
    // Validación
       await check('email').isEmail().withMessage('El Email es obligatorio').run(req);
       await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);
   
       const result = validationResult(req);
   
       // Si hay errores, retornarlos al formulario de registro
       if (!result.isEmpty()) {
           return res.render('auth/login', {
               page: "Iniciar sesión....",
               csrfToken : req.csrfToken(),
               errors: result.array()
           });
       }
       const {email, password} = req.body
   
   };

// Funcion para confirmar cuenta
const confirmAccount =  async (req, res) => {
    const { token } = req.params;
    
    console.log(token);

    // Verificar si el token es válido
    const user = await Usuario.findOne({ where: { token } });

    if (!user) {
        return res.render('auth/confirmAccount', {
            page: 'Error Cuenta no Confirmada',
            csrfToken : req.csrfToken(),
            message: 'Hubo un error al intentar confirmar la cuenta, intentalo de nuevo',
            error: true
        });
    }

    // Confirmar la cuenta
    user.token = null;
    user.confirmado = true;
    await user.save();
    
    res.render('auth/confirmAccount', {
        page: 'Cuenta confirmada',
        csrfToken : req.csrfToken(),

        message: 'La cuenta fue confirmada correctamente'
    });
};

const passwordRecoveryForm = (req, res) => {
    res.render('auth/passwordRecovery', {
        page: "Recuperación de la contraseña"
    });
};

const registerUser = async (req, res) => {
    // Validación
    await check('name').notEmpty().withMessage('El nombre no puede estar vacio').run(req);
    await check('email').isEmail().withMessage('Esto no parece un email').run(req);
    await check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').run(req);
    await check('confirmPassword').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req);
    await check('birth').notEmpty().withMessage("La fecha no puede estar vacia").run(req);
    // Resultados de la validación
    const result = validationResult(req);

    // Si hay errores, retornarlos al formulario de registro
    if (!result.isEmpty()) {
        return res.render('auth/register', {
            page: "Crear una Cuenta Nueva",
            csrfToken : req.csrfToken(),
            errors: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
                birth: req.body.birth
            }
        });
    }

    // Extraer los datos
    const { name, email, password, birth } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email } });

        if (existingUser) {
            return res.render('auth/register', {
                page: "Crear una Cuenta Nueva",
                csrfToken : req.csrfToken(),
                errors: [{ msg: 'Usuario ya Registrado' }],
                user: {
                    name: req.body.name,
                    email: req.body.email,
                    birth: req.body.birth
                }
            });
        }

        // Almacenar el nuevo usuario con un token generado
        const user = await Usuario.create({
            name,
            email,
            password,
            birth,
            token: generarId()
        });

        // Enviar el correo de confirmación
        emailRegistro({
            name: user.name,
            email: user.email,
            token: user.token
        });

        
        res.render('templates/message', {
            page: 'Cuenta creada satisfactoriamente',
            csrfToken: req.csrfToken(),
            message: `Se ha enviado una confirmación al correo: ${user.email}, por favor da click en el link`,
            notification: {
                title: '¡Registro exitoso!',
                message: 'Se le ha enviado un mensaje a su correo, por favor revise su bandeja de entrada'
            }
        });
        
    } catch (error) {
        console.error(error);
        res.render('auth/register', {
            page: "Crear una Cuenta Nueva",
            csrfToken : req.csrfToken(),
            errors: [{ msg: 'Error interno del servidor' }],
            user: {
                name: req.body.name,
                email: req.body.email,
                birth: req.body.birth
            }
        });
    }
};

export { loginForm, registerForm, confirmAccount, registerUser, authenticateUser,passwordRecoveryForm };
