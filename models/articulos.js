import mongoose from "mongoose";


const articuloEsquema = new mongoose.Schema({
    codigoCategoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true,    },
    codigo:{type:String,uniqued:true},
    nombre:{type:String},
    cantidad:{type:Number,default:0},
    createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("Articulo",articuloEsquema)