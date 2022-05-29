/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */


import express from 'express'
import { UserController } from '../controller/user-controller.js'
import { WebhookController } from '../controller/webhook-controller.js'

export const webhookRouter = express.Router()
const jwtChecker = new UserController()
const webhookController = new WebhookController()

webhookRouter.post('/register', jwtChecker.authenticateJWT, (req, res, next) => webhookController.registerWebhook(req, res, next))




