/**
 * Module for the AccountController.
 * @author Elena Seroka
 * @version 1.0.0
 */

// import createError from 'http-errors'
import createError from 'http-errors'
import { Webhook } from '../model/webhook-model.js'
import axios from 'axios'


/**
 * Encapsulates a controller.
 */
export class WebhookController {
    /**
     * Authenticates a user.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */



    async registerWebhook(req, res, next) {
        try {
            let url = req.body.url
            let userUrl = await new Webhook({ url: url, secret: req.body.secret, user: req.body.user })
            const response = await userUrl.save()
            res.status(201).json(response)
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async pingWebhooks(req, res, next) {
        console.log('Webhook attempted...')
        try {
            let newPlant = req.body
            let webhooks = await Webhook.find()
            if (webhooks) {
                for (let i = 0; i < webhooks.length; i++) {
                    let webhook = webhooks[i]
                    let url = webhook.url
                    let secret = webhook.secret
                    let user = webhook.user
                    let body = {
                        "user": user,
                        "secret": secret,
                        "body": newPlant
                    }
                    let headers = {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Secret": secret
                    }
                    axios.post(url, body, headers)
                }
                let result = { message: "Webhooks pinged!" }
                res.status(200).json(result)
            }
            else {
                res.status(404).json({ message: "Unsuccessful at sending webhooks!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

}
