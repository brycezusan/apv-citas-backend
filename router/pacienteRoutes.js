import express from "express";
import {
  obtenerPaciente,
  obtenerPacientes,
  guardarCitaPaciente,
  actualizarCitaPaciente,
  eliminarCitaPaciente
} from "../controller/pacienteController.js";
import checkAuth from "../middleware/authenticateMiddleware.js";

const router = express.Router();

//* Definir rutas

router
  .route("/")
  .get(checkAuth, obtenerPacientes)
  .post(checkAuth, guardarCitaPaciente);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarCitaPaciente)
  .delete(checkAuth, eliminarCitaPaciente)

export default router;
