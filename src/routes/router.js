/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */
import express from 'express'
import createError from 'http-errors'
import { userRouter } from './user-router.js'
import { plantsRouter } from './plant-router.js'
import { webhookRouter } from './webhook-router.js'
import { ResourceController } from '../controller/plant-controller.js'

export const router = express.Router()
let controller = new ResourceController()

router.get('/', (req, res) => controller.welcomeMessage(req, res))

router.use('/users/', userRouter)
router.use('/plants/', plantsRouter)
router.use('/webhooks/', webhookRouter)

router.use('*', (req, res, next) => next(createError(500)))


