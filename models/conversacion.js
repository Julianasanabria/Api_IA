import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categoriasEsquema = new Schema({
    codigo:{type:String,uniqued:true},
    nombre:{type:String},
    createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("Categoria",categoriasEsquema)