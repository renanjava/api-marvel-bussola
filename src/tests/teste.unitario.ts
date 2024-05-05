import { expect } from 'chai';
import sinon from 'sinon';
import PersonagemService from '../service/personagem.service';
import personagemModel from '../schema/personagem.schema';

describe('PersonagemService', () => {
    describe('create', () => {
        it('deve criar um personagem', async () => {
            const personagemData = {
                nome: 'Spider-Man',
                descricao: 'Seu amigável homem-aranha',
                urlImagem: 'https://exemplo.com/spiderman.jpg',
            };

            const createStub = sinon.stub(personagemModel, 'create').resolves(personagemData);

            const createdPersonagem = await PersonagemService.create(personagemData);

            expect(createdPersonagem).to.deep.equal(personagemData);

            sinon.assert.calledOnce(createStub);
            createStub.restore();
        });
    });
});
