import { Request, Response } from 'express';
import criadoresService from '../service/criadores.service';
import { criadoresType } from '../types/criadores.type';

class CriadoresController {

    async createFromMarvelAPI(req: Request, res: Response) {
        try {
            await criadoresService.createFromMarvelAPI();
            return res.status(201).json({ message: 'Criadores criados com sucesso a partir da API da Marvel' });
        } catch (error) {
            console.error('Error creating creators from Marvel API:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    async create(req: Request, res: Response) {
        try {
            const createdCriadores = await criadoresService.create(req.body);
            return res.status(201).json(createdCriadores);
        } catch (error) {
            console.error('Error creating criadores:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const findedCriadores = await criadoresService.findAll();
            return res.status(200).json(findedCriadores);
        } catch (error) {
            console.error('Error fetching criadores:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedCriadores = await criadoresService.updateById(id, req.body);
            return res.status(200).json(updatedCriadores);
        } catch (error) {
            console.error('Error updating criadores:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const criador = await criadoresService.findById(id);
            return res.status(200).json(criador);
        } catch (error) {
            console.error('Error finding criador:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await criadoresService.deleteById(id);
            return res.status(204).send();
        } catch (error) {
            console.error('Error deleting criador:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async count(req: Request, res: Response) {
        try {
            const count = await criadoresService.countCriadores();
            return res.status(200).json({ count });
        } catch (error) {
            console.error('Error counting criadores:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
}

export default new CriadoresController();
