/**
 * API version 1 routes.
 *
 * @author Elena Seroka
 * @version 1.0.0
 */

import express from 'express'
import plant from '../model/plantModel.js'
let plantClass = new plant()
const plantModel = plantClass.plant


export const router = express.Router()



router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))

// router.get('/api/plants/herbs/basil', (req, res) => res.json([plantModel]))

router.get('/api/plants/:plantType/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.params.plantType)
    res.send(req.params.id
    )
})

router.get('/api/plants/:id/', (req, res) => {
    console.log(req.params.id)
    res.send(req.params.id
    )
})

router.get('/api/:id/', (req, res) => {
    console.log(req.params.id)
    res.send(req.params.id
    )
})