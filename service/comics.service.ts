import comicsModel from "../schema/comics.schema"
import { comicsType } from "../types/comics.type"

class comicsService {
    async create(comics: comicsType) {
        const createdComics = await comicsModel.create(comics)
        return createdComics
    }

    async findById(id: any) {
        const findedComics = await comicsModel.findById(id)
        return findedComics
    }

    async findAll() {
        const findedComics = await comicsModel.find()
        return findedComics
    }

    async updateById(id: any, comics: comicsType) {
        const updatedComics = await comicsModel.findByIdAndUpdate(id, comics)
        return updatedComics
    }

    async deleteById(id: any) {
        const deletedComics = await comicsModel.findByIdAndDelete(id)
        return deletedComics
    }
}

export default new comicsService()