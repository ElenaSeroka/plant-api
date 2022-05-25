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
    commonName: {
        type: String
    },
    latinName: {
        type: String
    },
    // herb, decorative plant, edible plant, blooming plant, green plant
    typeOfPlant: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    difficultyLevel: {
        type: String
    },
    standardSize: {
        type: String
    },
    sunPreference: {
        type: String
    },
    idealTemperature: {
        type: String
    },
    idealHumidity: {
        type: String
    },
    idealMoisture: {
        type: String
    },
    idealSoil: {
        type: String
    },
    regrowthInstructions: {
        type: String
    },
    nutritionalInstructions: {
        type: String
    },
    poisonous: {
        type: Boolean
    },
    wikipediaLink: {
        type: Boolean,
        type: String
    },
    links: {
        type: String //SELF
    }
},

    {
        timestamps: true,
        versionKey: false

})




// Create an plant model using the schema.
export const Plant = mongoose.model('Plant', schema)
