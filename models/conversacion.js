import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    speaker: { 
        type: String, 
        enum: ['experto1', 'experto2', 'system'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Conversacion', ConversationSchema);