import personagemModel from "../schema/personagem.schema"
import { personagemType } from "../types/personagem.type"

class personagemService {
    async create(personagem: personagemType) {
        const createdPersonagem = await personagemModel.create(personagem)
        return createdPersonagem
    }

    async findById(id: any) {
        const findedPersonagem = await personagemModel.findById(id)
        return findedPersonagem
    }

    async findAll() {
        const findedPersonagens = await personagemModel.find()
        return findedPersonagens
    }

    async updateById(id: any, personagem: personagemType) {
        const updatedPersonagem = await personagemModel.findByIdAndUpdate(id, personagem)
        return updatedPersonagem
    }

    async deleteById(id: any) {
        const deletedPersonagem = await personagemModel.findByIdAndDelete(id)
        return deletedPersonagem
    }
}

export default new personagemService()