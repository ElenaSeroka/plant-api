/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */


 import express from 'express'
 import { ResourceController } from '../controller/controller.js'
 import { UserController } from '../controller/user-controller.js'
 
 export const router = express.Router()
 const controller = new ResourceController()
 const jwtChecker = new UserController()   

router.get('plants', jwtChecker.authenticateJWT, (req, res, next) => controller.getAllPlants(req, res))


router.get('plants/id/:id', jwtChecker.authenticateJWT, (req, res) => controller.getPlantById(req, res))
router.get('plants/name/:common', jwtChecker.authenticateJWT, (req, res) => controller.getPlantByName(req, res))

router.post('plants/plant', jwtChecker.authenticateJWT, (req, res) => controller.addPlant(req, res))

router.post('users/register', jwtChecker.authenticateJWT, (req, res, next) => jwtChecker.register(req, res, next))
router.post('users/login', jwtChecker.authenticateJWT, (req, res, next) => jwtChecker.login(req, res, next))


router.put('plants/plant/:id', jwtChecker.authenticateJWT, (req, res) => controller.updatePlantById(req, res))
router.put('plants/plant/:common', jwtChecker.authenticateJWT, (req, res) => controller.updatePlantById(req, res))

router.delete('plants/id/:id', jwtChecker.authenticateJWT, (req, res) => controller.deletePlantById(req, res))
router.delete('plants/name/:common', jwtChecker.authenticateJWT, (req, res) => controller.deletePlantByCommonName(req, res))





























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