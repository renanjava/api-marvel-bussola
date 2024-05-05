import { Router } from 'express';
import personagemController from './controller/personagem.controller';
import comicsController from './controller/comics.controller';
import criadoresController from './controller/criadores.controller';

const routes = Router();

routes.post('/personagem', personagemController.createFromMarvelAPI);
routes.post('/personagem2', personagemController.create);
routes.get('/personagem', personagemController.findAll);
routes.get('/personagem/:id', personagemController.findById);
routes.put('/personagem/:id', personagemController.updateById);
routes.delete('/personagem/:id', personagemController.deleteById);

routes.post('/comics', comicsController.create);
routes.get('/comics', comicsController.findAll);
routes.get('/comics/:id', comicsController.findById);
routes.put('/comics/:id', comicsController.updateById);
routes.delete('/comics/:id', comicsController.deleteById);

routes.post('/criadores', criadoresController.createFromMarvelAPI);
routes.post('/criadores2', criadoresController.create);
routes.get('/criadores', criadoresController.findAll);
routes.get('/criadores/:id', criadoresController.findById);
routes.put('/criadores/:id', criadoresController.updateById);
routes.delete('/criadores/:id', criadoresController.deleteById);

routes.get('/personagem-count', personagemController.count); // rota auxiliar
routes.get('/comics-count', comicsController.count); // rota auxiliar
routes.get('/criadores-count', criadoresController.count); // rota auxiliar


export { routes };
