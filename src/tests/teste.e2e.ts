import request from 'supertest';
import app from '../app';
import { expect } from 'chai';

describe('Personagem Controller', () => {
    describe('POST /personagens2', () => {
        it('deve criar um personagem', async () => {
            const personagemData = {
                nome: 'Spider-Man',
                descricao: 'Seu amigável homem-aranha',
                urlImagem: 'https://exemplo.com/spiderman.jpg',
            };

            const res = await request(app)
                .post('/personagens2')
                .send(personagemData);

            expect(res.status).to.equal(201);
            expect(res.body).to.deep.equal(personagemData);
        });
    });
});
