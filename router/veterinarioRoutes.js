import express from "express";
import {
  registrar,
  confirmar,
  login,
  perfil,
  actualizarPerfil,
  recuperarContraseña,
  comprobarToken,
  resetPassword,
  actualizarPassword
} from "../controller/veterinarioController.js";
import checkAuth from "../middleware/authenticateMiddleware.js";

const router = express.Router();

// * Rutas Publicas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", login);
router.post("/recuperar-clave", recuperarContraseña);

// * MultiRutas -> Si tenemos rutas identicas , distintas acciones
// ! 1ra forma
// router.get("/recuperar-clave/:token", comprobarToken);
// router.post("/recuperar-clave/:token", resetPassword);
// ! 2da forma
router.route("/recuperar-clave/:token").get(comprobarToken).post(resetPassword);

// * Ruta Protegida (Sesion de JWT)
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id",checkAuth , actualizarPerfil);
router.put("/actualizar-password/" , checkAuth ,actualizarPassword )

export default router;
