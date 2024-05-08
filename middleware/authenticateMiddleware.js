import jwt from "jsonwebtoken"
import Veterinario from "../models/Veterinario.js";
// Custom middleware
const checkAuth = async(req, res, next) => {
  // console.log(req.headers.authorization)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log('Acceso con token')
    try {
      token = req.headers.authorization.split(" ")[1];
      // !Verificacion del token
      const verify = jwt.verify(token,process.env.JWT_SECRET)
      
      const usuario = await Veterinario.findById(verify.id).select(
        "-password -token" // !campos excluidos
      )
      // !enviamos el usuario logueado
      req.usuario = usuario
      next();
    } catch (e) {
      const error = new Error("Token no valido");
      res.status(403).json({ msg: error.message });
    }
  } else {
    const error = new Error("Token inexistente");
    res.status(403).json({ msg: error.message });
  }
};

export default checkAuth;
