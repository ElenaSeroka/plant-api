//db.js
import mongoose from 'mongoose'

// const mongoose = new Mongoose()
// const mongoose = require('mongoose')

const password = process.env.SAMPLE_PASSWORD
const user = process.env.SAMPLE_PASSWORD
const dbName = process.env.DB_NAME

const url = `mongodb+srv://${user}:${password}@cluster0.k2ppf.mongodb.net/commonHousePlants?retryWrites=true&w=majority`;



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