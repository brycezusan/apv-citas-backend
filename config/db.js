import mongoose from "mongoose";

const conexionDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI_URL}`);

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`MongoDB conectado : ${url}`)
  } catch (error) {
    console.log(error);
  }
};

export default conexionDB;
