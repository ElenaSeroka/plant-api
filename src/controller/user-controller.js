/**
 * Module for the AccountController.
 * @author Elena Seroka
 * @version 1.0.0
 */

// import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../model/userModel.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
    /**
     * Authenticates a user.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async login(req, res, next) {
        console.log('Logging in...')
        try {
            const user = await User.authenticate(req.body.email, req.body.password)

            const payload = {
                sub: user.email
            }

            const privatekey = process.env.SECRET
            const accessToken = jwt.sign(payload, privatekey, {
                algorithm: 'HS256',
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })

            res
                .status(200)
                .json({
                    access_token: accessToken
                })

        } catch (error) {
            const err = createError(401)
            err.innerException = error
            next(err)
        }
    }

    /**
     * Registers a user.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async register(req, res, next) {
        try {
            const user = await new User({
                email: req.body.email,
                password: req.body.password
            })

            const response = await user.save()
            res
                .status(201)
                .json({ message: response })

        } catch (error) {
            let err = error
            if (err.code === 11000) {
                // Duplicated keys.
                err = createError(409)
                err.innerException = error
            } else if (error.name === 'ValidationError') {
                // Validation error(s).
                err = createError(400)
                err.innerException = error
            }
            next(err)
        }
    }

    authenticateJWT(req, res, next) {
        let authorization
        try {
            console.log('trying to authenticate...')
            authorization = req.headers.authorization?.split(' ')
            if (authorization?.[0] !== 'Bearer') {
                return next(createError(401, 'Invalid token'))
            }
        } catch (error) {
            next(err)
        }

        try {
            const publicKey = process.env.SECRET
            jwt.verify(authorization[1], publicKey,
                (error, response) => {
                    if (error) {
                        console.log('-----------------------------')
                        // res.sendStatus(403)
                        res.status(403).json("Authorization failed. Please check your jwt token.");
                    }
                    req.user = response.sub
                })
        } catch (err) {
            next(err)
        }
        next()
    }

}
