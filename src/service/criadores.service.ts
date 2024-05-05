import axios from 'axios';
import { criadoresType } from '../types/criadores.type';
import criadoresModel from '../model/criadores.model';

class CriadoresService {
    private marvelChavePublica: string;
    private marvelChavePrivada: string;
    private baseUrl: string;

    constructor() {
        this.marvelChavePublica = 'd619aea71bc9922797916c1c9475e01b';
        this.marvelChavePrivada = '89005e4eecfecb24e39d995e56bf2d2f5a836097';
        this.baseUrl = 'https://gateway.marvel.com/v1/public';
    }

    async findAll(): Promise<criadoresType[]> {
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

        const creators: criadoresType[] = response.data.data.results
            .map((result: any) => result.creators.items)
            .flat()
            .map((item: any) => ({
                nome: item.name,
                funcao: item.role,
                constribuicaoQuadrinhos: item.comicsContributed
            }));

        await this.create(creators);

        return creators;
    }

    async createFromMarvelAPI(): Promise<void> {
        try {
            const creatorsData = await this.findAll();
            await this.create(creatorsData);
        } catch (error) {
            throw new Error(`Erro ao criar criadores a partir da API Marvel: ${error}`);
        }
    }

    async create(creators: criadoresType[]): Promise<void> {
        await criadoresModel.create(creators);
    }

    async updateById(id: string, creator: criadoresType): Promise<criadoresType | null> {
        try {
            const updatedCreator = await criadoresModel.findByIdAndUpdate(id, creator, { new: true });
            return updatedCreator;
        } catch (error) {
            throw new Error('Erro ao atualizar criador');
        }
    }

    async deleteById(id: string): Promise<criadoresType | null> {
        try {
            const deletedCreator = await criadoresModel.findByIdAndDelete(id);
            return deletedCreator;
        } catch (error) {
            throw new Error('Erro ao deletar criador');
        }
    }

    async findById(id: string): Promise<criadoresType | null> {
        try {
            const creator = await criadoresModel.findById(id);
            return creator;
        } catch (error) {
            throw new Error('Erro ao encontrar criador por id');
        }
    }

    async countCriadores(): Promise<number> {
        try {
            const count = await criadoresModel.countDocuments();
            return count;
        } catch (error) {
            throw new Error(`Erro ao contar criador: ${error}`);
        }
    }

    private generateHash(timestamp: string): string {
        const hash = require('crypto')
            .createHash('md5')
            .update(timestamp + this.marvelChavePrivada + this.marvelChavePublica)
            .digest('hex');
        return hash;
    }
}

export default new CriadoresService();
