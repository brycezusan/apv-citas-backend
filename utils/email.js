import nodemailer from "nodemailer"

export const emailRegistro =async (data)=>{
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const {email , nombre , token}  = data
  //Enviar el Email
  const info = await transport.sendMail({
    from:"Administracion de Citas - Veterinaria",
    to:email,
    subject:"Comprueba tu cuenta en APV",
    text:"Confirmacion de cuenta",
    html:`<p>Hola: ${nombre} , comprueba tu cuenta</p>
      <p>Tu cuenta sera verficada , con el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
      <p>Si tu no creaste esta cuenta , puedes ignorar este mensaje</p>
    `
  });

  console.log("Mensaje enviado : " , info.messageId)
}

export const emailResetPassword= async(data)=>{
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const {email , nombre , token}  = data
  //Enviar el Email
  const info = await transport.sendMail({
    from:"Administracion de Citas - Veterinaria",
    to:email,
    subject:"Reestablece tu Password",
    text:"Restablece tu Password",
    html:`<p>Hola: ${nombre} , has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password</p>
      <a href="${process.env.FRONTEND_URL}/recuperar/${token}">Reestablecer password</a>
      <p>Si tu no creaste esta cuenta , puedes ignorar este mensaje</p>
    `
  });

  console.log("Mensaje enviado : " , info.messageId)
}