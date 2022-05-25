/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */


 import express from 'express'
 import { ResourceController } from '../controller/controller.js'
 
 export const router = express.Router()
 const controller = new ResourceController()






router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))

// router.get('/api/plants', (req, res) => controller.addPlant(req, res))
// router.get('/api/plants/req.params', (req, res) => controller.addPlant(req, res))
router.post('/api/plants', (req, res) => controller.addPlant(req, res))
// router.put('/api/plants', (req, res) => controller.addPlant(req, res))
router.delete('/api/plants', (req, res) => controller.deletePlant(req, res))





























// router.post('/images', controller.authenticateJWT, controller.addAnImage)
// router.get('/api/plants/herbs/:Name', (req, res) => res.json([plantModel]))

// router.get('/api/plants/:plantType/:id', (req, res) => {
//     console.log(req.params.id)
//     console.log(req.params.plantType)
//     res.send(req.params.id
//     )
// })

// router.get('/api/plants/:id/', (req, res) => {
//     console.log(req.params.id)
//     res.send(req.params.id
//     )
// })

// router.get('/api/plants/:name/', (req, res) => {
//     console.log(req.params.id)
//     // res.send(req.params.id
//     res.send(req.params
//     )
// })

// router.get('/api/:id/', (req, res) => {
//     console.log(req.params.id)
//     res.send(req.params.id
//     )
// })