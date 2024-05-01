import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const comicsSchema = new Schema({
    nome: String,
    funcao: String,
    constribuicaoQuadrinhos: String
}, {
    timestamps: true
}

);

export default model("Comics", comicsSchema)