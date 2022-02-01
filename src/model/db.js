//db.js
import mongoose from 'mongoose'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import dotenv from 'dotenv'

dotenv.config();

// const mongoose = new Mongoose()
// const mongoose = require('mongoose')

const password = process.env.SAMPLE_PASSWORD
const user = process.env.SAMPLE_USER
const dbName = process.env.DB_NAME

const url = `mongodb+srv://${user}:${password}@cluster0.k2ppf.mongodb.net/${dbName}?retryWrites=true&w=majority`;



const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })