import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import conversacion from './routes/conversacion.js';
import cors from 'cors'

import Conversacion from './models/conversacion.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ['GET', 'POST', 'DELETE']
}));

app.use('/api', conversacion);



// conexion a mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(process.env.GEMINI_API_KEY);
});