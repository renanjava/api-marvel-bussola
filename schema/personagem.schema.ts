import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const personagemSchema = new Schema({
    nome: String,
    descricao: String,
    urlImagem: String
}, {
    timestamps: true
}

);

export default model("Personagem", personagemSchema)