import { Request, Response } from "express";
import comicsService from "../service/comics.service";
import comicsSchema from "../schema/comics.schema";
import { comicsType } from "../types/comics.type";
import comicsModel from "../model/comics.model";

class comicsController {
    async create(req: Request, res: Response) {
        const createdComics = await comicsService.create(req.body)
        res.status(201)
        return res.json(createdComics)
    }

    async findById(req: Request, res: Response) {
        const findedComics = await comicsService.findById(req.params.id)
        res.status(200)
        return res.json(findedComics)
    }

    async findAll(req: Request, res: Response) {
        const findedComics = await comicsService.findAll()
        res.status(200)
        return res.json(findedComics)
    }

    async updateById(req: Request, res: Response) {
        const updatedComics = await comicsService.updateById(req.params.id, req.body)
        res.status(200)
        return res.json(updatedComics)
    }

    async deleteById(req: Request, res: Response) {
        const deletedComics = await comicsService.deleteById(req.params.id)
        res.status(200)
        return res.json(deletedComics)
    }

}

export default new comicsController()