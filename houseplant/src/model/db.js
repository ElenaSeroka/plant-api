//db.js
import mongoose from 'mongoose'

// const mongoose = new Mongoose()
// const mongoose = require('mongoose')

// const url = `mongodb+srv://gardener1:<plantsrcool>@my-sample-cluster-b3ugy.mongodb.net/<commonHousePlants>?retryWrites=true&w=majority`;
const url = `mongodb+srv://gardener1:plantsrcool@cluster0.k2ppf.mongodb.net/commonHousePlants?retryWrites=true&w=majority`;



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