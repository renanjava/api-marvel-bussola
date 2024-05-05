import mongoose, { Schema, Document } from 'mongoose';
import { Criadores } from "../schema/criadores.schema";

const criadoresSchema: Schema = new Schema({
    nome: { type: String, required: false },
    funcao: { type: String, required: false },
    constribuicaoQuadrinhos: { type: String, required: false }
});

const criadoresModel = mongoose.model<Criadores>('Criadores', criadoresSchema);
export default criadoresModel