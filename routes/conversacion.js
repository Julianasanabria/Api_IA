import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Función para generar respuesta con Gemini
async function generarRespuestaIA(prompt, experto) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const contexto = `Eres un ${experto}. Responde de manera profesional y concisa. Tema: ${prompt}`;
        const result = await model.generateContent(contexto);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error en generarRespuestaIA:', error);
        throw new Error(`Error al generar respuesta: ${error.message}`);
    }
}

// Ruta principal para el chat
router.post('/chat', async (req, res) => {
    try {
        const { speaker, expert1, expert2, message } = req.body;
        const expertoActual = speaker === 'expert1' ? expert1 : expert2;
        const respuesta = await generarRespuestaIA(message, expertoActual);
        res.json({ response: respuesta });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

// Ruta de prueba
router.get('/test', (req, res) => res.json({ ok: true }));

export default router;

