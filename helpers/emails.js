import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, name, token} = datos

      // Enviar el email
      await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com' ,
         html: `
         <div style="background: linear-gradient(135deg, #6366f1, #b8336a); padding: 30px; border-radius: 10px; text-align: center; font-family: 'Roboto', Arial, sans-serif; line-height: 1.6; color: #fff; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);">
              
              <div style="margin-bottom: 20px;">
                <img src="cid:Logo" alt="Logo" style="width: 150px; height: auto; margin-bottom: 10px;">
                <h1 style="background: #fff; color: #6366f1; font-weight: bold; padding: 10px; border-radius: 5px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);">¡Hola <span style="color: #6366f1">${name}</span>!</h1>
              </div>
              
              <p style="font-size: 16px;">Tu cuenta ya está lista en <strong>BienesRaices.com</strong>. Solo debes confirmarla haciendo clic en el siguiente enlace:</p>
              
        
              <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}" 
                style="display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; text-decoration: none; background-color: transparent; border: 2px solid #fff; border-radius: 10px; color: #fff; box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3); transition: all 0.3s ease;">
                <i class="fa fa-check" style="margin-right: 8px;"></i> Confirmar cuenta
              </a>
             
              <p style="font-size: 14px; margin-top: 20px;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
              
             
              <div style="margin-top: 30px; font-size: 14px;">
                <p>Atentamente,<br><strong>El equipo de Bienes Raices</strong></p>
                <div style="border-top: 2px solid #fff; padding-top: 15px;">
                  <p style="font-style: italic;">Para más información, visita nuestro sitio web.</p>
                  <img src="cid:Firma" alt="Logo" style="width: 150px; height: auto; margin-bottom: 10px;">
                </div>
              </div>
            </div>
        `,
        attachments: [
          {
            filename: "Logo.png",
            path: "./public/img/home.png", // Ruta relativa desde tu archivo de script
            cid: "Logo"
          },
          {
            filename: "Firma.png",
            path: "./public/img/Firma.png", // Ruta relativa desde tu archivo de script
            cid: "Firma"
          }
        ]
    }         


      )

}

export {
    emailRegistro
}