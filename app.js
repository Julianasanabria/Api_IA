import express from "express";
import mongoose from "mongoose";
import categorias from "./routes/categorias.js"
import articulos from "./routes/articulos.js"

import "dotenv/config";

const app = express();

app.use(express.json())
app.use(express.static("public"))
app.use("/api/categorias",categorias)
app.use("/api/articulos",articulos)

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  mongoose
    .connect("mongodb://127.0.0.1:27017/adso076")
    .then(() => console.log("BD Connected!"));
});
