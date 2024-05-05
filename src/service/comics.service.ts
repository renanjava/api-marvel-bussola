import axios from 'axios';
import comicsModel from "../schema/comics.schema";
import { ComicsType } from "../types/comics.type";

class ComicsService {
    private marvelChavePublica: string;
    private marvelChavePrivada: string
    private baseUrl: string;

    constructor() {
        this.marvelChavePublica = 'd619aea71bc9922797916c1c9475e01b';
        this.marvelChavePrivada = '89005e4eecfecb24e39d995e56bf2d2f5a836097';
        this.baseUrl = 'https://gateway.marvel.com/v1/public';
    }

    async getComics(): Promise<ComicsType[]> {
        const timestamp = Date.now().toString();
        const hash = this.generateHash(timestamp);

        const response = await axios.get(`${this.baseUrl}/comics`, {
            params: {
                apikey: this.marvelChavePublica,
                ts: timestamp,
                hash: hash,
                title: 'King in Black',
                orderBy: '-onsaleDate',
            },
        });

        const comics: ComicsType[] = response.data.data.results.map((result: any) => ({
            id: result.id,
            titulo: result.title,
            descricao: result.description,
            dataPublicao: result.dates.find((date: any) => date.type === 'onsaleDate').date,
            capa: `${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`,
        }));

        return comics;
    }

    async createFromMarvelAPI(): Promise<ComicsType[]> {
        const comicsData = await this.getComics();
    
        const createdComics: ComicsType[] = [];
    
        for (const comic of comicsData) {
            const createdComic = await comicsModel.create(comic);
            createdComics.push(createdComic.toObject());
        }
    
        return createdComics;
    }

    async findAll() {
        try {
            const comics = await comicsModel.find();
            return comics;
        } catch (error) {
            throw new Error(`Erro ao encontrar comics: ${error}`);
        }
    }

    async findById(id: string) {
        try {
            const comic = await comicsModel.findById(id);
            return comic;
        } catch (error) {
            throw new Error(`Erro ao encontrar comic por id: ${error}`);
        }
    }

    async updateById(id: string, updateData: Partial<ComicsType>) {
        try {
            const updatedComic = await comicsModel.findByIdAndUpdate(id, updateData, { new: true });
            return updatedComic;
        } catch (error) {
            throw new Error(`Erro ao atualizar comic: ${error}`);
        }
    }

    async deleteById(id: string) {
        try {
            const deletedComic = await comicsModel.findByIdAndDelete(id);
            return deletedComic;
        } catch (error) {
            throw new Error(`Erro ao deletar comic: ${error}`);
        }
    }

    async countComics(): Promise<number> {
        try {
            const count = await comicsModel.countDocuments();
            return count;
        } catch (error) {
            throw new Error(`Erro ao contar comics: ${error}`);
        }
    }

    private generateHash(timestamp: string): string {
        const hash = require('crypto').createHash('md5');
        hash.update(timestamp + this.marvelChavePrivada + this.marvelChavePublica);
        return hash.digest('hex');
    }
}

export default new ComicsService();
