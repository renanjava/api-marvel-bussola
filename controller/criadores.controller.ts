import { Request, Response } from "express";
import criadoresService from "../service/criadores.service";
import criadoresSchema from "../schema/criadores.schema";
import { criadoresType } from "../types/criadores.type";
import criadoresModel from "../model/criadores.model";

class criadoresController {
    async create(req: Request, res: Response) {
        const createdCriadores = await criadoresService.create(req.body)
        res.status(201)
        return res.json(createdCriadores)
    }

    async findById(req: Request, res: Response) {
        const findedCriadores = await criadoresService.findById(req.params.id)
        res.status(200)
        return res.json(findedCriadores)
    }

    async findAll(req: Request, res: Response) {
        const findedCriadores = await criadoresService.findAll()
        res.status(200)
        return res.json(findedCriadores)
    }

    async updateById(req: Request, res: Response) {
        const updatedCriadores = await criadoresService.updateById(req.params.id, req.body)
        res.status(200)
        return res.json(updatedCriadores)
    }

    async deleteById(req: Request, res: Response) {
        const deletedCriadores = await criadoresService.deleteById(req.params.id)
        res.status(200)
        return res.json(deletedCriadores)
    }

}

export default new criadoresController()