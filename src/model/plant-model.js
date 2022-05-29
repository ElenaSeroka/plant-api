/**
 * Mongoose model Plant.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
    commonName: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    typeOfPlant: {
        // herb, decorative plant, edible plant, blooming plant, green plant
        type: String,
        required: true,
        trim: true
    },
    latinName: {
        type: String
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
