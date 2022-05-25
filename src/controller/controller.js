
/**
* Module for the AccountController.
*
* @author Mats Loock
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
    async addPlant(req, res) {
        console.log('addAPlant')
        try {
            let plant = await new Plant({ commonName: req.body.commonName, typeOfPlant: req.body.typeOfPlant, latinName: req.body.latinName, description: req.body.description, difficultyLevel: req.body.difficultyLevel, standardSize: req.body.standardSize, sunPreference: req.body.sunPreference, idealTemperature: req.body.idealTemperature, idealHumidity: req.body.idealHumidity, idealMoisture: req.body.idealMoisture, idealSoil: req.body.idealSoil, regrowthInstructions: req.body.regrowthInstructions, nutritionalInstructions: req.body.nutritionalInstructions, poisonous: req.body.poisonous, wikipediaLink: req.body.wikipediaLink })
            const response = await plant.save()
            console.log(response)

            res.status(201).json(response)

        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async deletePlantById(req, res) {
        console.log('deletePlant')
        try {
            let id = req.params.id
            const searchPlant = await Plant.findByIdAndDelete(id)
            if (searchPlant) {
                res.status(200).json({ message: "Plant with this id: " + id + " has been deleted!" })
            }
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" });
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async deletePlantByCommonName(req, res) {
        console.log('deletePlant')
        let commonName = req.params.commonName
        try {
            const searchPlant = await Plant.findOneAndDelete({ commonName: commonName })
            if (searchPlant) {
                console.log('deletePlantName 200')
                res.status(200).json({ message: "Plant with this name: " + commonName + " has been deleted!" })
            }
            res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async updatePlant(req, res) {
        console.log('updatePlant')
        try {
            console.log('updatePlant')
            res.status(200).json(response)
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async getCollection(req, res) {
        console.log('getCollection')
        try {
            console.log('getCollection')
            res.status(200).json(response)

        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async getPlantById(req, res) {
        console.log('getPlant')
        try {
            let id = req.params.id
            let plant = await Plant.findOne({ id: req.params.id })
            if (plant) {
                res.status(200).json(plant)
            }
            res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    // async getPlantByName(req, res) {
    //     console.log('getPlant')
    //     try {
    //         let commonName = req.params.commonName
    //         let plant = await Plant.findOne({ id: commonName })
    //         if (plant) {
    //             res.status(200).json(plant)
    //         }
    //         res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
    //     } catch (error) {
    //         res.status(401).json(error.message)
    //         console.log(error)
    //     }
    // }

    // async getAllPlants(req, res) {
    //     console.log('getAllPlants')
    //     try {
    //         let plants = await Plant.find()
    //         if(plants){
    //             res.status(200).json(plants)
    //         }
    //         res.status(404).json({ message: "No with that name exists!" })
    //     } catch (error) {
    //         res.status(401).json(error.message)
    //         console.log(error)
    //     }
    // }
}
