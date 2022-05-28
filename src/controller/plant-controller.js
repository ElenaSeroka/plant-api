
/**
* Module for the AccountController.
*
* @author Elena Seroka
* @version 1.0.0
*/

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

    globalAdress() {
        let url = 'https://futureadress.herokuapp.com/api/plants/'
        return url
    }

    async getAllPlants(req, res, next) {
        try {

            let limit = parseInt(req.query.limit) || 5
            let offset = parseInt(req.query.offset) || 0
            let page = parseInt(req.query.page) || 1
            let type = req.query.typeOfPlant

            let currentPage = ((limit * page) - limit) + 1 + offset
            let plants = await Plant.find()
                .skip(currentPage)
                .limit(limit)

            let result
            let count = await Plant.countDocuments()

            const totalPages = Math.ceil(count / limit)

            const query = Plant.find(
                { typeOfPlant: type }
            )



            let filteredCollection = query.getFilter(); // `{ name: 'Jean-Luc Picard' }`
            const doc = await query.exec();

            console.log(doc)




            let pagination = {
                currentPage: page,
                totalPages: totalPages,
                totalNrOfPlants: count,
                DocumentsPerPage: limit
            }

            const links = {
                "self": { rel: "self", method: "GET", href: this.globalAdress() },
                "Create new plant": { rel: "Create new plant", method: "POST", title: 'Create plant', href: this.globalAdress() }
            }
            if (plants) {
                result = Object.assign({}, pagination, plants, links)
                res.status(200).json(result)
            }
            else {
                res.status(404).json({ message: "No with collection with that name exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async getPlantById(req, res, next) {
        try {
            let id = req.params.id
            let plant = await Plant.findOne({ _id: id })
            let result
            if (plant) {
                result = Object.assign({}, plant._doc,
                    {
                        self: { rel: "self", method: "GET", href: (this.globalAdress() + id) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href: (this.globalAdress() + id) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + id) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(200).json(result)
            }
            else {
                res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async getPlantByName(req, res, next) {
        try {
            let commonName = req.params.commonName
            let plant = await Plant.findOne({ commonName: commonName })
            let result
            if (plant) {
                result = Object.assign({}, plant._doc,
                    {
                        self: { rel: "self", method: "GET", href: (this.globalAdress() + commonName) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href: (this.globalAdress() + commonName) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + commonName) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(200).json(result)
            }
            else {
                res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }


    //---------------------------------------------------------POST----------------------------------------------------------------------------------

    async addPlant(req, res, next) {
        try {
            let plant = await new Plant({ commonName: req.body.commonName, typeOfPlant: req.body.typeOfPlant, latinName: req.body.latinName, description: req.body.description, difficultyLevel: req.body.difficultyLevel, standardSize: req.body.standardSize, sunPreference: req.body.sunPreference, idealTemperature: req.body.idealTemperature, idealHumidity: req.body.idealHumidity, idealMoisture: req.body.idealMoisture, idealSoil: req.body.idealSoil, regrowthInstructions: req.body.regrowthInstructions, nutritionalInstructions: req.body.nutritionalInstructions, poisonous: req.body.poisonous, wikipediaLink: req.body.wikipediaLink })
            let result
            const response = await plant.save()
            
            if (response) {
                result = Object.assign({}, { message: "Plant with name: " + plant.commonName + " and id: " + plant._id + " was created and added to database." }, plant._doc,
                    {
                        self: { rel: "self", method: "POST", href: (this.globalAdress()) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href1: (this.globalAdress() + plant._id), href2: (this.globalAdress() + plant.commonName) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href1: (this.globalAdress() + plant._id), href2: (this.globalAdress() + plant.commonName) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(201).json(result)
                next()
            } else {
                next(createError(error.status, error.message))
            }

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

            let plant = await Plant.findOneAndUpdate(filter, update, { new: true })
            plant = await Plant.findOne(filter)
            let result
            if (plant) {
                result = Object.assign({}, { message: "Update successful." }, plant._doc,
                    {
                        "self": { rel: "self", method: "PUT", href: (this.globalAdress() + req.params.id) },
                        "list plant": { rel: "list specific plant", method: "GET", href1: (this.globalAdress() + req.params.id) },
                        "delete": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + req.params.id) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(201).json({ result })
            } else {
                res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }


    async updatePlantByName(req, res, next) {
        try {
            let commonName = req.params.commonName
            let updateBody = req.body
            const filter = { commonName: commonName }

            const update = updateBody
            let newName = update.commonName
            let plant = await Plant.findOneAndUpdate(filter, update, { new: true })

            let result
            if (plant) {
                result = Object.assign({}, { message: "Update successful." }, plant._doc,
                    {
                        "self": { rel: "self", method: "PUT", href: (this.globalAdress() + newName) },
                        "list plant": { rel: "list specific plant", method: "GET", href1: (this.globalAdress() + newName) },
                        "delete": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + newName) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(201).json({ result })
            } else {
                res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }
    //---------------------------------------------------------DELETE----------------------------------------------------------------------------------


    async deletePlantById(req, res, next) {
        try {
            let id = req.params.id
            const plant = await Plant.findByIdAndDelete(id)
            let result
            if (plant) {
                result = Object.assign({}, { message: "Deletion successful." }, plant._doc,
                    {
                        "self": { rel: "self", method: "DELETE", href: (this.globalAdress() + req.params.id) },
                        update: { rel: "update", method: "PUT", title: 'Update plants', href: (this.globalAdress() + req.params.id) },
                        "list plant by id": { rel: "list specific plant", method: "GET", href: (this.globalAdress() + req.params.id) },
                        "parent": { rel: "Up", method: "GET", title: 'List plants', href: this.globalAdress() }

                    })
                res.status(201).json({ result })
            }
            else {
                res.status(404).json({ message: "No plant with this id: " + id + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }

    async deletePlantByCommonName(req, res, next) {
        try {
            let commonName = req.params.commonName
            const plant = await Plant.findOneAndDelete({ commonName: commonName })
            let result
            if (plant) {
                result = Object.assign({}, { message: "Deletion successful." }, plant._doc,
                    {
                        "self": { rel: "self", method: "DELETE", href: (this.globalAdress() + commonName) },
                        update: { rel: "update", method: "PUT", title: 'Update plants', href: (this.globalAdress() + commonName) },
                        "list plant by id": { rel: "list specific plant", method: "GET", href: (this.globalAdress() + commonName) },
                        "parent": { rel: "Up", method: "GET", title: 'List plants', href: this.globalAdress() }

                    })
                res.status(201).json({ result })
            }
            res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }
}
