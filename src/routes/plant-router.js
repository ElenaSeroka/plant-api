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


export const plantsRouter = express.Router()
const controller = new ResourceController()
const jwtChecker = new UserController()
const webhookController = new WebhookController()

plantsRouter.get('/', jwtChecker.authenticateJWT, (req, res, next) => controller.getAllPlants(req, res, next))
plantsRouter.get('/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantById(req, res, next))
plantsRouter.get('/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.getPlantByName(req, res, next))

plantsRouter.post('/', jwtChecker.authenticateJWT, (req, res, next) => controller.addPlant(req, res, next),
    (req, res, next) => webhookController.pingWebhooks(req, res, next))

plantsRouter.put('/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantById(req, res, next))
plantsRouter.put('/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.updatePlantByName(req, res, next))

plantsRouter.delete('/id/:id', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantById(req, res, next))
plantsRouter.delete('/common-name/:commonName', jwtChecker.authenticateJWT, (req, res, next) => controller.deletePlantByCommonName(req, res, next))




