
/**
* Module for the AccountController.
*
* @author Elena Seroka
* @version 1.0.0
*/

import createError from 'http-errors'
import { Plant } from '../model/plant-model.js'
// import mongoose from 'mongoose'

/**
 * Encapsulates a controller.
 */
export class ResourceController {
    /**
     * Handles plant recources - creating, reading (individual plant and a collection of all plants), updating and deleting.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */


    welcomeMessage(req, res) {

        const links = {
            "self": { rel: "self", method: "GET", href: 'https://api-plants-es.herokuapp.com/' },
            
            'info': { readme: 'Welcome to this Plant REST API.You need to register and login before you can interact with the resources in this API. You can also register for a webhook, to get a notification when a new plant is added (please specify a URL to which the hook should be sent). To register and login you must provide email and password as keys in your message body. To register webhooks you must provide user, secret and url as keys in your message body.To add a plant, you must provide either id or common-name as keys in your message body, along with type-of-plant. When getting plants, if you want to offset the response add skip as a parameter to the url. If you want to limit the response, add limit as a parameter to the url. You can find all plants in the collection, as well as additional actions (such as registering, login and signing up for a webhook) by using the following links:":' },
           
            "Register to API": { rel: "post", method: "POST", title: 'Register user', href: 'https://api-plants-es.herokuapp.com/users/register' },
            "Login to API": { rel: "post", method: "POST", title: 'Login user', href: 'https://api-plants-es.herokuapp.com/users/login' },
            "Register for webhook": { rel: "post", method: "POST", title: 'Register webhook', href: 'https://api-plants-es.herokuapp.com/webhook/register' },
            "List all plants": { rel: "get", method: "GET", title: 'List all plants', href: 'https://api-plants-es.herokuapp.com/plants' },
            "Get plant by id": { rel: "get", method: "GET", title: 'Get plant by id', href: 'https://api-plants-es.herokuapp.com/plants/id/<id-of-plant>' },
            "Get plant by common name": { rel: "get", method: "GET", title: 'Get plant by common name', href: 'https://api-plants-es.herokuapp.com/plants/common-name/<common-name-of-plant>' },
            "Create new plant": { rel: "Create new plant", method: "POST", title: 'Create plant', href: this.globalAdress() },
        }

        res.status(200).json({ message: "Welcome to the Plants API!", links })
    }

    //---------------------------------------------------------GET----------------------------------------------------------------------------------

    globalAdress() {
        let url = 'https://api-plants-es.herokuapp.com/plants'
        return url
    }

    async getAllPlants(req, res, next) {
        try {

            let limit = parseInt(req.query.limit) || 5
            let skip = parseInt(req.query.skip) || 0

            let plants = await Plant.find()
                .skip(skip)
                .limit(limit)

            let result
            let count = await Plant.countDocuments()
            const totalPages = Math.ceil(count / limit)

            let pagination = {
                totalPages: totalPages,
                totalNrOfPlants: count,
                DocumentsPerPage: limit
            }

            const links = {
                "self": { rel: "self", method: "GET", href: this.globalAdress() },
                "Create new plant": { rel: "Create new plant", method: "POST", title: 'Create plant', href: this.globalAdress() },
                "Delete plant by id": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: this.globalAdress() + '/id/' + '<id-of-plant>' },
                "Delete plant by common name": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: this.globalAdress() + '/common-name/' + '<common-name-of-plant>' }
            }
            if (plants) {
                result = Object.assign({}, { pagination }, plants, links)
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
                        self: { rel: "self", method: "GET", href: (this.globalAdress() + '/id/' + id) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href: (this.globalAdress() + '/id/' + id) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + '/id/' + id) },
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
                        self: { rel: "self", method: "GET", href: (this.globalAdress() + '/common-name/' + commonName) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href: (this.globalAdress() + '/common-name/' + commonName) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + '/common-name/' + commonName) },
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
            let commonName = req.body.commonName.trim()
            var finalName = commonName.replace(/ /g, "-");
            let resultName = finalName.toLowerCase()

            let typeOfPlant = req.body.typeOfPlant.trim()
            var finalType = typeOfPlant.replace(/ /g, "-");
            let resultType = finalType.toLowerCase()

            let plant = await new Plant({ commonName: resultName, typeOfPlant: resultType, latinName: req.body.latinName, description: req.body.description, difficultyLevel: req.body.difficultyLevel, standardSize: req.body.standardSize, sunPreference: req.body.sunPreference, idealTemperature: req.body.idealTemperature, idealHumidity: req.body.idealHumidity, idealMoisture: req.body.idealMoisture, idealSoil: req.body.idealSoil, regrowthInstructions: req.body.regrowthInstructions, nutritionalInstructions: req.body.nutritionalInstructions, poisonous: req.body.poisonous, wikipediaLink: req.body.wikipediaLink })
            let result
            const response = await plant.save()

            if (response) {
                result = Object.assign({}, { message: "Plant with name: " + plant.commonName + " and id: " + plant._id + " was created and added to database." }, plant._doc,
                    {
                        self: { rel: "self", method: "POST", href: (this.globalAdress()) },
                        update: { rel: "update", method: "PUT", title: 'Update Plant', href1: (this.globalAdress() + '/id/' + plant._id), href2: (this.globalAdress() + '/common-name/' + plant.commonName) },
                        delete: { rel: "delete", method: "DELETE", title: 'Delete Plant', href1: (this.globalAdress() + '/id/' + plant._id), href2: (this.globalAdress() + '/common-name/' + plant.commonName) },
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
            let result
            if (plant) {
                result = Object.assign({}, { message: "Update successful." }, plant._doc,
                    {
                        "self": { rel: "self", method: "PUT", href: (this.globalAdress() + '/id/' + req.params.id) },
                        "list plant": { rel: "list specific plant", method: "GET", href: (this.globalAdress() + '/id/' + req.params.id) },
                        "delete": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + '/id/' + req.params.id) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(200).json({ result })
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
                        "self": { rel: "self", method: "PUT", href: (this.globalAdress() + '/common-name/' + newName) },
                        "list plant": { rel: "list specific plant", method: "GET", href1: (this.globalAdress() + '/common-name/' + newName) },
                        "delete": { rel: "delete", method: "DELETE", title: 'Delete Plant', href: (this.globalAdress() + '/common-name/' + newName) },
                        "parent": { rel: "Up", method: "GET", title: 'List Plants', href: this.globalAdress() }
                    })
                res.status(200).json({ result })
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
                        "self": { rel: "self", method: "DELETE", href: (this.globalAdress() + '/id/' + req.params.id) },
                        update: { rel: "update", method: "PUT", title: 'Update plants', href: (this.globalAdress() + '/id/' + req.params.id) },
                        "list plant by id": { rel: "list specific plant", method: "GET", href: (this.globalAdress() + '/id/' + req.params.id) },
                        "parent": { rel: "Up", method: "GET", title: 'List plants', href: this.globalAdress() }

                    })
                res.status(200).json({ result })
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
                        "self": { rel: "self", method: "DELETE", href: (this.globalAdress() + '/common-name/' + commonName) },
                        update: { rel: "update", method: "PUT", title: 'Update plants', href: (this.globalAdress() + '/common-name/' + commonName) },
                        "list plant by id": { rel: "list specific plant", method: "GET", href: (this.globalAdress() + '/common-name/' + commonName) },
                        "parent": { rel: "Up", method: "GET", title: 'List plants', href: this.globalAdress() }

                    })
                res.status(200).json({ result })
            } else {
                res.status(404).json({ message: "No plant with this name: " + commonName + " exists!" })
            }
        } catch (error) {
            next(createError(error.status, error.message))
        }
    }
}


