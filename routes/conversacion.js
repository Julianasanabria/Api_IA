import { Router } from 'express';
const router = Router();
import conversacionController from '../controllers/conversacion.js';

router.get('/historial', conversacionController.obtenerHistorialConversaciones);
router.post('/experto1', conversacionController.generarRespuestaExperto1);
router.post('/experto2', conversacionController.generarRespuestaExperto2);
router.delete('/limpiar', conversacionController.limpiarHistorial);

export default router;