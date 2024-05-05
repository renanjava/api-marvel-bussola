import { Request, Response } from 'express';
import personagemService from '../service/personagem.service';

class PersonagemController {

    async createFromMarvelAPI(req: Request, res: Response) {
        try {
            const createdPersonagens = await personagemService.createFromMarvelAPI();
            return res.status(201).json(createdPersonagens);
        } catch (error) {
            console.error('Error creating personagens from Marvel API:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    async create(req: Request, res: Response) {
        try {
            const createdPersonagem = await personagemService.create(req.body);
            return res.status(201).json(createdPersonagem);
        } catch (error) {
            console.error('Error creating personagem:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const personagens = await personagemService.findAll();
            return res.status(200).json(personagens);
        } catch (error) {
            console.error('Error finding personagens:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedPersonagem = await personagemService.updateById(id, req.body);
            return res.status(200).json(updatedPersonagem);
        } catch (error) {
            console.error('Error updating personagem:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const personagem = await personagemService.findById(id);
            return res.status(200).json(personagem);
        } catch (error) {
            console.error('Error finding personagem:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await personagemService.deleteById(id);
            return res.status(204).send();
        } catch (error) {
            console.error('Error deleting personagem:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async count(req: Request, res: Response) {
        try {
            const count = await personagemService.countPersonagem();
            return res.status(200).json({ count });
        } catch (error) {
            console.error('Error counting personagens:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
}

export default new PersonagemController();
