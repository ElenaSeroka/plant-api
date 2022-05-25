
/**
* Module for the AccountController.
*
* @author Mats Loock
* @author Elena Seroka
* @version 1.0.0
*/

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import {Plant} from '../model/plantModel.js'
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
            let plant = await new Plant({ commonName:req.body.commonName , typeOfPlant:req.body.typeOfPlant, latinName:req.body.latinName, description:req.body.description, difficultyLevel:req.body.difficultyLevel, standardSize:req.body.standardSize, sunPreference:req.body.sunPreference, idealTemperature:req.body.idealTemperature, idealHumidity:req.body.idealHumidity, idealMoisture:req.body.idealMoisture, idealSoil:req.body.idealSoil, regrowthInstructions:req.body.regrowthInstructions, nutritionalInstructions:req.body.nutritionalInstructions, poisonous:req.body.poisonous, wikipediaLink:req.body.wikipediaLink })
            const response = await plant.save()
            console.log(response)

            res.status(201).json(response)
            
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

    async deletePlant(req, res) {
        console.log('deletePlant')
        try {
            console.log('deletePlant')
            
            res.status(200).json(response)
            
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

    async getPlant(req, res) {
        console.log('getPlant')
        try {
            console.log('getPlant')
            res.status(200).json(response)
            
        } catch (error) {
            res.status(401).json(error.message)
            console.log(error)
        }
    }

}
