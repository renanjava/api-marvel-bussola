import criadoresModel from "../schema/criadores.schema"
import { criadoresType } from "../types/criadores.type"

class criadoresService {
    async create(criadores: criadoresType) {
        const createdCriadores = await criadoresModel.create(criadores)
        return createdCriadores
    }

    async findById(id: any) {
        const findedCriadores = await criadoresModel.findById(id)
        return findedCriadores
    }

    async findAll() {
        const findedCriadores = await criadoresModel.find()
        return findedCriadores
    }

    async updateById(id: any, criadores: criadoresType) {
        const updatedCriadores = await criadoresModel.findByIdAndUpdate(id, criadores)
        return updatedCriadores
    }

    async deleteById(id: any) {
        const deletedCriadores = await criadoresModel.findByIdAndDelete(id)
        return deletedCriadores
    }
}

export default new criadoresService()