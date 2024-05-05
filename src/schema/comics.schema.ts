import mongoose, { Schema, Document } from 'mongoose';

export interface ComicsType extends Document {
    titulo: string;
    descricao: string;
    dataPublicacao: string;
    capa: string;
}

const ComicsSchema: Schema = new Schema({
    titulo: { type: String, required: false },
    descricao: { type: String, required: false },
    dataPublicacao: { type: String, required: false },
    capa: { type: String, required: false }
});

const ComicsModel = mongoose.model<ComicsType>('ComicsA', ComicsSchema);

export default ComicsModel;
