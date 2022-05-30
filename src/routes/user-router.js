/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */
import express from 'express'
import { UserController } from '../controller/user-controller.js'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.post('/register', (req, res, next) => userController.register(req, res, next))
userRouter.post('/login', (req, res, next) => userController.login(req, res, next))





