
/**
* Module for the AccountController.
*
* @author Elena Seroka
* @version 1.0.0
*/

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { Plant } from '../model/plantModel.js'
// import mongoose from 'mongoose'

/**
 * Encapsulates a controller.
 */
export class ResourceController {
    /**
     * Adds a plant to the api and if this is successful, adds same image to database.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */


    //---------------------------------------------------------GET----------------------------------------------------------------------------------

    async getAllPlants(req, res, next) {
        try {
            let plants = await Plant.find()
            if (plants) {
                res.status(200).json(plants)
            }
            res.status(404).json({ message: "No with collection with that name exists!" })
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async getPlantById(req, res, next) {
        try {
            let id = req.params.id
            let plant = await Plant.findOne({ id: id })
            if (plant) {
                res.status(200).json(plant)
            }
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }


    async getPlantByName(req, res, next) {
        try {
            let commonName = req.params.commonName
            let plant = await Plant.findOne({ id: commonName })
            if (plant) {
                res.status(200).json(plant)
            }
            res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }


    //---------------------------------------------------------POST----------------------------------------------------------------------------------

    async addPlant(req, res, next) {
        console.log('addAPlant')
        try {
            let plant = await new Plant({ commonName: req.body.commonName, typeOfPlant: req.body.typeOfPlant, latinName: req.body.latinName, description: req.body.description, difficultyLevel: req.body.difficultyLevel, standardSize: req.body.standardSize, sunPreference: req.body.sunPreference, idealTemperature: req.body.idealTemperature, idealHumidity: req.body.idealHumidity, idealMoisture: req.body.idealMoisture, idealSoil: req.body.idealSoil, regrowthInstructions: req.body.regrowthInstructions, nutritionalInstructions: req.body.nutritionalInstructions, poisonous: req.body.poisonous, wikipediaLink: req.body.wikipediaLink })
            const response = await plant.save()
            console.log(response)

            res.status(201).json(response)

        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    //---------------------------------------------------------UPDATE----------------------------------------------------------------------------------


    async updatePlantById(req, res, next) {
        try {
            let id = req.params.id
            let updateBody = req.body
            const filter = { id: id }
            const update = updateBody

            let plant = await Plant.findOneAndUpdate(filter, update)
            plant = await Plant.findOne(filter)

            if (plant) {
                res.status(201).json({
                    message: "Entry updated",
                    entry: plant
                })
            } else {
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
        }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async updatePlantByName(req, res, next) {
        try {
            let id = req.params.commonName
            let updateBody = req.body
            const filter = { commonName: commonName }
            const update = updateBody

            let plant = await Plant.findOneAndUpdate(filter, update)
            plant = await Plant.findOne(filter)

            if (plant) {
                res.status(201).json({
                    message: "Entry updated",
                    entry: plant
                })
            } else {
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
        }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }
    //---------------------------------------------------------DELETE----------------------------------------------------------------------------------


    async deletePlantById(req, res, next) {
        try {
            let id = req.params.id
            const searchPlant = await Plant.findByIdAndDelete(id)
            if (searchPlant) {
                res.status(200).json({ message: "Plant with this id: " + id + " has been deleted!" })
            }
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" });
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async deletePlantByCommonName(req, res, next) {
        try {
            let commonName = req.params.commonName
            const searchPlant = await Plant.findOneAndDelete({ commonName: commonName })
            if (searchPlant) {
                res.status(200).json({ message: "Plant with this name: " + commonName + " has been deleted!" })
            }
            res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }
}
