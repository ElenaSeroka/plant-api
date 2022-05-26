/**
 * Mongoose model Plant.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    }
})




// Create an plant model using the schema.
export const User = mongoose.model('user', schema)
