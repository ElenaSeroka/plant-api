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

router.get('/api/plants', (req, res) => controller.getAllPlants(req, res))
router.get('/api/plants/id/:id', (req, res) => controller.getPlantById(req, res))
router.get('/api/plants/name/:common', (req, res) => controller.getPlantByName(req, res))

router.post('/api/plants/plant', (req, res) => controller.addPlant(req, res))

// router.put('/api/plants', (req, res) => controller.addPlant(req, res))

router.delete('/api/plants/id/:id', (req, res) => controller.deletePlantById(req, res))
router.delete('/api/plants/name/:common', (req, res) => controller.deletePlantByCommonName(req, res))





























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