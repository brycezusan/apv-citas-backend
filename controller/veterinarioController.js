import Veterinario from "../models/Veterinario.js";
import bcrypt from "bcrypt";
import { generarID, generateJWT } from "../utils/index.js";
import { emailRegistro, emailResetPassword } from "../utils/email.js";

const registrar = async (req, res) => {
  //validar el email unico
  const { email, nombre } = req.body;
  const existeEmail = await Veterinario.findOne({ email });
  if (existeEmail) {
    const error = new Error("Email ya registrado");
    return res.status(405).json({ msg: error.message });
  }
  // Guardar registro de  nuevo veterinario
  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    //! ENVIAR EMAIL
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const existeToken = await Veterinario.findOne({ token });

  if (!existeToken) {
    const error = new Error("token no valido");
    return res.status(401).json({ msg: error.message });
  } else {
    existeToken.token = null;
    existeToken.confirmado = true;
    await existeToken.save();
    res.json({ msg: "Cuenta confirmada" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("Usuario no valido");
    return res.status(403).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("Cuenta no confirmada");
    return res.status(403).json({ msg: error.message });
  }
  const clave = await bcrypt.compare(password, usuario.password);

  if (clave) {
    //Auntencicacion con JSONWEBTOKEN
    return res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generateJWT(usuario._id),
    });
  } else {
    const error = new Error("password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

const actualizarPerfil = async (req , res)=>{
  const { id } = req.params
  console.log(req.body)
  const usuario  = await Veterinario.findById(id)

  if(!usuario){
    const error = new Error('Usuario no encontrado')
    res.status(404).json({msg:error.message})
  }

  try {
    usuario.nombre = req.body.nombre 
    usuario.email = req.body.email 
    usuario.telefono = req.body.telefono
    usuario.web = req.body.web 

    const userUpdate =await usuario.save()

    res.json(userUpdate)
  } catch (error) {
    console.log(error)
  }


}

const recuperarContraseña = async (req, res) => {
  // console.log(req.body.email)
  const { email } = req.body;
  const existeUsuario = await Veterinario.findOne({ email });
  if (!existeUsuario) {
    const error = new Error("Email no registrado");
    return res.status(403).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarID();
    await existeUsuario.save();

    //Enviar email
    emailResetPassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });

    res.json({ msg: "Hemos enviado un correo , validar Token" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Veterinario.findOne({ token });

  if (usuario) {
    res.json({ msg: "Token Validado" });
  } else {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuarioToken = await Veterinario.findOne({ token });

  if (!usuarioToken) {
    const error = new Error("Hubo un error");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioToken.token = null;
    usuarioToken.password = password;
    await usuarioToken.save();
    res.json({ msg: "contraseña actualizada" });
  } catch (error) {
    console.log(error);
  }
};


const actualizarPassword = async (req ,res)=>{
  const { id } = req.usuario
  const {pwd_actual , pwd_nuevo} = req.body
  const usuario = await Veterinario.findById(id)
  if(!usuario){
    const error = new Error('Hubo un error')
    return res.status(400).json({msg:error.message})
  }
  //!comprobar password coincide
  const clave = await bcrypt.compare(pwd_actual, usuario.password);
  
  if(clave){
    usuario.password = pwd_nuevo
    await usuario.save()
    res.json({msg:'Password actualizado de manera correcta'})
  }else{
    const error = new Error("Password actual erroneo")
    return res.status(400).json({msg:error.message})
  }


}

export {
  registrar,
  confirmar,
  login,
  perfil,
  actualizarPerfil,
  recuperarContraseña,
  comprobarToken,
  resetPassword,
  actualizarPassword
};
