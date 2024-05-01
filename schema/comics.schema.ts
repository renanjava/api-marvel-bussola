import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const comicsSchema = new Schema({
    titulo: String,
    descricao: String,
    dataPublicao: String,
    capa: String
}, {
    timestamps: true
}

);

export default model("Comics", comicsSchema)