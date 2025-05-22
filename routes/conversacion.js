import {Router} from 'express';
const router = Router();
import conversacionController from '../controllers/conversacion.js';

router.get('/history', conversacionController.getConversationHistory);
router.post('/expert1', conversacionController.generateExpert1Response);
router.post('/expert2', conversacionController.generateExpert2Response);
router.post('/preguntausuario', conversacionController.saveUserQuestion);
router.delete('/clear', conversacionController.clearHistory);

export default router;

