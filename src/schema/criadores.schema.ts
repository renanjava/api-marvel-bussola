import mongoose, { Schema, model } from 'mongoose';

export interface Criadores {
    nome: string;
    funcao: string;
    constribuicaoQuadrinhos: string;
}

const criadoresSchema = new Schema<Criadores>({
    nome: { type: String, required: true },
    funcao: { type: String, required: true },
    constribuicaoQuadrinhos: { type: String, required: true }
});

export default mongoose.model<Criadores>('Criadores', criadoresSchema);
