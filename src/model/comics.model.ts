import mongoose, { Schema, Document } from 'mongoose';
import { ComicsType } from '../schema/comics.schema';

const ComicsSchema: Schema = new Schema({
    titulo: { type: String, required: false },
    descricao: { type: String, required: false },
    dataPublicao: { type: String, required: false },
    capa: { type: String, required: false }
});

const ComicsModel = mongoose.model<ComicsType>('Comics', ComicsSchema);

export default ComicsModel;
