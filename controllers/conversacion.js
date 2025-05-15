const Conversation = require('../models/Conversation');
const axios = require('axios');

// Prompts base para los expertos
const communistExpertPrompt = `
Actúa como un experto en teoría comunista con décadas de estudio en Marx, Engels,
Lenin y teoría económica socialista.
Analiza cualquier tema desde una perspectiva de lucha de clases, materialismo
histórico y crítica al capitalismo.
Defiende valores como la propiedad colectiva de los medios de producción, la
planificación económica centralizada y la eliminación de las clases sociales.

Historial de la conversación:
{{conversationHistory}}

Por favor, responde de manera consistente con la ideología comunista.
`;

const conservativeExpertPrompt = `
Actúa como un experto en pensamiento conservador y economía de libre mercado con
décadas de estudio en autores como Hayek, Friedman, y teoría política tradicional.
Analiza cualquier tema desde una perspectiva que valore la libertad individual,
los mercados libres, la propiedad privada y los valores tradicionales.
Defiende principios como el estado limitado, la meritocracia y la importancia
de las instituciones tradicionales.

Historial de la conversación:
{{conversationHistory}}

Por favor, responde de manera consistente con la ideología conservadora.
`;

// Función simulada para llamar a Gemini (puedes reemplazar con llamada real)
async function callGeminiAPI(prompt) {
  // En práctica debes llamar la API real. Aquí retorno mock.
  return `Respuesta generada para el prompt:\n${prompt.substring(0, 100)}...`;
}

// Obtener historial completo de la conversación
exports.getConversationHistory = async (req, res) => {
  try {
    const history = await Conversation.find().sort({ timestamp: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo historial' });
  }
};

// Generar respuesta para experto 1
exports.generateExpert1Response = async (req, res) => {
  try {
    const history = await Conversation.find().sort({ timestamp: 1 });
    // Crear historial en texto para el prompt
    const historyText = history.map(entry => `${entry.speaker}: ${entry.message}`).join('\n');
    const prompt = communistExpertPrompt.replace('{{conversationHistory}}', historyText);

    const answer = await callGeminiAPI(prompt);

    // Guardar en BD
    const conversationEntry = new Conversation({ speaker: 'expert1', message: answer });
    await conversationEntry.save();

    res.json(conversationEntry);
  } catch (err) {
    res.status(500).json({ error: 'Error generando respuesta experto 1' });
  }
};

// Generar respuesta para experto 2
exports.generateExpert2Response = async (req, res) => {
  try {
    const history = await Conversation.find().sort({ timestamp: 1 });
    const historyText = history.map(entry => `${entry.speaker}: ${entry.message}`).join('\n');
    const prompt = conservativeExpertPrompt.replace('{{conversationHistory}}', historyText);

    const answer = await callGeminiAPI(prompt);

    const conversationEntry = new Conversation({ speaker: 'expert2', message: answer });
    await conversationEntry.save();

    res.json(conversationEntry);
  } catch (err) {
    res.status(500).json({ error: 'Error generando respuesta experto 2' });
  }
};

// Limpiar todo el historial
exports.clearHistory = async (req, res) => {
  try {
    await Conversation.deleteMany({});
    res.json({ message: 'Historial limpiado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error limpiando historial' });
  }
};
