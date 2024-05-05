import { Request, Response } from 'express';
import comicsService from '../service/comics.service';
import { ComicsType } from '../types/comics.type';

class ComicsController {
    async create(req: Request, res: Response) {
        try {
            const createdComics = await comicsService.createFromMarvelAPI();
            return res.status(201).json(createdComics);
        } catch (error) {
            console.error('Error creating comics:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const comics = await comicsService.findAll();
            return res.status(200).json(comics);
        } catch (error) {
            console.error('Error fetching comics:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async findById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const comic = await comicsService.findById(id);
            if (!comic) {
                return res.status(404).json({ message: 'Comic não encontrada' });
            }
            return res.status(200).json(comic);
        } catch (error) {
            console.error('Erro ao dar fetch na comic por id:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async updateById(req: Request, res: Response) {
        const id = req.params.id;
        const updateData: Partial<ComicsType> = req.body;
        try {
            const updatedComic = await comicsService.updateById(id, updateData);
            if (!updatedComic) {
                return res.status(404).json({ message: 'Comic não encontrada' });
            }
            return res.status(200).json(updatedComic);
        } catch (error) {
            console.error('Erro ao atualizar a comic:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async deleteById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const deletedComic = await comicsService.deleteById(id);
            if (!deletedComic) {
                return res.status(404).json({ message: 'Comic não encontrada' });
            }
            return res.status(200).json(deletedComic);
        } catch (error) {
            console.error('Erro ao deletar a comic:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }

    async count(req: Request, res: Response) {
        try {
            const count = await comicsService.countComics();
            return res.status(200).json({ count });
        } catch (error) {
            console.error('Erro ao contar as comics:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
}

export default new ComicsController();
