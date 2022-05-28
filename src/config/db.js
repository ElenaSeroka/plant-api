//db.js
import mongoose from 'mongoose'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import dotenv from 'dotenv'

dotenv.config();

// const mongoose = new Mongoose()
// const mongoose = require('mongoose')

export async function connectToDB(){
    await mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err))
}