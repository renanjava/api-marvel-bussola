import axios from 'axios';
import { Personagem } from '../schema/personagem.schema';
import personagemModel from '../model/personagem.model';

class PersonagemService {
    private marvelChavePublica: string;
    private marvelChavePrivada: string;
    private baseUrl: string;

    constructor() {
        this.marvelChavePrivada = '89005e4eecfecb24e39d995e56bf2d2f5a836097';
        this.marvelChavePublica = 'd619aea71bc9922797916c1c9475e01b';
        this.baseUrl = 'https://gateway.marvel.com/v1/public';
    }

    async getCharacters(): Promise<Personagem[]> {
        const timestamp = Date.now().toString();
        const hash = this.generateHash(timestamp);

        const response = await axios.get(`${this.baseUrl}/characters`, {
            params: {
                apikey: this.marvelChavePublica,
                ts: timestamp,
                hash: hash,
                events: '314',
                orderBy: 'name',
            },
        });

        const characters: Personagem[] = response.data.data.results.map((result: any) => ({
            nome: result.name,
            descricao: result.description,
            urlImagem: `${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`,
        }));

        return characters;
    }

    async createFromMarvelAPI(): Promise<Personagem[]> {
        const charactersData = await this.getCharacters();

        const createdCharacters: Personagem[] = [];

        for (const character of charactersData) {
            const { nome, descricao, urlImagem } = character;

            const characterObject: Personagem = {
                nome,
                descricao,
                urlImagem,
            };

            const createdCharacter = await personagemModel.create(characterObject);
            createdCharacters.push(createdCharacter);
        }

        return createdCharacters;
    }

    async findAll(){
        try {
            const personagens = await personagemModel.find();
            return personagens;
        } catch (error) {
            throw new Error('Erro ao encontrar personagens');
        }
    }

    async create(personagem: Personagem): Promise<Personagem> {
        try {
            const createdPersonagem = await personagemModel.create(personagem);
            return createdPersonagem;
        } catch (error) {
            throw new Error('Erro ao criar personagem');
        }
    }

    async updateById(id: string, personagem: Personagem): Promise<Personagem | null> {
        try {
            const updatedPersonagem = await personagemModel.findByIdAndUpdate(id, personagem, { new: true });
            return updatedPersonagem;
        } catch (error) {
            throw new Error('Erro ao atualizar personagem');
        }
    }

    async deleteById(id: string): Promise<Personagem | null> {
        try {
            const deletedPersonagem = await personagemModel.findByIdAndDelete(id);
            return deletedPersonagem;
        } catch (error) {
            throw new Error('Erro ao deletar personagem');
        }
    }

    async findById(id: string): Promise<Personagem | null> {
        try {
            const personagem = await personagemModel.findById(id);
            return personagem;
        } catch (error) {
            throw new Error('Erro ao encontrar personagem por id');
        }
    }

    async countPersonagem(): Promise<number> {
        try {
            const count = await personagemModel.countDocuments();
            return count;
        } catch (error) {
            throw new Error(`Erro ao contar personagem: ${error}`);
        }
    }

    private generateHash(timestamp: string): string {
        const hash = require('crypto').createHash('md5');
        hash.update(timestamp + this.marvelChavePrivada + this.marvelChavePublica);
        return hash.digest('hex');
    }
}

export default new PersonagemService();
