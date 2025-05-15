import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import conversationRoutes from './routes/conversationRoutes.js';


const dotenv = require('dotenv');
const connectDB = require('./config/db');
const conversationRoutes = require('./routes/conversationRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/conversations', conversationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

