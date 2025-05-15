import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  speaker: { type: String, enum: ['expert1', 'expert2'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('conversacion', ConversationSchema);
