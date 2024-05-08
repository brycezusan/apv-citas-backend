import mongoose from "mongoose";
import { generarID } from "../utils/index.js"
import bcrypt from "bcrypt";

const veterinarioSchema = mongoose.Schema({
  nombre:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  telefono:{
    type:String,
    default:null,
    trim:true
  },
  web:{
    type:String,
    default:null,
    trim:true
  },
  token:{
    type:String,
    default:generarID()
  },
  confirmado:{
    type:Boolean,
    default:false
  }
})

veterinarioSchema.pre("save", async function(next){

  // ! Validar si el password ya se encuentra hasheado
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

const Veterinario = mongoose.model('Veterinario',veterinarioSchema)

export default Veterinario