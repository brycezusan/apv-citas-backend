import Paciente from "../models/Paciente.js";

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.usuario);
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "no encontrado" });
  }

  if (paciente?.veterinario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }

  if (paciente) {
    res.json(paciente);
  }
};

const guardarCitaPaciente = async (req, res) => {
  // console.log(req.usuario._id)
  const pacienteCita = new Paciente(req.body);
  pacienteCita.veterinario = req.usuario._id;

  try {
    // console.log(pacienteCita)
    const pacienteSave = await pacienteCita.save();
    res.json(pacienteSave);
  } catch (error) {
    console.log(error);
  }
};

const actualizarCitaPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (paciente?.veterinario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }

  //actualizar Paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.descripcion = req.body.descripcion || paciente.descripcion;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (e) {
    console.log(e);
  }
};

const eliminarCitaPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (paciente?.veterinario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }

  try {
    await paciente.deleteOne()
    res.json({msg:'Paciente eliminado'})
  } catch (error) {
    console.log(error)
  }
};

export {
  obtenerPaciente,
  obtenerPacientes,
  guardarCitaPaciente,
  actualizarCitaPaciente,
  eliminarCitaPaciente
};
