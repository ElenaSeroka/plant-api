/**
 * Mongoose model Webhook.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    secret: {
        type: String,
        required: true
    },
    user: {
        type: String,
    }
})

// Create an plant model using the schema.
export const Webhook = mongoose.model('webhooks', schema)
