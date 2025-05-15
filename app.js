import express from "express";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import categorias from "./routes/categorias.js"
import articulos from "./routes/articulos.js"

import "dotenv/config";

const app = express();

app.use(express.json())
app.use(express.static("public"))
app.use("/api/categorias",categorias)
app.use("/api/articulos",articulos)

const inteligenciaGemini = new GoogleGenAI({ apiKey: "AIzaSyBIliyZgyuVHWS-9ZVtaLmJY6Asg9xbkcQ" });

async function main() {
  const response = await inteligenciaGemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  mongoose
    .connect("mongodb://127.0.0.1:27017/adso076")
    .then(() => console.log("BASE DE DATOS CONECTADA!"));
});
