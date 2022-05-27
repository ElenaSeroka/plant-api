/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */


 import express from 'express'
 import { ResourceController } from '../controller/plant-controller.js'
 import { UserController } from '../controller/user-controller.js'
 import { WebhookController } from '../controller/webhook-controller.js'
 import createError from 'http-errors'

 
 export const router = express.Router()
 const controller = new ResourceController()
 const jwtChecker = new UserController()   
 const webhookController = new WebhookController()
 
router.get('/api/plants', jwtChecker.authenticateJWT, (req, res, next) => controller.getAllPlants(req, res, next))

router.get('/api/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantById(req, res, next))
router.get('/api/plants/name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantByName(req, res, next))

router.post('/api/plants', jwtChecker.authenticateJWT, (req, res, next) => controller.addPlant(req, res, next), 
(req, res, next) => webhookController.pingWebhooks(req, res, next))

router.post('/api/users/register', jwtChecker.authenticateJWT, (req, res, next) => jwtChecker.register(req, res, next))
router.post('/api/users/login', (req, res, next) => jwtChecker.login(req, res, next))

router.post('/api/webhook/register', jwtChecker.authenticateJWT, (req, res, next) => webhookController.registerWebhook(req, res, next))
// router.post('/api/webhook/unregister', jwtChecker.authenticateJWT, (req, res, next) => webhookController.pingWebhooks(req, res, next))

router.put('/api/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantById(req, res, next))
router.put('/api/plants/name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantByName(req, res, next))

router.delete('/api/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantById(req, res, next))
router.delete('/api/plants/name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantByCommonName(req, res, next))

router.use('*', (req, res, next) => next(createError(500)))



























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