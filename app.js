import express from 'express';
import mongoose from 'mongoose';

import conversacion from './routes/conversacion.js';


import "dotenv/config";
import 'models/conversacion.js';

const app = express();
app.use(express.json());
app.use('/api/conve', conversacion);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  mongoose
  .connect("mongodb://127.0.0.1:27017/conversacion")
  .then(() => console.log("Conectado a MongoDB"))
});

