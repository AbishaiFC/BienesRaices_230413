import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, nombre, token} = datos

      // Enviar el email
      await transport.sendMail({
        from: 'BoenesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com' ,
         html: `
        <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices.com </p>

        <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}" >Confirmar cuenta</a></p>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
        `
    }         


      )

}

export {
    emailRegistro
}