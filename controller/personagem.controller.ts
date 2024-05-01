import { Request, Response } from "express";
import personagemService from "../service/personagem.service";
import personagemSchema from "../schema/personagem.schema";
import { personagemType } from "../types/personagem.type";
import personagemModel from "../model/personagem.model";

class personagemController {
    async create(req: Request, res: Response) {
        const createdPersonagem = await personagemService.create(req.body)
        res.status(201)
        return res.json(createdPersonagem)
    }

    async findById(req: Request, res: Response) {
        const findedPersonagem = await personagemService.findById(req.params.id)
        res.status(200)
        return res.json(findedPersonagem)
    }

    async findAll(req: Request, res: Response) {
        const findedPersonagens = await personagemService.findAll()
        res.status(200)
        return res.json(findedPersonagens)
    }

    async updateById(req: Request, res: Response) {
        const updatedPersonagem = await personagemService.updateById(req.params.id, req.body)
        res.status(200)
        return res.json(updatedPersonagem)
    }

    async deleteById(req: Request, res: Response) {
        const deletedPersonagem = await personagemService.deleteById(req.params.id)
        res.status(200)
        return res.json(deletedPersonagem)
    }

}

export default new personagemController()