import mongoose, { Schema, Document } from 'mongoose';

export interface Personagem {
    nome: string;
    descricao: string;
    urlImagem: string;
}

const PersonagemSchema: Schema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    urlImagem: { type: String, required: true }
});

export default mongoose.model<Personagem>('Personagem', PersonagemSchema);
