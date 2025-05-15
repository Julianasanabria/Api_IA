import Router from 'express';
const router = Router();
const conversationController = require('../controllers/conversacion.js');

router.get('/history', conversationController.getConversationHistory);
router.post('/expert1', conversationController.generateExpert1Response);
router.post('/expert2', conversationController.generateExpert2Response);
router.delete('/clear', conversationController.clearHistory);

module.exports = router;

