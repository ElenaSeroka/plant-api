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
 
router.get('/', (req, res) => controller.welcomeMessage(req, res))
router.get('/plants', jwtChecker.authenticateJWT, (req, res, next) => controller.getAllPlants(req, res, next))

router.get('/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantById(req, res, next))
router.get('/plants/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantByName(req, res, next))

router.post('/plants', jwtChecker.authenticateJWT, (req, res, next) => controller.addPlant(req, res, next), 
(req, res, next) => webhookController.pingWebhooks(req, res, next))

router.post('/users/register', jwtChecker.authenticateJWT, (req, res, next) => jwtChecker.register(req, res, next))
router.post('/users/login', (req, res, next) => jwtChecker.login(req, res, next))

router.post('/webhooks/register', jwtChecker.authenticateJWT, (req, res, next) => webhookController.registerWebhook(req, res, next))

router.put('/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantById(req, res, next))
router.put('/plants/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantByName(req, res, next))

router.delete('/plants/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantById(req, res, next))
router.delete('/plants/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantByCommonName(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))