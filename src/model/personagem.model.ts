import mongoose, { Schema, Document } from 'mongoose';
import { Personagem } from "../schema/personagem.schema";

const personagemSchema: Schema = new Schema({
    nome: { type: String, required: false },
    descricao: { type: String, required: false },
    urlImagem: { type: String, required: false }
});

const personagemModel = mongoose.model<Personagem>('Personagem', personagemSchema);
export default personagemModel