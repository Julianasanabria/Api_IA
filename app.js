import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import conversacion from './routes/conversacion.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Configuración de CORS mejorada
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', conversacion);

// Conexión a MongoDB con reintentos
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('✅ Conectado a MongoDB'))
        .catch(err => {
            console.error('❌ Error de conexión a MongoDB:', err.message);
            console.log('🔄 Reintentando conexión en 5 segundos...');
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

// Middleware de manejo de errores mejorado
app.use((err, res) => {
    console.error('🔥 Error:', err.stack);
    res.status(500).json({ 
        error: 'Algo salió mal!',
        message: err.message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configurada' : 'NO configurada!'}`);
});
