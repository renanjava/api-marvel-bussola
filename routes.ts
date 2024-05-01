import { Router } from 'express'
import personagemController from './controller/personagem.controller'

const routes = Router()
routes.post('/personagem', personagemController.create)
routes.get('/personagem/:id', personagemController.findById)
routes.get('/personagem', personagemController.findAll)
routes.put('/personagem/:id', personagemController.updateById)
routes.delete('/personagem/:id', personagemController.deleteById)

export {
    routes
}