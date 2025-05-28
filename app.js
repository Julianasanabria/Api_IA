import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import conversacion from './routes/conversacion.js';
import cors from 'cors';

const app = express();

// Configuración de CORS específica
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));

// Middleware de logging mejorado
app.use((req, res, next) => {
    console.log('Nueva petición:');
    console.log(`Método: ${req.method}`);
    console.log(`URL: ${req.url}`);
    if (req.body) console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

// Rutas
app.use('/api', conversacion);

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

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